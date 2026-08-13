import { Check, CircleAlert, Clock3, CreditCard, FileBadge, MapPin, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/input";
import { Select } from "@/components/ui/form-controls";

export function Amount({ value, currency = "XOF", locale = "fr-BF", compact = false }: { value: number; currency?: string; locale?: string; compact?: boolean }) { return <span className="amount">{new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: currency === "XOF" ? "code" : "symbol", maximumFractionDigits: 0, notation: compact ? "compact" : "standard" }).format(value).replace("XOF", "FCFA")}</span>; }

export function AddressField({ prefix = "address", required }: { prefix?: string; required?: boolean }) { return <fieldset className="address-field"><legend><MapPin />Adresse</legend><div><Field id={`${prefix}-street`} label="Adresse ou secteur" placeholder="Ex. Secteur 15" required={required} /><Field id={`${prefix}-city`} label="Ville" placeholder="Ex. Ouagadougou" required={required} /><div><label htmlFor={`${prefix}-region`}>Région</label><Select id={`${prefix}-region`} defaultValue=""><option value="" disabled>Sélectionner une région</option><option>Centre</option><option>Hauts-Bassins</option><option>Centre-Ouest</option><option>Nord</option></Select></div><Field id={`${prefix}-country`} label="Pays" defaultValue="Burkina Faso" required={required} /></div></fieldset>; }

export function IdentityDocumentField({ prefix = "identity" }: { prefix?: string }) { return <fieldset className="identity-field"><legend><FileBadge />Pièce d’identité</legend><div><div><label htmlFor={`${prefix}-type`}>Type de pièce</label><Select id={`${prefix}-type`} defaultValue="cnib"><option value="cnib">CNIB</option><option value="passport">Passeport</option><option value="consular">Carte consulaire</option></Select></div><Field id={`${prefix}-number`} label="Numéro de la pièce" placeholder="Ex. B12345678" required /><Field id={`${prefix}-issued`} label="Date de délivrance" type="date" required /><Field id={`${prefix}-expires`} label="Date d’expiration" type="date" required /></div></fieldset>; }

export function PaymentSummary({ items, fee, totalLabel = "Total à payer", action }: { items: Array<{ label: string; amount: number }>; fee?: number; totalLabel?: string; action?: ReactNode }) { const total = items.reduce((sum, item) => sum + item.amount, fee ?? 0); return <Card className="payment-summary"><header><CreditCard /><div><h3>Récapitulatif du paiement</h3><p>Les frais sont affichés avant validation.</p></div></header><dl>{items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd><Amount value={item.amount} /></dd></div>)}{fee ? <div><dt>Frais de service</dt><dd><Amount value={fee} /></dd></div> : null}<div className="payment-total"><dt>{totalLabel}</dt><dd><Amount value={total} /></dd></div></dl>{action ? <footer>{action}</footer> : null}</Card>; }

export function ActionMenu({ label = "Actions", children }: { label?: string; children: ReactNode }) { return <DropdownMenu label={label} trigger={<Button size="icon-sm" variant="ghost" aria-label={label}><MoreHorizontal /></Button>}>{children}</DropdownMenu>; }
export { DropdownMenuItem as ActionMenuItem, DropdownMenuSeparator as ActionMenuSeparator };

export type StatusTrackerItem = { title: string; description?: string; date?: string; status: "complete" | "current" | "upcoming" | "error" };
export function StatusTracker({ items, label = "Historique du dossier" }: { items: StatusTrackerItem[]; label?: string }) { return <ol className="status-tracker" aria-label={label}>{items.map((item, index) => <li key={`${item.title}-${index}`} className={item.status}>{item.status === "complete" ? <Check /> : item.status === "error" ? <CircleAlert /> : <Clock3 />}<div><strong>{item.title}</strong>{item.description ? <p>{item.description}</p> : null}{item.date ? <time>{item.date}</time> : null}</div>{item.status === "current" ? <Badge variant="information" size="sm">En cours</Badge> : null}</li>)}</ol>; }
