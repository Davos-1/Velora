"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  return (
    <div className="flex flex-col gap-3">
      <div className="card relative aspect-square overflow-hidden">
        <Image
          key={current}
          src={current}
          alt={`${alt} – Bild ${active + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto" aria-label="Weitere Bilder">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Bild ${i + 1} anzeigen`}
                aria-current={i === active}
                className={cn(
                  "relative block size-16 overflow-hidden rounded-(--radius-button) border bg-line",
                  i === active ? "border-brand" : "border-line hover:border-neutral",
                )}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
