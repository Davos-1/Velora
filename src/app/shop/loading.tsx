import { Container } from "@/components/layout/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-8 md:py-12">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-4 h-8 w-56" />
      <div className="mt-8">
        <ProductGridSkeleton />
      </div>
    </Container>
  );
}
