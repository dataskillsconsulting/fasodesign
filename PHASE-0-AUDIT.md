# Audit de référence — Phase 0

Date : 25 août 2026  
Périmètre : `src/components`, `src/design-system`, `src/test`, catalogue React

## Référence de départ

Le dépôt contient 27 fichiers de composants React, 10 suites de tests et un
catalogue de démonstration. Le point d’entrée public exporte les composants UI,
les patterns métier, les tokens de responsive et les formateurs métier.

### Matrice composants / statut / priorité / propriétaire

| Domaine | Composants | Statut | Priorité | Propriétaire |
| --- | --- | --- | --- | --- |
| Fondations | Button, Card, Badge, Input, Field | Stable | P1 | Design system |
| Formulaires | Select, NumberField, CurrencyField, RadioGroup, CheckboxGroup, DateRangeField, TimeField | Beta | P1 | Formulaires |
| Feedback | Alert, AlertDialog, Toast, Spinner, LoadingOverlay | Beta | P1 | Accessibilité |
| Superpositions | Dialog, Drawer, Popover, DropdownMenu, Tooltip | Beta | P1 | Interaction |
| Données | DataTable, Pagination, ResponsiveTable, FilterPanel, BulkActions | Beta | P1 | Données |
| Navigation | SkipLink, GovernmentHeader, SideNavigation, Tabs, AnchorNavigation | Beta | P1 | Navigation |
| Parcours | Stepper, StatusTracker, EmptyState, EligibilityCheck | Beta | P1 | Parcours citoyens |
| Documents | FileUpload, FilePreview, DocumentChecklist, OtpInput | Experimental | P2 | Démarches |
| Métier | ServiceCard, ApplicationSummary, ReferenceNumber, AppointmentScheduler | Beta | P2 | Services publics |

`Stable` signifie API et comportements de base compatibles et testés. `Beta`
signale une couverture encore incomplète des états ou de la documentation.
`Experimental` désigne une API à ne pas figer sans retour d’usage.

## Incohérences et problèmes bloquants

- Les composants n’avaient pas de matrice commune de statut, version et
  propriétaire ; elle est maintenant définie ci-dessus et dans le catalogue.
- Les états `loading`, `empty`, `error`, `disabled` et `success` ne sont pas
  présentés uniformément dans chaque fiche de composant.
- Les conventions contrôlé / non contrôlé sont documentées dans
  `CONTRIBUTING.md`, mais plusieurs composants anciens doivent encore être
  audités individuellement.
- Le catalogue mélange parfois des formats de date locaux et des chaînes
  déjà formatées. Les nouveaux exemples doivent utiliser `formatDate`.
- La couverture de tests existe pour les interactions principales, mais il
  manque une matrice explicite de tests clavier et axe par composant.

## Principes officiels

1. L’accessibilité est une condition de sortie : clavier, focus visible,
   contraste AA, nom accessible et erreur compréhensible.
2. Une démarche conserve les données saisies et expose clairement son état.
3. Le langage décrit l’action citoyenne, jamais l’implémentation technique.
4. Les composants restent sobres : les tokens servent la hiérarchie et la
   compréhension, pas la décoration.
5. Les composants contrôlés sont utilisés dès qu’un état doit être persisté,
   synchronisé ou soumis à une démarche.
6. Le mobile et les connexions lentes sont des contraintes de conception de
   premier ordre.

## Contraintes locales à respecter

- Montants en FCFA, sans décimales par défaut, avec `fr-BF`.
- Numéros de téléphone burkinabè affichés avec l’indicatif `+226`.
- Dates affichées en français et normalisées en ISO dans la couche serveur.
- Parcours utilisables sur petits écrans, clavier et lecteurs d’écran.
- Mobile Money, reprise après interruption réseau et prévention des doubles
  soumissions à traiter dans les patterns métier.
- Prévoir des contenus courts, des états de chargement visibles et une
  dégradation raisonnable pour les connexions lentes.

## Priorités de sortie de l’audit

1. Finaliser la documentation et la matrice d’états des composants P1.
2. Ajouter les tests clavier et accessibilité manquants composant par composant.
3. Harmoniser les APIs des overlays, formulaires et composants de données.
4. Conserver les contraintes FCFA, téléphones, dates et connexion dans chaque
   pattern de démarche.
