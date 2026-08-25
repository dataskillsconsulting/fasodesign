# Synchronisation Figma / Code

Le code est la source de vérité des valeurs. Le fichier
[`figma/tokens.json`](../figma/tokens.json) est l’artefact d’échange pour les
variables Figma ; il reprend les valeurs de `src/design-system/tokens.css` et
`typography.css`.

## Structure de la bibliothèque Figma

Créer les pages dans cet ordre :

```text
Cover
Getting started
Foundations
---
Components
---
Patterns
Templates
```

Créer les collections suivantes avant tout composant :

| Collection | Modes | Contenu |
| --- | --- | --- |
| Primitives | Value | Palette brute |
| Color semantic | Light, Dark | Couleurs de surface, texte, action, statut et focus |
| Spacing | Value | Échelle 4 à 64 px |
| Radius | Value | Rayons 4 à 10 px |
| Typography | Value | Famille Manrope, corps et titres |

Dans Figma, les variables sémantiques doivent être aliasées aux primitives et
configurées avec les scopes adaptés. Le Dev Mode doit exposer la syntaxe CSS
`var(--nom-du-token)`.

## Ordre de synchronisation

1. Modifier les tokens dans le code.
2. Mettre à jour `figma/tokens.json` dans la même pull request.
3. Exécuter `npm run check:figma-tokens`.
4. Importer ou mettre à jour les variables Figma à partir de ce fichier.
5. Construire les composants dans l’ordre Button, Input, Card, Badge, Alert,
   Dialog, puis les patterns et templates.
6. Ajouter Code Connect seulement après publication de la bibliothèque Figma,
   avec une URL Figma contenant le `node-id` du composant.

## Contrat Code Connect

Un mapping ne doit être créé qu’après réception d’une URL Figma publiée et
d’un `node-id`. Chaque fichier doit être nommé `ComponentName.figma.ts` et
rester à côté du composant React concerné. Les variantes Figma doivent mapper
exactement les props publiques React ; ne créez jamais une prop inexistante
pour adapter un visuel.

## Validation

Avant publication de la bibliothèque Figma, vérifier : contrastes, cibles de
44 px minimum, focus visible, variables non résolues et cohérence des variantes.
Conserver la liste des identifiants Figma dans le suivi de la pull request,
jamais dans le code source.
