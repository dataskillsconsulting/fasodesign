import { useEffect, type RefObject } from "react";

const selector = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

let scrollLocks = 0;
let originalBodyOverflow = "";

export type FocusTrapOptions = {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onDismiss: () => void;
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function useFocusTrap({ open, containerRef, onDismiss, lockScroll = false, closeOnEscape = true, initialFocusRef, returnFocusRef }: FocusTrapOptions) {
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (lockScroll) {
      if (scrollLocks === 0) originalBodyOverflow = document.body.style.overflow;
      scrollLocks += 1;
      document.body.style.overflow = "hidden";
    }
    const frame = requestAnimationFrame(() => (initialFocusRef?.current ?? containerRef.current?.querySelector<HTMLElement>(selector) ?? containerRef.current)?.focus());
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && closeOnEscape) { event.preventDefault(); onDismiss(); return; }
      if (event.key !== "Tab") return;
      const elements = [...(containerRef.current?.querySelectorAll<HTMLElement>(selector) ?? [])];
      if (!elements.length) { event.preventDefault(); containerRef.current?.focus(); return; }
      const first = elements[0]; const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      if (lockScroll) {
        scrollLocks = Math.max(0, scrollLocks - 1);
        if (scrollLocks === 0) document.body.style.overflow = originalBodyOverflow;
      }
      (returnFocusRef?.current ?? previousFocus)?.focus();
    };
  }, [closeOnEscape, containerRef, initialFocusRef, lockScroll, onDismiss, open, returnFocusRef]);
}
