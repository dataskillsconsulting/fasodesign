# Feuille de route FasoDesign V2

Cette feuille de route transforme la vision FasoDesign V2 en plan d'amélioration progressif pour le projet actuel.

Le projet possède déjà un socle solide : composants React accessibles, tokens, formulaires administratifs, navigation, tableaux, patterns de démarches, tests unitaires, tests d'accessibilité et tests E2E.

La priorité est donc de transformer l'existant en système de design public cohérent, documenté et extensible.

## Phase 0 — État des lieux et cadrage ✅

Objectif : établir la référence de départ.

- Inventorier les composants existants.
- Identifier les doublons et incohérences d'API.
- Vérifier les tokens réellement utilisés.
- Auditer les composants sur mobile, clavier et lecteur d'écran.
- Classer chaque élément : `Experimental`, `Beta`, `Stable` ou `Deprecated`.
- Définir les administrations et parcours prioritaires.
- Documenter les contraintes locales : FCFA, Mobile Money, téléphones, langues et connexions lentes.

Livrables : matrice composants / état / priorité, liste des problèmes bloquants, principes officiels et roadmap publique initiale.

Critère de sortie : chaque composant possède un statut, une priorité et un propriétaire identifié.

Référence livrée dans [`PHASE-0-AUDIT.md`](./PHASE-0-AUDIT.md).

## Phase 1 — Stabiliser le socle ✅

Objectif : rendre le système fiable et cohérent avant d'ajouter de nouvelles fonctionnalités.

- Normaliser les tokens de couleurs, typographie, espacements, rayons, bordures, ombres, focus et motion.
- Harmoniser les noms et variantes des composants.
- Définir les conventions d'API contrôlées / non contrôlées.
- Ajouter les états loading, empty, error, disabled et success.
- Vérifier les contrastes et les focus rings.
- Standardiser les formats de dates, montants et numéros.
- Formaliser les breakpoints et comportements responsive.
- Ajouter les statuts et versions dans la documentation.

Livrables : `tokens.css` stabilisé, guide de contribution, conventions d'API, checklist qualité par composant et changelog structuré.

Les conventions et la matrice de qualité sont publiées dans
[`docs/api-conventions.md`](./docs/api-conventions.md) et
[`docs/component-quality.md`](./docs/component-quality.md). Le contrat de
tokens est vérifié dans la CI.

## Phase 2 — Renforcer les composants prioritaires ✅

### Priorité 1

- Button et Icon Button.
- Input, Textarea et Select.
- Radio Group et Checkbox Group.
- Alert et messages d'erreur.
- Dialog, Drawer et Popover.
- Table et Pagination.
- Navigation et Skip Link.
- Stepper.
- Status Tracker.
- Card et Empty State.

### Priorité 2

- File Upload.
- Date Picker.
- Time Picker.
- Autocomplete.
- OTP Input.
- Skeleton.
- Progress.
- Notification.
- Timeline.
- Data Grid.

Pour chaque composant : documentation, anatomie, variantes, états, responsive, accessibilité, exemple réel, tests unitaires, test axe, test clavier et capture visuelle.

Critère de sortie : chaque composant prioritaire est utilisable en production et documenté de manière uniforme.

Les états et conventions de la phase ont été consolidés dans le catalogue, les
tests et `CONTRIBUTING.md`.

## Phase 3 — Construire les patterns de démarches ✅

Patterns prioritaires :

1. Formulaire administratif multi-étapes.
2. Création de compte et authentification.
3. Vérification par SMS ou OTP.
4. Dépôt de documents.
5. Vérification et résumé d'une demande.
6. Confirmation avec référence administrative.
7. Suivi d'une démarche.
8. Recherche de dossier.
9. Paiement Mobile Money.
10. Gestion des erreurs et de la connexion interrompue.
11. Prise de rendez-vous.
12. Consultation d'un dossier agent.

Chaque pattern documente le problème résolu, les cas d'utilisation, la structure, les composants, les états, le contenu, le mobile et l'accessibilité.

Critère de sortie : un développeur peut assembler une démarche complète sans réinventer son parcours UX.

Les 12 patterns prioritaires sont documentés dans [`docs/patterns/`](./docs/patterns/),
avec des références React pour le formulaire multi-étapes et le suivi d’une
démarche.

## Phase 4 — Créer les templates de référence

### Templates citoyens

