# Faso UI

Bibliothèque React accessible pour les services publics numériques du Burkina Faso.

## Installation

```bash
npm install @faso-ui/react
```

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

## Dates et montants

`Calendar` manipule des objets `Date` dans le fuseau local du navigateur. Normalisez les dates vers ISO dans la couche métier avant envoi au serveur. `Amount` repose sur `Intl.NumberFormat`, utilise `fr-BF` et `XOF` par défaut, et affiche la devise comme `FCFA`.

## Qualité

```bash
npm run typecheck
npm test
npm run test:a11y
npm run test:e2e
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
