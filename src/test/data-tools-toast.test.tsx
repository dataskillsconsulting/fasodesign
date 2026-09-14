import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BulkActions, FilterPanel, LoadingOverlay, ResponsiveTable, ResultCount } from "@/components/ui/data-tools";
import { ToastProvider, useToast } from "@/components/ui/toast-provider";
import { Input } from "@/components/ui/input";

function ToastTrigger() { const { notify } = useToast(); return <button onClick={() => notify({ title: "Dossier transmis", variant: "success", duration: 0 })}>Notifier</button>; }

describe("outils de données et notifications", () => {
  it("rend un tableau sémantique et sa vue mobile", () => { render(<ResponsiveTable caption="Dossiers" data={[{ id: "1", name: "Demande A" }]} getRowKey={(row) => row.id} columns={[{ key: "name", header: "Nom", primary: true, cell: (row) => row.name }]} />); expect(screen.getByRole("table", { name: "Dossiers" })).toBeInTheDocument(); expect(screen.getByRole("list", { name: "Dossiers" })).toBeInTheDocument(); });
  it("retire et réinitialise des filtres", async () => { const user = userEvent.setup(); const remove = vi.fn(); const reset = vi.fn(); render(<FilterPanel activeFilters={[{ id: "status", label: "Statut", value: "Validé" }]} onRemoveFilter={remove} onReset={reset}><Input aria-label="Recherche" /></FilterPanel>); await user.click(screen.getByRole("button", { name: "Retirer le filtre Statut : Validé" })); expect(remove).toHaveBeenCalledWith("status"); });
  it("annonce les résultats et actions groupées", () => { render(<><ResultCount count={3} /><BulkActions count={2}>Archiver</BulkActions></>); expect(screen.getByRole("status")).toHaveTextContent("3 résultats"); expect(screen.getByRole("region", { name: "Éléments sélectionnés" })).toHaveTextContent("2 sélectionnés"); });
  it("signale le chargement d’une zone", () => { render(<LoadingOverlay loading><p>Contenu</p></LoadingOverlay>); expect(screen.getByRole("status")).toHaveTextContent("Chargement en cours"); });
  it("ajoute et ferme une notification globale", async () => { const user = userEvent.setup(); render(<ToastProvider><ToastTrigger /></ToastProvider>); await user.click(screen.getByRole("button", { name: "Notifier" })); expect(screen.getByRole("status")).toHaveTextContent("Dossier transmis"); await user.click(screen.getByRole("button", { name: "Fermer Dossier transmis" })); expect(screen.queryByText("Dossier transmis")).not.toBeInTheDocument(); });
});
