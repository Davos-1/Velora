"use client";

import type { VariantOption } from "@/types/product";
import { cn } from "@/lib/cn";

type Props = {
  options: VariantOption[];
  value: string;
  onChange: (code: string) => void;
};

export function SizeSelect({ options, value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-neutral">Grösse</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.code === value;
          return (
            <label
              key={opt.code}
              className={cn(
                "flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-(--radius-button) border px-4 text-sm font-medium",
                active ? "border-brand bg-brand text-surface" : "border-line bg-surface text-ink hover:border-neutral",
              )}
            >
              <input type="radio" name="groesse" value={opt.code} checked={active} onChange={() => onChange(opt.code)} className="sr-only" />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
