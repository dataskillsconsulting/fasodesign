import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { IconButton, Popover } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const weekdays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
const formatter = new Intl.DateTimeFormat("fr-BF", { month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("fr-BF", { dateStyle: "long" });

function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function startOfMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function addDays(date: Date, amount: number) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount); }
function clampDate(date: Date, min?: Date, max?: Date) { if (min && date < min) return min; if (max && date > max) return max; return date; }

export type CalendarProps = { value?: Date; onValueChange: (date: Date) => void; min?: Date; max?: Date; ariaLabel?: string };

export function Calendar({ value, onValueChange, min, max, ariaLabel = "Choisir une date" }: CalendarProps) {
  const initialDate = clampDate(value ?? new Date(), min, max);
  const [month, setMonth] = useState(() => startOfMonth(initialDate));
  const [focusedDate, setFocusedDate] = useState(initialDate);
  const gridId = useId();
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const offset = (month.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  useEffect(() => {
    if (!value) return;
    setFocusedDate(value);
    setMonth(startOfMonth(value));
  }, [value]);

  function focusDate(nextDate: Date) {
    const next = clampDate(nextDate, min, max);
    const key = `${next.getFullYear()}-${next.getMonth()}-${next.getDate()}`;
    setFocusedDate(next);
    setMonth(startOfMonth(next));
    buttonRefs.current.get(key)?.focus();
    requestAnimationFrame(() => buttonRefs.current.get(key)?.focus());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    let next: Date | undefined;
    if (event.key === "ArrowLeft") next = addDays(date, -1);
    else if (event.key === "ArrowRight") next = addDays(date, 1);
    else if (event.key === "ArrowUp") next = addDays(date, -7);
    else if (event.key === "ArrowDown") next = addDays(date, 7);
    else if (event.key === "Home") next = addDays(date, -((date.getDay() + 6) % 7));
    else if (event.key === "End") next = addDays(date, 6 - ((date.getDay() + 6) % 7));
    else if (event.key === "PageUp") next = new Date(date.getFullYear(), date.getMonth() - (event.shiftKey ? 12 : 1), date.getDate());
    else if (event.key === "PageDown") next = new Date(date.getFullYear(), date.getMonth() + (event.shiftKey ? 12 : 1), date.getDate());
    if (!next) return;
    event.preventDefault();
    focusDate(next);
  }

  return <div className="calendar" aria-label={ariaLabel}><header><IconButton label="Mois précédent" size="sm" onClick={() => focusDate(new Date(focusedDate.getFullYear(), focusedDate.getMonth() - 1, Math.min(focusedDate.getDate(), 28)))}><ChevronLeft /></IconButton><strong id={gridId}>{formatter.format(month)}</strong><IconButton label="Mois suivant" size="sm" onClick={() => focusDate(new Date(focusedDate.getFullYear(), focusedDate.getMonth() + 1, Math.min(focusedDate.getDate(), 28)))}><ChevronRight /></IconButton></header><div className="calendar-grid" aria-labelledby={gridId}>{weekdays.map((day) => <span aria-hidden="true" key={day}>{day}</span>)}{Array.from({ length: offset }, (_, index) => <i aria-hidden="true" key={`empty-${index}`} />)}{Array.from({ length: days }, (_, index) => { const date = new Date(month.getFullYear(), month.getMonth(), index + 1); const disabled = Boolean((min && date < min) || (max && date > max)); const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`; return <button ref={(node) => { if (node) buttonRefs.current.set(key, node); else buttonRefs.current.delete(key); }} type="button" key={key} disabled={disabled} tabIndex={!disabled && sameDay(date, focusedDate) ? 0 : -1} className={cn(value && sameDay(date, value) && "selected", sameDay(date, new Date()) && "today")} aria-label={dateFormatter.format(date)} aria-pressed={value ? sameDay(date, value) : false} onFocus={() => setFocusedDate(date)} onKeyDown={(event) => handleKeyDown(event, date)} onClick={() => onValueChange(date)}>{index + 1}</button>; })}</div></div>;
}

export type DatePickerProps = Omit<CalendarProps, "ariaLabel"> & { label?: string; placeholder?: string };

export function DatePicker({ value, onValueChange, min, max, label = "Choisir une date", placeholder = "Sélectionner une date" }: DatePickerProps) { return <Popover label={label} trigger={<button type="button" className="date-picker-trigger"><CalendarDays aria-hidden="true" />{value ? dateFormatter.format(value) : placeholder}</button>}><Calendar value={value} onValueChange={onValueChange} min={min} max={max} ariaLabel={label} /></Popover>; }