- Portail de service.
- Détail d'une démarche.
- Création d'une demande.
- Tableau de bord citoyen.
- Suivi d'une demande.
- Paiement.
- Confirmation.
- Erreur.
- Maintenance.

### Templates agents

- Tableau de bord agent.
- Liste de dossiers.
- Recherche administrative.
- Consultation d'un dossier.
- Traitement d'une demande.
- Gestion documentaire.

Chaque template doit exister en Figma, en React et dans la documentation.

Les 15 templates React et leur documentation sont disponibles. La bibliothèque
Figma et la synchronisation Design / Code restent à réaliser dans la phase 7 ;
la phase 4 n’est donc pas encore validée comme terminée.

## Phase 5 — Documentation et site FasoDesign ✅

Structure recommandée :

```text
Commencer
Fondations
Composants
Patterns
Templates
Guides
Accessibilité
Performance
Contenus
Développement
Ressources
Contribuer
```

Améliorations livrées : recherche, exemples copiables, aperçu des états, statut des composants, exemples mobile / desktop, documentation des props, liens vers les tests, changelog et guide de contribution. Les rubriques sont disponibles dans le catalogue React et dans [`docs/templates/README.md`](./docs/templates/README.md).

## Phase 6 — Performance, connexion limitée et résilience

- Mesurer le poids CSS et JavaScript.
- Éviter les dépendances inutiles.
- Optimiser les icônes et assets.
- Tester avec une connexion lente et instable.
- Ajouter des états de reprise après interruption.
- Préserver les brouillons lorsque cela est possible.
- Empêcher les doubles soumissions et doubles paiements.
- Prévoir une dégradation sans JavaScript lorsque pertinent.
- Ajouter des tests de performance au pipeline CI.

Premiers livrables : hooks React pour brouillons persistants et soumissions
idempotentes, avec tests et guide d’intégration dans
[`docs/guides/resilience.md`](./docs/guides/resilience.md). Un budget gzip de
30 kB CSS et 130 kB JavaScript est vérifié dans la CI. Les tests réseau réels
et les scénarios de dégradation sans JavaScript sont couverts par les tests
E2E. `OnlineApplicationPattern` les intègre en exemple. La dégradation
fonctionnelle des démarches métier reste à vérifier avec chaque administration.

## Phase 7 — Figma et synchronisation Design / Code

Ordre recommandé :

```text
Tokens
→ Foundations
→ Components
→ Patterns
→ Templates
```

- Créer la bibliothèque Figma FasoDesign.
- Reproduire les tokens et variables.
- Créer les composants avec variantes.
- Documenter les composants et patterns.
- Relier les composants Figma aux composants React.
- Définir un processus de synchronisation.

Premiers livrables : paquet de tokens portable dans
[`figma/tokens.json`](./figma/tokens.json), validation CI et protocole dans
[`docs/figma-sync.md`](./docs/figma-sync.md). La création de la bibliothèque
et les mappings Code Connect attendent une connexion à un fichier Figma publié.

## Phase 8 — Gouvernance et adoption

- Définir le processus de contribution.
- Créer un comité de validation design / technique / accessibilité.
- Formaliser les RFC.
- Mettre en place SemVer et les migrations.
- Publier un changelog.
- Définir le cycle de dépréciation.
- Collecter les besoins des administrations.
- Organiser des tests utilisateurs réguliers.
- Publier une roadmap trimestrielle.

Premiers livrables : gouvernance, cycle de dépréciation, modèle de RFC,
checklist de pull request et modèle de demande d’administration. Voir
[`docs/governance.md`](./docs/governance.md). Les modèles de roadmap
trimestrielle et de test utilisateur sont disponibles dans
[`docs/adoption/`](./docs/adoption/). La mise en place effective du comité et
la collecte de retours restent une responsabilité organisationnelle.

## Priorités immédiates

1. Auditer les composants actuels.
2. Stabiliser les tokens et les conventions d'API.
3. Finaliser File Upload, Date Picker, Autocomplete, Empty State et Status.
4. Documenter le pattern de formulaire administratif.
5. Documenter le pattern de suivi d'une démarche.
6. Créer un premier template citoyen complet.
7. Mettre en place les statuts, le changelog et la contribution.
8. Construire ensuite la bibliothèque Figma.

## Objectif de la première grande version

Permettre à une équipe de créer une démarche administrative complète — formulaire, dépôt de documents, paiement, confirmation et suivi — uniquement avec FasoDesign.
