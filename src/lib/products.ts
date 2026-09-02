import { rawProducts } from "@data/products";
import { productSchema, type Kategorie, type Product } from "@/types/product";

/**
 * Validates every registered product (see data/products/index.ts) once per
 * process and throws a readable message (file, path, reason) so broken data
 * never ships. No filesystem access – safe for Cloudflare Workers.
 */
let cache: Product[] | null = null;

export function validateProducts(entries: ReadonlyArray<readonly [string, unknown]>): Product[] {
  const products: Product[] = [];
  const errors: string[] = [];

  for (const [file, json] of entries) {
    const result = productSchema.safeParse(json);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${file}: ${issue.path.join(".") || "(root)"} – ${issue.message}`);
      }
      continue;
    }
    if (result.data.slug !== file.replace(/\.json$/, "")) {
      errors.push(`${file}: slug "${result.data.slug}" must match the file name`);
    }
    products.push(result.data);
  }

  const seen = new Map<string, string>();
  for (const p of products) {
    for (const key of [p.sku, p.slug]) {
      const prev = seen.get(key);
      if (prev) errors.push(`duplicate "${key}" in ${p.sku} and ${prev}`);
      seen.set(key, p.sku);
    }
  }
  for (const p of products) {
    if (p.bundle && !products.some((q) => q.sku === p.bundle?.mitSku)) {
      errors.push(`${p.sku}: bundle.mitSku "${p.bundle.mitSku}" does not exist`);
    }
  }

  if (errors.length) {
    throw new Error(`Product data validation failed:\n  - ${errors.join("\n  - ")}`);
  }
  if (products.length === 0) {
    throw new Error("No products registered in data/products/index.ts");
  }
  return products;
}

export function loadProducts(): Product[] {
  cache ??= validateProducts(rawProducts);
  return cache;
}

export function getActiveProducts(): Product[] {
  return loadProducts().filter((p) => p.aktiv);
}

export function getProductsByKategorie(kategorie: Kategorie): Product[] {
  return getActiveProducts().filter((p) => p.kategorie === kategorie);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getActiveProducts().find((p) => p.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return loadProducts().find((p) => p.sku === sku);
}

/** Full variant SKU, e.g. VP-MNT-BASE + PET -> VP-MNT-BASE-PET. */
export function variantSku(product: Pick<Product, "sku">, code: string | null): string {
  return code ? `${product.sku}-${code}` : product.sku;
}

/** Products shown as cross-sell: same category first, then the rest. */
export function getCrossSell(product: Product, limit = 4): Product[] {
  const all = getActiveProducts().filter((p) => p.sku !== product.sku);
  const same = all.filter((p) => p.kategorie === product.kategorie);
  const rest = all.filter((p) => p.kategorie !== product.kategorie);
  return [...same, ...rest].slice(0, limit);
}
