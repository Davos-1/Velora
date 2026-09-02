import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

/**
 * Tiny markdown subset for product copy: paragraphs, "- " bullet lists and
 * **bold**. Deliberately small – no dependency, no raw HTML.
 */
export function renderMarkdown(md: string): ReactNode {
  const blocks = md.trim().split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const lines = block.split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      return createElement(
        "ul",
        { key: i, className: "list-disc space-y-1 pl-5" },
        lines.map((l, j) => createElement("li", { key: j }, inline(l.slice(2)))),
      );
    }
    return createElement("p", { key: i }, inline(lines.join(" ")));
  });
}

function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return createElement(
    Fragment,
    null,
    parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? createElement("strong", { key: i, className: "font-medium text-ink" }, part.slice(2, -2))
        : part,
    ),
  );
}
