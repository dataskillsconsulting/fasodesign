import { X } from "lucide-react";
import { useId, useRef, type ReactNode, type RefObject } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

export type DrawerProps = { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; side?: "left" | "right" | "bottom"; children?: ReactNode; footer?: ReactNode; closeOnBackdrop?: boolean; closeOnEscape?: boolean; initialFocusRef?: RefObject<HTMLElement | null>; returnFocusRef?: RefObject<HTMLElement | null> };

export function Drawer({ open, onOpenChange, title, description, side = "right", children, footer, closeOnBackdrop = true, closeOnEscape = true, initialFocusRef, returnFocusRef }: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ open, containerRef: panelRef, onDismiss: () => onOpenChange(false), lockScroll: true, closeOnEscape, initialFocusRef, returnFocusRef });

  if (!open) return null;
  return (
    <div className="drawer-layer">
      <button className="drawer-backdrop" type="button" onClick={() => closeOnBackdrop && onOpenChange(false)} aria-label="Fermer le panneau" tabIndex={closeOnBackdrop ? 0 : -1} />
      <div ref={panelRef} className={cn("drawer-panel", `drawer-${side}`)} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1}>
        <header><div><h2 id={titleId}>{title}</h2>{description ? <p id={descriptionId}>{description}</p> : null}</div><Button size="icon-sm" variant="ghost" onClick={() => onOpenChange(false)} aria-label="Fermer"><X /></Button></header>
        <div className="drawer-content">{children}</div>
        {footer ? <footer>{footer}</footer> : null}
      </div>
    </div>
  );
}
