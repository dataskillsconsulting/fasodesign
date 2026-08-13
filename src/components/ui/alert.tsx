import {
  AlertCircle,
  CheckCircle2,
  CircleAlert,
  Info,
  X,
} from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const alertVariants = cva(
  "relative flex gap-3 rounded-md border p-4 text-sm [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        information: "border-information/25 bg-information/[0.07]",
        success: "border-success/25 bg-success/[0.07]",
        warning: "border-warning/35 bg-warning/[0.09]",
        destructive: "border-destructive/25 bg-destructive/[0.06]",
      },
    },
    defaultVariants: { variant: "information" },
  },
);

const defaultIcons = {
  information: Info,
  success: CheckCircle2,
  warning: CircleAlert,
  destructive: AlertCircle,
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> &
  VariantProps<typeof alertVariants> & {
    title: ReactNode;
    icon?: ReactNode;
    onDismiss?: () => void;
  };

export function Alert({
  className,
  title,
  icon,
  children,
  variant = "information",
  onDismiss,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? "information";
  const DefaultIcon = defaultIcons[resolvedVariant];

  return (
    <div
      className={cn(alertVariants({ variant: resolvedVariant }), className)}
      role={resolvedVariant === "destructive" ? "alert" : "status"}
      {...props}
    >
      <span className={cn("alert-icon", `alert-icon-${resolvedVariant}`)}>
        {icon ?? <DefaultIcon size={19} />}
      </span>
      <div className={cn("min-w-0", onDismiss && "pr-7")}>
        <strong className="block font-bold text-foreground">{title}</strong>
        {children ? <div className="mt-1 text-xs leading-5 text-muted-foreground">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button className="alert-dismiss" type="button" onClick={onDismiss} aria-label="Fermer le message">
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
