import {
  Accessibility,
  AlertTriangle,
  Archive,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Component,
  Copy,
  Download,
  Ellipsis,
  FileCheck2,
  Grid2X2,
  Menu,
  Moon,
  Palette,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { PageContainer } from "@/components/design-system/page-container";
import {
  GovernmentFooter,
  GovernmentHeader,
} from "@/components/design-system/government-layout";
import {
  CaseTrackingPattern,
  CitizenDashboardPattern,
  OnlineApplicationPattern,
} from "@/components/patterns/business-patterns";
import { Alert } from "@/components/ui/alert";
import {
  Accordion,
  Combobox,
  DateField,
  EmptyState,
  ErrorSummary,
  FileUpload,
  GlobalBanner,
  OtpInput,
  PhoneField,
  Spinner,
  Toast,
  Tooltip,
} from "@/components/ui/advanced";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, DataList, Separator, StatCard } from "@/components/ui/content";
import { Dialog } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/calendar";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  FilePreview,
  NotificationCenter,
  Tag,
} from "@/components/ui/feedback";
import {
  Checkbox,
  Radio,
  Select,
  Switch,
  Textarea,
} from "@/components/ui/form-controls";
import { Field, Input } from "@/components/ui/input";
import {
  Breadcrumb,
  Pagination,
  Progress,
  Skeleton,
  Tabs,
} from "@/components/ui/navigation";
import {
  NavigationMenu,
  PageHeader,
  SectionHeader,
} from "@/components/ui/navigation-menu";
import {
  FormField,
  IconButton,
  Link,
  Popover,
  SearchBox,
} from "@/components/ui/primitives";
import { Stepper } from "@/components/ui/stepper";
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
  AddressField,
  Amount,
  IdentityDocumentField,
  PaymentSummary,
  StatusTracker,
} from "@/components/patterns/service-components";
import { cn } from "@/lib/utils";
import { withBaseUrl } from "@/lib/base-url";

type Theme = "light" | "dark";

const navigation = [
  {
    label: "Commencer",
    icon: BookOpen,
    items: ["Vue d’ensemble", "Installation", "Principes"],
  },
  {
    label: "Fondations",
    icon: Palette,
    items: ["Couleurs", "Typographie", "Espacement", "Iconographie"],
  },
  {
    label: "Composants",
    icon: Component,
    count: 58,
    items: [
      "Bouton",
      "Champ de saisie",
      "Badge",
      "Alerte",
      "Formulaires",
      "Navigation",
      "Dialogue",
      "Tableau",
      "Composants avancés",
      "Composants complémentaires",
      "Structure officielle",
    ],
  },
  {
    label: "Patrons métier",
    icon: Grid2X2,
    items: ["Démarche en ligne", "Tableau de bord", "Suivi de dossier"],
  },
  {
    label: "Accessibilité",
    icon: Accessibility,
    items: ["Référentiel", "Rédaction", "Tests"],
  },
];

const foundations = [
  {
    icon: Palette,
    title: "Une identité publique",
    text: "Des couleurs nationales utilisées comme repères, jamais comme décoration.",
  },
  {
    icon: Accessibility,
    title: "Accessible d’abord",
    text: "Contrastes AA, clavier, français clair et zones tactiles généreuses.",
  },
  {
    icon: Box,
    title: "Conçu pour durer",
    text: "Des primitives stables, composables et simples à maintenir.",
  },
];

const swatches = [
  { name: "Vert institution", value: "#006A45", className: "bg-[#006A45]" },
  { name: "Vert clair", value: "#E8F1ED", className: "bg-[#E8F1ED]" },
  { name: "Encre", value: "#1E2A24", className: "bg-[#1E2A24]" },
  { name: "Gris texte", value: "#5F6B65", className: "bg-[#5F6B65]" },
  { name: "Gris interface", value: "#D9DFDC", className: "bg-[#D9DFDC]" },
  { name: "Blanc", value: "#FFFFFF", className: "bg-white border" },
];

const buttonApi = [
  [
    "variant",
    '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    '"default"',
  ],
  [
    "size",
    '"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"',
    '"default"',
  ],
  ["width", '"auto" | "full"', '"auto"'],
  ["loading", "boolean", "false"],
  ["loadingText", "ReactNode", "—"],
];

const requestRows = [
  {
    reference: "BF-0148",
    service: "Certificat de nationalité",
    status: "Validé",
    updated: "2026-07-25",
  },
  {
    reference: "BF-0132",
    service: "Casier judiciaire",
    status: "En attente",
    updated: "2026-07-23",
  },
  {
    reference: "BF-0096",
    service: "Extrait de naissance",
    status: "Brouillon",
    updated: "2026-07-18",
  },
];

const requestColumns: DataTableColumn<(typeof requestRows)[number]>[] = [
  {
    key: "reference",
    header: "Référence",
    cell: (row) => <code>{row.reference}</code>,
    sortValue: (row) => row.reference,
  },
  {
    key: "service",
    header: "Démarche",
    cell: (row) => row.service,
    sortValue: (row) => row.service,
  },
  {
    key: "status",
    header: "Statut",
    cell: (row) => (
      <Badge
        variant={
          row.status === "Validé"
            ? "success"
            : row.status === "En attente"
              ? "warning"
              : "neutral"
        }
        size="sm"
      >
        {row.status}
      </Badge>
    ),
    sortValue: (row) => row.status,
  },
  {
    key: "updated",
    header: "Mise à jour",
    cell: (row) =>
      new Intl.DateTimeFormat("fr-BF", { dateStyle: "medium" }).format(
        new Date(row.updated),
      ),
    sortValue: (row) => row.updated,
  },
];

const searchablePages = navigation.flatMap((group) =>
  group.items.map((label) => ({
    label,
    group: group.label,
    id: label.toLowerCase().replaceAll(" ", "-"),
  })),
);

