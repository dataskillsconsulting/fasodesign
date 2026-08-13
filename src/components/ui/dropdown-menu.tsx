import { Check, ChevronRight } from "lucide-react";
import { cloneElement, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type ReactElement, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DropdownMenu({ trigger, label, align = "end", children }: { trigger: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>; label: string; align?: "start" | "end"; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  function focusTrigger() { rootRef.current?.querySelector<HTMLButtonElement>(":scope > button")?.focus(); }

  function focusItem(index: number) {
    const items = [...(rootRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']:not([aria-disabled='true'])") ?? [])];
    items[(index + items.length) % items.length]?.focus();
  }

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [open]);

  function handleMenuKeyDown(event: ReactKeyboardEvent) {
    const items = [...(rootRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']:not([aria-disabled='true'])") ?? [])];
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown") { event.preventDefault(); focusItem(index + 1); }
    else if (event.key === "ArrowUp") { event.preventDefault(); focusItem(index - 1); }
    else if (event.key === "Home") { event.preventDefault(); focusItem(0); }
    else if (event.key === "End") { event.preventDefault(); focusItem(items.length - 1); }
    else if (event.key === "Escape") { setOpen(false); focusTrigger(); }
    else if (event.key === "Tab") setOpen(false);
  }

  const triggerElement = cloneElement(trigger, {
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": open ? menuId : undefined,
    onClick: (event) => { trigger.props.onClick?.(event); setOpen((value) => !value); },
    onKeyDown: (event) => {
      trigger.props.onKeyDown?.(event);
      if (["ArrowDown", "ArrowUp"].includes(event.key)) { event.preventDefault(); setOpen(true); requestAnimationFrame(() => focusItem(event.key === "ArrowUp" ? -1 : 0)); }
    },
  });

  return <div className="dropdown-root" ref={rootRef}>{triggerElement}{open ? <div id={menuId} role="menu" aria-label={label} className={cn("dropdown-panel", `dropdown-${align}`)} onKeyDown={handleMenuKeyDown} onClick={(event) => { const item = (event.target as HTMLElement).closest<HTMLElement>("[role='menuitem']"); if (item && item.getAttribute("aria-disabled") !== "true") setOpen(false); }}>{children}</div> : null}</div>;
}

export function DropdownMenuItem({ children, icon, destructive, selected, disabled, onSelect }: { children: ReactNode; icon?: ReactNode; destructive?: boolean; selected?: boolean; disabled?: boolean; onSelect?: () => void }) {
  return <button type="button" role="menuitem" tabIndex={-1} aria-disabled={disabled || undefined} className={cn("dropdown-item", destructive && "destructive")} onClick={() => { if (!disabled) onSelect?.(); }}>{icon}<span>{children}</span>{selected ? <Check className="dropdown-check" aria-hidden="true" /> : null}</button>;
}

export function DropdownMenuLabel({ children }: { children: ReactNode }) { return <div className="dropdown-label">{children}</div>; }
export function DropdownMenuSeparator() { return <div className="dropdown-separator" role="separator" />; }
export function DropdownMenuSubLabel({ children }: { children: ReactNode }) { return <span className="dropdown-sub-label">{children}<ChevronRight aria-hidden="true" /></span>; }
