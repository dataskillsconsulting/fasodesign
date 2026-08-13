import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--content-max-width)] px-[var(--page-gutter)]",
        className,
      )}
      {...props}
    />
  );
}
