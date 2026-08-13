import { Check, ChevronDown } from "lucide-react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full resize-y rounded-md border border-input bg-background px-3.5 py-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-75",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-md border border-input bg-background px-3.5 pr-10 text-sm outline-none transition-[border-color,box-shadow] hover:border-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-75",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  ),
);
Select.displayName = "Select";

export function Checkbox({
  className,
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("choice-control", className)}>
      <span className="checkbox-box">
        <input type="checkbox" {...props} />
        <Check aria-hidden="true" />
      </span>
      <span>{children}</span>
    </label>
  );
}

export function Radio({
  className,
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("choice-control", className)}>
      <span className="radio-box"><input type="radio" {...props} /><i /></span>
      <span>{children}</span>
    </label>
  );
}

export function Switch({
  className,
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("switch-control", className)}>
      <span>{children}</span>
      <span className="switch-track"><input type="checkbox" role="switch" {...props} /><i /></span>
    </label>
  );
}
