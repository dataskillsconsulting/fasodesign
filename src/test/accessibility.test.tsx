import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Stepper } from "@/components/ui/stepper";
import { Calendar } from "@/components/ui/calendar";
import { Pagination, Tabs } from "@/components/ui/navigation";
import { SearchBox } from "@/components/ui/primitives";
import { CheckboxGroup, CurrencyField, PasswordField, RadioGroup } from "@/components/ui/form-patterns";
import { ContactBlock, DocumentChecklist, OfficialNotice, ServiceCard } from "@/components/patterns/civic-components";

expect.extend({ toHaveNoViolations: (results: { violations: unknown[] }) => ({ pass: results.violations.length === 0, message: () => JSON.stringify(results.violations, null, 2) }) });

describe("accessibilité", () => {
  it("ne contient aucune violation critique", async () => { const { container } = render(<main><Button>Continuer</Button><Stepper currentStep={2} items={[{ label: "Identité" }, { label: "Pièces" }]} /><DataTable caption="Dossiers" data={[{ id: "1", value: "Validé" }]} getRowKey={(row) => row.id} columns={[{ key: "status", header: "Statut", cell: (row) => row.value }]} /></main>); expect(await axe(container)).toHaveNoViolations(); });
  it("valide les primitives de navigation et de saisie", async () => { const { container } = render(<main><Tabs ariaLabel="Sections" value="a" onValueChange={() => undefined} items={[{ value: "a", label: "Section A", content: "Contenu A" }, { value: "b", label: "Section B", content: "Contenu B" }]} /><Pagination page={2} total={5} onPageChange={() => undefined} /><SearchBox label="Rechercher une démarche" options={[{ value: "acte", label: "Acte de naissance" }]} onSelect={() => undefined} /><Calendar value={new Date(2026, 6, 14)} onValueChange={() => undefined} /></main>); expect(await axe(container)).toHaveNoViolations(); });
  it("valide les groupes et champs administratifs", async () => { const options = [{ value: "sms", label: "SMS" }, { value: "email", label: "Courriel" }]; const { container } = render(<form><RadioGroup legend="Canal" options={options} value="sms" onValueChange={() => undefined} /><CheckboxGroup legend="Alertes" options={options} value={["email"]} onValueChange={() => undefined} /><PasswordField label="Mot de passe" /><CurrencyField label="Montant" value={1000} onValueChange={() => undefined} /></form>); expect(await axe(container)).toHaveNoViolations(); });
  it("valide les composants métier", async () => { const { container } = render(<main><ServiceCard title="Acte de naissance" href="/acte" organization="Commune" /><DocumentChecklist items={[{ id: "cnib", label: "CNIB", status: "validated" }]} /><ContactBlock phone="25 00 00 00" /><OfficialNotice title="Avis officiel">Information publique.</OfficialNotice></main>); expect(await axe(container)).toHaveNoViolations(); });
});
