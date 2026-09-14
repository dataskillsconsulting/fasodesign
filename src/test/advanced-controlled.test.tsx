import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Accordion, FileUpload, OtpInput } from "@/components/ui/advanced";

describe("composants avancés contrôlés", () => {
  it("ouvre plusieurs sections d’accordéon", async () => { const user = userEvent.setup(); render(<Accordion multiple defaultValue={[]} items={[{ id: "a", title: "Section A", content: "Contenu A" }, { id: "b", title: "Section B", content: "Contenu B" }]} />); await user.click(screen.getByRole("button", { name: "Section A" })); await user.click(screen.getByRole("button", { name: "Section B" })); expect(screen.getByText("Contenu A")).toBeInTheDocument(); expect(screen.getByText("Contenu B")).toBeInTheDocument(); });
  it("accepte le collage d’un code complet", async () => { const user = userEvent.setup(); const complete = vi.fn(); render(<OtpInput length={4} onComplete={complete} />); await user.click(screen.getByLabelText("Chiffre 1 sur 4")); await user.paste("1234"); expect(complete).toHaveBeenCalledWith("1234"); });
  it("refuse un fichier trop volumineux", async () => { const user = userEvent.setup(); render(<FileUpload maxSizeBytes={2} maxSize="2 octets" />); await user.upload(screen.getByLabelText(/Ajouter un document/), new File(["trop grand"], "preuve.pdf", { type: "application/pdf" })); expect(screen.getByRole("alert")).toHaveTextContent("dépasse la taille maximale"); });
});
