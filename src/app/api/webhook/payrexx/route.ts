import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveLines } from "@/lib/cart";
import { getDb, getEnv } from "@/lib/server/db";
import { getOrder, markFailed, markPaid, stockRelevantItems } from "@/lib/server/orders";
import { getPayrexxConfig, getTransaction, mapBrandToMethod, type PayrexxTransaction } from "@/lib/server/payrexx";
import { sendOrderMails } from "@/lib/server/mail";
import type { PaymentMethod } from "@/types/checkout";

export const dynamic = "force-dynamic";

const webhookSchema = z.object({
  transaction: z.object({
    id: z.number(),
    status: z.string(),
    referenceId: z.string().optional(),
    invoice: z.object({ referenceId: z.string().optional() }).partial().optional(),
    payment: z.object({ brand: z.string().optional() }).partial().optional(),
  }),
});

/** Mock body accepted only when no Payrexx credentials are configured. */
const mockSchema = z.object({
  mock: z.literal(true),
  orderId: z.string(),
  token: z.string(),
  outcome: z.enum(["paid", "failed"]),
  method: z.enum(["twint", "card", "invoice"]),
});

const PAID_STATES = new Set(["confirmed", "authorized", "reserved"]);
const FAILED_STATES = new Set(["cancelled", "declined", "error", "expired", "chargeback"]);

/**
 * Payrexx posts the transaction on every status change. The payload itself is
 * not signed, so we treat it as a hint only and re-fetch the transaction via
 * the signed API before changing any order state.
 */
export async function POST(req: Request) {
  const env = await getEnv();
  const db = await getDb();
  const cfg = getPayrexxConfig(env);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  let orderId: string | undefined;
  let status: string;
  let transactionId: string;
  let method: PaymentMethod | null;

  if (!cfg) {
    const mock = mockSchema.safeParse(body);
    if (!mock.success) return NextResponse.json({ error: "payrexx not configured" }, { status: 503 });
    const order = await getOrder(db, mock.data.orderId);
    if (!order || order.access_token !== mock.data.token) return NextResponse.json({ error: "unknown order" }, { status: 404 });
    orderId = order.id;
    status = mock.data.outcome === "paid" ? "confirmed" : "declined";
    transactionId = `mock-${Date.now()}`;
    method = mock.data.method;
  } else {
    const hint = webhookSchema.safeParse(body);
    if (!hint.success) return NextResponse.json({ ok: true, ignored: "unrecognised payload" });
    let tx: PayrexxTransaction;
    try {
      tx = await getTransaction(cfg, hint.data.transaction.id);
    } catch (e) {
      console.error("Payrexx transaction verification failed", e);
      return NextResponse.json({ error: "verification failed" }, { status: 502 });
    }
    orderId = tx.referenceId ?? tx.invoice?.referenceId ?? hint.data.transaction.referenceId;
    status = tx.status;
    transactionId = String(tx.id);
    method = mapBrandToMethod(tx.payment?.brand);
  }

  if (!orderId) return NextResponse.json({ ok: true, ignored: "no reference" });
  const order = await getOrder(db, orderId);
  if (!order) return NextResponse.json({ ok: true, ignored: "unknown order" });

  if (PAID_STATES.has(status)) {
    const lines = resolveLines({ lines: order.items.map(itemToLine) });
    const transitioned = await markPaid(db, order, { transactionId, method }, stockRelevantItems(lines));
    if (transitioned) {
      const paid = await getOrder(db, order.id);
      if (paid) await sendOrderMails(env, paid).catch((e) => console.error("Order mails failed", e));
    }
    return NextResponse.json({ ok: true, status: "paid", transitioned });
  }
  if (FAILED_STATES.has(status)) {
    const transitioned = await markFailed(db, order.id, transactionId);
    return NextResponse.json({ ok: true, status: "failed", transitioned });
  }
  return NextResponse.json({ ok: true, status, ignored: "no transition" });
}

/** Rebuilds cart lines from stored items so stock-relevant SKUs can be derived. */
function itemToLine(item: { variantSku: string; qty: number; name: string }) {
  // Stored variantSku is "<sku>[-<code>]"; the base SKU always has exactly 3 segments (VP-XXX-YYYY).
  const parts = item.variantSku.split("-");
  const sku = parts.slice(0, 3).join("-");
  const variantCode = parts.length > 3 ? parts.slice(3).join("-") : null;
  const bundle = /\(Set\)/.test(item.name);
  return { sku, variantCode, qty: item.qty, ...(bundle ? { bundleWithSku: "VP-MNT-BASE" } : {}) };
}
