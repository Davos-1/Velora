import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Warenkorb", robots: { index: false } };

export default function WarenkorbPage() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Warenkorb" }]} />
      <h1 className="mt-4">Warenkorb</h1>
      <div className="mt-6">
        <CartView />
      </div>
    </Container>
  );
}
