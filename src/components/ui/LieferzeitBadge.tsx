import { cn } from "@/lib/cn";

export function LieferzeitBadge({ text, className }: { text: string; className?: string }) {
  const inStock = /lager/i.test(text);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-(--radius-pill) border px-2.5 py-1 text-xs font-medium",
        inStock ? "border-success/30 text-success" : "border-brand-dark/30 text-brand-dark",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", inStock ? "bg-success" : "bg-brand-dark")} />
      {text}
    </span>
  );
}
