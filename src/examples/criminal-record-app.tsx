import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  HelpCircle,
  Home,
  LockKeyhole,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

import {
  GovernmentFooter,
  GovernmentHeader,
} from "@/components/design-system/government-layout";
import { Alert } from "@/components/ui/alert";
import { FileUpload, OtpInput, PhoneField } from "@/components/ui/advanced";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, Select } from "@/components/ui/form-controls";
import { Field } from "@/components/ui/input";
import { Progress } from "@/components/ui/navigation";
import { cn } from "@/lib/utils";

type View = "home" | "request" | "tracking";
const steps = [
  "Identité",
  "Documents",
  "Récapitulatif",
  "Paiement",
  "Confirmation",
];

export default function CriminalRecordApp() {
  const [view, setView] = useState<View>("home");
  const [step, setStep] = useState(1);
  const [paid, setPaid] = useState(false);

  function startRequest() {
    setView("request");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="ecasier-app">
      <div className="civic-line" />
      <GovernmentHeader serviceName="e-Casier judiciaire" />
      <div className="ecasier-official-bar">
        <span>
          <ShieldCheck /> Site officiel de l’administration burkinabè
        </span>
        <span>
          Une question ? <a href="tel:+22625409267">(+226) 25 40 92 67</a>
        </span>
      </div>
      {view === "home" ? (
        <HomeView onStart={startRequest} onTrack={() => setView("tracking")} />
      ) : null}
      {view === "request" ? (
        <RequestView
          step={step}
          setStep={setStep}
          paid={paid}
          setPaid={setPaid}
          onHome={() => setView("home")}
        />
      ) : null}
      {view === "tracking" ? (
        <TrackingView onHome={() => setView("home")} />
      ) : null}
      <GovernmentFooter />
    </div>
  );
}

