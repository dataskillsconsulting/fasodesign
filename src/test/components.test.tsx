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

function DialogHarness() { const [open, setOpen] = useState(false); return <><Button onClick={() => setOpen(true)}>Ouvrir</Button><Dialog open={open} onOpenChange={setOpen} title="Confirmation"><Button>Confirmer</Button></Dialog></>; }
function DrawerHarness() { const [open, setOpen] = useState(false); return <><Button onClick={() => setOpen(true)}>Panneau</Button><Drawer open={open} onOpenChange={setOpen} title="Détail"><Button>Fermer</Button></Drawer></>; }

describe("interactions", () => {
  it("ferme le dialogue avec Échap et restaure le focus", async () => { const user = userEvent.setup(); render(<DialogHarness />); const trigger = screen.getByRole("button", { name: "Ouvrir" }); await user.click(trigger); expect(screen.getByRole("dialog")).toBeInTheDocument(); await user.keyboard("{Escape}"); expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); expect(trigger).toHaveFocus(); });
  it("ferme le drawer avec Échap", async () => { const user = userEvent.setup(); render(<DrawerHarness />); await user.click(screen.getByRole("button", { name: "Panneau" })); await user.keyboard("{Escape}"); expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); });
  it("navigue dans le menu au clavier", async () => { const user = userEvent.setup(); const select = vi.fn(); render(<DropdownMenu label="Actions" trigger={<Button>Actions</Button>}><DropdownMenuItem onSelect={select}>Modifier</DropdownMenuItem><DropdownMenuItem>Archiver</DropdownMenuItem></DropdownMenu>); const trigger = screen.getByRole("button", { name: "Actions" }); trigger.focus(); await user.keyboard("{ArrowDown}"); await screen.findByRole("menuitem", { name: "Modifier" }); await new Promise(requestAnimationFrame); await user.keyboard("{Enter}"); expect(select).toHaveBeenCalledOnce(); });
  it("filtre et sélectionne une recherche", async () => { const user = userEvent.setup(); const select = vi.fn(); render(<SearchBox options={[{ value: "casier", label: "Casier judiciaire" }, { value: "acte", label: "Acte de naissance" }]} onSelect={select} />); await user.type(screen.getByRole("combobox"), "casier{Enter}"); expect(select).toHaveBeenCalledWith(expect.objectContaining({ value: "casier" })); });
  it("trie une DataTable", async () => { const user = userEvent.setup(); render(<DataTable data={[{ id: "2", name: "B" }, { id: "1", name: "A" }]} getRowKey={(row) => row.id} columns={[{ key: "name", header: "Nom", cell: (row) => row.name, sortValue: (row) => row.name }]} />); await user.click(screen.getByRole("button", { name: "Nom" })); expect(screen.getAllByRole("row")[1]).toHaveTextContent("A"); });
  it("sélectionne une date", async () => { const user = userEvent.setup(); const select = vi.fn(); render(<Calendar value={new Date(2026, 6, 14)} onValueChange={select} />); await user.click(screen.getByRole("button", { name: /15 juillet 2026/i })); expect(select).toHaveBeenCalledWith(new Date(2026, 6, 15)); });
});
