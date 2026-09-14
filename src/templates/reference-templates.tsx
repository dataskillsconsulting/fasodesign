import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileText,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type TemplateTone = "citizen" | "agent";

export interface ReferenceTemplateProps {
  /** Override the default page title while keeping the template structure. */
  title?: string;
  /** Short explanation displayed below the page title. */
  description?: string;
  /** Optional content rendered in the primary area of the template. */
  children?: ReactNode;
}

function TemplateShell({ tone, eyebrow, title, description, children }: ReferenceTemplateProps & { tone: TemplateTone; eyebrow: string; description: string }) {
  return (
    <section className={`reference-template reference-template-${tone}`} aria-label={title}>
      <header className="reference-template-header">
        <div className="flex items-center gap-2"><span className="pattern-mini-mark">★</span><strong>FasoService</strong></div>
        <Badge variant={tone === "agent" ? "neutral" : "success"}>{tone === "agent" ? "Espace agent" : "Espace citoyen"}</Badge>
      </header>
      <div className="reference-template-body">
        <span className="pattern-kicker">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="pattern-intro">{description}</p>
        {children}
      </div>
    </section>
  );
}

function Cards({ items }: { items: string[] }) {
  return <div className="catalog-grid">{items.map((item) => <Card key={item}><div className="flex items-start gap-3"><FileText size={20} /><div><strong>{item}</strong><p className="mt-1 text-muted-foreground">Informations et actions disponibles.</p></div></div></Card>)}</div>;
}

export function CitizenPortalTemplate({ title = "Les services publics en ligne", description = "Trouvez une démarche et accomplissez-la simplement, depuis votre téléphone ou votre ordinateur.", children }: ReferenceTemplateProps) {
  return <TemplateShell tone="citizen" eyebrow="Portail de service" title={title} description={description}><div className="flex gap-2"><Input aria-label="Rechercher un service" placeholder="Rechercher un service" /><Button><Search /> Rechercher</Button></div>{children ?? <Cards items={["Certificat de nationalité", "Extrait d’acte de naissance", "Casier judiciaire"]} />}</TemplateShell>;
}

export function ServiceDetailTemplate({ title = "Certificat de nationalité", children }: ReferenceTemplateProps) {
  return <TemplateShell tone="citizen" eyebrow="Détail d'une démarche" title={title} description="Découvrez les conditions, les pièces nécessaires, le délai et le coût avant de commencer."><Alert variant="information" title="Préparez vos justificatifs">Une CNIB valide et un extrait d'acte de naissance sont nécessaires.</Alert><div className="mt-5 flex flex-wrap gap-2"><Badge variant="neutral">8 minutes</Badge><Badge variant="neutral">1 000 FCFA</Badge><Badge variant="success">En ligne</Badge></div><Button className="mt-6">Commencer la démarche</Button>{children}</TemplateShell>;
}

export function ApplicationCreationTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Créer une demande" title="Nouvelle demande" description="Votre progression est sauvegardée automatiquement."><div className="mobile-progress"><div className="progress-track"><span style={{ width: "25%" }} /></div><small>Étape 1 sur 4 · Identité</small></div><Card className="mt-5"><h3>Vos informations</h3><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input aria-label="Nom" placeholder="Nom" /><Input aria-label="Prénom(s)" placeholder="Prénom(s)" /></div></Card><div className="application-actions"><Button variant="outline">Enregistrer et quitter</Button><Button>Continuer</Button></div>{children}</TemplateShell>; }

export function CitizenDashboardTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Tableau de bord citoyen" title="Bonjour, Adama" description="Retrouvez vos démarches et les actions à effectuer."><div className="dashboard-stats"><Card><strong>3</strong><p>Démarches en cours</p></Card><Card><strong>1</strong><p>Action requise</p></Card><Card><strong>4</strong><p>Documents disponibles</p></Card></div><Cards items={["BF-2026-0148 · Certificat de nationalité", "BF-2026-0132 · Casier judiciaire"]} />{children}</TemplateShell>; }

export function ApplicationTrackingTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Suivi d'une demande" title="BF-2026-0148" description="Certificat de nationalité · Dernière mise à jour : 25 juillet 2026"><Alert variant="success" title="Votre document est disponible">Téléchargez-le depuis votre espace.</Alert><div className="mt-5"><Cards items={["Demande transmise", "Dossier vérifié", "Document disponible"]} /></div>{children}</TemplateShell>; }

