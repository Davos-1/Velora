"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

/** Header cart link with live item badge (client island). */
export function CartIcon() {
  const { count, ready } = useCart();
  const shown = ready ? count : 0;
  return (
    <Link
      href="/warenkorb"
      aria-label={shown > 0 ? `Warenkorb, ${shown} Artikel` : "Warenkorb"}
      className="relative flex size-12 items-center justify-center rounded-(--radius-button) text-ink transition-colors duration-(--duration-fast) hover:text-brand-dark"
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 7h12l-1 12H7L6 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
      {shown > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 flex h-5 min-w-5 items-center justify-center rounded-(--radius-pill) bg-brand-dark px-1 text-[11px] leading-none font-medium text-surface"
        >
          {shown}
        </span>
      )}
    </Link>
  );
}
