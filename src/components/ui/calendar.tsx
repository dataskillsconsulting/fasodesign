import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { IconButton, Popover } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const weekdays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
const formatter = new Intl.DateTimeFormat("fr-BF", { month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("fr-BF", { dateStyle: "long" });
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

export function Calendar({ value, onValueChange, min, max }: { value?: Date; onValueChange: (date: Date) => void; min?: Date; max?: Date }) {
  const [month, setMonth] = useState(() => new Date(value?.getFullYear() ?? new Date().getFullYear(), value?.getMonth() ?? new Date().getMonth(), 1));
  const offset = (month.getDay() + 6) % 7; const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return <div className="calendar"><header><IconButton label="Mois précédent" size="sm" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></IconButton><strong>{formatter.format(month)}</strong><IconButton label="Mois suivant" size="sm" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></IconButton></header><div className="calendar-grid">{weekdays.map((day) => <span key={day}>{day}</span>)}{Array.from({ length: offset }, (_, index) => <i key={`empty-${index}`} />)}{Array.from({ length: days }, (_, index) => { const date = new Date(month.getFullYear(), month.getMonth(), index + 1); const disabled = Boolean((min && date < min) || (max && date > max)); return <button type="button" key={date.toISOString()} disabled={disabled} className={cn(value && sameDay(date, value) && "selected", sameDay(date, new Date()) && "today")} aria-label={dateFormatter.format(date)} aria-pressed={value ? sameDay(date, value) : false} onClick={() => onValueChange(date)}>{index + 1}</button>; })}</div></div>;
}

export function DatePicker({ value, onValueChange, label = "Choisir une date", placeholder = "Sélectionner une date" }: { value?: Date; onValueChange: (date: Date) => void; label?: string; placeholder?: string }) { return <Popover label={label} trigger={<button type="button" className="date-picker-trigger"><CalendarDays />{value ? dateFormatter.format(value) : placeholder}</button>}><Calendar value={value} onValueChange={onValueChange} /></Popover>; }
