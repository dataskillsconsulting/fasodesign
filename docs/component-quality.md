# Matrice qualité des composants

Cette matrice complète la checklist de contribution. Un composant `Stable`
doit satisfaire toutes les colonnes ; un composant `Beta` documente les écarts
et son plan de stabilisation.

| Domaine | Statut actuel | États | Tests requis | Propriétaire |
| --- | --- | --- | --- | --- |
| Fondations | Stable | focus, contraste, motion | tokens, contraste | Design system |
| Formulaires | Beta | loading, error, disabled, success | unitaire, axe, clavier | Formulaires |
| Feedback | Beta | information, success, warning, error | unitaire, axe, clavier | Accessibilité |
| Superpositions | Beta | open, closed, focus trap | unitaire, axe, clavier | Interaction |
| Données | Beta | loading, empty, tri, sélection | unitaire, axe, clavier | Données |
| Navigation | Beta | focus, mobile, état actif | unitaire, axe, clavier | Navigation |
| Parcours | Beta | current, complete, upcoming, error | unitaire, axe, clavier | Parcours citoyens |
| Documents | Experimental | ajout, erreur, reprise | unitaire, axe, clavier | Démarches |
| Métier | Beta | empty, action, confirmation | unitaire, axe, clavier | Services publics |

Les statuts détaillés sont repris dans
[`PHASE-0-AUDIT.md`](../PHASE-0-AUDIT.md). Toute promotion vers `Stable` doit
être inscrite dans le changelog avec les tests qui la justifient.
