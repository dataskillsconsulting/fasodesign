import { X } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useFocusTrap } from "@/lib/use-focus-trap";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  role?: "dialog" | "alertdialog";
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  initialFocusRef,
  returnFocusRef,
  role = "dialog",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ open, containerRef: panelRef, onDismiss: () => onOpenChange(false), lockScroll: true, closeOnEscape, initialFocusRef, returnFocusRef });

  if (!open) return null;
  return (
    <div className="dialog-layer">
      <button className="dialog-backdrop" type="button" onClick={() => closeOnBackdrop && onOpenChange(false)} aria-label="Fermer la fenêtre" tabIndex={closeOnBackdrop ? 0 : -1} />
      <div ref={panelRef} className="dialog-panel" role={role} aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1}>
        <Button className="dialog-close" size="icon-sm" variant="ghost" onClick={() => onOpenChange(false)} aria-label="Fermer"><X /></Button>
        <h2 id={titleId}>{title}</h2>
        {description ? <p id={descriptionId}>{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
