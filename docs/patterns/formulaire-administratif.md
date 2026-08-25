# Pattern — Formulaire administratif multi-étapes

## Problème résolu

Permettre à un citoyen de renseigner une démarche longue sans perdre ses
informations, en comprenant sa progression et les pièces encore nécessaires.

## Structure recommandée

1. `GovernmentHeader` et `SkipLink`.
2. `Stepper` pour annoncer la position dans la démarche.
3. Une section de formulaire à la fois avec `FormSection` et `Fieldset`.
4. `DocumentChecklist` pour les justificatifs.
5. `FormActions` avec une action secondaire « Enregistrer le brouillon ».
6. `ApplicationSummary` avant la transmission.
7. `ReferenceNumber` et `StatusTracker` après confirmation.

## États à prévoir

| Moment | État | Comportement |
| --- | --- | --- |
| Ouverture | Brouillon | Restaurer les valeurs et indiquer la date de sauvegarde. |
| Navigation | En cours | Désactiver l’action pendant la sauvegarde, conserver le focus. |
| Validation | Erreur | Résumé des erreurs en tête et focus sur la première correction. |
| Pièces | Action requise | Nommer le document manquant et son format accepté. |
| Transmission | Chargement | Empêcher les doubles soumissions et annoncer l’attente. |
| Succès | Confirmé | Afficher la référence, les prochaines étapes et le suivi. |
| Réseau | Reprise | Conserver le brouillon et proposer de réessayer explicitement. |

## Règles de contenu

- Utiliser les termes reconnus par l’administration et éviter les noms de
  champs techniques.
- Indiquer « Facultatif » plutôt que laisser deviner qu’un champ ne l’est pas.
- Les erreurs décrivent la correction attendue, par exemple : « Saisissez un
  numéro à 8 chiffres ».
- Afficher les montants en FCFA et les dates en français ; envoyer les dates au
  serveur au format ISO.
- Préciser les limites de taille et les formats des fichiers avant le dépôt.

## Mobile et accessibilité

- À 320 px, le stepper peut devenir vertical et les actions s’empilent.
- Chaque étape possède un titre unique et un état annoncé par le stepper.
- Les boutons de navigation sont accessibles au clavier et gardent un focus
  visible.
- Une erreur de champ est reliée avec `aria-describedby` et n’est jamais
  signalée par la couleur seule.
- Une sauvegarde ou une transmission expose `aria-busy`/`aria-live` et bloque
  les doubles actions.
