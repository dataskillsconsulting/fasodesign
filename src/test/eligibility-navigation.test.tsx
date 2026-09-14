import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EligibilityCheck } from "@/components/patterns/eligibility-check";
import { AnchorNavigation, BackLink, LanguageSwitcher, SideNavigation, SkipLink } from "@/components/ui/public-navigation";

describe("éligibilité et navigation publique", () => {
  it("termine un questionnaire et permet de recommencer", async () => { const user = userEvent.setup(); const complete = vi.fn(); render(<EligibilityCheck questions={[{ id: "adult", title: "Avez-vous 18 ans ?", options: [{ value: "yes", label: "Oui" }, { value: "no", label: "Non" }] }]} evaluate={(answers) => ({ eligible: answers.adult === "yes", title: "Vous êtes éligible", description: "Vous pouvez continuer." })} onComplete={complete} />); await user.click(screen.getByRole("radio", { name: "Oui" })); await user.click(screen.getByRole("button", { name: "Voir le résultat" })); expect(screen.getByRole("heading", { name: "Vous êtes éligible" })).toBeInTheDocument(); expect(complete).toHaveBeenCalledOnce(); await user.click(screen.getByRole("button", { name: "Recommencer" })); expect(screen.getByRole("radio", { name: "Oui" })).not.toBeChecked(); });
  it("expose les repères de navigation", () => { render(<><SkipLink /><BackLink href="/accueil" /><SideNavigation items={[{ label: "Accueil", href: "/", current: true }, { label: "Dossier", href: "/dossier" }]} /><AnchorNavigation activeId="pieces" items={[{ id: "identite", label: "Identité" }, { id: "pieces", label: "Pièces" }]} /></>); expect(screen.getByRole("link", { name: "Aller au contenu principal" })).toHaveAttribute("href", "#contenu"); expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute("aria-current", "page"); expect(screen.getByRole("link", { name: /Pièces/ })).toHaveAttribute("aria-current", "location"); });
  it("change la langue de manière contrôlée", async () => { const user = userEvent.setup(); const change = vi.fn(); render(<LanguageSwitcher languages={[{ code: "fr", label: "Français" }, { code: "moore", label: "Mooré" }]} value="fr" onValueChange={change} />); await user.click(screen.getByRole("button", { name: "Mooré" })); expect(change).toHaveBeenCalledWith("moore"); });
});
