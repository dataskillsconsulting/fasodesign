import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { OnlineApplicationPattern } from "@/components/patterns/business-patterns";

const draftKey = "test:online-application";

afterEach(() => localStorage.removeItem(draftKey));

describe("démarche en ligne résiliente", () => {
  it("enregistre le brouillon et transmet une seule demande certifiée", async () => {
    const user = userEvent.setup();
    const submit = vi.fn(async () => ({ reference: "BF-2026-9001" }));
    render(<OnlineApplicationPattern draftKey={draftKey} onSubmit={submit} />);

    await user.type(screen.getByLabelText("Nom de naissance"), "Ouédraogo");
    await user.click(screen.getByRole("button", { name: "Enregistrer le brouillon" }));
    expect(screen.getByRole("status")).toHaveTextContent("Brouillon enregistré");

    await user.click(screen.getByRole("button", { name: /Continuer/ }));
    await user.click(screen.getByRole("button", { name: /Continuer/ }));
    const submitButton = screen.getByRole("button", { name: /Transmettre la demande/ });
    expect(submitButton).toBeDisabled();
    await user.click(screen.getByRole("checkbox", { name: /Je certifie/ }));
    await user.click(submitButton);

    expect(submit).toHaveBeenCalledOnce();
    expect(await screen.findByText("BF-2026-9001")).toBeInTheDocument();
  });
});
