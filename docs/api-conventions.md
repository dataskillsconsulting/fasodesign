# Conventions d’API React

Les composants FasoDesign distinguent les valeurs locales de démonstration et
les valeurs métier contrôlées par l’application.

## Règle contrôlé / non contrôlé

| Situation | API attendue |
| --- | --- |
| Valeur sauvegardée, synchronisée ou envoyée au serveur | `value` + `onValueChange` |
| Ouverture d’une superposition pilotée par l’application | `open` + `onOpenChange` |
| Interaction locale sans persistance | `defaultValue` ou état interne |
| Démonstration dans le catalogue | valeur par défaut explicite |

Une prop contrôlée est prioritaire : un composant ne doit jamais revenir à son
état interne lorsqu’une valeur contrôlée est présente.

## Nommage

- Les booléens utilisent un préfixe clair : `loading`, `disabled`, `invalid`.
- Les callbacks de valeur utilisent `onValueChange`.
- Les callbacks d’ouverture utilisent `onOpenChange`.
- Les libellés sont des chaînes visibles et explicites ; les noms accessibles
  utilisent `label`, `ariaLabel` ou l’association native `label` / `htmlFor`.
- Les variantes sont sémantiques : `success`, `warning`, `destructive`,
  `information`, jamais des noms de couleur.

## États minimums

Chaque nouveau composant doit examiner les états suivants et documenter ceux
qui sont pertinents :

| État | Attendu |
| --- | --- |
| Loading | Action non dupliquée, attente annoncée |
| Empty | Explication et action de reprise lorsque possible |
| Error | Problème et correction attendue, associés au contrôle |
| Disabled | Raison compréhensible si l’action est importante |
| Success | Confirmation textuelle, pas seulement colorée |

## Compatibilité

Une prop publique ne change pas de sens dans une version mineure. Une
alternative est introduite et documentée avant dépréciation, conformément au
[cycle de dépréciation](./governance.md#versionnage-et-dépréciation).
