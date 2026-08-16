import { Building2, Check, Clock3, Copy, ExternalLink, FileCheck2, FileQuestion, FileX2, Mail, MapPin, Phone } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ServiceCardProps = { title: string; description?: string; href?: string; organization?: string; fee?: string; processingTime?: string; online?: boolean; badge?: string; actionLabel?: string; className?: string };
export function ServiceCard({ title, description, href, organization, fee, processingTime, online, badge, actionLabel = "Voir la démarche", className }: ServiceCardProps) {
  return <Card className={cn("service-card", className)}><header>{badge ? <Badge size="sm" variant="information">{badge}</Badge> : null}<h3>{title}</h3>{description ? <p>{description}</p> : null}</header><dl>{organization ? <div><dt>Organisme</dt><dd>{organization}</dd></div> : null}{fee ? <div><dt>Coût</dt><dd>{fee}</dd></div> : null}{processingTime ? <div><dt>Délai</dt><dd>{processingTime}</dd></div> : null}{online !== undefined ? <div><dt>Disponibilité</dt><dd>{online ? "En ligne" : "Sur place"}</dd></div> : null}</dl>{href ? <a className="service-card-action" href={href}>{actionLabel}<ExternalLink aria-hidden="true" /></a> : null}</Card>;
}

export type DocumentStatus = "missing" | "provided" | "rejected" | "validated";
export type DocumentChecklistItem = { id: string; label: string; description?: string; status: DocumentStatus; reason?: string; required?: boolean; action?: ReactNode };
const documentStatus: Record<DocumentStatus, { label: string; icon: typeof Check; variant: "neutral" | "information" | "destructive" | "success" }> = { missing: { label: "Manquant", icon: FileQuestion, variant: "neutral" }, provided: { label: "Fourni", icon: FileCheck2, variant: "information" }, rejected: { label: "Refusé", icon: FileX2, variant: "destructive" }, validated: { label: "Validé", icon: Check, variant: "success" } };
export function DocumentChecklist({ items, title = "Pièces justificatives" }: { items: DocumentChecklistItem[]; title?: string }) {
  const titleId = useId();
  return <section className="document-checklist" aria-labelledby={titleId}><header><h2 id={titleId}>{title}</h2><span>{items.filter((item) => item.status === "validated").length} sur {items.length} validées</span></header><ul>{items.map((item) => { const resolved = documentStatus[item.status]; const Icon = resolved.icon; return <li key={item.id} className={`is-${item.status}`}><Icon aria-hidden="true" /><div><strong>{item.label}{item.required ? <span className="sr-only"> (obligatoire)</span> : null}</strong>{item.description ? <p>{item.description}</p> : null}{item.reason ? <p className="document-reason">Motif : {item.reason}</p> : null}</div><Badge size="sm" variant={resolved.variant}>{resolved.label}</Badge>{item.action ? <div className="document-action">{item.action}</div> : null}</li>; })}</ul></section>;
}

export type ApplicationSummarySection = { id: string; title: string; items: Array<{ label: string; value: ReactNode }>; onEdit?: () => void; editLabel?: string };
export function ApplicationSummary({ sections, title = "Récapitulatif de la demande" }: { sections: ApplicationSummarySection[]; title?: string }) {
  return <section className="application-summary-card"><h2>{title}</h2>{sections.map((section) => <section key={section.id} aria-labelledby={`${section.id}-summary-title`}><header><h3 id={`${section.id}-summary-title`}>{section.title}</h3>{section.onEdit ? <button type="button" onClick={section.onEdit}>{section.editLabel ?? `Modifier ${section.title}`}</button> : null}</header><dl>{section.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>)}</section>;
}

export function ReferenceNumber({ value, label = "Référence du dossier", copyLabel = "Copier la référence" }: { value: string; label?: string; copyLabel?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard?.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
  return <div className="reference-number"><span>{label}</span><strong>{value}</strong><button type="button" onClick={copy} aria-label={copyLabel}><Copy aria-hidden="true" />{copied ? "Copiée" : "Copier"}</button><span className="sr-only" role="status" aria-live="polite">{copied ? "Référence copiée" : ""}</span></div>;
}

export type DeadlineProps = { label?: string; date?: string; duration?: string; overdue?: boolean; description?: string };
export function Deadline({ label = "Délai de traitement", date, duration, overdue, description }: DeadlineProps) {
  return <div className={cn("deadline", overdue && "is-overdue")}><Clock3 aria-hidden="true" /><div><span>{label}</span><strong>{date ? <time dateTime={date}>{new Intl.DateTimeFormat("fr-BF", { dateStyle: "long" }).format(new Date(`${date}T12:00:00`))}</time> : duration}</strong>{description ? <p>{description}</p> : null}{overdue ? <Badge variant="destructive" size="sm">Délai dépassé</Badge> : null}</div></div>;
}

export type ContactBlockProps = { title?: string; organization?: string; phone?: string; email?: string; address?: string; hours?: string; children?: ReactNode };
export function ContactBlock({ title = "Besoin d’aide ?", organization, phone, email, address, hours, children }: ContactBlockProps) {
  const titleId = useId();
  return <aside className="contact-block" aria-labelledby={titleId}><header><Building2 aria-hidden="true" /><div><h2 id={titleId}>{title}</h2>{organization ? <p>{organization}</p> : null}</div></header><ul>{phone ? <li><Phone aria-hidden="true" /><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li> : null}{email ? <li><Mail aria-hidden="true" /><a href={`mailto:${email}`}>{email}</a></li> : null}{address ? <li><MapPin aria-hidden="true" /><span>{address}</span></li> : null}{hours ? <li><Clock3 aria-hidden="true" /><span>{hours}</span></li> : null}</ul>{children}</aside>;
}

export function OfficialNotice({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <aside className="official-notice"><span aria-hidden="true">BF</span><div><h2>{title}</h2><div>{children}</div>{action ? <footer>{action}</footer> : null}</div></aside>;
}
