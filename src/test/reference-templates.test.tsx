import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AdministrativeSearchTemplate,
  ApplicationCreationTemplate,
  ApplicationProcessingTemplate,
  ApplicationTrackingTemplate,
  CaseConsultationTemplate,
  CaseListTemplate,
  CitizenDashboardTemplate,
  CitizenPortalTemplate,
  ConfirmationTemplate,
  DocumentManagementTemplate,
  ErrorTemplate,
  MaintenanceTemplate,
  PaymentTemplate,
  ServiceDetailTemplate,
  AgentDashboardTemplate,
} from "@/templates/reference-templates";

describe("templates de référence", () => {
  it("expose les 15 templates citoyens et agents", () => {
    render(
      <>
        <CitizenPortalTemplate />
        <ServiceDetailTemplate />
        <ApplicationCreationTemplate />
        <CitizenDashboardTemplate />
        <ApplicationTrackingTemplate />
        <PaymentTemplate />
        <ConfirmationTemplate />
        <ErrorTemplate />
        <MaintenanceTemplate />
        <AgentDashboardTemplate />
        <CaseListTemplate />
        <AdministrativeSearchTemplate />
        <CaseConsultationTemplate />
        <ApplicationProcessingTemplate />
        <DocumentManagementTemplate />
      </>,
    );

    expect(screen.getAllByRole("region")).toHaveLength(15);
    expect(screen.getByRole("region", { name: "Les services publics en ligne" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Prendre une décision" })).toBeInTheDocument();
  });

  it("permet de compléter un template avec du contenu métier", () => {
    render(<CitizenPortalTemplate title="Mes services"><p>Contenu métier</p></CitizenPortalTemplate>);

    expect(screen.getByRole("region", { name: "Mes services" })).toHaveTextContent("Contenu métier");
  });
});
