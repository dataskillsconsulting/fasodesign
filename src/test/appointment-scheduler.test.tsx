import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppointmentScheduler } from "@/components/ui/appointment-scheduler";

const slots = [
  { id: "09-00", label: "09 h 00", period: "Matin" },
  { id: "09-30", label: "09 h 30", period: "Matin", disabled: true },
  { id: "10-00", label: "10 h 00", period: "Matin" },
  { id: "14-00", label: "14 h 00", period: "Après-midi" },
];

describe("AppointmentScheduler", () => {
  it("sélectionne un créneau au clic", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AppointmentScheduler slots={slots} onValueChange={onChange} />);
    await user.click(screen.getByRole("radio", { name: "10 h 00" }));
    expect(onChange).toHaveBeenCalledWith("10-00");
  });

  it("navigue au clavier en ignorant les créneaux indisponibles", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AppointmentScheduler slots={slots} onValueChange={onChange} />);
    screen.getByRole("radio", { name: "09 h 00" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("10-00");
    expect(screen.getByRole("radio", { name: "10 h 00" })).toHaveFocus();
  });

  it("revient au premier créneau avec Origine", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AppointmentScheduler slots={slots} value="10-00" onValueChange={onChange} />);
    screen.getByRole("radio", { name: "10 h 00" }).focus();
    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenCalledWith("09-00");
    expect(screen.getByRole("radio", { name: "09 h 00" })).toHaveFocus();
  });

  it("reflète la valeur contrôlée", () => {
    render(<AppointmentScheduler slots={slots} value="14-00" onValueChange={() => undefined} />);
    expect(screen.getByRole("radio", { name: "14 h 00" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "09 h 00" })).toHaveAttribute("aria-checked", "false");
  });

  it("affiche un état vide accessible", () => {
    render(<AppointmentScheduler slots={[]} onValueChange={() => undefined} />);
    const empty = screen.getByRole("status");
    expect(empty).toHaveTextContent("Aucun créneau disponible");
  });

  it("groupe les créneaux par période", () => {
    render(<AppointmentScheduler slots={slots} onValueChange={() => undefined} />);
    expect(screen.getByRole("heading", { name: "Matin" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Après-midi" })).toBeInTheDocument();
  });
});
