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
}: {
  label?: string;
  accept?: string;
  maxSize?: string;
}) {
  const id = useId();
  const [file, setFile] = useState<File | null>(null);
  return (
    <div>
      <label className={cn("file-dropzone", file && "has-file")} htmlFor={id}>
        <input id={id} type="file" accept={accept} onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
        {file ? <FileIcon /> : <UploadCloud />}
        <strong>{file ? file.name : label}</strong>
        <span>{file ? `${Math.max(.1, file.size / 1024 / 1024).toFixed(1)} Mo` : `PDF, JPG ou PNG · ${maxSize} maximum`}</span>
        {!file ? <em>Parcourir les fichiers</em> : null}
      </label>
      {file ? <button className="file-remove" onClick={() => setFile(null)}><X /> Retirer le fichier</button> : null}
    </div>
  );
}

export function OtpInput({ length = 6, label = "Code de vérification" }: { length?: number; label?: string }) {
  const [values, setValues] = useState(() => Array.from({ length }, () => ""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);
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
            onChange={(event) => {
              const digit = event.target.value.replace(/\D/g, "").slice(-1);
              setValues((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item));
              if (digit) refs.current[index + 1]?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !value) refs.current[index - 1]?.focus();
            }}
          />
        ))}
      </div>
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

export function Accordion({ items }: { items: Array<{ title: string; content: ReactNode }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={item.title}>
          <button aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
            {item.title}<ChevronDown />
          </button>
          {open === index ? <div>{item.content}</div> : null}
        </div>
      ))}
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