export function PaymentTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Paiement" title="Réglez vos frais de dossier" description="Montant à payer : 1 000 FCFA. Le paiement ne sera débité qu'une seule fois."><Card><h3>Mobile Money</h3><div className="mt-4 flex gap-2"><Button variant="outline">Orange Money</Button><Button variant="outline">Moov Money</Button></div></Card><Button className="mt-5">Payer 1 000 FCFA</Button>{children}</TemplateShell>; }

export function ConfirmationTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Confirmation" title="Votre demande est enregistrée" description="Conservez cette référence pour suivre votre dossier."><div className="confirmation-panel"><CheckCircle2 /><strong>BF-2026-0148</strong><Button variant="outline">Télécharger le récépissé</Button></div>{children}</TemplateShell>; }

export function ErrorTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Un problème est survenu" title="La demande n'a pas pu être envoyée" description="Vos informations sont conservées. Vérifiez votre connexion puis réessayez."><Alert variant="warning" title="Connexion interrompue"><Button className="mt-3">Réessayer</Button></Alert>{children}</TemplateShell>; }

export function MaintenanceTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="citizen" eyebrow="Service momentanément indisponible" title="Nous revenons bientôt" description="Une maintenance est en cours. Aucun dossier ni paiement ne sera perdu."><div className="confirmation-panel"><Settings /><strong>Reprise prévue dimanche à 04 h</strong></div>{children}</TemplateShell>; }

export function AgentDashboardTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="agent" eyebrow="Tableau de bord agent" title="Bonjour, Awa" description="Vue d'ensemble de votre activité."><div className="dashboard-stats"><Card><strong>24</strong><p>Dossiers à traiter</p></Card><Card><strong>8</strong><p>En attente de pièce</p></Card><Card><strong>16</strong><p>Traités aujourd'hui</p></Card></div>{children}</TemplateShell>; }

export function CaseListTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="agent" eyebrow="Liste de dossiers" title="Dossiers à traiter" description="Filtrez et ouvrez un dossier pour commencer son instruction."><div className="flex gap-2"><Input aria-label="Rechercher un dossier" placeholder="Référence ou nom" /><Button><Search /> Rechercher</Button></div><Cards items={["BF-2026-0148 · Adama Ouédraogo", "BF-2026-0132 · Mariam Traoré"]} />{children}</TemplateShell>; }

export function AdministrativeSearchTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="agent" eyebrow="Recherche administrative" title="Rechercher un dossier" description="Utilisez une référence, un numéro de téléphone ou une identité."><Card><Input aria-label="Critère de recherche" placeholder="BF-2026-0148 ou +226 70 00 00 00" /><Button className="mt-4">Lancer la recherche</Button></Card>{children}</TemplateShell>; }

export function CaseConsultationTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="agent" eyebrow="Consultation d'un dossier" title="BF-2026-0148" description="Certificat de nationalité · Adama Ouédraogo"><Alert variant="information" title="Dossier en cours d'examen">Vérifiez les informations avant toute décision.</Alert><Cards items={["Identité du demandeur", "Pièces justificatives", "Historique"]} />{children}</TemplateShell>; }

export function ApplicationProcessingTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="agent" eyebrow="Traitement d'une demande" title="Prendre une décision" description="Consignez votre décision et expliquez-la au demandeur."><Card><div className="flex items-center gap-3"><ShieldCheck /><strong>Contrôles complétés</strong></div><div className="mt-5 flex gap-2"><Button>Valider la demande</Button><Button variant="outline"><AlertTriangle /> Demander une correction</Button></div></Card>{children}</TemplateShell>; }

export function DocumentManagementTemplate({ children }: ReferenceTemplateProps) { return <TemplateShell tone="agent" eyebrow="Gestion documentaire" title="Pièces du dossier" description="Contrôlez la lisibilité, la conformité et la version de chaque document."><Cards items={["CNIB · Conforme", "Extrait de naissance · À vérifier"]} /><Button className="mt-5"><ClipboardList /> Ajouter une note</Button>{children}</TemplateShell>; }
