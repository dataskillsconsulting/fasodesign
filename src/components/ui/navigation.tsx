import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";

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

export type TabsProps = {
  items: Array<{ value: string; label: string; content: ReactNode; disabled?: boolean }>;
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel?: string;
};

export function Tabs({
  items,
  value,
  onValueChange,
  ariaLabel = "Onglets",
}: TabsProps) {
  const instanceId = useId();
  const idFor = (kind: "tab" | "panel", itemValue: string) => `${instanceId}-${kind}-${itemValue}`;
  const activeItem = items.find((item) => item.value === value) ?? items[0];
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const enabledIndexes = items.map((item, itemIndex) => item.disabled ? -1 : itemIndex).filter((itemIndex) => itemIndex >= 0);
    const position = enabledIndexes.indexOf(index);
    const nextIndex = event.key === "Home" ? enabledIndexes[0] : event.key === "End" ? enabledIndexes.at(-1)! : event.key === "ArrowRight" ? enabledIndexes[(position + 1) % enabledIndexes.length] : enabledIndexes[(position - 1 + enabledIndexes.length) % enabledIndexes.length];
    onValueChange(items[nextIndex].value);
    document.getElementById(idFor("tab", items[nextIndex].value))?.focus();
  }
  return (
    <div>
      <div className="tabs-list" role="tablist" aria-label={ariaLabel}>
        {items.map((item, index) => (
          <button
            key={item.value}
            id={idFor("tab", item.value)}
            role="tab"
            aria-selected={value === item.value}
            aria-controls={idFor("panel", item.value)}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            tabIndex={value === item.value ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs-panel" id={idFor("panel", activeItem.value)} role="tabpanel" aria-labelledby={idFor("tab", activeItem.value)} tabIndex={0}>
        {activeItem.content}
      </div>
    </div>
  );
}

export type PaginationProps = {
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  ariaLabel?: string;
};

function paginationItems(page: number, total: number, siblingCount: number): Array<number | "ellipsis-start" | "ellipsis-end"> {
  if (total <= siblingCount * 2 + 5) return Array.from({ length: total }, (_, index) => index + 1);
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(total - 1, page + siblingCount);
  return [1, ...(start > 2 ? ["ellipsis-start" as const] : []), ...Array.from({ length: end - start + 1 }, (_, index) => start + index), ...(end < total - 1 ? ["ellipsis-end" as const] : []), total];
}

export function Pagination({ page, total, onPageChange, siblingCount = 1, ariaLabel = "Pagination" }: PaginationProps) {
  const safeTotal = Math.max(1, total);
  const safePage = Math.min(safeTotal, Math.max(1, page));
  const items = paginationItems(safePage, safeTotal, Math.max(0, siblingCount));
  return (
    <nav className="pagination" aria-label={ariaLabel}>
      <Button variant="outline" size="icon-sm" aria-label="Page précédente" disabled={safePage === 1} onClick={() => onPageChange?.(safePage - 1)}><ChevronLeft /></Button>
      {items.map((item) => typeof item === "number" ? (
        <button type="button" className={cn("page-button", item === safePage && "active")} aria-current={item === safePage ? "page" : undefined} aria-label={`Page ${item}`} onClick={() => onPageChange?.(item)} key={item}>{item}</button>
      ) : (
        <span aria-hidden="true" className="pagination-ellipsis" key={item}>…</span>
      ))}
      <Button variant="outline" size="icon-sm" aria-label="Page suivante" disabled={safePage === safeTotal} onClick={() => onPageChange?.(safePage + 1)}><ChevronRight /></Button>
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
