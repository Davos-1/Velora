/**
 * CI/pre-commit check: every JSON in data/products must be registered in
 * data/products/index.ts and pass the zod schema.
 * Run with: pnpm validate:products
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { rawProducts } from "../data/products/index";
import { validateProducts } from "../src/lib/products";

const dir = join(process.cwd(), "data", "products");
const onDisk = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
const registered = rawProducts.map(([file]) => file).sort();

const missing = onDisk.filter((f) => !registered.includes(f));
const stale = registered.filter((f) => !onDisk.includes(f));
if (missing.length || stale.length) {
  console.error("data/products/index.ts is out of sync:");
  for (const f of missing) console.error(`  - not registered: ${f}`);
  for (const f of stale) console.error(`  - registered but missing on disk: ${f}`);
  process.exit(1);
}

const products = validateProducts(rawProducts);
console.log(`✓ ${products.length} products valid`);
