import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useEffect, useId, useRef, useState, type FieldsetHTMLAttributes, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Stepper, type StepperItem } from "@/components/ui/stepper";

export type AdministrativeFormProps = {
  steps: StepperItem[];
  currentStep: number;
  children: ReactNode;
  onStepChange?: (step: number) => void;
  onSave?: () => void;
  saving?: boolean;
  className?: string;
};

/** Shell for a controlled, resumable multi-step public-service form. */
export function AdministrativeForm({ steps, currentStep, children, onStepChange, onSave, saving = false, className }: AdministrativeFormProps) {
  const active = Math.min(Math.max(currentStep, 1), steps.length);
  const isLast = active === steps.length;
  return <div className={cn("administrative-form", className)} aria-busy={saving || undefined}>
    <Stepper items={steps} currentStep={active} />
    <section className="administrative-form-step" aria-labelledby="administrative-form-step-title">
      <h2 id="administrative-form-step-title" className="sr-only">{steps[active - 1]?.label}</h2>
      {children}
    </section>
    <FormActions primaryLabel={isLast ? "Transmettre la demande" : "Continuer"} primaryLoading={saving} onPrimary={() => onStepChange?.(isLast ? active : active + 1)} secondaryLabel={active > 1 ? "Retour" : undefined} onSecondary={() => onStepChange?.(active - 1)} saveLabel={onSave ? "Enregistrer le brouillon" : undefined} onSave={onSave} />
  </div>;
}

export type FieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend: string;
  description?: string;
  error?: string;
  optional?: boolean;
};

export function Fieldset({ legend, description, error, optional, children, className, ...props }: FieldsetProps) {
  const descriptionId = useId();
  const errorId = useId();
  return <fieldset className={cn("form-fieldset", className)} aria-describedby={[description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined} aria-invalid={error ? true : undefined} {...props}><legend>{legend}{optional ? <span>Facultatif</span> : null}</legend>{description ? <p id={descriptionId} className="form-fieldset-description">{description}</p> : null}<div className="form-fieldset-content">{children}</div>{error ? <p id={errorId} className="form-fieldset-error" role="alert">{error}</p> : null}</fieldset>;
}

export type FormSectionProps = { title: string; description?: string; children: ReactNode; actions?: ReactNode; className?: string };

export function FormSection({ title, description, children, actions, className }: FormSectionProps) {
  const titleId = useId();
  return <section className={cn("form-section", className)} aria-labelledby={titleId}><header><div><h2 id={titleId}>{title}</h2>{description ? <p>{description}</p> : null}</div>{actions}</header><div className="form-section-content">{children}</div></section>;
}

export type ChoiceOption = { value: string; label: string; description?: string; disabled?: boolean };
type ChoiceGroupBaseProps = { legend: string; options: ChoiceOption[]; hint?: string; error?: string; required?: boolean; name?: string; orientation?: "vertical" | "horizontal"; className?: string };
export type RadioGroupProps = ChoiceGroupBaseProps & { value?: string; onValueChange?: (value: string) => void };

export function RadioGroup({ legend, options, value, onValueChange, hint, error, required, name, orientation = "vertical", className }: RadioGroupProps) {
  const generatedName = useId();
  return <Fieldset legend={legend} description={hint} error={error} className={cn("choice-group", `choice-group-${orientation}`, className)}><div role="radiogroup" aria-required={required || undefined}>{options.map((option) => <label className="choice-card" key={option.value}><input type="radio" name={name ?? generatedName} value={option.value} checked={value === option.value} onChange={() => onValueChange?.(option.value)} required={required} disabled={option.disabled} /><span><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span></label>)}</div></Fieldset>;
}

export type CheckboxGroupProps = ChoiceGroupBaseProps & { value?: string[]; onValueChange?: (value: string[]) => void; minSelected?: number };

export function CheckboxGroup({ legend, options, value = [], onValueChange, hint, error, required, minSelected, orientation = "vertical", className }: CheckboxGroupProps) {
  const requiredCount = minSelected ?? (required ? 1 : 0);
  function toggle(optionValue: string) { onValueChange?.(value.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...value, optionValue]); }
  return <Fieldset legend={legend} description={hint} error={error} className={cn("choice-group", `choice-group-${orientation}`, className)}><div aria-label={legend}>{options.map((option) => <label className="choice-card" key={option.value}><input type="checkbox" value={option.value} checked={value.includes(option.value)} onChange={() => toggle(option.value)} disabled={option.disabled} /><span><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span></label>)}</div>{requiredCount > 0 ? <small className="choice-group-requirement">Sélectionnez au moins {requiredCount} option{requiredCount > 1 ? "s" : ""}.</small> : null}</Fieldset>;
}

