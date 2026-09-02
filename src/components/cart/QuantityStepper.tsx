"use client";

import { MAX_QTY } from "@/lib/cart";

type Props = { value: number; onChange: (qty: number) => void; label: string };

export function QuantityStepper({ value, onChange, label }: Props) {
  const btn =
    "flex size-12 items-center justify-center text-lg text-ink transition-colors hover:bg-line disabled:opacity-40 disabled:hover:bg-transparent";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-(--radius-button) border border-line bg-surface" role="group" aria-label={`Menge für ${label}`}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="Menge verringern">
        −
      </button>
      <output className="min-w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Menge erhöhen">
        +
      </button>
    </div>
  );
}
