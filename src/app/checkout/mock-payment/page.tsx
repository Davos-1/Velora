import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MockPayment } from "@/components/checkout/MockPayment";
import { getDb, getEnv } from "@/lib/server/db";
import { getOrder } from "@/lib/server/orders";
import { getPayrexxConfig } from "@/lib/server/payrexx";
import { formatChf } from "@/lib/format";

export const metadata: Metadata = { title: "Test-Zahlung", robots: { index: false } };
export const dynamic = "force-dynamic";

/**
 * Stand-in for the Payrexx hosted page while no credentials are configured.
 * Returns 404 as soon as real credentials exist.
 */
export default async function MockPaymentPage({ searchParams }: PageProps<"/checkout/mock-payment">) {
  const env = await getEnv();
  if (getPayrexxConfig(env)) notFound();

  const sp = await searchParams;
  const orderId = typeof sp.order === "string" ? sp.order : "";
  const token = typeof sp.t === "string" ? sp.t : "";
  const order = orderId ? await getOrder(await getDb(), orderId) : null;
  if (!order || order.access_token !== token) notFound();

  return (
    <Container className="max-w-xl py-12">
      <p className="text-sm font-medium text-error">Testmodus – kein Payrexx-Key konfiguriert</p>
      <h1 className="mt-2">Zahlung simulieren</h1>
      <p className="mt-3 text-neutral">
        Bestellung {order.id}, {formatChf(order.total_chf)}. Diese Seite ersetzt die Payrexx-Zahlungsseite.
      </p>
      <div className="mt-6">
        <MockPayment orderId={order.id} token={token} method={order.payment_method ?? "twint"} />
      </div>
    </Container>
  );
}
