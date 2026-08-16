import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronDown,
  File as FileIcon,
  FileUp,
  Info,
  LoaderCircle,
  Search,
  UploadCloud,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FileUpload({
  label = "Ajouter un document",
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = "5 Mo",
  maxSizeBytes = 5 * 1024 * 1024,
  value,
  onValueChange,
  error,
  disabled,
}: {
  label?: string;
  accept?: string;
  maxSize?: string;
  maxSizeBytes?: number;
  value?: File | null;
  onValueChange?: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}) {
  const id = useId();
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [internalError, setInternalError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const file = value === undefined ? internalFile : value;
  const resolvedError = error ?? internalError;
  function selectFile(nextFile: File | null) { if (nextFile && nextFile.size > maxSizeBytes) { setInternalError(`Le fichier dépasse la taille maximale de ${maxSize}.`); return; } setInternalError(undefined); if (value === undefined) setInternalFile(nextFile); onValueChange?.(nextFile); }
  function removeFile() { selectFile(null); if (inputRef.current) inputRef.current.value = ""; }
  return (
    <div>
      <label className={cn("file-dropzone", file && "has-file", resolvedError && "has-error")} htmlFor={id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); if (!disabled) selectFile(event.dataTransfer.files[0] ?? null); }}>
        <input ref={inputRef} id={id} type="file" accept={accept} disabled={disabled} aria-invalid={resolvedError ? true : undefined} aria-describedby={resolvedError ? `${id}-error` : undefined} onChange={(event) => selectFile(event.target.files?.[0] ?? null)} />
        {file ? <FileIcon /> : <UploadCloud />}
        <strong>{file ? file.name : label}</strong>
        <span>{file ? `${Math.max(.1, file.size / 1024 / 1024).toFixed(1)} Mo` : `PDF, JPG ou PNG · ${maxSize} maximum`}</span>
        {!file ? <em>Parcourir les fichiers</em> : null}
      </label>
      {resolvedError ? <p className="field-message error" role="alert" id={`${id}-error`}>{resolvedError}</p> : null}
      {file ? <button type="button" className="file-remove" onClick={removeFile}><X /> Retirer le fichier</button> : null}
    </div>
  );
}

export type OtpInputProps = { length?: number; label?: string; value?: string; onValueChange?: (value: string) => void; onComplete?: (value: string) => void; error?: string; disabled?: boolean };
export function OtpInput({ length = 6, label = "Code de vérification", value, onValueChange, onComplete, error, disabled }: OtpInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const resolvedValue = value === undefined ? internalValue : value;
  const values = Array.from({ length }, (_, index) => resolvedValue[index] ?? "");
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const errorId = useId();
  function update(next: string) { const digits = next.replace(/\D/g, "").slice(0, length); if (value === undefined) setInternalValue(digits); onValueChange?.(digits); if (digits.length === length) onComplete?.(digits); }
  return (
    <fieldset className="otp-field">
      <legend>{label}</legend>
      <div>
        {values.map((value, index) => (
          <input
            key={index}
            ref={(node) => { refs.current[index] = node; }}
            value={value}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Chiffre ${index + 1} sur ${length}`}
            maxLength={1}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onPaste={(event) => { event.preventDefault(); const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length); update(digits); refs.current[Math.min(digits.length, length) - 1]?.focus(); }}
            onChange={(event) => {
              const digit = event.target.value.replace(/\D/g, "").slice(-1);
              update(values.map((item, itemIndex) => itemIndex === index ? digit : item).join(""));
              if (digit) refs.current[index + 1]?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !value) refs.current[index - 1]?.focus();
            }}
          />
        ))}
      </div>
      {error ? <p className="field-message error" role="alert" id={errorId}>{error}</p> : null}
    </fieldset>
  );
}

export function DateField({ label = "Date" }: { label?: string }) {
  const id = useId();
  return <div className="field"><div className="field-label-row"><label htmlFor={id}>{label}</label></div><Input id={id} type="date" leadingIcon={<CalendarDays />} /></div>;
}

export function PhoneField({ label = "Numéro de téléphone" }: { label?: string }) {
  const id = useId();
  return (
    <div className="field">
      <div className="field-label-row"><label htmlFor={id}>{label}</label></div>
      <div className="phone-field"><span>+226</span><Input id={id} inputMode="tel" placeholder="70 00 00 00" aria-describedby={`${id}-hint`} /></div>
      <p className="field-message" id={`${id}-hint`}>Huit chiffres, sans l’indicatif.</p>
    </div>
  );
}

export function Combobox({ label = "Commune", options }: { label?: string; options: string[] }) {
  const id = useId();
  const listId = `${id}-options`;
  return (
    <div className="field">
      <div className="field-label-row"><label htmlFor={id}>{label}</label></div>
      <Input id={id} list={listId} leadingIcon={<Search />} placeholder="Rechercher…" autoComplete="off" />
      <datalist id={listId}>{options.map((option) => <option value={option} key={option} />)}</datalist>
    </div>
  );
}

export function ErrorSummary({ errors }: { errors: Array<{ field: string; message: string }> }) {
  return (
    <div className="error-summary" role="alert" tabIndex={-1}>
      <AlertCircle />
      <div><strong>Corrigez les informations suivantes</strong><ul>{errors.map((error) => <li key={error.field}><a href={`#${error.field}`}>{error.message}</a></li>)}</ul></div>
    </div>
  );
}

export type AccordionItem = { id?: string; title: string; content: ReactNode; disabled?: boolean };
export type AccordionProps = { items: AccordionItem[]; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void; multiple?: boolean };
export function Accordion({ items, value, defaultValue = [items[0]?.id ?? "0"], onValueChange, multiple = false }: AccordionProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const open = value ?? internalValue;
  const baseId = useId();
  function toggle(id: string) { const next = open.includes(id) ? open.filter((item) => item !== id) : multiple ? [...open, id] : [id]; if (value === undefined) setInternalValue(next); onValueChange?.(next); }
  return (
    <div className="accordion">
      {items.map((item, index) => { const id = item.id ?? String(index); const triggerId = `${baseId}-trigger-${id}`; const panelId = `${baseId}-panel-${id}`; return (
        <div key={item.title}>
          <button type="button" id={triggerId} aria-expanded={open.includes(id)} aria-controls={panelId} disabled={item.disabled} onClick={() => toggle(id)}>
            {item.title}<ChevronDown />
          </button>
          {open.includes(id) ? <div id={panelId} role="region" aria-labelledby={triggerId}>{item.content}</div> : null}
        </div>
      ); })}
    </div>
  );
}

export function EmptyState({ icon = <FileUp />, title, description, action }: { icon?: ReactNode; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><span>{icon}</span><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function Spinner({ label = "Chargement en cours" }: { label?: string }) {
  return <span className="spinner" role="status"><LoaderCircle /><span className="sr-only">{label}</span></span>;
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return <span className="tooltip"><span tabIndex={0}>{children}</span><span role="tooltip">{label}</span></span>;
}

export function Toast({ title, children, onDismiss }: { title: string; children?: ReactNode; onDismiss: () => void }) {
  return (
    <div className="toast" role="status">
      <span><Check /></span><div><strong>{title}</strong>{children ? <p>{children}</p> : null}</div>
      <button onClick={onDismiss} aria-label="Fermer la notification"><X /></button>
    </div>
  );
}

export function GlobalBanner({ children }: { children: ReactNode }) {
  return <div className="global-banner"><Info /> <div>{children}</div><Button variant="link">En savoir plus</Button></div>;
}
