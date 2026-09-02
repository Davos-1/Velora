"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { formatChf } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { ColorSwatches } from "./ColorSwatches";
import { SizeSelect } from "./SizeSelect";
import { BundleBox } from "./BundleBox";

type Props = {
  product: Product;
  /** Bundle partner (resolved server-side) with the computed set price. */
  bundle?: { partner: Product; setPrice: number };
};

/**
 * Client island for variant choice, bundle option and the (sticky) CTA.
 * Cart wiring lands in stage 3 – onAdd is a placeholder until then.
 */
export function ProductPurchase({ product, bundle }: Props) {
  const { typ, optionen } = product.varianten;
  const [variant, setVariant] = useState<string>(optionen[0]?.code ?? "");
  const [withBundle, setWithBundle] = useState(false);

  const price = withBundle && bundle ? bundle.setPrice : product.preisChf;
  const singlePrice = bundle ? product.preisChf + bundle.partner.preisChf : product.preisChf;

  function onAdd() {
    // TODO(stage 3): add { sku: product.sku, variant, withBundle } to the cart
  }

  return (
    <div className="flex flex-col gap-5">
      {typ === "farbe" && <ColorSwatches options={optionen} value={variant} onChange={setVariant} />}
      {typ === "groesse" && <SizeSelect options={optionen} value={variant} onChange={setVariant} />}

      {bundle && product.bundle && (
        <BundleBox
          partnerName={bundle.partner.name}
          rabattProzent={product.bundle.rabattProzent}
          singlePrice={singlePrice}
          bundlePrice={bundle.setPrice}
          checked={withBundle}
          onChange={setWithBundle}
        />
      )}

      {/* Sticky CTA bar on mobile, inline on desktop – the only brand CTA in the viewport */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur-sm md:static md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-(--container-max) items-center justify-between gap-4 md:justify-start">
          <p className="flex flex-col leading-tight">
            <span className="text-lg font-medium text-ink">{formatChf(price)}</span>
            <span className="text-xs text-neutral">inkl. MwSt., zzgl. Versand</span>
          </p>
          <Button onClick={onAdd} className="flex-1 md:flex-none md:min-w-56">
            In den Warenkorb
          </Button>
        </div>
      </div>
    </div>
  );
}
