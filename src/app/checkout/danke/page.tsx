import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { OrderStatus } from "@/components/checkout/OrderStatus";
import { getDb } from "@/lib/server/db";
import { getOrder } from "@/lib/server/orders";

export const metadata: Metadata = { title: "Bestellbestätigung", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function DankePage({ searchParams }: PageProps<"/checkout/danke">) {
  const sp = await searchParams;
  const orderId = typeof sp.order === "string" ? sp.order : "";
  const token = typeof sp.t === "string" ? sp.t : "";

  const order = orderId && token ? await getOrder(await getDb(), orderId) : null;
  const valid = order && order.access_token === token ? order : null;

  return (
    <Container className="max-w-2xl py-8 md:py-12">
      <h1>Bestellung</h1>
      <div className="mt-6">
        {valid ? (
          <OrderStatus orderId={valid.id} token={token} initialStatus={valid.status} total={valid.total_chf} paymentMethod={valid.payment_method} />
        ) : (
          <div className="card p-6">
            <p className="text-neutral">Diese Bestellung wurde nicht gefunden.</p>
            <ButtonLink href="/shop" variant="secondary" className="mt-6">
              Zum Shop
            </ButtonLink>
          </div>
        )}
      </div>
    </Container>
  );
}