export type PasswordFieldProps = Omit<React.ComponentProps<typeof Input>, "type" | "trailing"> & { label: string; hint?: string; error?: string; showLabel?: string; hideLabel?: string };

export function PasswordField({ id: providedId, label, hint, error, showLabel = "Afficher le mot de passe", hideLabel = "Masquer le mot de passe", required, ...props }: PasswordFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = hint || error ? `${id}-description` : undefined;
  const [visible, setVisible] = useState(false);
  return <div className="field"><div className="field-label-row"><label htmlFor={id}>{label}</label></div><div className="password-field"><Input id={id} type={visible ? "text" : "password"} autoComplete="current-password" required={required} invalid={Boolean(error)} aria-describedby={descriptionId} leadingIcon={<LockKeyhole />} {...props} /><button type="button" aria-label={visible ? hideLabel : showLabel} aria-pressed={visible} onClick={() => setVisible((current) => !current)}>{visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</button></div>{error ? <p className="field-message error" role="alert" id={descriptionId}>{error}</p> : hint ? <p className="field-message" id={descriptionId}>{hint}</p> : null}</div>;
}

export type NumberFieldProps = Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange"> & { label: string; value?: number; onValueChange?: (value: number | undefined) => void; hint?: string; error?: string; locale?: string; minimum?: number; maximum?: number };

function parseLocalizedNumber(value: string) { const normalized = value.replaceAll("\u00a0", "").replaceAll(" ", "").replace(",", ".").replace(/[^\d.-]/g, ""); const number = Number(normalized); return normalized && Number.isFinite(number) ? number : undefined; }

export function NumberField({ id: providedId, label, value, onValueChange, hint, error, locale = "fr-BF", minimum, maximum, required, ...props }: NumberFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = hint || error ? `${id}-description` : undefined;
  const format = (nextValue?: number) => nextValue === undefined ? "" : new Intl.NumberFormat(locale, { useGrouping: false, maximumFractionDigits: 20 }).format(nextValue);
  const [draft, setDraft] = useState(() => format(value));
  const lastEmitted = useRef<number | undefined>(value);
  useEffect(() => { if (value !== lastEmitted.current) setDraft(format(value)); }, [locale, value]);
  return <div className="field"><div className="field-label-row"><label htmlFor={id}>{label}</label></div><Input id={id} type="text" inputMode="decimal" value={draft} onBlur={() => setDraft(format(lastEmitted.current))} onChange={(event) => { const raw = event.target.value; const next = parseLocalizedNumber(raw); const constrained = next === undefined ? undefined : Math.min(maximum ?? Infinity, Math.max(minimum ?? -Infinity, next)); setDraft(raw); lastEmitted.current = constrained; onValueChange?.(constrained); }} required={required} invalid={Boolean(error)} aria-describedby={descriptionId} {...props} />{error ? <p className="field-message error" role="alert" id={descriptionId}>{error}</p> : hint ? <p className="field-message" id={descriptionId}>{hint}</p> : null}</div>;
}

export type CurrencyFieldProps = Omit<NumberFieldProps, "locale"> & { currency?: string; locale?: string };

export function CurrencyField({ currency = "XOF", locale = "fr-BF", ...props }: CurrencyFieldProps) {
  const currencyLabel = currency === "XOF" ? "FCFA" : currency;
  return <NumberField locale={locale} inputMode="numeric" trailing={<span aria-hidden="true">{currencyLabel}</span>} aria-label={undefined} {...props} />;
}

export type FormActionsProps = { primaryLabel?: string; onPrimary?: () => void; primaryLoading?: boolean; primaryDisabled?: boolean; secondaryLabel?: string; onSecondary?: () => void; saveLabel?: string; onSave?: () => void; className?: string };

export function FormActions({ primaryLabel = "Continuer", onPrimary, primaryLoading, primaryDisabled, secondaryLabel, onSecondary, saveLabel, onSave, className }: FormActionsProps) {
  return <footer className={cn("form-actions", className)}>{secondaryLabel ? <Button variant="outline" onClick={onSecondary}>{secondaryLabel}</Button> : <span />}{saveLabel ? <Button variant="ghost" onClick={onSave}>{saveLabel}</Button> : null}<Button onClick={onPrimary} loading={primaryLoading} disabled={primaryDisabled}>{primaryLabel}</Button></footer>;
}