function HomeView({
  onStart,
  onTrack,
}: {
  onStart: () => void;
  onTrack: () => void;
}) {
  return (
    <main>
      <section className="ecasier-hero">
        <div>
          <span className="ecasier-eyebrow">
            Ministère de la Justice et des Droits humains
          </span>
          <h1>Votre casier judiciaire, sans vous déplacer.</h1>
          <p>
            Demandez votre bulletin n°3 en ligne, payez par mobile money et
            recevez votre document par voie électronique.
          </p>
          <div className="ecasier-actions">
            <Button size="lg" onClick={onStart}>
              Faire une demande <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" onClick={onTrack}>
              <Search /> Suivre une demande
            </Button>
          </div>
          <span className="ecasier-security">
            <LockKeyhole /> Vos données sont transmises de manière sécurisée.
          </span>
        </div>
        <Card className="ecasier-info-card">
          <span className="ecasier-card-grid" aria-hidden="true" />
          <span className="ecasier-document">
            <FileCheck2 />
          </span>
          <div>
            <small>Document délivré</small>
            <h2>Bulletin n°3 du casier judiciaire</h2>
          </div>
          <dl>
            <div>
              <dt>Coût indicatif</dt>
              <dd>500 FCFA</dd>
            </div>
            <div>
              <dt>Délai</dt>
              <dd>24 à 48 heures</dd>
            </div>
            <div>
              <dt>Validité</dt>
              <dd>3 mois</dd>
            </div>
          </dl>
          <div className="ecasier-card-seal">
            <span>★</span> Burkina Faso
          </div>
        </Card>
      </section>

      <section
        className="ecasier-trust-strip"
        aria-label="Avantages du service"
      >
        <div>
          <ShieldCheck />
          <span>
            <strong>Démarche sécurisée</strong>Vos données restent protégées
          </span>
        </div>
        <div>
          <Clock3 />
          <span>
            <strong>Disponible 24 h / 24</strong>Depuis un mobile ou ordinateur
          </span>
        </div>
        <div>
          <Smartphone />
          <span>
            <strong>Paiement mobile</strong>Orange Money et Moov Money
          </span>
        </div>
        <div>
          <Download />
          <span>
            <strong>Document numérique</strong>Reçu directement dans votre
            espace
          </span>
        </div>
      </section>

      <section className="ecasier-section">
        <div className="ecasier-section-heading split">
          <div>
            <span>Avant de commencer</span>
            <h2>Préparez votre demande</h2>
          </div>
          <p>
            Réunissez ces trois éléments. Vous pourrez enregistrer un brouillon
            et reprendre la démarche plus tard.
          </p>
        </div>
        <div className="ecasier-requirements">
          <Card>
            <span>01</span>
            <FileText />
            <h3>Pièce d’identité</h3>
            <p>Une CNIB ou un passeport en cours de validité.</p>
          </Card>
          <Card>
            <span>02</span>
            <FileText />
            <h3>Acte de naissance</h3>
            <p>Une copie lisible de votre extrait ou jugement supplétif.</p>
          </Card>
          <Card>
            <span>03</span>
            <Smartphone />
            <h3>Téléphone actif</h3>
            <p>Un numéro associé à votre compte mobile money.</p>
          </Card>
        </div>
      </section>

      <section className="ecasier-process">
        <div className="ecasier-process-pattern" aria-hidden="true">
          ★
        </div>
        <div className="ecasier-section-heading">
          <span>Comment ça marche ?</span>
          <h2>
            Quatre étapes,
            <br />
            entièrement en ligne
          </h2>
        </div>
        <ol>
          {[
            ["Remplissez", "Renseignez vos informations personnelles."],
            ["Ajoutez", "Transmettez vos pièces justificatives."],
            ["Payez", "Réglez les frais avec votre mobile money."],
            ["Recevez", "Téléchargez le document depuis votre espace."],
          ].map(([title, text], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="ecasier-cta">
        <div>
          <Badge variant="success">Service disponible 24 h / 24</Badge>
          <h2>Prêt à commencer ?</h2>
          <p>La démarche prend environ huit minutes.</p>
        </div>
        <Button size="lg" onClick={onStart}>
          Faire ma demande <ArrowRight />
        </Button>
      </section>
    </main>
  );
}

function RequestView({
  step,
  setStep,
  paid,
  setPaid,
  onHome,
}: {
  step: number;
  setStep: (step: number) => void;
  paid: boolean;
  setPaid: (paid: boolean) => void;
  onHome: () => void;
}) {
  return (
    <main className="ecasier-form-page">
      <button className="ecasier-back-home" onClick={onHome}>
        <ArrowLeft /> Retour à l’accueil
      </button>
      <div className="ecasier-form-layout">
        <aside>
          <span>Votre demande</span>
          <h2>Bulletin n°3</h2>
          <ol>
            {steps.map((label, index) => (
              <li
                className={cn(
                  index + 1 === step && "active",
                  index + 1 < step && "done",
                )}
                key={label}
              >
                <span>{index + 1 < step ? <Check /> : index + 1}</span>
                <strong>{label}</strong>
              </li>
            ))}
          </ol>
          <div>
            <HelpCircle />
            <p>
              Besoin d’aide ?<br />
              <a href="mailto:casierjudiciaire@justice.gov.bf">
                Contacter l’assistance
              </a>
            </p>
          </div>
        </aside>
        <Card className="ecasier-form-card">
          <div className="ecasier-mobile-progress">
            <Progress value={step * 20} label={`Étape ${step} sur 5`} />
          </div>
          {step === 1 ? <IdentityStep /> : null}
          {step === 2 ? <DocumentsStep /> : null}
          {step === 3 ? <SummaryStep /> : null}
          {step === 4 ? (
            <PaymentStep paid={paid} onPay={() => setPaid(true)} />
          ) : null}
          {step === 5 ? <ConfirmationStep onHome={onHome} /> : null}
          {step < 5 ? (
            <div className="ecasier-form-actions">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft /> Retour
                </Button>
              ) : (
                <span />
              )}
              {step === 4 && !paid ? null : (
                <Button onClick={() => setStep(step + 1)}>
                  {step === 3
                    ? "Confirmer et payer"
                    : step === 4
                      ? "Terminer"
                      : "Continuer"}{" "}
                  <ArrowRight />
                </Button>
              )}
            </div>
          ) : null}
        </Card>
      </div>
    </main>
  );
}

function StepTitle({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="ecasier-step-title">
      <span>Étape {number} sur 5</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function IdentityStep() {
  return (
    <>
      <StepTitle
        number={1}
        title="Votre identité"
        description="Saisissez les informations telles qu’elles figurent sur votre acte de naissance."
      />
      <div className="ecasier-fields">
        <Field label="Nom de naissance" placeholder="Ex. Ouédraogo" required />
        <Field label="Prénom(s)" placeholder="Ex. Adama" required />
        <Field label="Date de naissance" type="date" required />
        <div>
          <label htmlFor="birthplace">Lieu de naissance</label>
          <Select id="birthplace" defaultValue="">
            <option value="" disabled>
              Sélectionner une commune
            </option>
            <option>Ouagadougou</option>
            <option>Bobo-Dioulasso</option>
            <option>Koudougou</option>
          </Select>
        </div>
        <div>
          <label htmlFor="gender">Sexe</label>
          <Select id="gender" defaultValue="">
            <option value="" disabled>
              Sélectionner
            </option>
            <option>Féminin</option>
            <option>Masculin</option>
          </Select>
        </div>
        <PhoneField />
      </div>
    </>
  );
}

function DocumentsStep() {
  return (
    <>
      <StepTitle
        number={2}
        title="Vos justificatifs"
        description="Ajoutez des fichiers nets et complets. Chaque fichier doit peser moins de 5 Mo."
      />
      <div className="space-y-5">
        <div>
          <h3 className="ecasier-upload-title">
            CNIB ou passeport{" "}
            <Badge variant="destructive" size="sm">
              Obligatoire
            </Badge>
          </h3>
          <FileUpload label="Ajouter votre pièce d’identité" />
        </div>
        <div>
          <h3 className="ecasier-upload-title">
            Acte de naissance{" "}
            <Badge variant="destructive" size="sm">
              Obligatoire
            </Badge>
          </h3>
          <FileUpload label="Ajouter votre acte de naissance" />
        </div>
      </div>
    </>
  );
}

function SummaryStep() {
  return (
    <>
      <StepTitle
        number={3}
        title="Vérifiez votre demande"
        description="Relisez attentivement les informations avant de passer au paiement."
      />
      <div className="ecasier-summary">
        <section>
          <div>
            <h3>Identité</h3>
            <button>Modifier</button>
          </div>
          <dl>
            <div>
              <dt>Nom complet</dt>
              <dd>Adama Ouédraogo</dd>
            </div>
            <div>
              <dt>Naissance</dt>
              <dd>14 mai 1991 à Ouagadougou</dd>
            </div>
            <div>
              <dt>Téléphone</dt>
              <dd>+226 70 00 00 00</dd>
            </div>
          </dl>
        </section>
        <section>
          <div>
            <h3>Documents</h3>
            <button>Modifier</button>
          </div>
          <p>
            <FileText /> cnib-adama.pdf <CheckCircle2 />
          </p>
          <p>
            <FileText /> acte-naissance.pdf <CheckCircle2 />
          </p>
        </section>
        <section className="ecasier-price">
          <span>Montant total</span>
          <strong>500 FCFA</strong>
          <small>Quittance 300 FCFA + timbre fiscal 200 FCFA</small>
        </section>
      </div>
      <Checkbox className="mt-5">
        Je certifie que les informations fournies sont exactes.
      </Checkbox>
    </>
  );
}

function PaymentStep({ paid, onPay }: { paid: boolean; onPay: () => void }) {
  return (
    <>
      <StepTitle
        number={4}
        title="Paiement mobile money"
        description="Choisissez un opérateur puis confirmez le paiement avec votre code OTP."
      />
      {paid ? (
        <Alert variant="success" title="Paiement confirmé">
          Votre transaction de 500 FCFA a été validée.
        </Alert>
      ) : (
        <>
          <div className="ecasier-payment-options">
            <button className="selected">
              <span className="orange-money">OM</span>
              <strong>Orange Money</strong>
              <Check />
            </button>
            <button>
              <span className="moov-money">MM</span>
              <strong>Moov Money</strong>
            </button>
          </div>
          <Alert title="Générez votre code de paiement">
            Depuis votre téléphone, composez le code de paiement indiqué par
            votre opérateur.
          </Alert>
          <div className="mt-5">
            <OtpInput label="Code OTP reçu" />
          </div>
          <Button className="mt-6" width="full" onClick={onPay}>
            Payer 500 FCFA <LockKeyhole />
          </Button>
        </>
      )}
    </>
  );
}

function ConfirmationStep({ onHome }: { onHome: () => void }) {
  return (
    <div className="ecasier-confirmation">
      <span>
        <CheckCircle2 />
      </span>
      <Badge variant="success">Demande transmise</Badge>
      <h1>Votre demande est enregistrée</h1>
      <p>
        Un message de confirmation a été envoyé au{" "}
        <strong>+226 70 00 00 00</strong>.
      </p>
      <div>
        <small>Référence de suivi</small>
        <strong>ECJ-2026-004821</strong>
      </div>
      <Alert title="Conservez cette référence">
        Elle vous permettra de suivre votre demande et de télécharger votre
        document.
      </Alert>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="outline">
          <Download /> Télécharger le récépissé
        </Button>
        <Button onClick={onHome}>
          <Home /> Retour à l’accueil
        </Button>
      </div>
    </div>
  );
}

function TrackingView({ onHome }: { onHome: () => void }) {
  return (
    <main className="ecasier-tracking-page">
      <button className="ecasier-back-home" onClick={onHome}>
        <ArrowLeft /> Retour à l’accueil
      </button>
      <div className="ecasier-section-heading">
        <span>Suivre une demande</span>
        <h1>Où en est votre dossier ?</h1>
        <p>Renseignez la référence reçue lors de votre demande.</p>
      </div>
      <Card className="ecasier-tracking-search">
        <Field label="Référence du dossier" defaultValue="ECJ-2026-004821" />
        <Button>
          <Search /> Rechercher
        </Button>
      </Card>
      <Card className="ecasier-tracking-result">
        <div>
          <Badge variant="primary">
            <Clock3 /> En traitement
          </Badge>
          <h2>Bulletin n°3 du casier judiciaire</h2>
          <span>Référence ECJ-2026-004821</span>
        </div>
        <Progress value={66} label="Progression du dossier" />
        <ol>
          <li className="done">
            <Check />
            <div>
              <strong>Demande transmise</strong>
              <small>25 juillet 2026 · 14:32</small>
            </div>
          </li>
          <li className="done">
            <Check />
            <div>
              <strong>Paiement confirmé</strong>
              <small>25 juillet 2026 · 14:35</small>
            </div>
          </li>
          <li className="current">
            <Clock3 />
            <div>
              <strong>Vérification par le greffe</strong>
              <small>Traitement en cours</small>
            </div>
          </li>
          <li>
            <FileCheck2 />
            <div>
              <strong>Document disponible</strong>
              <small>Étape à venir</small>
            </div>
          </li>
        </ol>
      </Card>
    </main>
  );
}
