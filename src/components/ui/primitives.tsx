import { Search, X } from "lucide-react";
import { cloneElement, forwardRef, useEffect, useId, useRef, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type LabelHTMLAttributes, type ReactElement, type ReactNode } from "react";

import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Link = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & Pick<ButtonProps, "variant" | "size">>(({ className, variant = "link", size = "default", ...props }, ref) => <a ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />);
Link.displayName = "Link";

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { label: string; size?: "sm" | "default" | "lg" }>(({ label, size = "default", className, type = "button", ...props }, ref) => <button ref={ref} type={type} aria-label={label} className={cn("icon-control", `icon-control-${size}`, className)} {...props} />);
IconButton.displayName = "IconButton";

export function Label({ optional, children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { optional?: boolean }) { return <div className="form-label-row"><label className={className} {...props}>{children}</label>{optional ? <span>Facultatif</span> : null}</div>; }
export function FormMessage({ error, children, id }: { error?: boolean; children: ReactNode; id?: string }) { return <p id={id} className={cn("form-message", error && "error")} role={error ? "alert" : undefined}>{children}</p>; }
export function FormField({ label, hint, error, optional, required, children }: { label: string; hint?: string; error?: string; optional?: boolean; required?: boolean; children: ReactElement<{ id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }> }) {
  const generatedId = useId();
  const id = children.props.id ?? generatedId;
  const messageId = hint || error ? `${id}-message` : undefined;
  return <div className="form-field"><Label htmlFor={id} optional={optional}>{label}{required ? <span aria-hidden="true"> *</span> : null}</Label>{cloneElement(children, { id, "aria-describedby": messageId, "aria-invalid": Boolean(error) || undefined })}{error ? <FormMessage id={messageId} error>{error}</FormMessage> : hint ? <FormMessage id={messageId}>{hint}</FormMessage> : null}</div>;
}

export function Popover({ trigger, children, align = "start", label }: { trigger: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>; children: ReactNode; align?: "start" | "end"; label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useEffect(() => {
    if (!open) return;
    function close(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    function key(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); rootRef.current?.querySelector<HTMLButtonElement>(":scope > button")?.focus(); } }
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", key); };
  }, [open]);
  return <div className="popover-root" ref={rootRef}>{cloneElement(trigger, { "aria-expanded": open, "aria-controls": open ? panelId : undefined, onClick: (event) => { trigger.props.onClick?.(event); setOpen((value) => !value); } })}{open ? <div id={panelId} className={cn("popover-panel", `popover-${align}`)} role="dialog" aria-label={label}>{children}</div> : null}</div>;
}

export type SearchOption = { value: string; label: string; description?: string; keywords?: string[] };
export function SearchBox({ options, onSelect, placeholder = "Rechercher…", emptyText = "Aucun résultat" }: { options: SearchOption[]; onSelect: (option: SearchOption) => void; placeholder?: string; emptyText?: string }) {
  const [query, setQuery] = useState(""); const [active, setActive] = useState(0); const listId = useId();
  const normalized = query.trim().toLocaleLowerCase("fr");
  const results = normalized ? options.filter((option) => [option.label, option.description, ...(option.keywords ?? [])].filter(Boolean).join(" ").toLocaleLowerCase("fr").includes(normalized)) : options;
  function choose(index: number) { const option = results[index]; if (option) { onSelect(option); setQuery(option.label); } }
  return <div className="command-search"><div><Search aria-hidden="true" /><input role="combobox" aria-expanded={Boolean(query)} aria-controls={query ? listId : undefined} aria-autocomplete="list" aria-activedescendant={query && results[active] ? `${listId}-${active}` : undefined} value={query} placeholder={placeholder} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)); } else if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); } else if (event.key === "Enter") { event.preventDefault(); choose(active); } else if (event.key === "Escape") setQuery(""); }} />{query ? <button type="button" onClick={() => setQuery("")} aria-label="Effacer la recherche"><X /></button> : null}</div>{query ? <div id={listId} role="listbox">{results.length ? results.map((option, index) => <button type="button" role="option" aria-selected={index === active} id={`${listId}-${index}`} key={option.value} onMouseEnter={() => setActive(index)} onClick={() => choose(index)}><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</button>) : <p>{emptyText}</p>}</div> : null}</div>;
}
