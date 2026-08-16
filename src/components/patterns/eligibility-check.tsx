import { CheckCircle2, CircleX } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { FormActions, RadioGroup, type ChoiceOption } from "@/components/ui/form-patterns";
import { Progress } from "@/components/ui/navigation";

export type EligibilityAnswer = Record<string, string>;
export type EligibilityQuestion = { id: string; title: string; description?: string; options: ChoiceOption[]; required?: boolean };
export type EligibilityResult = { eligible: boolean; title: string; description: string; action?: ReactNode };
export type EligibilityCheckProps = { questions: EligibilityQuestion[]; evaluate: (answers: EligibilityAnswer) => EligibilityResult; title?: string; onComplete?: (answers: EligibilityAnswer, result: EligibilityResult) => void };

export function EligibilityCheck({ questions, evaluate, title = "Vérifier votre éligibilité", onComplete }: EligibilityCheckProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<EligibilityAnswer>({});
  const [result, setResult] = useState<EligibilityResult>();
  const question = questions[index];
  if (!questions.length) return null;
  function reset() { setIndex(0); setAnswers({}); setResult(undefined); }
  function next() { if (index < questions.length - 1) setIndex((current) => current + 1); else { const resolved = evaluate(answers); setResult(resolved); onComplete?.(answers, resolved); } }
  if (result) { const Icon = result.eligible ? CheckCircle2 : CircleX; return <section className={`eligibility-result is-${result.eligible ? "eligible" : "ineligible"}`} aria-live="polite"><Icon aria-hidden="true" /><div><h2>{result.title}</h2><p>{result.description}</p>{result.action ? <div>{result.action}</div> : null}<Button variant="outline" onClick={reset}>Recommencer</Button></div></section>; }
  return <section className="eligibility-check"><header><span>{title}</span><h2>{question.title}</h2>{question.description ? <p>{question.description}</p> : null}<Progress value={Math.round(((index + 1) / questions.length) * 100)} label={`Question ${index + 1} sur ${questions.length}`} /></header><RadioGroup legend={question.title} className="eligibility-options" options={question.options} value={answers[question.id]} onValueChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} required={question.required ?? true} /><FormActions secondaryLabel={index ? "Précédent" : undefined} onSecondary={() => setIndex((current) => Math.max(0, current - 1))} primaryLabel={index === questions.length - 1 ? "Voir le résultat" : "Continuer"} primaryDisabled={!answers[question.id]} onPrimary={next} /></section>;
}
