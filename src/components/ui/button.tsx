import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_1px_rgb(0_0_0/.15)] hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/75",
        outline:
          "border border-input bg-background text-foreground hover:border-primary/40 hover:bg-accent",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_1px_1px_rgb(0_0_0/.15)] hover:bg-destructive/90",
        link:
          "h-auto rounded-sm p-0 text-primary underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        sm: "h-9 px-3.5 text-sm [&_svg]:size-4",
        default: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-5 text-base [&_svg]:size-[1.125rem]",
        icon: "size-11 p-0 [&_svg]:size-[1.125rem]",
        "icon-sm": "size-9 p-0 [&_svg]:size-4",
        "icon-lg": "size-12 p-0 [&_svg]:size-5",
      },
      width: {
        auto: "",
        full: "w-full",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", className: "h-auto px-0" },
      { variant: "link", size: "default", className: "h-auto px-0" },
      { variant: "link", size: "lg", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "auto",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    loadingText?: ReactNode;
  };

export function Button({
  children,
  className,
  disabled,
  loading = false,
  loadingText,
  type = "button",
  variant,
  size,
  width,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, width }), className)}
      disabled={disabled || loading}
      type={type}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle aria-hidden="true" className="animate-spin" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
