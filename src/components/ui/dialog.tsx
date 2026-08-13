import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useFocusTrap } from "@/lib/use-focus-trap";

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ open, containerRef: panelRef, onDismiss: () => onOpenChange(false), lockScroll: true });

  if (!open) return null;
  return (
    <div className="dialog-layer">
      <button className="dialog-backdrop" onClick={() => onOpenChange(false)} aria-label="Fermer la fenêtre" />
      <div ref={panelRef} className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined}>
        <Button className="dialog-close" size="icon-sm" variant="ghost" onClick={() => onOpenChange(false)} aria-label="Fermer"><X /></Button>
        <h2 id={titleId}>{title}</h2>
        {description ? <p id={descriptionId}>{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
