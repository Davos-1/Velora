import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="max-w-2xl py-8 md:py-12">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-6 h-40 w-full rounded-(--radius-card)" />
    </Container>
  );
}
