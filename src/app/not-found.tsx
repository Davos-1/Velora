import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="max-w-2xl py-20 text-center">
      <p className="text-sm font-medium text-brand-dark">404</p>
      <h1 className="mt-2">Diese Seite gibt es nicht.</h1>
      <p className="mt-3 text-neutral">Vielleicht ist der Link veraltet oder das Produkt nicht mehr im Sortiment.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/shop">Zum Shop</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Startseite
        </ButtonLink>
      </div>
    </Container>
  );
}
