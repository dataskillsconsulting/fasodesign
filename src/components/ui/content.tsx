import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Avatar({ name, src, size = "default" }: { name: string; src?: string; size?: "sm" | "default" | "lg" }) {
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  return <span className={cn("avatar", `avatar-${size}`)}>{src ? <img src={src} alt="" /> : initials}</span>;
}

export function Separator({ label }: { label?: string }) {
  return <div className="separator" role="separator">{label ? <span>{label}</span> : null}</div>;
}

export function DataList({ items }: { items: Array<{ label: string; value: ReactNode }> }) {
  return <dl className="data-list">{items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}

export function StatCard({ label, value, detail, icon }: { label: string; value: string; detail?: string; icon?: ReactNode }) {
  return <div className="stat-card">{icon ? <span>{icon}</span> : null}<div><small>{label}</small><strong>{value}</strong>{detail ? <p>{detail}</p> : null}</div></div>;
}
