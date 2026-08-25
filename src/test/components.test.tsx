import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/ui/data-table";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SearchBox } from "@/components/ui/primitives";
import { Pagination, Tabs } from "@/components/ui/navigation";
import { EmptyState } from "@/components/ui/advanced";
import { Field } from "@/components/ui/input";
import { StatusTracker, Amount } from "@/components/patterns/service-components";

function DialogHarness() { const [open, setOpen] = useState(false); return <><Button onClick={() => setOpen(true)}>Ouvrir</Button><Dialog open={open} onOpenChange={setOpen} title="Confirmation"><Button>Confirmer</Button></Dialog></>; }
function DrawerHarness() { const [open, setOpen] = useState(false); return <><Button onClick={() => setOpen(true)}>Panneau</Button><Drawer open={open} onOpenChange={setOpen} title="Détail"><Button>Fermer</Button></Drawer></>; }

describe("interactions", () => {
  it("expose les états succès des champs et un état vide sémantique", () => {
    render(<><Field label="Téléphone" successMessage="Numéro vérifié" defaultValue="70 00 00 00" /><EmptyState title="Aucune demande" description="Commencez une nouvelle démarche." /></>);
    expect(screen.getByRole("textbox", { name: "Téléphone" })).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Numéro vérifié")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Aucune demande" })).toBeInTheDocument();
  });
  it("annonce le chargement du tableau et l’étape courante du suivi", () => {
    render(<><DataTable loading data={[]} getRowKey={() => "x"} columns={[{ key: "name", header: "Nom", cell: () => "" }]} /><StatusTracker items={[{ title: "Dossier reçu", status: "complete" }, { title: "Vérification", status: "current" }]} /></>);
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("listitem", { current: "step" })).toHaveTextContent("Vérification");
  });
  it("affiche les montants en FCFA", () => {
    render(<Amount value={12500} />);
    expect(screen.getByText(/12\s*500\s*FCFA/)).toBeInTheDocument();
  });
  it("ferme le dialogue avec Échap et restaure le focus", async () => { const user = userEvent.setup(); render(<DialogHarness />); const trigger = screen.getByRole("button", { name: "Ouvrir" }); await user.click(trigger); expect(screen.getByRole("dialog")).toBeInTheDocument(); await user.keyboard("{Escape}"); expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); expect(trigger).toHaveFocus(); });
  it("ferme le drawer avec Échap", async () => { const user = userEvent.setup(); render(<DrawerHarness />); await user.click(screen.getByRole("button", { name: "Panneau" })); await user.keyboard("{Escape}"); expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); });
  it("navigue dans le menu au clavier", async () => { const user = userEvent.setup(); const select = vi.fn(); render(<DropdownMenu label="Actions" trigger={<Button>Actions</Button>}><DropdownMenuItem onSelect={select}>Modifier</DropdownMenuItem><DropdownMenuItem>Archiver</DropdownMenuItem></DropdownMenu>); const trigger = screen.getByRole("button", { name: "Actions" }); trigger.focus(); await user.keyboard("{ArrowDown}"); await screen.findByRole("menuitem", { name: "Modifier" }); await new Promise(requestAnimationFrame); await user.keyboard("{Enter}"); expect(select).toHaveBeenCalledOnce(); });
  it("filtre et sélectionne une recherche", async () => { const user = userEvent.setup(); const select = vi.fn(); render(<SearchBox options={[{ value: "casier", label: "Casier judiciaire" }, { value: "acte", label: "Acte de naissance" }]} onSelect={select} />); await user.type(screen.getByRole("combobox"), "casier{Enter}"); expect(select).toHaveBeenCalledWith(expect.objectContaining({ value: "casier" })); });
  it("trie une DataTable", async () => { const user = userEvent.setup(); render(<DataTable data={[{ id: "2", name: "B" }, { id: "1", name: "A" }]} getRowKey={(row) => row.id} columns={[{ key: "name", header: "Nom", cell: (row) => row.name, sortValue: (row) => row.name }]} />); await user.click(screen.getByRole("button", { name: "Nom" })); expect(screen.getAllByRole("row")[1]).toHaveTextContent("A"); });
  it("sélectionne une date", async () => { const user = userEvent.setup(); const select = vi.fn(); render(<Calendar value={new Date(2026, 6, 14)} onValueChange={select} />); await user.click(screen.getByRole("button", { name: /15 juillet 2026/i })); expect(select).toHaveBeenCalledWith(new Date(2026, 6, 15)); });
  it("navigue dans le calendrier avec les flèches", async () => { const user = userEvent.setup(); render(<Calendar value={new Date(2026, 6, 14)} onValueChange={vi.fn()} />); const selected = screen.getByRole("button", { name: /14 juillet 2026/i }); selected.focus(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("button", { name: /15 juillet 2026/i })).toHaveFocus(); await user.keyboard("{ArrowDown}"); expect(screen.getByRole("button", { name: /22 juillet 2026/i })).toHaveFocus(); });
  it("contrôle la pagination et ses limites", async () => { const user = userEvent.setup(); const change = vi.fn(); render(<Pagination page={1} total={12} onPageChange={change} />); expect(screen.getByRole("button", { name: "Page précédente" })).toBeDisabled(); await user.click(screen.getByRole("button", { name: "Page suivante" })); expect(change).toHaveBeenCalledWith(2); expect(screen.getByText("…")).toBeInTheDocument(); });
  it("génère des identifiants uniques pour plusieurs groupes d’onglets", () => { const items = [{ value: "one", label: "Un", content: "Premier" }, { value: "two", label: "Deux", content: "Second" }]; render(<><Tabs items={items} value="one" onValueChange={vi.fn()} ariaLabel="Premier groupe" /><Tabs items={items} value="one" onValueChange={vi.fn()} ariaLabel="Second groupe" /></>); const tabs = screen.getAllByRole("tab", { name: "Un" }); expect(tabs[0].id).not.toBe(tabs[1].id); expect(tabs[0]).toHaveAttribute("aria-controls", expect.not.stringContaining(tabs[1].id)); });
  it("ferme les résultats de recherche après la sélection", async () => { const user = userEvent.setup(); render(<SearchBox label="Démarche" options={[{ value: "acte", label: "Acte de naissance" }]} onSelect={vi.fn()} />); await user.type(screen.getByRole("combobox", { name: "Démarche" }), "acte"); expect(screen.getByRole("listbox")).toBeInTheDocument(); await user.click(screen.getByRole("option", { name: "Acte de naissance" })); expect(screen.queryByRole("listbox")).not.toBeInTheDocument(); });
});
