# Patterns de démarches FasoDesign

Chaque pattern décrit le problème résolu, les composants à assembler, les
états métier, le contenu, le mobile et l’accessibilité. Les deux patterns
principaux disposent en plus d’un socle React : `AdministrativeForm` et
`ApplicationTracking`.

| Pattern | Composants principaux | Référence |
| --- | --- | --- |
| Formulaire multi-étapes | `AdministrativeForm`, `Stepper`, `Fieldset`, `FormActions` | [formulaire administratif](./formulaire-administratif.md) |
| Création de compte | `Field`, `PasswordField`, `Alert`, `FormActions` | ci-dessous |
| Vérification SMS / OTP | `OtpInput`, `Alert`, `FormActions` | ci-dessous |
| Dépôt de documents | `FileUpload`, `DocumentChecklist`, `EmptyState` | ci-dessous |
| Vérification et résumé | `ApplicationSummary`, `Alert`, `FormActions` | ci-dessous |
| Confirmation | `ReferenceNumber`, `Alert`, `ContactBlock` | ci-dessous |
| Suivi | `ApplicationTracking`, `StatusTracker`, `ReferenceNumber` | [suivi](./suivi-demarche.md) |
| Recherche de dossier | `SearchBox`, `EmptyState`, `Alert` | ci-dessous |
| Paiement Mobile Money | `PaymentSummary`, `Amount`, `Alert`, `FormActions` | ci-dessous |
| Erreur / connexion interrompue | `Alert`, `EmptyState`, `Button`, `Toast` | ci-dessous |
| Rendez-vous | `AppointmentScheduler`, `Calendar`, `EmptyState` | ci-dessous |
| Consultation agent | `DataTable`, `FilterPanel`, `ApplicationSummary`, `StatusTracker` | ci-dessous |

## Règles communes

- Toujours afficher le contexte : service, référence, administration et étape.
- Une action principale par écran ; les actions irréversibles demandent une
  confirmation explicite.
- Toute action réseau expose chargement, succès, erreur et reprise.
- Les données déjà saisies sont conservées lors d’une erreur ou d’une perte de
  connexion lorsque cela est techniquement possible.
- Les montants utilisent FCFA, les dates sont affichées en français et les
  dates envoyées au serveur sont ISO.
- Les messages d’erreur indiquent la correction attendue et sont reliés au
  contrôle concerné.

## Création de compte et authentification

Structure : identité, téléphone ou courriel, mot de passe, consentement,
confirmation. Utiliser `Field`, `PasswordField`, `CheckboxGroup` et
`FormActions`. Les erreurs de disponibilité ne doivent pas effacer les champs.
Pendant l’envoi, désactiver l’action et annoncer le chargement ; après succès,
rediriger vers la vérification sans exposer de secret.

## Vérification SMS ou OTP

Afficher le numéro masqué, le nombre d’essais restant et un délai avant de
renvoyer le code. `OtpInput` doit conserver le collage, la navigation clavier et
une erreur liée au groupe. Prévoir expiration, code incorrect, renvoi réussi,
renvoi bloqué et changement de numéro.

## Dépôt de documents

Afficher les formats, tailles et documents obligatoires avant l’action. Combiner
`FileUpload` et `DocumentChecklist`; chaque fichier possède les états envoi,
validé, refusé et supprimé. Sur mobile, proposer la caméra lorsque disponible.
Ne jamais dépendre du nom ou de la couleur de l’icône pour signaler un refus.

## Vérification et résumé d’une demande

Présenter `ApplicationSummary` par sections courtes, avec une action
« Modifier » qui ramène à l’étape concernée. Avant transmission, afficher les
attestations, pièces manquantes, frais et délais. Les erreurs de validation sont
regroupées en tête et conservent le lien vers chaque champ.

## Confirmation et référence administrative

Après une transmission réussie, afficher un message sans ambiguïté, la
`ReferenceNumber` copiable, la date de dépôt, le délai indicatif et le prochain
canal de suivi. Prévoir impression/téléchargement sans masquer la référence.

## Recherche de dossier

Demander uniquement les informations nécessaires : référence et élément de
vérification. Utiliser `SearchBox`, annoncer le nombre de résultats et prévoir
les états référence inconnue, recherche en cours, service indisponible et
résultat trouvé. Ne pas révéler l’existence d’un dossier à une personne non
autorisée.

## Paiement Mobile Money

Afficher le détail des frais avec `PaymentSummary` et `Amount`, puis le moyen,
le numéro masqué et la durée de validité. Gérer attente opérateur, succès,
échec, expiration et paiement déjà reçu. Empêcher les doubles soumissions et
ne jamais demander le code secret Mobile Money dans l’interface FasoDesign.

## Erreurs et connexion interrompue

Conserver le dernier état connu, indiquer ce qui n’a pas pu être synchronisé et
proposer une action de reprise. Différencier validation locale, erreur serveur,
indisponibilité temporaire et absence de résultat. Une erreur ne doit pas
remplacer silencieusement le contenu déjà saisi.

## Prise de rendez-vous

Combiner `Calendar` et `AppointmentScheduler`. Annoncer le jour, le créneau et
le lieu sélectionnés ; désactiver les créneaux passés ou indisponibles ; fournir
un état vide lorsqu’aucun créneau n’existe. À la confirmation, afficher les
informations pratiques et permettre l’annulation selon les règles du service.

## Consultation d’un dossier agent

Utiliser `DataTable` pour la liste, `FilterPanel` pour les filtres persistants,
`ApplicationSummary` pour le détail et `StatusTracker` pour l’historique.
Prévoir chargement, liste vide, erreur, pagination, tri et sélection. Les
actions sensibles doivent vérifier l’autorisation côté serveur et demander une
confirmation avant modification définitive.
