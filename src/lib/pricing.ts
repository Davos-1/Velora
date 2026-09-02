import type { Product } from "@/types/product";

/** Rounds to 5 Rappen, as Swiss prices are. */
export function roundChf(amount: number): number {
  return Math.round(amount * 20) / 20;
}

export function bundlePrice(product: Product, partner: Product): number {
  const pct = product.bundle?.rabattProzent ?? 0;
  return roundChf((product.preisChf + partner.preisChf) * (1 - pct / 100));
}
