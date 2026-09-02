import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type Props = { title: string; lead?: string; children: ReactNode };

/** Narrow text layout for content and legal pages. */
export function ContentPage({ title, lead, children }: Props) {
  return (
    <Container className="max-w-3xl py-8 md:py-12">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: title }]} />
      <h1 className="mt-4">{title}</h1>
      {lead && <p className="mt-3 text-lg text-neutral">{lead}</p>}
      <div className="prose-content mt-8">{children}</div>
    </Container>
  );
}
