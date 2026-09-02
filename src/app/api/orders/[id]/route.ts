import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/db";
import { getOrder } from "@/lib/server/orders";

export const dynamic = "force-dynamic";

/** Public order status for the thank-you page – requires the access token. */
export async function GET(req: Request, { params }: RouteContext<"/api/orders/[id]">) {
  const { id } = await params;
  const token = new URL(req.url).searchParams.get("t");
  const db = await getDb();
  const order = await getOrder(db, id);
  if (!order || !token || order.access_token !== token) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(
    { id: order.id, status: order.status, total: order.total_chf, paymentMethod: order.payment_method },
    { headers: { "Cache-Control": "no-store" } },
  );
}
