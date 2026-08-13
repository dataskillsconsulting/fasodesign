import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailing?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, leadingIcon, trailing, ...props }, ref) => (
    <div className="relative">
      {leadingIcon ? (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground [&_svg]:size-4">
          {leadingIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-background px-3.5 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-75",
          leadingIcon && "pl-10",
          trailing && "pr-12",
          invalid && "border-destructive focus:border-destructive focus:ring-destructive/15",
          className,
        )}
        {...props}
      />
      {trailing ? (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-muted-foreground [&_svg]:size-4">
          {trailing}
        </span>
      ) : null}
    </div>
  ),
);
Input.displayName = "Input";

export type FieldProps = InputProps & {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

export function Field({
  id: providedId,
  label,
  hint,
  error,
  optional = false,
  required,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = hint || error ? `${id}-description` : undefined;

  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={id}>{label}</label>
        {optional ? <span>Facultatif</span> : null}
      </div>
      <Input
        id={id}
        required={required}
        invalid={Boolean(error)}
        aria-describedby={descriptionId}
        {...props}
      />
      {error ? (
        <p className="field-message error" id={descriptionId}>{error}</p>
      ) : hint ? (
        <p className="field-message" id={descriptionId}>{hint}</p>
      ) : null}
    </div>
  );
}
