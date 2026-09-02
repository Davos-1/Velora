import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { KATEGORIEN } from "@/types/product";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const statics = ["", "/shop", "/ueber-uns", "/versand", "/kontakt"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const cats = KATEGORIEN.map((k) => ({ url: `${base}/shop/${k}`, changeFrequency: "weekly" as const, priority: 0.8 }));
  const products = getActiveProducts().map((p) => ({
    url: `${base}/shop/${p.kategorie}/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  return [...statics, ...cats, ...products];
}
