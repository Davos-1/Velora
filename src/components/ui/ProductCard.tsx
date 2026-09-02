import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatChf } from "@/lib/format";
import { LieferzeitBadge } from "./LieferzeitBadge";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/shop/${product.kategorie}/${product.slug}`;
  const colours = product.varianten.typ === "farbe" ? product.varianten.optionen : [];
  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={href} className="relative block aspect-square bg-line">
        <Image
          src={product.bilder[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-(--duration-base) group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <h3 className="font-body text-sm font-medium leading-snug md:text-base">
          <Link href={href} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-ink">{formatChf(product.preisChf)}</p>
          {colours.length > 0 && (
            <ul aria-label="Farben" className="flex gap-1">
              {colours.map((c) => (
                <li
                  key={c.code}
                  title={c.label}
                  className="size-3.5 rounded-full border border-line"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </ul>
          )}
        </div>
        <LieferzeitBadge text={product.lieferzeitText} className="self-start" />
      </div>
    </article>
  );
}
