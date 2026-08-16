import {
  ArrowRight,
  Check,
  FileCheck2,
  FileText,
  LockKeyhole,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import {
  GovernmentFooter,
  GovernmentHeader,
} from "@/components/design-system/government-layout";
import { DocumentChecklist, OfficialNotice } from "@/components/patterns/civic-components";
import { EligibilityCheck } from "@/components/patterns/eligibility-check";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/form-controls";
import { FormActions, RadioGroup } from "@/components/ui/form-patterns";
import { Field } from "@/components/ui/input";
import { Progress } from "@/components/ui/navigation";

export default function NationalityCertificateApp() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  return (
    <div className="nationality-app">
      <div className="civic-line" />
      <GovernmentHeader serviceName="e-Certificat de nationalité" />
      <div className="nationality-official">
        <ShieldCheck /> Site officiel de la justice burkinabè
      </div>
      {started ? (
        <NationalityForm
          step={step}
          setStep={setStep}
          onHome={() => setStarted(false)}
        />
      ) : (
        <NationalityHome onStart={() => setStarted(true)} />
      )}
      <GovernmentFooter />
    </div>
  );
}

function NationalityHome({ onStart }: { onStart: () => void }) {
  return (
    <main>
      <section className="nationality-hero">
        <div>
          <span className="ecasier-eyebrow">Ministère de la Justice</span>
          <h1>Votre certificat de nationalité, désormais en ligne.</h1>
          <p>
            Constituez votre dossier, réglez les frais et suivez son traitement
            sans multiplier les déplacements au tribunal.
          </p>
          <div>
            <Button size="lg" onClick={onStart}>
              Commencer la demande <ArrowRight />
            </Button>
            <Button size="lg" variant="outline">
              <Search /> Suivre mon dossier
            </Button>
          </div>
          <small>
            <LockKeyhole /> Connexion et paiement sécurisés
          </small>
        </div>
        <Card className="nationality-document">
          <div className="nationality-seal">★</div>
          <span>Burkina Faso</span>
          <FileCheck2 />
          <small>Document demandé</small>
          <h2>Certificat de nationalité burkinabè</h2>
          <dl>
            <div>
              <dt>Démarche</dt>
              <dd>100 % en ligne</dd>
            </div>
            <div>
              <dt>Paiement</dt>
              <dd>Sous 24 heures</dd>
            </div>
          </dl>
        </Card>
      </section>
      <section className="nationality-intro">
        <div>
          <span>Avant de commencer</span>
          <h2>Identifiez votre situation</h2>
          <p>
            Les justificatifs demandés dépendent du fondement juridique de votre
            nationalité.
          </p>
        </div>
        <div className="nationality-reasons">
          <Card>
            <span>01</span>
            <UserRound />
            <strong>Nationalité par filiation</strong>
            <p>Votre père ou votre mère possède la nationalité burkinabè.</p>
          </Card>
          <Card>
            <span>02</span>
            <FileText />
            <strong>Naissance et résidence</strong>
            <p>Vous êtes né et résidez au Burkina Faso de parents étrangers.</p>
          </Card>
          <Card>
            <span>03</span>
            <ShieldCheck />
            <strong>Autre situation</strong>
            <p>Mariage, naturalisation ou décision administrative.</p>
          </Card>
        </div>
        <div className="mt-8">
          <EligibilityCheck
            title="Vérifier avant de commencer"
            questions={[
              {
                id: "link",
                title: "Quel lien vous rattache au Burkina Faso ?",
                description: "Cette réponse détermine les justificatifs à préparer.",
                options: [
                  { value: "parent", label: "Un de mes parents est burkinabè" },
                  { value: "birth", label: "Je suis né(e) et réside au Burkina Faso" },
                  { value: "acquired", label: "Mariage, naturalisation ou décision" },
                ],
              },
              {
                id: "documents",
                title: "Disposez-vous d’un acte de naissance ?",
                options: [
                  { value: "yes", label: "Oui" },
                  { value: "no", label: "Non", description: "Le service vous indiquera comment l’obtenir" },
                ],
              },
            ]}
            evaluate={(answers) => ({
              eligible: Boolean(answers.link),
              title: "Votre situation peut être instruite en ligne",
              description: answers.documents === "yes" ? "Vous pouvez préparer votre dossier dès maintenant." : "Commencez par demander votre acte de naissance, puis revenez poursuivre la démarche.",
              action: <Button onClick={onStart}>Commencer avec ces réponses</Button>,
            })}
          />
        </div>
      </section>
      <section className="nationality-reassurance">
        <div>
          <Badge variant="success">Démarche guidée</Badge>
          <h2>
            Un dossier clair,
            <br />
            étape par étape.
          </h2>
        </div>
        <ol>
          <li>
            <Check />
            <span>
              <strong>Décrivez votre situation</strong>Le service adapte
              automatiquement les pièces demandées.
            </span>
          </li>
          <li>
            <Check />
            <span>
              <strong>Ajoutez vos justificatifs</strong>Vous vérifiez chaque
              document avant l’envoi.
            </span>
          </li>
          <li>
            <Check />
            <span>
              <strong>Suivez le traitement</strong>Chaque changement de statut
              apparaît dans votre espace.
            </span>
          </li>
        </ol>
      </section>
    </main>
  );
}

