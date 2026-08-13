import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 border font-bold leading-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-muted text-muted-foreground",
        primary: "border-transparent bg-primary/10 text-primary",
        success: "border-transparent bg-success/12 text-success",
        warning: "border-transparent bg-warning/18 text-warning-foreground",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        information: "border-transparent bg-information/15 text-information-foreground",
        outline: "border-border bg-background text-foreground",
      },
      size: {
        sm: "rounded-md px-2 py-0.5 text-[10px] [&_svg]:size-3",
        default: "rounded-md px-2.5 py-1 text-[11px] [&_svg]:size-3",
      },
    },
    defaultVariants: { variant: "neutral", size: "default" },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
