import { X } from "lucide-react";
import { useId, useRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

export function Drawer({ open, onOpenChange, title, description, side = "right", children, footer }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; side?: "left" | "right" | "bottom"; children?: ReactNode; footer?: ReactNode }) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ open, containerRef: panelRef, onDismiss: () => onOpenChange(false), lockScroll: true });

  if (!open) return null;
  return (
    <div className="drawer-layer">
      <button className="drawer-backdrop" type="button" onClick={() => onOpenChange(false)} aria-label="Fermer le panneau" />
      <div ref={panelRef} className={cn("drawer-panel", `drawer-${side}`)} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined}>
        <header><div><h2 id={titleId}>{title}</h2>{description ? <p id={descriptionId}>{description}</p> : null}</div><Button size="icon-sm" variant="ghost" onClick={() => onOpenChange(false)} aria-label="Fermer"><X /></Button></header>
        <div className="drawer-content">{children}</div>
        {footer ? <footer>{footer}</footer> : null}
      </div>
    </div>
  );
}
