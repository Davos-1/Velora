import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Kasse", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/warenkorb", label: "Warenkorb" }, { label: "Kasse" }]} />
      <h1 className="mt-4">Kasse</h1>
      <div className="mt-6">
        <CheckoutForm />
      </div>
    </Container>
  );
}
