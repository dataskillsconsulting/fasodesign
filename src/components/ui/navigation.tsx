import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Fil d’Ariane">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={item.label}>
            {index ? <ChevronRight aria-hidden="true" /> : null}
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Tabs({
  items,
  value,
  onValueChange,
}: {
  items: Array<{ value: string; label: string; content: ReactNode }>;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const activeItem = items.find((item) => item.value === value) ?? items[0];
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : event.key === "ArrowRight" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
    onValueChange(items[nextIndex].value);
    document.getElementById(`tab-${items[nextIndex].value}`)?.focus();
  }
  return (
    <div>
      <div className="tabs-list" role="tablist">
        {items.map((item, index) => (
          <button
            key={item.value}
            id={`tab-${item.value}`}
            role="tab"
            aria-selected={value === item.value}
            aria-controls={`panel-${item.value}`}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            tabIndex={value === item.value ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs-panel" id={`panel-${activeItem.value}`} role="tabpanel" aria-labelledby={`tab-${activeItem.value}`}>
        {activeItem.content}
      </div>
    </div>
  );
}

export function Pagination({ page = 2, total = 5 }: { page?: number; total?: number }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <Button variant="outline" size="icon-sm" aria-label="Page précédente"><ChevronLeft /></Button>
      {Array.from({ length: total }, (_, index) => index + 1).map((item) => (
        <button className={cn("page-button", item === page && "active")} aria-current={item === page ? "page" : undefined} key={item}>{item}</button>
      ))}
      <Button variant="outline" size="icon-sm" aria-label="Page suivante"><ChevronRight /></Button>
    </nav>
  );
}

export function Progress({ value, label }: { value: number; label?: string }) {
  return (
    <div className="progress-wrap">
      {label ? <div><span>{label}</span><strong>{value} %</strong></div> : null}
      <div className="progress-track" role="progressbar" aria-label={label ?? "Progression"} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton", className)} aria-hidden="true" {...props} />;
}
