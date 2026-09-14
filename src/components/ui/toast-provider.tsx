import { CheckCircle2, CircleAlert, Info, TriangleAlert, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ToastVariant = "information" | "success" | "warning" | "destructive";
export type ToastInput = { title: string; description?: string; variant?: ToastVariant; duration?: number };
type ToastItem = ToastInput & { id: number };
type ToastContextValue = { notify: (toast: ToastInput) => number; dismiss: (id: number) => void };
const ToastContext = createContext<ToastContextValue | null>(null);
let nextToastId = 0;
const icons = { information: Info, success: CheckCircle2, warning: TriangleAlert, destructive: CircleAlert };

export function ToastProvider({ children, max = 4 }: { children: ReactNode; max?: number }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);
  const notify = useCallback((input: ToastInput) => { const id = ++nextToastId; setToasts((current) => [...current, { ...input, id }].slice(-max)); if (input.duration !== 0) window.setTimeout(() => dismiss(id), input.duration ?? 5000); return id; }, [dismiss, max]);
  const context = useMemo(() => ({ notify, dismiss }), [dismiss, notify]);
  return <ToastContext.Provider value={context}>{children}<div className="toast-provider-viewport" aria-label="Notifications">{toasts.map((toast) => { const variant = toast.variant ?? "information"; const Icon = icons[variant]; return <div className={`toast-provider-item is-${variant}`} role={variant === "destructive" ? "alert" : "status"} key={toast.id}><Icon aria-hidden="true" /><div><strong>{toast.title}</strong>{toast.description ? <p>{toast.description}</p> : null}</div><button type="button" onClick={() => dismiss(toast.id)} aria-label={`Fermer ${toast.title}`}><X aria-hidden="true" /></button></div>; })}</div></ToastContext.Provider>;
}

export function useToast() { const context = useContext(ToastContext); if (!context) throw new Error("useToast doit être utilisé dans ToastProvider"); return context; }
