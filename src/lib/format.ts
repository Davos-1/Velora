/**
 * Swiss price format: "CHF 29.–" for whole francs, "CHF 29.90" otherwise.
 * Thousands are separated with an apostrophe (CHF 1'290.–).
 */
export function formatChf(amount: number): string {
  const rounded = Math.round(amount * 20) / 20; // 5 Rappen
  const francs = Math.floor(rounded);
  const rappen = Math.round((rounded - francs) * 100);
  const francsStr = francs.toLocaleString("de-CH").replace(/’|’/g, "'");
  return rappen === 0 ? `CHF ${francsStr}.–` : `CHF ${francsStr}.${String(rappen).padStart(2, "0")}`;
}
