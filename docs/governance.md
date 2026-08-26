# Gouvernance FasoDesign

FasoDesign est maintenu comme un système de conception public : les décisions
doivent être traçables, accessibles et compatibles avec les besoins des
administrations utilisatrices.

## Comité de validation

Chaque évolution significative est examinée par trois rôles. Une même personne
peut couvrir plusieurs rôles dans une petite équipe, mais les trois critères
restent obligatoires.

| Rôle | Vérifie |
| --- | --- |
| Design | Utilité du parcours, cohérence des tokens et qualité responsive |
| Technique | API publique, performance, compatibilité et maintenance |
| Accessibilité | Clavier, focus, contraste, lecteur d’écran et contenu clair |

Une modification de composant `Stable`, une rupture d’API, un nouveau pattern
ou une nouvelle dépendance nécessite l’accord des trois rôles.

## RFC

Une RFC est requise pour les changements qui modifient l’API publique, les
tokens, les conventions de contenu, la stratégie de compatibilité ou les
parcours de référence. Copiez
[`docs/rfcs/0000-template.md`](./rfcs/0000-template.md), numérotez le fichier
et liez-le à la pull request correspondante.

Une RFC reste ouverte au moins cinq jours ouvrés avant décision, sauf correctif
de sécurité ou d’accessibilité bloquant.

## Versionnage et dépréciation

Le paquet suit SemVer :

- Correctif compatible : version patch.
- Fonctionnalité compatible : version mineure.
- Rupture d’API : version majeure.

Un élément `Stable` est d’abord annoté `Deprecated` dans une version mineure,
avec une alternative et un guide de migration. Il est conservé au minimum une
version mineure complète avant suppression dans une version majeure. Les
exceptions de sécurité sont documentées dans le changelog.

## Adoption et retours d’usage

Les administrations peuvent déposer un besoin via une issue en utilisant le
modèle « Demande d’administration ». Chaque trimestre, le comité publie :

1. les demandes reçues et leur statut ;
2. les résultats des tests utilisateurs ;
3. la roadmap du trimestre suivant.

Les données personnelles ne doivent jamais apparaître dans les issues, RFC ou
captures d’écran de démonstration.

Les formats à publier sont disponibles dans
[`docs/adoption/`](./adoption/) : roadmap trimestrielle et fiche de test
utilisateur.
