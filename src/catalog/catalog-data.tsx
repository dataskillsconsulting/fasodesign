import { Accessibility, BookOpen, Box, Component, Grid2X2, Palette } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { DataTableColumn } from "@/components/ui/data-table";
import { formatDate } from "@/lib/format";

export type ComponentStatus = "Stable" | "Beta" | "Experimental" | "Deprecated";
export type ComponentMetadata = { name: string; status: ComponentStatus; since: string; states: string[] };

export const priorityComponentMetadata: ComponentMetadata[] = [
  { name: "Button", status: "Stable", since: "1.0.0", states: ["loading", "disabled", "focus"] },
  { name: "Input", status: "Stable", since: "1.0.0", states: ["error", "disabled", "focus"] },
  { name: "Alert", status: "Stable", since: "1.0.0", states: ["information", "success", "warning", "error"] },
  { name: "Dialog", status: "Stable", since: "1.0.0", states: ["open", "closed", "focus trap"] },
  { name: "DataTable", status: "Stable", since: "1.0.0", states: ["loading", "empty", "sorting", "selection"] },
  { name: "EmptyState", status: "Beta", since: "1.0.0", states: ["empty", "with action"] },
  { name: "StatusTracker", status: "Beta", since: "1.0.0", states: ["current", "complete", "upcoming", "error"] },
];

export const navigation = [
  { label: "Commencer", icon: BookOpen, items: ["Vue d’ensemble", "Architecture", "Installation", "Principes"] },
  { label: "Fondations", icon: Palette, items: ["Couleurs", "Typographie", "Espacement", "Iconographie"] },
  { label: "Composants de base", icon: Component, items: [
    "Bouton", "Champ de saisie", "Badge", "Alerte", "Formulaires", "Navigation", "Dialogue", "Tableau",
    "Téléversement de fichier", "Code de vérification", "Champ de date", "Champ de téléphone", "Autocomplétion", "Résumé d’erreurs",
    "Accordéon", "État vide", "Notification", "Infobulle", "Indicateur de chargement", "Avatar", "Liste de données", "Carte statistique", "Bannière globale",
    "Barre de recherche", "Menu de navigation", "Sélecteur de date", "Prise de rendez-vous", "Fenêtre contextuelle", "Champ composé", "Étiquette", "Aperçu de fichier", "Centre de notifications", "Dialogue de confirmation",
  ] },
  { label: "Composants métier", icon: Box, items: ["Informations administratives", "Dossier et paiement", "Formulaires administratifs", "Services aux citoyens", "Éligibilité"] },
  { label: "Patrons de parcours", icon: Grid2X2, items: ["Démarche en ligne", "Tableau de bord", "Suivi de dossier"] },
  { label: "Gabarits institutionnels", icon: Box, items: ["Structure officielle"] },
  { label: "Accessibilité", icon: Accessibility, items: ["Référentiel", "Rédaction", "Tests"] },
];

export const foundations = [
  { icon: Palette, title: "Une identité publique", text: "Des couleurs nationales utilisées comme repères, jamais comme décoration." },
  { icon: Accessibility, title: "Accessible d’abord", text: "Contrastes AA, clavier, français clair et zones tactiles généreuses." },
  { icon: Box, title: "Conçu pour durer", text: "Des primitives stables, composables et simples à maintenir." },
];

export const swatches = [
  { name: "Vert institution", value: "#006A45", className: "bg-[#006A45]" },
  { name: "Vert clair", value: "#E8F1ED", className: "bg-[#E8F1ED]" },
  { name: "Encre", value: "#1E2A24", className: "bg-[#1E2A24]" },
  { name: "Gris texte", value: "#5F6B65", className: "bg-[#5F6B65]" },
  { name: "Gris interface", value: "#D9DFDC", className: "bg-[#D9DFDC]" },
  { name: "Blanc", value: "#FFFFFF", className: "bg-white border" },
];

export const buttonApi = [
  ["variant", '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', '"default"'],
  ["size", '"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"', '"default"'],
  ["width", '"auto" | "full"', '"auto"'],
  ["loading", "boolean", "false"],
  ["loadingText", "ReactNode", "—"],
] as const;

export const requestRows = [
  { reference: "BF-0148", service: "Certificat de nationalité", status: "Validé", updated: "2026-07-25" },
  { reference: "BF-0132", service: "Casier judiciaire", status: "En attente", updated: "2026-07-23" },
  { reference: "BF-0096", service: "Extrait de naissance", status: "Brouillon", updated: "2026-07-18" },
];

export const requestColumns: DataTableColumn<(typeof requestRows)[number]>[] = [
  { key: "reference", header: "Référence", cell: (row) => <code>{row.reference}</code>, sortValue: (row) => row.reference },
  { key: "service", header: "Démarche", cell: (row) => row.service, sortValue: (row) => row.service },
  { key: "status", header: "Statut", cell: (row) => <Badge variant={row.status === "Validé" ? "success" : row.status === "En attente" ? "warning" : "neutral"} size="sm">{row.status}</Badge>, sortValue: (row) => row.status },
  { key: "updated", header: "Mise à jour", cell: (row) => formatDate(row.updated), sortValue: (row) => row.updated },
];

export const searchablePages = navigation.flatMap((group) => group.items.map((label) => ({ label, group: group.label, id: label.toLowerCase().replaceAll(" ", "-") })));