function NationalityForm({
  step,
  setStep,
  onHome,
}: {
  step: number;
  setStep: (value: number) => void;
  onHome: () => void;
}) {
  const [reason, setReason] = useState("parent");
  const labels = [
    "Situation",
    "Identité",
    "Parents",
    "Conjoint",
    "Justificatifs",
  ];
  return (
    <main className="nationality-form">
      <button onClick={onHome}>← Retour à l’accueil</button>
      <div className="nationality-form-head">
        <span>Nouvelle demande</span>
        <h1>Certificat de nationalité</h1>
        <Progress value={step * 20} label={`Étape ${step} sur 5`} />
      </div>
      <div className="nationality-form-layout">
        <aside>
          <ol>
            {labels.map((label, index) => (
              <li
                className={
                  index + 1 === step ? "active" : index + 1 < step ? "done" : ""
                }
                key={label}
              >
                <span>{index + 1 < step ? <Check /> : index + 1}</span>
                {label}
              </li>
            ))}
          </ol>
          <Alert title="Votre brouillon est enregistré">
            Vous pourrez reprendre cette demande depuis votre espace.
          </Alert>
        </aside>
        <Card className="nationality-form-card">
          {step === 1 ? (
            <>
              <Badge variant="neutral">Étape 1 sur 5</Badge>
              <h2>Quelle est votre situation ?</h2>
              <p>Choisissez le fondement qui correspond à votre demande.</p>
              <div className="nationality-options">
                <RadioGroup
                  legend="Fondement de la nationalité"
                  value={reason}
                  onValueChange={setReason}
                  options={[
                    { value: "parent", label: "Filiation", description: "Je suis né(e) d’un parent burkinabè" },
                    { value: "birth", label: "Naissance et résidence", description: "Je suis né(e) et réside au Burkina Faso, de parents étrangers" },
                    { value: "acquired", label: "Nationalité acquise", description: "Mariage, naturalisation ou décision administrative" },
                  ]}
                />
              </div>
            </>
          ) : step === 5 ? (
            <>
              <Badge variant="neutral">Étape 5 sur 5</Badge>
              <h2>Justificatifs adaptés</h2>
              <p>La liste dépend de la situation choisie à la première étape.</p>
              <DocumentChecklist items={[
                { id: "birth", label: "Acte de naissance", status: "provided", required: true },
                { id: "identity", label: "CNIB ou passeport", status: "validated", required: true },
                { id: "basis", label: reason === "parent" ? "Acte de naissance du parent burkinabè" : reason === "birth" ? "Certificat de résidence" : "Décision ou acte justificatif", status: "missing", required: true },
              ]} />
              <OfficialNotice title="Avant la transmission">
                <p>Les originaux pourront être demandés par le tribunal pendant l’instruction.</p>
              </OfficialNotice>
            </>
          ) : (
            <>
              <Badge variant="neutral">Étape {step} sur 5</Badge>
              <h2>{labels[step - 1]}</h2>
              <p>
                Renseignez les informations telles qu’elles figurent sur vos
                documents d’état civil.
              </p>
              <div className="nationality-fields">
                <Field
                  label="Nom de famille"
                  placeholder="Ex. Ouédraogo"
                  required
                />
                <Field label="Prénom(s)" placeholder="Ex. Issa" required />
                <Field label="Date de naissance" type="date" required />
                <div>
                  <label htmlFor="commune">Commune de naissance</label>
                  <Select id="commune">
                    <option>Ouagadougou</option>
                    <option>Bobo-Dioulasso</option>
                  </Select>
                </div>
              </div>
            </>
          )}
          <FormActions
            className="nationality-form-actions"
            secondaryLabel={step > 1 ? "Retour" : undefined}
            onSecondary={() => setStep(Math.max(1, step - 1))}
            saveLabel="Enregistrer le brouillon"
            primaryLabel={step < 5 ? "Continuer" : "Transmettre le dossier"}
            onPrimary={() => step < 5 && setStep(step + 1)}
          />
        </Card>
      </div>
    </main>
  );
}
