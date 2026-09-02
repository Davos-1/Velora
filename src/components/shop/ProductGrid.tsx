import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-neutral">In dieser Kategorie sind aktuell keine Produkte verfügbar.</p>;
  }
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.sku} className="relative">
          <ProductCard product={p} priority={i < 2} />
        </li>
      ))}
    </ul>
  );
}
