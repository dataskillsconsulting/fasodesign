import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ApplicationSummary, ContactBlock, Deadline, DocumentChecklist, OfficialNotice, ReferenceNumber, ServiceCard } from "@/components/patterns/civic-components";

describe("composants de service public", () => {
  it("présente les informations essentielles d’un service", () => { render(<ServiceCard title="Casier judiciaire" organization="Ministère de la Justice" fee="500 FCFA" processingTime="48 heures" online href="/casier" />); expect(screen.getByRole("heading", { name: "Casier judiciaire" })).toBeInTheDocument(); expect(screen.getByText("En ligne")).toBeInTheDocument(); expect(screen.getByRole("link", { name: /Voir la démarche/ })).toHaveAttribute("href", "/casier"); });
  it("affiche les états des justificatifs", () => { render(<DocumentChecklist items={[{ id: "cnib", label: "CNIB", status: "validated", required: true }, { id: "photo", label: "Photo", status: "rejected", reason: "Document illisible" }]} />); expect(screen.getByText("1 sur 2 validées")).toBeInTheDocument(); expect(screen.getByText("Motif : Document illisible")).toBeInTheDocument(); });
  it("permet de modifier une section du récapitulatif", async () => { const user = userEvent.setup(); const edit = vi.fn(); render(<ApplicationSummary sections={[{ id: "identity", title: "Identité", items: [{ label: "Nom", value: "Ouédraogo" }], onEdit: edit }]} />); await user.click(screen.getByRole("button", { name: "Modifier Identité" })); expect(edit).toHaveBeenCalledOnce(); });
  it("formate une date limite", () => { render(<Deadline date="2026-09-30" overdue description="Contactez le service instructeur." />); expect(screen.getByText(/30 septembre 2026/)).toBeInTheDocument(); expect(screen.getByText("Délai dépassé")).toBeInTheDocument(); });
  it("expose les coordonnées et avis institutionnels", () => { render(<><ContactBlock phone="25 00 00 00" email="aide@example.bf" address="Ouagadougou" /><OfficialNotice title="Information officielle">Texte réglementaire.</OfficialNotice></>); expect(screen.getByRole("link", { name: "25 00 00 00" })).toHaveAttribute("href", "tel:25000000"); expect(screen.getByRole("heading", { name: "Information officielle" })).toBeInTheDocument(); });
  it("affiche une référence copiable", () => { render(<ReferenceNumber value="BF-2026-001" />); expect(screen.getByText("BF-2026-001")).toBeInTheDocument(); expect(screen.getByRole("button", { name: "Copier la référence" })).toBeInTheDocument(); });
});
