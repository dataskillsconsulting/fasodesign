import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Stepper } from "@/components/ui/stepper";

expect.extend({ toHaveNoViolations: (results: { violations: unknown[] }) => ({ pass: results.violations.length === 0, message: () => JSON.stringify(results.violations, null, 2) }) });

describe("accessibilité", () => {
  it("ne contient aucune violation critique", async () => { const { container } = render(<main><Button>Continuer</Button><Stepper currentStep={2} items={[{ label: "Identité" }, { label: "Pièces" }]} /><DataTable caption="Dossiers" data={[{ id: "1", value: "Validé" }]} getRowKey={(row) => row.id} columns={[{ key: "status", header: "Statut", cell: (row) => row.value }]} /></main>); expect(await axe(container)).toHaveNoViolations(); });
});
