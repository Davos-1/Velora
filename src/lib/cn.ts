/** Minimal class-name joiner (avoids a dependency for a one-liner). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
