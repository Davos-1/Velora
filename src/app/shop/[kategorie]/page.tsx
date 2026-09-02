import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getProductsByKategorie } from "@/lib/products";
import { KATEGORIEN, kategorieMeta, type Kategorie } from "@/types/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return KATEGORIEN.map((kategorie) => ({ kategorie }));
}

function isKategorie(value: string): value is Kategorie {
  return (KATEGORIEN as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: PageProps<"/shop/[kategorie]">): Promise<Metadata> {
  const { kategorie } = await params;
  if (!isKategorie(kategorie)) return {};
  const meta = kategorieMeta[kategorie];
  return { title: meta.label, description: meta.beschreibung };
}

export default async function KategoriePage({ params }: PageProps<"/shop/[kategorie]">) {
  const { kategorie } = await params;
  if (!isKategorie(kategorie)) notFound();
  const meta = kategorieMeta[kategorie];
  const products = getProductsByKategorie(kategorie);

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { label: meta.label }]} />
      <h1 className="mt-4">{meta.label}</h1>
      <p className="mt-2 max-w-prose text-neutral">{meta.beschreibung}</p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
