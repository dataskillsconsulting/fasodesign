import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { CheckboxGroup, CurrencyField, FormActions, NumberField, PasswordField, RadioGroup } from "@/components/ui/form-patterns";

const options = [{ value: "sms", label: "SMS", description: "Recevoir un message" }, { value: "email", label: "Courriel" }];

function ChoiceHarness() {
  const [channel, setChannel] = useState("sms");
  const [notifications, setNotifications] = useState<string[]>([]);
  return <><RadioGroup legend="Canal principal" options={options} value={channel} onValueChange={setChannel} /><CheckboxGroup legend="Notifications" options={options} value={notifications} onValueChange={setNotifications} /></>;
}

describe("composants de formulaire", () => {
  it("contrôle les groupes de choix", async () => { const user = userEvent.setup(); render(<ChoiceHarness />); await user.click(screen.getByRole("radio", { name: "Courriel" })); expect(screen.getByRole("radio", { name: "Courriel" })).toBeChecked(); await user.click(screen.getByRole("checkbox", { name: /SMS/ })); expect(screen.getByRole("checkbox", { name: /SMS/ })).toBeChecked(); });
  it("affiche et masque le mot de passe", async () => { const user = userEvent.setup(); render(<PasswordField label="Mot de passe" defaultValue="secret" />); const input = screen.getByLabelText("Mot de passe"); expect(input).toHaveAttribute("type", "password"); await user.click(screen.getByRole("button", { name: "Afficher le mot de passe" })); expect(input).toHaveAttribute("type", "text"); });
  it("retourne une valeur numérique localisée", async () => { const user = userEvent.setup(); const change = vi.fn(); render(<NumberField label="Quantité" onValueChange={change} />); await user.type(screen.getByLabelText("Quantité"), "12,5"); expect(change).toHaveBeenLastCalledWith(12.5); });
  it("affiche la devise FCFA", () => { render(<CurrencyField label="Montant" value={2500} onValueChange={() => undefined} />); expect(screen.getByText("FCFA")).toBeInTheDocument(); });
  it("expose les actions principales", async () => { const user = userEvent.setup(); const primary = vi.fn(); render(<FormActions primaryLabel="Envoyer" onPrimary={primary} secondaryLabel="Retour" saveLabel="Enregistrer" />); await user.click(screen.getByRole("button", { name: "Envoyer" })); expect(primary).toHaveBeenCalledOnce(); });
});
