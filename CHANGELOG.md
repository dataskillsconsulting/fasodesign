# Journal des changements

Les changements notables sont documentés ici. Le projet suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et le versionnage sémantique.

## [Non publié]

### Ajouté

- Tokens de palette nommés, conventions de contribution et checklist qualité par composant.
- Formateurs publics et cohérents pour les montants FCFA, les dates `fr-BF` et les numéros burkinabè.
- Focus ring global et respect de `prefers-reduced-motion`.

- `AppointmentScheduler` pour la prise de rendez-vous : grille de créneaux accessible au clavier, créneaux indisponibles et état vide.
- Navigation clavier complète du calendrier et API contrôlée de pagination.
- Options de focus et de fermeture pour les dialogues et panneaux.
- Annonce des résultats et fermeture extérieure de `SearchBox`.
- Validation du tarball npm dans la CI.
- Socle de formulaires administratifs : groupes de choix, mot de passe, nombres, montants, sélection multiple, période et heure.
- Composants de démarche : service, éligibilité, justificatifs, récapitulatif, référence, délai, contact et avis officiel.
- Navigation publique : lien d’évitement, retour, navigation latérale, langues et sommaire.
- Outils de données responsifs, filtres, actions groupées, chargement et gestionnaire global de notifications.

### Modifié

- Le catalogue centralise désormais le statut, la version et les états des composants prioritaires de la phase 2.
- Les dates du catalogue utilisent le formateur partagé `formatDate`.

- Identifiants uniques pour les groupes d’onglets.
- Métadonnées du catalogue extraites de l’application principale.
- Couverture des tests d’interaction et d’accessibilité étendue.
- `FileUpload`, `OtpInput` et `Accordion` disposent maintenant d’API contrôlées, du collage de code, de limites de fichier et de l’ouverture multiple.

## [1.0.0] - 2026-08-13

### Ajouté

- Première API publique de 58 composants et patrons React.
- Distribution ESM, déclarations TypeScript et feuille de styles.
- Interactions clavier et gestion partagée du focus.
- Tests unitaires, accessibilité, navigateurs et régression visuelle.
- Documentation d’installation et règles d’utilisation.
