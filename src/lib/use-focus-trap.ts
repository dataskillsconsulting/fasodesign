import { useEffect, type RefObject } from "react";

const selector = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function useFocusTrap({ open, containerRef, onDismiss, lockScroll = false }: { open: boolean; containerRef: RefObject<HTMLElement | null>; onDismiss: () => void; lockScroll?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => containerRef.current?.querySelector<HTMLElement>(selector)?.focus());
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onDismiss(); return; }
      if (event.key !== "Tab") return;
      const elements = [...(containerRef.current?.querySelectorAll<HTMLElement>(selector) ?? [])];
      if (!elements.length) { event.preventDefault(); containerRef.current?.focus(); return; }
      const first = elements[0]; const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("keydown", handleKeyDown); if (lockScroll) document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [containerRef, lockScroll, onDismiss, open]);
}
