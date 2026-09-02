import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Centred content column with responsive horizontal padding. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-(--container-max) px-(--container-pad)", className)}
    >
      {children}
    </Tag>
  );
}
