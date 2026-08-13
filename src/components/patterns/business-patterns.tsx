import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, Select } from "@/components/ui/form-controls";
import { Field, Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/navigation";
import { cn } from "@/lib/utils";

const applicationSteps = ["Identité", "Justificatifs", "Vérification", "Confirmation"];

export function OnlineApplicationPattern() {
  const [step, setStep] = useState(1);

  return (
    <div className="pattern-shell">
      <header className="pattern-app-header">
        <div className="flex items-center gap-2.5"><span className="pattern-mini-mark">★</span><strong>Service public</strong></div>
        <span>Besoin d’aide ? <a href="mailto:aide@service-public.gov.bf">Nous contacter</a></span>
      </header>
      <div className="application-layout">
        <aside className="application-summary">
          <Badge variant="success" className="application-summary-badge" style={{ background: "rgb(94 211 154 / .14)", color: "#82e5b2" }}><ShieldCheck /> Connexion sécurisée</Badge>
          <h3>Demande de certificat de nationalité</h3>
          <p>Temps estimé : 8 minutes</p>
          <ol>
            {applicationSteps.map((label, index) => {
              const number = index + 1;
              return (
                <li className={cn(number === step && "active", number < step && "complete")} key={label}>
                  <span>{number < step ? <Check /> : number}</span>
                  <div><small>Étape {number}</small><strong>{label}</strong></div>
                </li>
              );
            })}
          </ol>
        </aside>
        <div className="application-content">
          <div className="mobile-progress"><Progress value={step * 25} label={`Étape ${step} sur 4`} /></div>
          {step === 1 ? (
            <>
              <span className="pattern-kicker">Étape 1 sur 4</span>
              <h3>Vérifiez votre identité</h3>
              <p className="pattern-intro">Ces informations doivent correspondre exactement à celles indiquées sur votre CNIB.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Nom de naissance" placeholder="Ex. Ouédraogo" />
                <Field label="Prénom(s)" placeholder="Ex. Adama" />
                <Field label="Date de naissance" type="date" />
                <div><label className="mb-2 block text-xs font-bold" htmlFor="sexe">Sexe</label><Select id="sexe" defaultValue=""><option value="" disabled>Sélectionner</option><option>Féminin</option><option>Masculin</option></Select></div>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <span className="pattern-kicker">Étape 2 sur 4</span>
              <h3>Ajoutez vos justificatifs</h3>
              <p className="pattern-intro">Les fichiers doivent être lisibles, au format PDF, JPG ou PNG, et peser moins de 5 Mo.</p>
              <div className="upload-list">
                <div><span><FileText /></span><div><strong>Copie de la CNIB</strong><small>Obligatoire · Recto et verso</small></div><Button variant="outline" size="sm">Ajouter</Button></div>
                <div><span><FileText /></span><div><strong>Extrait d’acte de naissance</strong><small>Obligatoire · Moins de 3 mois</small></div><Button variant="outline" size="sm">Ajouter</Button></div>
              </div>
            </>
          ) : step === 3 ? (
            <>
              <span className="pattern-kicker">Étape 3 sur 4</span>
              <h3>Vérifiez votre demande</h3>
              <p className="pattern-intro">Relisez les informations avant de transmettre le dossier.</p>
              <dl className="review-list">
                <div><dt>Identité</dt><dd>Adama Ouédraogo · 14 mai 1991</dd><button>Modifier</button></div>
                <div><dt>Pièces jointes</dt><dd>2 documents ajoutés</dd><button>Modifier</button></div>
                <div><dt>Frais de dossier</dt><dd>1 000 FCFA</dd></div>
              </dl>
              <Checkbox className="mt-5">Je certifie l’exactitude des informations fournies.</Checkbox>
            </>
          ) : (
            <div className="confirmation-panel">
              <span><CheckCircle2 /></span>
              <Badge variant="success">Demande transmise</Badge>
              <h3>Votre dossier est enregistré</h3>
              <p>La référence <strong>BF-2026-0148</strong> vous permet de suivre son traitement.</p>
              <Button variant="outline"><Download /> Télécharger le récépissé</Button>
            </div>
          )}
          <div className="application-actions">
            {step > 1 && step < 4 ? <Button variant="outline" onClick={() => setStep((value) => value - 1)}><ArrowLeft /> Retour</Button> : <span />}
            {step < 4 ? <Button onClick={() => setStep((value) => value + 1)}>{step === 3 ? "Transmettre la demande" : "Continuer"} <ArrowRight /></Button> : <Button onClick={() => setStep(1)}>Retour à mes démarches</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

const cases = [
  { reference: "BF-2026-0148", name: "Certificat de nationalité", status: "En traitement", variant: "primary" as const, date: "25 juil. 2026" },
  { reference: "BF-2026-0132", name: "Casier judiciaire", status: "Action requise", variant: "warning" as const, date: "23 juil. 2026" },
  { reference: "BF-2026-0096", name: "Extrait de naissance", status: "Disponible", variant: "success" as const, date: "18 juil. 2026" },
];

export function CitizenDashboardPattern() {
  const [query, setQuery] = useState("");
  const visibleCases = cases.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.reference.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="dashboard-pattern">
      <div className="dashboard-welcome">
        <div><span>Bonjour Adama,</span><h3>Vos démarches</h3><p>Retrouvez vos demandes et les actions à effectuer.</p></div>
        <Button><Plus /> Nouvelle démarche</Button>
      </div>
      <div className="dashboard-stats">
        <div><span className="stat-icon red"><FolderOpen /></span><p><strong>3</strong>Démarches en cours</p></div>
        <div><span className="stat-icon amber"><Clock3 /></span><p><strong>1</strong>Action requise</p></div>
        <div><span className="stat-icon green"><FileCheck2 /></span><p><strong>4</strong>Documents disponibles</p></div>
      </div>
      <Card className="overflow-hidden">
        <div className="dashboard-list-header">
          <div><h4>Demandes récentes</h4><p>3 démarches mises à jour ce mois-ci</p></div>
          <div className="dashboard-search"><Search /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher…" aria-label="Rechercher une demande" /></div>
        </div>
        <div className="case-list">
          {visibleCases.map((item) => (
            <button key={item.reference}>
              <span className="case-file"><FileText /></span>
              <span className="case-main"><small>{item.reference}</small><strong>{item.name}</strong></span>
              <Badge variant={item.variant}>{item.status}</Badge>
              <span className="case-date">{item.date}</span>
              <ChevronRight className="case-arrow" />
            </button>
          ))}
          {visibleCases.length === 0 ? <p className="empty-search">Aucune démarche ne correspond à cette recherche.</p> : null}
        </div>
      </Card>
    </div>
  );
}

const trackingEvents = [
  { title: "Document disponible", text: "Votre certificat peut être téléchargé.", date: "25 juillet · 14:32", complete: true },
  { title: "Dossier validé", text: "Les informations et les pièces ont été vérifiées.", date: "25 juillet · 10:18", complete: true },
  { title: "Dossier en cours d’examen", text: "Un agent traite actuellement votre demande.", date: "24 juillet · 08:45", complete: true },
  { title: "Demande transmise", text: "Votre dossier a bien été enregistré.", date: "23 juillet · 16:04", complete: true },
];

export function CaseTrackingPattern() {
  return (
    <div className="tracking-pattern">
      <div className="tracking-topbar">
        <div><span>Référence du dossier</span><strong>BF-2026-0148</strong></div>
        <Button variant="outline" size="sm"><MoreHorizontal /> Actions</Button>
      </div>
      <Alert variant="success" title="Votre document est disponible">
        Téléchargez-le depuis cet espace. Il restera accessible pendant 90 jours.
      </Alert>
      <div className="tracking-grid">
        <Card className="tracking-card">
          <div className="tracking-heading"><div><Badge variant="success">Terminé</Badge><h3>Certificat de nationalité</h3></div><span><FileCheck2 /></span></div>
          <dl className="tracking-details">
            <div><dt>Demandeur</dt><dd>Adama Ouédraogo</dd></div>
            <div><dt>Date de la demande</dt><dd>23 juillet 2026</dd></div>
            <div><dt>Service instructeur</dt><dd>Tribunal de grande instance</dd></div>
          </dl>
          <Button width="full"><Download /> Télécharger le certificat</Button>
        </Card>
        <Card className="timeline-card">
          <h3>Historique du dossier</h3>
          <ol className="case-timeline">
            {trackingEvents.map((event, index) => (
              <li key={event.title}>
                <span className={cn("timeline-dot", index === 0 && "current")}><Check /></span>
                <div><strong>{event.title}</strong><p>{event.text}</p><small><CalendarDays /> {event.date}</small></div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
