import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type NavigationMenuItem = { label: string; href?: string; description?: string; icon?: ReactNode; children?: NavigationMenuItem[] };
export function NavigationMenu({ items, ariaLabel = "Navigation principale" }: { items: NavigationMenuItem[]; ariaLabel?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return <nav className="navigation-menu" aria-label={ariaLabel}><ul>{items.map((item) => <li key={item.label}>{item.children ? <><button type="button" aria-expanded={open === item.label} onClick={() => setOpen((value) => value === item.label ? null : item.label)}>{item.icon}{item.label}<ChevronDown /></button>{open === item.label ? <ul className="navigation-submenu">{item.children.map((child) => <li key={child.label}><a href={child.href}>{child.icon}<span><strong>{child.label}</strong>{child.description ? <small>{child.description}</small> : null}</span></a></li>)}</ul> : null}</> : <a href={item.href}>{item.icon}{item.label}</a>}</li>)}</ul></nav>;
}

export function PageHeader({ eyebrow, title, description, actions, breadcrumbs }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode; breadcrumbs?: ReactNode }) { return <header className="page-header">{breadcrumbs}<div><div>{eyebrow ? <span>{eyebrow}</span> : null}<h1>{title}</h1>{description ? <p>{description}</p> : null}</div>{actions ? <aside>{actions}</aside> : null}</div></header>; }
export function SectionHeader({ title, description, action, className }: { title: string; description?: string; action?: ReactNode; className?: string }) { return <header className={cn("section-header", className)}><div><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>{action}</header>; }
