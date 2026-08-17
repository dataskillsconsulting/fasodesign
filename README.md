# Faso UI

Bibliothèque React accessible pour les services publics numériques du Burkina Faso.

## Installation

```bash
npm install @faso-ui/react
```

## Prérequis

Node.js 20.19 ou plus est requis (`.nvmrc` recommande 24). Si vous utilisez
[nvm](https://github.com/nvm-sh/nvm), activez la bonne version avant de lancer
les commandes :

```bash
nvm use
```

Les scripts du projet vérifient la version de Node au démarrage et affichent
un message clair si elle est insuffisante.

Importez une fois les styles à la racine de l’application, puis les composants depuis le point d’entrée public :

```tsx
import { Button, DataTable, GovernmentHeader } from "@faso-ui/react";
import "@faso-ui/react/styles.css";
```

React 18 ou 19 est requis. Les composants utilisent des propriétés contrôlées pour les états qui doivent être persistés (`open`, tri, page et sélection) et des états internes pour les démonstrations simples.

## Principes d’utilisation

- Utilisez un libellé explicite pour chaque action et chaque champ.
- N’utilisez `Dialog` ou `AlertDialog` que lorsque le parcours doit réellement être interrompu ; préférez `Drawer` pour consulter ou modifier un détail.
- Fournissez une `caption` à `DataTable`, même si elle est visuellement masquée par votre mise en page.
- Utilisez `StatusTracker` pour un historique daté et `Stepper` pour la position de l’utilisateur dans un formulaire.
- Les erreurs décrivent la correction attendue. Elles ne reposent jamais uniquement sur la couleur.

## DataTable

```tsx
<DataTable
  caption="Demandes récentes"
  data={requests}
  columns={columns}
  getRowKey={(row) => row.reference}
  sort={sort}
  onSortChange={setSort}
  selectedKeys={selection}
  onSelectedKeysChange={setSelection}
  page={page}
  pageSize={20}
  totalItems={total}
  onPageChange={setPage}
/>
```

Pour un tri côté serveur, contrôlez `sort` et rechargez les données dans `onSortChange`. Sans `sort`, le composant trie localement. `loading` annonce le chargement aux technologies d’assistance.

## Superpositions

`Dialog` et `Drawer` ferment avec Échap, piègent le focus, bloquent le défilement de la page et restaurent le focus au déclencheur. `DropdownMenu` prend en charge les flèches, Origine, Fin et Échap. `Popover` convient aux contenus complémentaires courts ; une information indispensable doit rester dans la page.

`Dialog` et `Drawer` acceptent aussi `closeOnBackdrop`, `closeOnEscape`, `initialFocusRef` et `returnFocusRef`. Utilisez `AlertDialog` pour une confirmation importante : le clic sur l’arrière-plan ne la ferme pas.

## Navigation et recherche

`Pagination` est contrôlée avec `page`, `total` et `onPageChange`. Elle condense automatiquement les longues listes de pages. `Tabs` génère des identifiants uniques et prend en charge les flèches, Origine et Fin. `Calendar` prend en charge les flèches, Origine, Fin, Page précédente et Page suivante.

`SearchBox` requiert un nom accessible via `label`, annonce le nombre de résultats et ferme sa liste après une sélection, Échap ou un clic extérieur.

## Formulaires administratifs

Le socle comprend `Fieldset`, `FormSection`, `RadioGroup`, `CheckboxGroup`, `PasswordField`, `NumberField`, `CurrencyField`, `MultiSelect`, `DateRangeField`, `TimeField` et `FormActions`. Les valeurs métier restent contrôlées par l’application. `NumberField` et `CurrencyField` acceptent la virgule décimale française sans reformater la valeur pendant la frappe.

## Parcours de service public

`ServiceCard`, `EligibilityCheck`, `DocumentChecklist`, `ApplicationSummary`, `ReferenceNumber`, `Deadline`, `ContactBlock` et `OfficialNotice` couvrent les principales étapes d’une démarche. `AppointmentScheduler` propose une grille de créneaux de rendez-vous accessible au clavier, avec des créneaux indisponibles et un état vide, pilotée par `value` et `onValueChange`. `ResponsiveTable`, `FilterPanel`, `BulkActions`, `ResultCount` et `LoadingOverlay` complètent les écrans de gestion.

Pour la navigation publique, utilisez `SkipLink`, `BackLink`, `SideNavigation`, `LanguageSwitcher` et `AnchorNavigation`. Placez l’application sous `ToastProvider`, puis appelez `useToast()` pour ajouter ou fermer une notification globale.

## Dates et montants

`Calendar` manipule des objets `Date` dans le fuseau local du navigateur. Normalisez les dates vers ISO dans la couche métier avant envoi au serveur. `Amount` repose sur `Intl.NumberFormat`, utilise `fr-BF` et `XOF` par défaut, et affiche la devise comme `FCFA`.

## Qualité

```bash
npm run typecheck
npm test
npm run test:a11y
npm run test:e2e
npm run check:package
npm run build
```

Les tests navigateur couvrent Chromium, Firefox, WebKit et un viewport mobile. Les captures visuelles sont conservées par Playwright et doivent être examinées lors d’un changement intentionnel.

## Versionnage

Le projet suit SemVer : correctif pour une correction compatible, mineure pour un composant ou une option compatible, majeure pour toute rupture d’API ou de rendu significative.

## Publication du catalogue sur GitHub Pages

Le workflow `.github/workflows/pages.yml` publie automatiquement `dist-site` lors de chaque push sur `main`. Il calcule le sous-chemin depuis le nom du dépôt ; pour ce dépôt, le catalogue est construit sous `/fasodesign/`.

Dans GitHub, activez une seule fois **Settings → Pages → Build and deployment → Source: GitHub Actions**. Le site sera ensuite disponible à l’adresse `https://dataskillsconsulting.github.io/fasodesign/`.

Pour reproduire exactement le build Pages localement :

```bash
VITE_BASE_PATH=/fasodesign/ npm run build:site
```
