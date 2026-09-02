import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** Stage 1 placeholder – replaced by the real home page in stage 2. */
export default function HomePage() {
  return (
    <Container className="py-16 md:py-24">
      <p className="text-sm font-medium text-brand-dark">Padel-Zubehör aus der Schweiz</p>
      <h1 className="mt-3">Hello Velora</h1>
      <p className="mt-4 max-w-prose text-neutral">
        Fundament steht: Next.js auf Cloudflare, Design-Tokens, self-hosted Fonts, Header und
        Footer. Katalog, Warenkorb und Checkout folgen in den nächsten Etappen.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/shop">Zum Shop</ButtonLink>
        <ButtonLink href="/ueber-uns" variant="secondary">
          Über uns
        </ButtonLink>
      </div>
    </Container>
  );
}
