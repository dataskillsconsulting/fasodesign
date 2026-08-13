import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type StepperItem = { label: string; description?: string };

export function Stepper({ items, currentStep, orientation = "horizontal", className }: { items: StepperItem[]; currentStep: number; orientation?: "horizontal" | "vertical"; className?: string }) {
  const active = Math.min(Math.max(currentStep, 1), items.length);
  return (
    <nav className={cn("stepper", `stepper-${orientation}`, className)} aria-label="Progression de la démarche">
      <ol>{items.map((item, index) => {
        const number = index + 1;
        const state = number < active ? "complete" : number === active ? "current" : "upcoming";
        return (
          <li key={`${number}-${item.label}`} className={state} aria-current={state === "current" ? "step" : undefined}>
            <span className="stepper-marker" aria-hidden="true">{state === "complete" ? <Check /> : number}</span>
            <span className="stepper-content"><strong>{item.label}</strong>{item.description ? <small>{item.description}</small> : null}</span>
          </li>
        );
      })}</ol>
    </nav>
  );
}
