import Image from "next/image";
import Link from "next/link";
import { kategorieMeta, type Kategorie } from "@/types/product";

export function CategoryTile({ kategorie, image, count }: { kategorie: Kategorie; image?: string; count: number }) {
  const meta = kategorieMeta[kategorie];
  return (
    <Link href={`/shop/${kategorie}`} className="card group flex items-center gap-4 p-3 transition-colors hover:border-neutral">
      <span className="relative block size-16 shrink-0 overflow-hidden rounded-(--radius-button) bg-line md:size-20">
        {image && <Image src={image} alt="" fill sizes="80px" className="object-cover" />}
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-base font-medium text-ink group-hover:text-brand-dark">{meta.label}</span>
        <span className="block text-xs text-neutral">
          {count} {count === 1 ? "Produkt" : "Produkte"}
        </span>
      </span>
    </Link>
  );
}
