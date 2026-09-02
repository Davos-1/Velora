import Link from "next/link";

/**
 * Cart link with badge. The count is wired up in stage 3 (client island);
 * for now it renders the static icon so layout and spacing are final.
 */
export function CartIcon() {
  const count = 0;
  return (
    <Link
      href="/warenkorb"
      aria-label={count > 0 ? `Warenkorb, ${count} Artikel` : "Warenkorb"}
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
      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-5 min-w-5 items-center justify-center rounded-(--radius-pill) bg-brand-dark px-1 text-[11px] leading-none font-medium text-surface">
          {count}
        </span>
      )}
    </Link>
  );
}
