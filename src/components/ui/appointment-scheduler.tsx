import { CalendarX2 } from "lucide-react";
import { useId, useRef, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

export type AppointmentSlot = {
  id: string;
  label: string;
  period?: string;
  disabled?: boolean;
};

export type AppointmentSchedulerProps = {
  slots: AppointmentSlot[];
  value?: string | null;
  onValueChange: (slotId: string) => void;
  title?: string;
  description?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 3 | 4;
  className?: string;
};

type SlotGroup = { period: string | null; slots: AppointmentSlot[] };

function groupByPeriod(slots: AppointmentSlot[]): SlotGroup[] {
  const groups: SlotGroup[] = [];
  for (const slot of slots) {
    const period = slot.period ?? null;
    const last = groups.at(-1);
    if (last && last.period === period) last.slots.push(slot);
    else groups.push({ period, slots: [slot] });
  }
  return groups;
}

export function AppointmentScheduler({
  slots,
  value,
  onValueChange,
  title = "Choisissez un créneau",
  description,
  emptyTitle = "Aucun créneau disponible",
  emptyDescription = "Revenez plus tard ou contactez le service concerné.",
  columns = 3,
  className,
}: AppointmentSchedulerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const groups = groupByPeriod(slots);
  const enabledSlots = slots.filter((slot) => !slot.disabled);
  const activeId = value && enabledSlots.some((slot) => slot.id === value) ? value : enabledSlots[0]?.id;

  function select(group: SlotGroup, index: number) {
    const slot = group.slots[index];
    if (slot.disabled) return;
    onValueChange(slot.id);
    buttonRefs.current.get(slot.id)?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, group: SlotGroup, index: number) {
    const enabledIndexes = group.slots.map((slot, slotIndex) => (slot.disabled ? -1 : slotIndex)).filter((slotIndex) => slotIndex >= 0);
    if (!enabledIndexes.length) return;
    const position = enabledIndexes.indexOf(index);
    let nextPosition: number | undefined;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextPosition = position - 1;
    else if (event.key === "ArrowRight" || event.key === "ArrowDown") nextPosition = position + 1;
    else if (event.key === "Home") nextPosition = 0;
    else if (event.key === "End") nextPosition = enabledIndexes.length - 1;
    if (nextPosition === undefined) return;
    event.preventDefault();
    const wrapped = (nextPosition + enabledIndexes.length) % enabledIndexes.length;
    select(group, enabledIndexes[wrapped]);
  }

  if (!slots.length) {
    return (
      <div className={cn("appointment-scheduler appointment-empty", className)} role="status">
        <CalendarX2 aria-hidden="true" />
        <strong>{emptyTitle}</strong>
        <p>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={cn("appointment-scheduler", className)}>
      <header className="appointment-header">
        <h3 id={titleId}>{title}</h3>
        {description ? <p id={descriptionId}>{description}</p> : null}
      </header>
      {groups.map((group) => (
        <div className="appointment-group" key={group.period ?? "default"}>
          {group.period ? <h4 className="appointment-period">{group.period}</h4> : null}
          <div
            className="appointment-grid"
            data-columns={columns}
            role="radiogroup"
            aria-labelledby={titleId}
          >
            {group.slots.map((slot, index) => {
              const selected = slot.id === activeId;
              return (
                <button
                  key={slot.id}
                  ref={(node) => {
                    if (node) buttonRefs.current.set(slot.id, node);
                    else buttonRefs.current.delete(slot.id);
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-describedby={description ? descriptionId : undefined}
                  tabIndex={selected ? 0 : -1}
                  disabled={slot.disabled}
                  className={cn("appointment-slot", selected && "is-selected", slot.disabled && "is-disabled")}
                  onClick={() => onValueChange(slot.id)}
                  onKeyDown={(event) => handleKeyDown(event, group, index)}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
