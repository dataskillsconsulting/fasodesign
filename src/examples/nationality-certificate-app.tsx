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
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Radio, Select } from "@/components/ui/form-controls";
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
                <Radio name="reason" defaultChecked>
                  Je suis né(e) d’un parent burkinabè
                </Radio>
                <Radio name="reason">
                  Je suis né(e) et réside au Burkina Faso, de parents étrangers
                </Radio>
                <Radio name="reason">
                  J’ai acquis la nationalité par mariage ou naturalisation
                </Radio>
              </div>
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
          <div className="nationality-form-actions">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Retour
              </Button>
            ) : (
              <span />
            )}
            {step < 5 ? (
              <Button onClick={() => setStep(step + 1)}>
                Continuer <ArrowRight />
              </Button>
            ) : (
              <Button>
                Transmettre le dossier <ArrowRight />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
