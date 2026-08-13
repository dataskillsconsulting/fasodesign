import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "center" | "right";
  className?: string;
};

export type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  data: T[];
  getRowKey: (row: T) => string;
  caption?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  loading?: boolean;
  selectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  sort?: { key: string; direction: "asc" | "desc" } | null;
  onSortChange?: (sort: { key: string; direction: "asc" | "desc" }) => void;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
};

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  caption,
  emptyTitle = "Aucune donnée",
  emptyDescription = "Aucun élément ne correspond à cette liste.",
  loading = false,
  selectedKeys,
  onSelectedKeysChange,
  sort: controlledSort,
  onSortChange,
  page = 1,
  pageSize,
  totalItems,
  onPageChange,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const sort = controlledSort === undefined ? internalSort : controlledSort;
  const activeColumn = sort ? columns.find((column) => column.key === sort.key) : undefined;
  const rows = activeColumn?.sortValue
    ? [...data].sort((a, b) => {
        const left = activeColumn.sortValue?.(a) ?? "";
        const right = activeColumn.sortValue?.(b) ?? "";
        const result = typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right), "fr", { numeric: true });
        return sort?.direction === "desc" ? -result : result;
      })
    : data;

  function toggleSort(key: string) {
    const next = sort?.key === key ? { key, direction: sort.direction === "asc" ? "desc" as const : "asc" as const } : { key, direction: "asc" as const };
    if (controlledSort === undefined) setInternalSort(next);
    onSortChange?.(next);
  }

  const selectable = Boolean(selectedKeys && onSelectedKeysChange);
  const visibleKeys = rows.map(getRowKey);
  const allSelected = visibleKeys.length > 0 && visibleKeys.every((key) => selectedKeys?.includes(key));
  const pages = pageSize ? Math.max(1, Math.ceil((totalItems ?? data.length) / pageSize)) : 1;

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>{selectable ? <th className="data-table-select"><input type="checkbox" aria-label="Sélectionner toutes les lignes" checked={allSelected} onChange={() => onSelectedKeysChange?.(allSelected ? (selectedKeys ?? []).filter((key) => !visibleKeys.includes(key)) : [...new Set([...(selectedKeys ?? []), ...visibleKeys])])} /></th> : null}{columns.map((column) => {
            const sortable = Boolean(column.sortValue);
            const direction = sort?.key === column.key ? sort.direction : undefined;
            const SortIcon = direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ArrowUpDown;
            return (
              <th key={column.key} className={cn(`is-${column.align ?? "left"}`, column.className)} aria-sort={direction ? (direction === "asc" ? "ascending" : "descending") : undefined}>
                {sortable ? <button type="button" onClick={() => toggleSort(column.key)}>{column.header}<SortIcon aria-hidden="true" /></button> : column.header}
              </th>
            );
          })}</tr>
        </thead>
        <tbody>
          {loading ? <tr><td className="data-table-empty" colSpan={columns.length + (selectable ? 1 : 0)} aria-live="polite"><strong>Chargement des données…</strong></td></tr> : rows.length ? rows.map((row) => { const key = getRowKey(row); const selected = selectedKeys?.includes(key) ?? false; return (
            <tr key={key} data-selected={selected || undefined}>{selectable ? <td className="data-table-select"><input type="checkbox" aria-label={`Sélectionner la ligne ${key}`} checked={selected} onChange={() => onSelectedKeysChange?.(selected ? (selectedKeys ?? []).filter((item) => item !== key) : [...(selectedKeys ?? []), key])} /></td> : null}{columns.map((column) => <td key={column.key} className={cn(`is-${column.align ?? "left"}`, column.className)}>{column.cell(row)}</td>)}</tr>
          ); }) : <tr><td className="data-table-empty" colSpan={columns.length + (selectable ? 1 : 0)}><strong>{emptyTitle}</strong><span>{emptyDescription}</span></td></tr>}
        </tbody>
      </table>
      {pageSize && pages > 1 ? <nav className="data-table-pagination" aria-label="Pagination du tableau"><button type="button" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>Précédent</button><span>Page {page} sur {pages}</span><button type="button" disabled={page >= pages} onClick={() => onPageChange?.(page + 1)}>Suivant</button></nav> : null}
    </div>
  );
}
