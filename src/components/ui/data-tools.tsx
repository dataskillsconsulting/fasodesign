import { Filter, LoaderCircle, X } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ResponsiveTableColumn<T> = { key: string; header: string; cell: (row: T) => ReactNode; mobileLabel?: string; primary?: boolean };
export type ResponsiveTableProps<T> = { data: T[]; columns: ResponsiveTableColumn<T>[]; getRowKey: (row: T) => string; caption: string; emptyText?: string };
export function ResponsiveTable<T>({ data, columns, getRowKey, caption, emptyText = "Aucun résultat" }: ResponsiveTableProps<T>) {
  if (!data.length) return <div className="responsive-table-empty" role="status">{emptyText}</div>;
  return <div className="responsive-table"><table><caption>{caption}</caption><thead><tr>{columns.map((column) => <th key={column.key}>{column.header}</th>)}</tr></thead><tbody>{data.map((row) => <tr key={getRowKey(row)}>{columns.map((column) => <td key={column.key}>{column.cell(row)}</td>)}</tr>)}</tbody></table><ul aria-label={caption}>{data.map((row) => <li key={getRowKey(row)}>{columns.map((column) => <div key={column.key} className={column.primary ? "is-primary" : undefined}><span>{column.mobileLabel ?? column.header}</span><strong>{column.cell(row)}</strong></div>)}</li>)}</ul></div>;
}

export type ActiveFilter = { id: string; label: string; value: string };
export function FilterPanel({ children, activeFilters = [], onRemoveFilter, onReset, title = "Filtrer les résultats" }: { children: ReactNode; activeFilters?: ActiveFilter[]; onRemoveFilter?: (id: string) => void; onReset?: () => void; title?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <><Button className="filter-mobile-trigger" variant="outline" onClick={() => setMobileOpen(true)}><Filter aria-hidden="true" />Filtres{activeFilters.length ? ` (${activeFilters.length})` : ""}</Button>{mobileOpen ? <button type="button" className="filter-panel-backdrop" aria-label="Fermer les filtres" onClick={() => setMobileOpen(false)} /> : null}<aside className={cn("filter-panel", mobileOpen && "is-mobile-open")} aria-label={title}><header><h2>{title}</h2><div>{onReset && activeFilters.length ? <button type="button" onClick={onReset}>Réinitialiser</button> : null}<button type="button" className="filter-panel-close" onClick={() => setMobileOpen(false)} aria-label="Fermer les filtres"><X aria-hidden="true" /></button></div></header><div className="filter-panel-fields">{children}</div>{activeFilters.length ? <div className="filter-panel-active" aria-label="Filtres actifs">{activeFilters.map((filter) => <button type="button" key={filter.id} onClick={() => onRemoveFilter?.(filter.id)} aria-label={`Retirer le filtre ${filter.label} : ${filter.value}`}><span>{filter.label} : {filter.value}</span><X aria-hidden="true" /></button>)}{onReset ? <button type="button" className="filter-reset" onClick={onReset}>Tout effacer</button> : null}</div> : null}<footer><Button width="full" onClick={() => setMobileOpen(false)}>Afficher les résultats</Button></footer></aside></>;
}

export function BulkActions({ count, children, onClear, label = "Éléments sélectionnés" }: { count: number; children: ReactNode; onClear?: () => void; label?: string }) {
  if (!count) return null;
  return <div className="bulk-actions" role="region" aria-label={label}><strong>{count} sélectionné{count > 1 ? "s" : ""}</strong><div>{children}</div>{onClear ? <button type="button" onClick={onClear}>Désélectionner tout</button> : null}</div>;
}

export function ResultCount({ count, label = "résultat", loading }: { count: number; label?: string; loading?: boolean }) { return <p className="result-count" role="status" aria-live="polite">{loading ? "Mise à jour des résultats…" : `${count} ${label}${count > 1 ? "s" : ""}`}</p>; }

export function LoadingOverlay({ loading, label = "Chargement en cours", children, className }: { loading: boolean; label?: string; children: ReactNode; className?: string }) {
  const id = useId();
  return <div className={cn("loading-overlay", className)} aria-busy={loading} aria-describedby={loading ? id : undefined}>{children}{loading ? <div className="loading-overlay-indicator" id={id} role="status"><LoaderCircle aria-hidden="true" /><span>{label}</span></div> : null}</div>;
}
