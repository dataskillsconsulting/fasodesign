import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { DateRangeField, MultiSelect, TimeField } from "@/components/ui/selection-controls";

const options = [{ value: "centre", label: "Centre" }, { value: "nord", label: "Nord" }];
function MultiHarness() { const [value, setValue] = useState<string[]>([]); return <MultiSelect label="Régions" options={options} value={value} onValueChange={setValue} />; }

describe("contrôles de sélection", () => {
  it("sélectionne et retire plusieurs options", async () => { const user = userEvent.setup(); render(<MultiHarness />); await user.click(screen.getByRole("combobox", { name: "Régions" })); await user.click(screen.getByRole("option", { name: "Centre" })); expect(screen.getByText("Centre", { selector: ".multi-select-tag" })).toBeInTheDocument(); await user.click(screen.getByRole("button", { name: "Retirer Centre" })); expect(screen.queryByText("Centre", { selector: ".multi-select-tag" })).not.toBeInTheDocument(); });
  it("signale une plage de dates incohérente", () => { render(<DateRangeField value={{ start: "2026-08-20", end: "2026-08-10" }} onValueChange={() => undefined} />); expect(screen.getByRole("alert")).toHaveTextContent("date de fin"); });
  it("retourne l’heure choisie", async () => { const user = userEvent.setup(); const change = vi.fn(); render(<TimeField value="" onValueChange={change} />); await user.type(screen.getByLabelText("Heure"), "10:30"); expect(change).toHaveBeenCalled(); });
});