function FasoMark() {
  return (
    <span className="faso-mark" aria-hidden="true">
      <span />
      <Sparkles size={13} strokeWidth={2.5} />
    </span>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("demande");
  const [toastVisible, setToastVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchResults = searchQuery.trim()
    ? searchablePages
        .filter((page) =>
          page.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 7)
    : [];

  function goToSection(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSearchQuery("");
    setMobileSearchOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    const saved = localStorage.getItem("faso-ui-theme");
    const initial = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("faso-ui-theme", next);
  }

  function copyInstall() {
    void navigator.clipboard?.writeText("npm install @faso-ui/react");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <div className="civic-line" aria-hidden="true" />
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/94 backdrop-blur-xl">
        <PageContainer className="flex h-16 items-center gap-5">
          <button
            className="icon-button lg:hidden"
            aria-label="Ouvrir la navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          <a
            href="#vue-d’ensemble"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Faso UI, accueil"
          >
            <FasoMark />
            <span className="font-display text-lg font-bold tracking-[-0.02em]">
              Faso UI
            </span>
            <Badge variant="neutral" className="hidden sm:inline-flex">
              v1.0
            </Badge>
          </a>

          <div className="search-wrapper mx-auto hidden w-full max-w-lg md:block">
            <div className="search-trigger flex">
              <Search size={17} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Rechercher dans la documentation…"
                aria-label="Rechercher dans la documentation"
              />
              <kbd>⌘ K</kbd>
            </div>
            {searchResults.length ? (
              <div className="search-results">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => goToSection(result.id)}
                  >
                    <span>{result.label}</span>
                    <small>{result.group}</small>
                    <ChevronRight />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <nav className="ml-auto flex items-center gap-1" aria-label="Actions">
            <button
              className="icon-button md:hidden"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Rechercher"
            >
              <Search size={19} />
            </button>
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label="Changer de thème"
            >
              {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
            </button>
            <a
              className="icon-button hidden sm:inline-flex"
              href="https://github.com"
              aria-label="GitHub"
            >
              <Component size={19} />
            </a>
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => {
                window.location.href = withBaseUrl("exemple-casier/");
              }}
            >
              Voir l’application <ArrowRight size={15} />
            </Button>
          </nav>
        </PageContainer>
      </header>
      {mobileSearchOpen ? (
        <div className="mobile-search-layer">
          <button
            aria-label="Fermer la recherche"
            onClick={() => setMobileSearchOpen(false)}
          />
          <div>
            <div className="search-trigger flex">
              <Search />
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Rechercher un composant…"
              />
            </div>
            <div className="search-results static mt-2">
              {(searchResults.length
                ? searchResults
                : searchablePages.slice(0, 6)
              ).map((result) => (
                <button key={result.id} onClick={() => goToSection(result.id)}>
                  <span>{result.label}</span>
                  <small>{result.group}</small>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-[96rem]">
        <aside className={cn("docs-sidebar", menuOpen && "is-open")}>
          <div className="flex h-16 items-center justify-between border-b px-5 lg:hidden">
            <span className="flex items-center gap-2 font-display font-bold">
              <FasoMark /> Faso UI
            </span>
            <button
              className="icon-button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>
          <div className="sidebar-scroll">
            <div className="mb-6 rounded-xl border border-primary/15 bg-primary/[0.045] p-3.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck size={17} /> Service public numérique
              </div>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                Le socle commun des interfaces de l’État burkinabè.
              </p>
            </div>
            <nav aria-label="Documentation">
              {navigation.map((group, index) => (
                <div className="nav-group" key={group.label}>
                  <div className="nav-label">
                    <group.icon size={15} />
                    {group.label}
                    {group.count ? <span>{group.count}</span> : null}
                  </div>
                  {group.items.map((item, itemIndex) => (
                    <a
                      className={cn(
                        "nav-item",
                        index === 0 && itemIndex === 0 && "active",
                      )}
                      onClick={() => setMenuOpen(false)}
                      href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                      key={item}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </aside>
        {menuOpen ? (
          <button
            className="sidebar-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer la navigation"
          />
        ) : null}

        <main id="contenu" className="min-w-0 flex-1">
          <article className="mx-auto max-w-[70rem] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="mb-5 flex items-center gap-2 text-sm font-medium text-primary">
              <span>Commencer</span>
              <ChevronRight size={14} />
              <span>Vue d’ensemble</span>
            </div>

            <section className="hero-grid" id="vue-d’ensemble">
              <div>
                <Badge variant="success" className="mb-5">
                  <span className="status-dot" /> Prêt pour les services publics
                </Badge>
                <h1 className="max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.055em]">
                  Le numérique public,{" "}
                  <span className="text-primary">simplement.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Faso UI est le design system open source des services
                  numériques burkinabè. Il aide les équipes à construire des
                  démarches cohérentes, accessibles et dignes de confiance.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={() => {
                      window.location.href = withBaseUrl("exemple-casier/");
                    }}
                  >
                    Voir l’application exemple <ArrowRight size={17} />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Component size={17} /> Voir les composants
                  </Button>
                </div>
              </div>
              <div className="woven-panel" aria-hidden="true">
                <div className="woven-star">★</div>
                <span className="woven-label">
                  Burkina Faso
                  <br />
                  Service public
                </span>
              </div>
            </section>

            <section className="mt-16 grid gap-3 md:grid-cols-3">
              {foundations.map((item) => (
                <Card className="foundation-card" key={item.title}>
                  <span className="feature-icon">
                    <item.icon size={20} />
                  </span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </Card>
              ))}
            </section>

            <section className="doc-section" id="installation">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Commencer</span>
                  <h2>Installation</h2>
                </div>
                <p>
                  Ajoutez Faso UI à une application React, puis importez les
                  tokens globaux une seule fois à la racine.
                </p>
              </div>
              <pre className="code-block">
                <code>{`npm install @faso-ui/react

import "@faso-ui/react/styles.css"
import { Button, Field, Alert } from "@faso-ui/react"`}</code>
              </pre>
            </section>

            <section className="doc-section" id="principes">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Commencer</span>
                  <h2>Principes de conception</h2>
                </div>
                <p>
                  Clarté, confiance et inclusion guident chaque décision. Une
                  interface publique explique toujours où l’usager se trouve et
                  ce qu’il doit faire.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {foundations.map((item) => (
                  <Card
                    className="foundation-card"
                    key={`principle-${item.title}`}
                  >
                    <span className="feature-icon">
                      <item.icon />
                    </span>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section className="doc-section" id="couleurs">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Fondations</span>
                  <h2>Une identité cohérente, à grande échelle</h2>
                </div>
                <p>
                  Les décisions visuelles deviennent des variables partagées
                  entre les équipes de conception et de développement.
                </p>
              </div>
              <div className="color-board">
                <div className="swatch-grid">
                  {swatches.map((swatch) => (
                    <div className="swatch" key={swatch.name}>
                      <div className={swatch.className} />
                      <strong>{swatch.name}</strong>
                      <code>{swatch.value}</code>
                    </div>
                  ))}
                </div>
                <div className="type-sample">
                  <span>Typographie</span>
                  <strong>Aa</strong>
                  <p>
                    Clarté institutionnelle
                    <br />
                    <b>à chaque échelle.</b>
                  </p>
                </div>
              </div>
              <div className="foundation-links">
                <div id="typographie">
                  <strong>Typographie</strong>
                  <p>
                    Manrope assure une lecture claire du mobile aux grands
                    tableaux de données.
                  </p>
                  <span className="font-display text-3xl font-extrabold">
                    Aa Bb Cc 0123
                  </span>
                </div>
                <div id="espacement">
                  <strong>Espacement</strong>
                  <p>
                    Une base de 4 px structure les contrôles, les groupes et les
                    sections.
                  </p>
                  <div className="space-scale">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div id="iconographie">
                  <strong>Iconographie</strong>
                  <p>
                    Les icônes Lucide accompagnent toujours un libellé ou
                    possèdent un nom accessible.
                  </p>
                  <div className="flex gap-3 text-primary">
                    <ShieldCheck />
                    <FileCheck2 />
                    <Search />
                    <CircleHelp />
                  </div>
                </div>
              </div>
            </section>

            <section className="doc-section" id="bouton">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Actions</span>
                  <h2>Bouton</h2>
                </div>
                <p>
                  Le bouton déclenche une action immédiate. Son libellé commence
                  par un verbe et annonce clairement ce qui va se passer.
                </p>
              </div>
              <div className="component-demo">
                <div className="demo-toolbar">
                  <div className="flex items-center gap-1">
                    <button className="demo-tab active">Aperçu</button>
                    <button className="demo-tab">Code</button>
                    <button className="demo-tab">Accessibilité</button>
                  </div>
                  <Badge variant="neutral">Bouton</Badge>
                </div>
                <div className="demo-canvas">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button>
                      Continuer <ArrowRight />
                    </Button>
                    <Button variant="secondary">Enregistrer</Button>
                    <Button variant="outline">Annuler</Button>
                    <Button variant="ghost">Voir le détail</Button>
                  </div>
                </div>
              </div>

              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Variantes</h3>
                  <p>
                    La hiérarchie visuelle reflète l’importance et le niveau de
                    risque de l’action.
                  </p>
                </div>
                <div className="example-row">
                  <Button>Action principale</Button>
                  <Button variant="secondary">Action secondaire</Button>
                  <Button variant="outline">Action tertiaire</Button>
                  <Button variant="ghost">Action discrète</Button>
                  <Button variant="destructive">
                    <Archive /> Supprimer
                  </Button>
                  <Button variant="link">
                    Consulter les conditions <ArrowUpRight />
                  </Button>
                </div>
              </div>

              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Tailles</h3>
                  <p>
                    Utilisez la taille par défaut dans les formulaires. Les
                    petites tailles sont réservées aux interfaces denses.
                  </p>
                </div>
                <div className="example-row items-center">
                  <Button size="sm">Petit</Button>
                  <Button>Par défaut</Button>
                  <Button size="lg">Grand</Button>
                  <Button size="icon" aria-label="Télécharger le document">
                    <Download />
                  </Button>
                </div>
              </div>

              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>États</h3>
                  <p>
                    Les états restent explicites. Pendant une opération, le
                    bouton conserve son libellé ou précise l’action en cours.
                  </p>
                </div>
                <div className="example-row">
                  <Button>
                    <Send /> Envoyer la demande
                  </Button>
                  <Button loading loadingText="Envoi en cours…">
                    Envoyer la demande
                  </Button>
                  <Button disabled>Action indisponible</Button>
                </div>
              </div>

              <div className="button-guidance">
                <div className="guidance-do">
                  <span>
                    <Check size={15} /> À faire
                  </span>
                  <strong>Enregistrer les modifications</strong>
                  <p>Utiliser un verbe précis et un complément utile.</p>
                </div>
                <div className="guidance-dont">
                  <span>
                    <X size={15} /> À éviter
                  </span>
                  <strong>Valider</strong>
                  <p>
                    Éviter les libellés génériques qui ne décrivent pas le
                    résultat.
                  </p>
                </div>
              </div>

              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Utilisation</h3>
                  <p>
                    Importez le composant depuis la bibliothèque. Le type natif
                    est conservé pour les formulaires.
                  </p>
                </div>
                <pre className="code-block">
                  <code>{`import { Button } from "@/components/ui/button"

<Button type="submit">
  Envoyer la demande
  <ArrowRight />
</Button>

<Button variant="outline" loading={isSaving}>
  Enregistrer
</Button>`}</code>
                </pre>
              </div>

              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>API</h3>
                  <p>
                    Toutes les propriétés natives de <code>button</code> sont
                    également acceptées.
                  </p>
                </div>
                <div className="api-table-wrap">
                  <table className="api-table">
                    <thead>
                      <tr>
                        <th>Propriété</th>
                        <th>Type</th>
                        <th>Valeur par défaut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buttonApi.map(([name, type, fallback]) => (
                        <tr key={name}>
                          <td>
                            <code>{name}</code>
                          </td>
                          <td>
                            <code>{type}</code>
                          </td>
                          <td>
                            <code>{fallback}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Alert
                className="mt-6"
                icon={<Accessibility size={18} />}
                title="Accessibilité"
              >
                Les boutons icône doivent toujours avoir un nom accessible avec
                aria-label. Ne remplacez pas un lien de navigation par un
                bouton.
              </Alert>
            </section>

            <section className="doc-section" id="champ-de-saisie">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Formulaires</span>
                  <h2>Champ de saisie</h2>
                </div>
                <p>
                  Le champ permet de recueillir une information courte. Le
                  libellé reste toujours visible et les erreurs indiquent
                  comment corriger la saisie.
                </p>
              </div>
              <div className="component-demo">
                <div className="demo-toolbar">
                  <span className="px-2 text-xs font-bold">Aperçu</span>
                  <Badge>Input + Field</Badge>
                </div>
                <div className="demo-canvas">
                  <div className="w-full max-w-sm">
                    <Field
                      label="Numéro CNIB"
                      placeholder="Ex. B1234567"
                      hint="Le numéro figure au recto de votre carte."
                    />
                  </div>
                </div>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>États</h3>
                  <p>
                    Les états utilisent plusieurs indices : couleur, bordure,
                    texte explicatif et attributs accessibles.
                  </p>
                </div>
                <div className="form-example-grid">
                  <Field label="Nom de naissance" placeholder="Ex. Ouédraogo" />
                  <Field
                    label="Téléphone"
                    placeholder="+226 70 00 00 00"
                    hint="Format burkinabè à huit chiffres."
                  />
                  <Field
                    label="Adresse électronique"
                    defaultValue="adama@"
                    error="Saisissez une adresse électronique valide."
                  />
                  <Field
                    label="Référence du dossier"
                    defaultValue="BF-2026-0148"
                    disabled
                    hint="Cette valeur ne peut pas être modifiée."
                  />
                </div>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Contenu complémentaire</h3>
                  <p>
                    Une icône peut aider à reconnaître le type de donnée. Le
                    suffixe est réservé aux unités et informations brèves.
                  </p>
                </div>
                <div className="example-row">
                  <div className="w-full max-w-sm">
                    <Input
                      leadingIcon={<Search />}
                      placeholder="Rechercher une démarche…"
                      aria-label="Rechercher une démarche"
                    />
                  </div>
                  <div className="w-full max-w-xs">
                    <Input
                      inputMode="numeric"
                      placeholder="0"
                      trailing="FCFA"
                      aria-label="Montant en francs CFA"
                    />
                  </div>
                </div>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Utilisation</h3>
                  <p>
                    <code>Field</code> assemble le libellé, le champ et le
                    message. Utilisez <code>Input</code> seul dans les
                    compositions avancées.
                  </p>
                </div>
                <pre className="code-block">
                  <code>{`<Field
  label="Numéro CNIB"
  placeholder="Ex. B1234567"
  hint="Le numéro figure au recto de votre carte."
/>

<Field
  label="Adresse électronique"
  error="Saisissez une adresse valide."
/>`}</code>
                </pre>
              </div>
            </section>

            <section className="doc-section" id="badge">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Information</span>
                  <h2>Badge</h2>
                </div>
                <p>
                  Le badge qualifie un statut ou une catégorie avec quelques
                  mots. Il n’est ni interactif ni utilisé pour afficher une
                  longue information.
                </p>
              </div>
              <div className="component-demo">
                <div className="demo-toolbar">
                  <span className="px-2 text-xs font-bold">
                    Variantes sémantiques
                  </span>
                  <Badge>Badge</Badge>
                </div>
                <div className="demo-canvas">
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge>Non commencé</Badge>
                    <Badge variant="primary">À traiter</Badge>
                    <Badge variant="success">
                      <span className="status-dot" /> Validé
                    </Badge>
                    <Badge variant="warning">
                      <Clock3 /> En attente
                    </Badge>
                    <Badge variant="destructive">Rejeté</Badge>
                    <Badge variant="information">Information</Badge>
                    <Badge variant="outline">Brouillon</Badge>
                  </div>
                </div>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Tailles et contenu</h3>
                  <p>
                    La taille standard convient aux statuts. La petite taille
                    accompagne les métadonnées compactes.
                  </p>
                </div>
                <div className="example-row">
                  <Badge variant="success">Dossier complet</Badge>
                  <Badge variant="success" size="sm">
                    Complet
                  </Badge>
                  <Badge variant="outline">Nationalité burkinabè</Badge>
                </div>
              </div>
              <div className="button-guidance">
                <div className="guidance-do">
                  <span>
                    <Check size={15} /> À faire
                  </span>
                  <strong>En attente de paiement</strong>
                  <p>Décrire un état précis, compréhensible sans la couleur.</p>
                </div>
                <div className="guidance-dont">
                  <span>
                    <X size={15} /> À éviter
                  </span>
                  <strong>Cliquer ici</strong>
                  <p>
                    Un badge ne déclenche pas d’action. Utilisez un bouton ou un
                    lien.
                  </p>
                </div>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Utilisation</h3>
                  <p>
                    Choisissez une variante selon le sens du statut, pas selon
                    une préférence esthétique.
                  </p>
                </div>
                <pre className="code-block">
                  <code>{`<Badge variant="success">Validé</Badge>
<Badge variant="warning">
  <Clock3 />
  En attente
</Badge>`}</code>
                </pre>
              </div>
            </section>

            <section className="doc-section" id="alerte">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Retour système</span>
                  <h2>Alerte</h2>
                </div>
                <p>
                  L’alerte attire l’attention sur un changement, une
                  confirmation ou un problème. Son titre résume le message et
                  son contenu indique la suite.
                </p>
              </div>
              <div className="alert-stack">
                <Alert title="Document nécessaire">
                  Joignez une copie lisible de votre CNIB avant de poursuivre.
                </Alert>
                <Alert variant="success" title="Dossier transmis">
                  Votre demande n° BF-2026-0148 a bien été enregistrée.
                </Alert>
                <Alert variant="warning" title="Paiement en attente">
                  Finalisez le paiement avant le 28 juillet pour conserver votre
                  demande.
                </Alert>
                <Alert variant="destructive" title="Document illisible">
                  Remplacez la pièce d’identité par un fichier net de moins de 5
                  Mo.
                </Alert>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Alerte refermable</h3>
                  <p>
                    Rendez une alerte refermable uniquement si sa disparition ne
                    masque pas une information indispensable.
                  </p>
                </div>
                <div className="example-row">
                  {noticeVisible ? (
                    <Alert
                      className="w-full"
                      title="Maintenance programmée"
                      onDismiss={() => setNoticeVisible(false)}
                    >
                      Le service sera momentanément indisponible dimanche de 02
                      h à 04 h.
                    </Alert>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setNoticeVisible(true)}
                    >
                      Afficher à nouveau l’alerte
                    </Button>
                  )}
                </div>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Utilisation</h3>
                  <p>
                    Les erreurs importantes utilisent automatiquement{" "}
                    <code>role="alert"</code>. Les autres messages utilisent{" "}
                    <code>role="status"</code>.
                  </p>
                </div>
                <pre className="code-block">
                  <code>{`<Alert variant="success" title="Dossier transmis">
  Votre demande a bien été enregistrée.
</Alert>

<Alert
  variant="destructive"
  title="Document illisible"
>
  Ajoutez un nouveau fichier pour continuer.
</Alert>`}</code>
                </pre>
              </div>
              <Alert
                className="mt-6"
                icon={<AlertTriangle size={18} />}
                title="Rédaction"
              >
                Une alerte explique le problème et propose une solution. Évitez
                les messages vagues comme « Une erreur est survenue ».
              </Alert>
            </section>

            <section className="doc-section" id="formulaires">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Formulaires</span>
                  <h2>Contrôles de formulaire</h2>
                </div>
                <p>
                  Les contrôles natifs sont habillés par Faso UI afin de rester
                  rapides, robustes et compatibles avec les technologies
                  d’assistance.
                </p>
              </div>
              <div className="catalog-grid">
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Liste de sélection</h3>
                    <Badge size="sm">Select</Badge>
                  </div>
                  <label
                    className="mb-2 block text-xs font-bold"
                    htmlFor="province"
                  >
                    Province
                  </label>
                  <Select id="province" defaultValue="">
                    <option value="" disabled>
                      Sélectionner une province
                    </option>
                    <option>Kadiogo</option>
                    <option>Houet</option>
                    <option>Boulkiemdé</option>
                  </Select>
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Texte long</h3>
                    <Badge size="sm">Textarea</Badge>
                  </div>
                  <label
                    className="mb-2 block text-xs font-bold"
                    htmlFor="motif"
                  >
                    Motif de la demande
                  </label>
                  <Textarea id="motif" placeholder="Décrivez votre demande…" />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Choix multiples</h3>
                    <Badge size="sm">Checkbox</Badge>
                  </div>
                  <div className="space-y-3">
                    <Checkbox defaultChecked>
                      Recevoir le récépissé par courriel
                    </Checkbox>
                    <Checkbox>Recevoir les alertes par SMS</Checkbox>
                  </div>
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Choix unique</h3>
                    <Badge size="sm">Radio</Badge>
                  </div>
                  <fieldset className="space-y-3">
                    <legend className="sr-only">Mode de retrait</legend>
                    <Radio name="retrait" defaultChecked>
                      Retrait au guichet
                    </Radio>
                    <Radio name="retrait">Envoi électronique</Radio>
                  </fieldset>
                </Card>
                <Card className="catalog-card sm:col-span-2">
                  <div className="catalog-title">
                    <h3>Paramètres</h3>
                    <Badge size="sm">Switch</Badge>
                  </div>
                  <Switch defaultChecked>
                    Notifications de suivi du dossier
                  </Switch>
                </Card>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Principes</h3>
                  <p>
                    Regroupez les choix liés dans un <code>fieldset</code>,
                    affichez toujours un libellé et ne pré-sélectionnez pas une
                    décision sensible.
                  </p>
                </div>
                <pre className="code-block">
                  <code>{`<Select aria-label="Province">
  <option>Kadiogo</option>
  <option>Houet</option>
</Select>

<Checkbox>Recevoir les alertes par SMS</Checkbox>
<Switch>Notifications de suivi</Switch>`}</code>
                </pre>
              </div>
            </section>

            <section className="doc-section" id="navigation">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Navigation</span>
                  <h2>S’orienter dans un service</h2>
                </div>
                <p>
                  Le fil d’Ariane situe la page, les onglets changent de vue et
                  la pagination permet de parcourir une collection.
                </p>
              </div>
              <Card className="catalog-card">
                <div className="catalog-title">
                  <h3>Fil d’Ariane</h3>
                  <Badge size="sm">Breadcrumb</Badge>
                </div>
                <Breadcrumb
                  items={[
                    { label: "Accueil", href: "#" },
                    { label: "Mes démarches", href: "#" },
                    { label: "Certificat de nationalité" },
                  ]}
                />
              </Card>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Onglets</h3>
                    <Badge size="sm">Tabs</Badge>
                  </div>
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    items={[
                      {
                        value: "demande",
                        label: "Demande",
                        content: (
                          <p>Informations générales et état de la demande.</p>
                        ),
                      },
                      {
                        value: "documents",
                        label: "Documents",
                        content: (
                          <p>Deux pièces justificatives ont été ajoutées.</p>
                        ),
                      },
                      {
                        value: "historique",
                        label: "Historique",
                        content: (
                          <p>Dernière mise à jour le 25 juillet 2026.</p>
                        ),
                      },
                    ]}
                  />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Pagination</h3>
                    <Badge size="sm">Pagination</Badge>
                  </div>
                  <div className="grid min-h-24 place-items-center">
                    <Pagination total={3} />
                  </div>
                </Card>
              </div>
            </section>

            <section className="doc-section" id="dialogue">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Superposition</span>
                  <h2>Dialogue</h2>
                </div>
                <p>
                  Le dialogue interrompt brièvement le parcours pour confirmer
                  une action importante. Il se ferme avec Échap ou via son
                  bouton dédié.
                </p>
              </div>
              <div className="example-row justify-center">
                <Button
                  variant="destructive"
                  onClick={() => setDialogOpen(true)}
                >
                  <Archive /> Supprimer le brouillon
                </Button>
              </div>
              <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Supprimer ce brouillon ?"
                description="Cette action est définitive. Les informations déjà saisies seront perdues."
              >
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDialogOpen(false)}
                  >
                    Supprimer le brouillon
                  </Button>
                </div>
              </Dialog>
            </section>

            <section className="doc-section" id="tableau">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Données</span>
                  <h2>Données et chargement</h2>
                </div>
                <p>
                  Les tableaux présentent des informations comparables. La
                  progression et le squelette expliquent clairement l’état du
                  système.
                </p>
              </div>
              <Card className="overflow-hidden">
                <div className="catalog-title p-5">
                  <h3>Demandes récentes</h3>
                  <Badge variant="outline">3 dossiers</Badge>
                </div>
                <DataTable
                  columns={requestColumns}
                  data={requestRows}
                  getRowKey={(row) => row.reference}
                  caption="Demandes récentes"
                />
              </Card>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Progression</h3>
                    <Badge size="sm">Progress</Badge>
                  </div>
                  <Progress value={75} label="Dossier complété" />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Chargement</h3>
                    <Badge size="sm">Skeleton</Badge>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </Card>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Étapes d’une demande</h3>
                    <Badge size="sm">Stepper</Badge>
                  </div>
                  <Stepper
                    currentStep={2}
                    orientation="vertical"
                    items={[
                      {
                        label: "Identité",
                        description: "Informations vérifiées",
                      },
                      { label: "Justificatifs", description: "Étape en cours" },
                      { label: "Paiement" },
                      { label: "Transmission" },
                    ]}
                  />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Actions contextuelles</h3>
                    <Badge size="sm">DropdownMenu</Badge>
                  </div>
                  <div className="example-row">
                    <DropdownMenu
                      label="Actions du dossier"
                      trigger={
                        <Button variant="outline">
                          Actions <Ellipsis />
                        </Button>
                      }
                    >
                      <DropdownMenuLabel>Dossier BF-0148</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => setDrawerOpen(true)}>
                        Voir le détail
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Télécharger le récépissé
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem destructive>
                        Supprimer le brouillon
                      </DropdownMenuItem>
                    </DropdownMenu>
                    <Button onClick={() => setDrawerOpen(true)}>
                      Ouvrir le panneau
                    </Button>
                  </div>
                </Card>
              </div>
              <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                title="Dossier BF-0148"
                description="Certificat de nationalité"
                footer={
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Fermer
                    </Button>
                    <Button>Ouvrir le dossier</Button>
                  </div>
                }
              >
                <DataList
                  items={[
                    { label: "Demandeur", value: "Adama Ouédraogo" },
                    {
                      label: "Statut",
                      value: <Badge variant="success">Validé</Badge>,
                    },
                    { label: "Mise à jour", value: "25 juillet 2026" },
                  ]}
                />
              </Drawer>
            </section>

            <section className="doc-section" id="composants-avancés">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Démarches</span>
                  <h2>Composants avancés</h2>
                </div>
                <p>
                  Identification, pièces justificatives, recherche assistée et
                  retours système propres aux services administratifs.
                </p>
              </div>
              <div className="catalog-grid">
                <Card className="catalog-card sm:col-span-2">
                  <div className="catalog-title">
                    <h3>Téléversement de fichier</h3>
                    <Badge size="sm">FileUpload</Badge>
                  </div>
                  <FileUpload label="Déposez votre copie de CNIB" />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Code de vérification</h3>
                    <Badge size="sm">OTP</Badge>
                  </div>
                  <OtpInput />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Date et téléphone</h3>
                    <Badge size="sm">Champs locaux</Badge>
                  </div>
                  <div className="space-y-4">
                    <DateField label="Date de naissance" />
                    <PhoneField />
                  </div>
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Autocomplétion</h3>
                    <Badge size="sm">Combobox</Badge>
                  </div>
                  <Combobox
                    options={[
                      "Ouagadougou",
                      "Bobo-Dioulasso",
                      "Koudougou",
                      "Ouahigouya",
                      "Banfora",
                    ]}
                  />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Résumé d’erreurs</h3>
                    <Badge size="sm">ErrorSummary</Badge>
                  </div>
                  <ErrorSummary
                    errors={[
                      {
                        field: "numero",
                        message: "Renseignez votre numéro CNIB.",
                      },
                      {
                        field: "province",
                        message: "Sélectionnez votre province.",
                      },
                    ]}
                  />
                </Card>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Questions fréquentes</h3>
                    <Badge size="sm">Accordion</Badge>
                  </div>
                  <Accordion
                    items={[
                      {
                        title: "Quels formats sont acceptés ?",
                        content: (
                          <p>Les documents PDF, JPG et PNG de moins de 5 Mo.</p>
                        ),
                      },
                      {
                        title: "Comment suivre ma demande ?",
                        content: (
                          <p>
                            Utilisez la référence reçue après la transmission du
                            dossier.
                          </p>
                        ),
                      },
                      {
                        title: "Puis-je modifier un dossier ?",
                        content: (
                          <p>
                            Un brouillon reste modifiable tant qu’il n’est pas
                            transmis.
                          </p>
                        ),
                      },
                    ]}
                  />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>État vide</h3>
                    <Badge size="sm">EmptyState</Badge>
                  </div>
                  <EmptyState
                    title="Aucune démarche"
                    description="Commencez une demande pour la retrouver dans cet espace."
                    action={<Button size="sm">Nouvelle démarche</Button>}
                  />
                </Card>
              </div>
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Notifications et utilitaires</h3>
                  <p>
                    Les notifications confirment une action sans interrompre le
                    parcours. Les infobulles ne contiennent jamais une
                    information essentielle.
                  </p>
                </div>
                <div className="example-row">
                  <Button onClick={() => setToastVisible(true)}>
                    Afficher une notification
                  </Button>
                  <Tooltip label="Le traitement prend généralement deux jours ouvrés">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Informations sur le délai"
                    >
                      <CircleHelp />
                    </Button>
                  </Tooltip>
                  <Spinner />
                  <Avatar name="Adama Ouédraogo" />
                  <Avatar name="Ministère Justice" size="lg" />
                </div>
              </div>
              {toastVisible ? (
                <div className="toast-viewport">
                  <Toast
                    title="Brouillon enregistré"
                    onDismiss={() => setToastVisible(false)}
                  >
                    Vos informations ont été sauvegardées.
                  </Toast>
                </div>
              ) : null}
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Contenu structuré</h3>
                  <p>
                    Les listes de données et cartes statistiques donnent une
                    structure commune aux informations administratives.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="catalog-card">
                    <DataList
                      items={[
                        { label: "Référence", value: "BF-2026-0148" },
                        { label: "Demandeur", value: "Adama Ouédraogo" },
                        {
                          label: "Statut",
                          value: <Badge variant="success">Validé</Badge>,
                        },
                      ]}
                    />
                  </Card>
                  <div className="grid gap-3">
                    <StatCard
                      label="Dossiers traités"
                      value="1 248"
                      detail="+12 % ce mois"
                      icon={<FileCheck2 />}
                    />
                    <Separator label="ou" />
                    <GlobalBanner>
                      Maintenance prévue dimanche de 02 h à 04 h.
                    </GlobalBanner>
                  </div>
                </div>
              </div>
            </section>

            <section className="doc-section" id="composants-complémentaires">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Compléments</span>
                  <h2>Interactions et services</h2>
                </div>
                <p>
                  Les dernières primitives couvrent la recherche, les dates, les
                  actions contextuelles et les données propres aux démarches
                  publiques.
                </p>
              </div>
              <div className="catalog-grid">
                <Card className="catalog-card sm:col-span-2">
                  <div className="catalog-title">
                    <h3>Recherche et navigation</h3>
                    <Badge size="sm">SearchBox · NavigationMenu</Badge>
                  </div>
                  <div className="space-y-4">
                    <SearchBox
                      options={[
                        {
                          value: "nationalite",
                          label: "Certificat de nationalité",
                          description: "Justice",
                        },
                        {
                          value: "casier",
                          label: "Casier judiciaire",
                          description: "Justice",
                        },
                        {
                          value: "naissance",
                          label: "Extrait de naissance",
                          description: "État civil",
                        },
                      ]}
                      onSelect={() => undefined}
                    />
                    <NavigationMenu
                      items={[
                        {
                          label: "Démarches",
                          children: [
                            {
                              label: "Justice",
                              href: "#",
                              description: "Casier et nationalité",
                            },
                            {
                              label: "État civil",
                              href: "#",
                              description: "Actes et certificats",
                            },
                          ],
                        },
                        { label: "Mes dossiers", href: "#" },
                      ]}
                    />
                  </div>
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Date et superposition</h3>
                    <Badge size="sm">DatePicker · Popover</Badge>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <DatePicker
                      value={selectedDate}
                      onValueChange={setSelectedDate}
                    />
                    <Popover
                      label="Aide"
                      trigger={<Button variant="outline">Pourquoi ?</Button>}
                    >
                      <p className="text-sm text-muted-foreground">
                        Cette date permet de vérifier la validité du document.
                      </p>
                    </Popover>
                  </div>
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Formulaire composé</h3>
                    <Badge size="sm">FormField</Badge>
                  </div>
                  <FormField
                    label="Numéro de dossier"
                    hint="Format attendu : BF-0000"
                    required
                  >
                    <Input placeholder="BF-0148" />
                  </FormField>
                  <div className="mt-3 flex items-center gap-2">
                    <Link href="#formulaires">Aide à la saisie</Link>
                    <IconButton label="Action rapide">
                      <CircleHelp />
                    </IconButton>
                  </div>
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Étiquettes et fichier</h3>
                    <Badge size="sm">Tag · FilePreview</Badge>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Tag selected>Validé</Tag>
                    <Tag onRemove={() => undefined}>Kadiogo</Tag>
                    <Tag disabled>Archivé</Tag>
                  </div>
                  <FilePreview
                    name="cnib-adama.pdf"
                    type="PDF"
                    size="1,2 Mo"
                    onRemove={() => undefined}
                  />
                </Card>
                <Card className="catalog-card">
                  <div className="catalog-title">
                    <h3>Notifications et confirmation</h3>
                    <Badge size="sm">NotificationCenter · AlertDialog</Badge>
                  </div>
                  <div className="example-row">
                    <NotificationCenter
                      notifications={[
                        {
                          id: "1",
                          title: "Dossier validé",
                          description: "Votre document est disponible.",
                          time: "Il y a 10 min",
                          unread: true,
                        },
                        { id: "2", title: "Paiement reçu", time: "Hier" },
                      ]}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => setAlertDialogOpen(true)}
                    >
                      Annuler la demande
                    </Button>
                  </div>
                  <AlertDialog
                    open={alertDialogOpen}
                    onOpenChange={setAlertDialogOpen}
                    title="Annuler cette demande ?"
                    description="Le dossier ne sera plus transmis au service instructeur."
                    confirmLabel="Annuler la demande"
                    destructive
                    onConfirm={() => undefined}
                  />
                </Card>
              </div>
              <div className="component-doc-block">
                <SectionHeader
                  title="Informations administratives"
                  description="Champs spécialisés pour les services burkinabè."
                  action={
                    <ActionMenu>
                      <ActionMenuItem>Modifier</ActionMenuItem>
                      <ActionMenuSeparator />
                      <ActionMenuItem destructive>Supprimer</ActionMenuItem>
                    </ActionMenu>
                  }
                />
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <AddressField />
                  <IdentityDocumentField />
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <PaymentSummary
                  items={[
                    { label: "Timbre fiscal", amount: 200 },
                    { label: "Quittance", amount: 300 },
                  ]}
                  fee={50}
                  action={
                    <Button width="full">
                      Payer <Amount value={550} />
                    </Button>
                  }
                />
                <Card className="catalog-card">
                  <SectionHeader title="Suivi du dossier" />
                  <div className="mt-5">
                    <StatusTracker
                      items={[
                        {
                          title: "Demande transmise",
                          date: "22 juillet 2026",
                          status: "complete",
                        },
                        {
                          title: "Vérification des pièces",
                          description: "Traitement par le greffe",
                          status: "current",
                        },
                        { title: "Document disponible", status: "upcoming" },
                      ]}
                    />
                  </div>
                </Card>
              </div>
              <div className="component-doc-block">
                <PageHeader
                  eyebrow="Ministère de la Justice"
                  title="Mes démarches"
                  description="Consultez vos demandes et les actions à effectuer."
                  actions={<Button>Nouvelle demande</Button>}
                />
              </div>
            </section>

            <section className="doc-section" id="structure-officielle">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Composants · Structure</span>
                  <h2>Structure officielle</h2>
                </div>
                <p>
                  L’en-tête et le pied de page assurent une identification
                  constante de l’État et du service responsable.
                </p>
              </div>
              <div className="official-preview">
                <GovernmentHeader serviceName="Justice en ligne" />
                <div className="official-preview-body">
                  <span>Aperçu du contenu du service</span>
                  <h3>Demander un casier judiciaire</h3>
                  <p>Une démarche officielle de la Burkina Faso.</p>
                  <Button>Commencer la démarche</Button>
                </div>
                <GovernmentFooter />
              </div>
            </section>

            <section className="doc-section" id="démarche-en-ligne">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Patrons métier · Parcours</span>
                  <h2>Démarche en ligne</h2>
                </div>
                <p>
                  Un formulaire découpé en étapes courtes réduit les erreurs et
                  permet à l’usager de comprendre sa progression.
                </p>
              </div>
              <OnlineApplicationPattern />
              <div className="pattern-guidelines">
                <div>
                  <strong>Quand l’utiliser</strong>
                  <p>
                    Pour une demande administrative qui nécessite plusieurs
                    catégories d’informations ou des pièces justificatives.
                  </p>
                </div>
                <div>
                  <strong>Principes</strong>
                  <p>
                    Une tâche par étape, sauvegarde automatique, validation
                    avant transmission et confirmation avec référence.
                  </p>
                </div>
              </div>
            </section>

            <section className="doc-section" id="tableau-de-bord">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    Patrons métier · Espace usager
                  </span>
                  <h2>Tableau de bord</h2>
                </div>
                <p>
                  Le tableau de bord donne une vue immédiate des démarches, des
                  actions requises et des documents disponibles.
                </p>
              </div>
              <CitizenDashboardPattern />
              <div className="component-doc-block">
                <div className="component-doc-heading">
                  <h3>Hiérarchie recommandée</h3>
                  <p>
                    Commencez par les actions urgentes, puis les démarches
                    récentes. Les statistiques servent de raccourcis et non de
                    décoration.
                  </p>
                </div>
                <pre className="code-block">
                  <code>{`<Dashboard>
  <DashboardSummary />
  <RequiredActions />
  <RecentApplications />
</Dashboard>`}</code>
                </pre>
              </div>
            </section>

            <section className="doc-section" id="suivi-de-dossier">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Patrons métier · Transparence</span>
                  <h2>Suivi de dossier</h2>
                </div>
                <p>
                  Le suivi répond à trois questions : où en est la demande, que
                  doit faire l’usager et quand la situation a-t-elle changé ?
                </p>
              </div>
              <CaseTrackingPattern />
              <div className="button-guidance">
                <div className="guidance-do">
                  <span>
                    <Check size={15} /> À faire
                  </span>
                  <strong>Pièce à remplacer avant le 28 juillet</strong>
                  <p>
                    Indiquer l’action, l’échéance et le moyen de résoudre le
                    problème.
                  </p>
                </div>
                <div className="guidance-dont">
                  <span>
                    <X size={15} /> À éviter
                  </span>
                  <strong>Dossier en cours</strong>
                  <p>
                    Éviter un statut vague qui ne donne ni étape, ni délai, ni
                    prochaine action.
                  </p>
                </div>
              </div>
            </section>

            <section className="doc-section" id="référentiel">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Accessibilité</span>
                  <h2>Référentiel</h2>
                </div>
                <p>
                  Faso UI vise le niveau WCAG 2.2 AA : navigation clavier,
                  contrastes suffisants, zoom à 200 % et restitution correcte
                  par lecteur d’écran.
                </p>
              </div>
              <div className="accessibility-checklist">
                {[
                  "Contraste texte et composants",
                  "Navigation complète au clavier",
                  "Focus visible et prévisible",
                  "Libellés et messages associés",
                  "Réduction des animations",
                  "Contenu utilisable à 200 %",
                ].map((item) => (
                  <div key={item}>
                    <Check />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="doc-section" id="rédaction">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Accessibilité · Contenu</span>
                  <h2>Rédaction claire</h2>
                </div>
                <p>
                  Utilisez des phrases courtes, des verbes d’action et le
                  vocabulaire de l’usager. Une erreur décrit le problème et la
                  manière de le corriger.
                </p>
              </div>
              <div className="button-guidance">
                <div className="guidance-do">
                  <span>
                    <Check /> À faire
                  </span>
                  <strong>Ajoutez une copie lisible de votre CNIB.</strong>
                  <p>L’action attendue et le document sont explicites.</p>
                </div>
                <div className="guidance-dont">
                  <span>
                    <X /> À éviter
                  </span>
                  <strong>Erreur de fichier.</strong>
                  <p>Le problème et sa résolution restent inconnus.</p>
                </div>
              </div>
            </section>

            <section className="doc-section" id="tests">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Accessibilité · Qualité</span>
                  <h2>Tests recommandés</h2>
                </div>
                <p>
                  Les contrôles automatisés sont complétés par une revue
                  clavier, lecteur d’écran et zoom avant chaque mise en
                  production.
                </p>
              </div>
              <pre className="code-block">
                <code>{`npm run test
npm run test:a11y
npm run typecheck
npm run build`}</code>
              </pre>
            </section>

            <section className="install-banner">
              <div>
                <span className="eyebrow text-[#86D7B1]">
                  Prêt à construire ?
                </span>
                <h2>Adoptez un langage commun.</h2>
                <p>
                  Installez les composants, copiez les tokens et commencez votre
                  prochaine démarche publique.
                </p>
              </div>
              <button className="install-command" onClick={copyInstall}>
                <code>npm install @faso-ui/react</code>
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </section>
          </article>

          <footer className="border-t">
            <div className="mx-auto flex max-w-[70rem] flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-12">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <FasoMark /> Faso UI — Burkina Faso
              </span>
              <div className="flex gap-5">
                <a href="#référentiel">Accessibilité</a>
                <a href="#principes">Contribuer</a>
                <a href="#installation">Licence</a>
              </div>
            </div>
          </footer>
        </main>

        <aside className="toc">
          <span>Sur cette page</span>
          <a className="active" href="#contenu">
            Vue d’ensemble
          </a>
          <a href="#principes">Fondations</a>
          <a href="#bouton">Composants</a>
          <a href="#démarche-en-ligne">Patrons métier</a>
          <a href="#installation">Installation</a>
          <div className="toc-help">
            <CircleHelp size={16} />
            <span>
              Une question ?<br />
              <a href="mailto:equipe@faso-ui.gov.bf">Contacter l’équipe</a>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
