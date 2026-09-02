"use client";

import type { VariantOption } from "@/types/product";
import { cn } from "@/lib/cn";

type Props = {
  options: VariantOption[];
  value: string;
  onChange: (code: string) => void;
};

export function ColorSwatches({ options, value, onChange }: Props) {
  const selected = options.find((o) => o.code === value);
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-neutral">
        Farbe: <span className="font-medium text-ink">{selected?.label}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.code === value;
          return (
            <label
              key={opt.code}
              title={opt.label}
              className={cn(
                "flex size-12 cursor-pointer items-center justify-center rounded-full",
                active && "ring-2 ring-brand ring-offset-2 ring-offset-paper",
              )}
            >
              <input
                type="radio"
                name="farbe"
                value={opt.code}
                checked={active}
                onChange={() => onChange(opt.code)}
                className="sr-only"
              />
              <span aria-hidden="true" className="block size-8 rounded-full border border-line" style={{ backgroundColor: opt.hex }} />
              <span className="sr-only">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
