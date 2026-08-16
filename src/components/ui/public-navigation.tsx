import { ArrowLeft, Check, ChevronRight, Languages } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SkipLink({ href = "#contenu", children = "Aller au contenu principal" }: { href?: string; children?: ReactNode }) { return <a className="skip-link" href={href}>{children}</a>; }

export function BackLink({ href, onClick, children = "Retour" }: { href?: string; onClick?: MouseEventHandler<HTMLAnchorElement>; children?: ReactNode }) { return <a className="back-link" href={href ?? "#"} onClick={onClick}><ArrowLeft aria-hidden="true" />{children}</a>; }

export type SideNavigationItem = { label: string; href: string; current?: boolean; children?: SideNavigationItem[] };
export function SideNavigation({ items, label = "Navigation secondaire" }: { items: SideNavigationItem[]; label?: string }) {
  function renderItems(entries: SideNavigationItem[]) { return <ul>{entries.map((item) => <li key={item.href}><a href={item.href} aria-current={item.current ? "page" : undefined}>{item.label}</a>{item.children?.length ? renderItems(item.children) : null}</li>)}</ul>; }
  return <nav className="side-navigation" aria-label={label}>{renderItems(items)}</nav>;
}

export type LanguageOption = { code: string; label: string; href?: string };
export function LanguageSwitcher({ languages, value, onValueChange, label = "Choisir la langue" }: { languages: LanguageOption[]; value: string; onValueChange?: (code: string) => void; label?: string }) {
  return <div className="language-switcher"><Languages aria-hidden="true" /><span className="sr-only">{label}</span>{languages.map((language) => language.href ? <a key={language.code} href={language.href} hrefLang={language.code} lang={language.code} aria-current={language.code === value ? "true" : undefined}>{language.label}</a> : <button key={language.code} type="button" lang={language.code} aria-pressed={language.code === value} onClick={() => onValueChange?.(language.code)}>{language.label}{language.code === value ? <Check aria-hidden="true" /> : null}</button>)}</div>;
}

export type AnchorNavigationItem = { id: string; label: string };
export function AnchorNavigation({ items, activeId, label = "Sommaire de la page" }: { items: AnchorNavigationItem[]; activeId?: string; label?: string }) {
  return <nav className="anchor-navigation" aria-label={label}><strong>Sur cette page</strong><ol>{items.map((item) => <li key={item.id}><a href={`#${item.id}`} className={cn(activeId === item.id && "active")} aria-current={activeId === item.id ? "location" : undefined}>{item.label}<ChevronRight aria-hidden="true" /></a></li>)}</ol></nav>;
}
