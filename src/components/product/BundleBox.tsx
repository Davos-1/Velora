"use client";

import { formatChf } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  partnerName: string;
  rabattProzent: number;
  singlePrice: number;
  bundlePrice: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function BundleBox({ partnerName, rabattProzent, singlePrice, bundlePrice, checked, onChange }: Props) {
  return (
    <label
      className={cn(
        "card flex cursor-pointer items-start gap-3 p-4 transition-colors",
        checked ? "border-brand" : "hover:border-neutral",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-brand"
      />
      <span className="flex-1">
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium text-ink">Als Set mit {partnerName}</span>
          <span className="rounded-(--radius-pill) bg-brand-dark px-2 py-0.5 text-xs font-medium text-surface">
            −{rabattProzent}%
          </span>
        </span>
        <span className="mt-1 block text-sm text-neutral">
          Set-Preis {formatChf(bundlePrice)} statt {formatChf(singlePrice)}
        </span>
      </span>
    </label>
  );
}
