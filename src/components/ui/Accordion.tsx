import type { ReactNode } from "react";

export type AccordionItem = { title: string; content: ReactNode };

/** Native <details> accordion – accessible without JavaScript. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.title}
            <svg
              aria-hidden="true"
              className="size-5 shrink-0 transition-transform duration-(--duration-base) group-open:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="pb-4 text-sm text-ink/80">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
