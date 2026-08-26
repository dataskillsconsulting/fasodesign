# Contribuer à Faso UI

## Convention d’API

Les composants simples peuvent proposer `defaultValue` pour une démonstration locale. Tout état qui doit être persisté ou synchronisé avec une démarche est contrôlé (`value` + `onValueChange`, ou `open` + `onOpenChange`). Une API contrôlée ne doit jamais reprendre le contrôle silencieusement quand `value` est fourni.

Les variantes utilisent des noms sémantiques (`default`, `secondary`, `outline`, `destructive`, `success`) et les tailles `sm`, `default`, `lg`. Les états sont exprimés par des props explicites : `loading`, `disabled`, `error`, `success` et `empty`.

## Checklist qualité

- [ ] Types TypeScript et export public ajoutés.
- [ ] États loading, empty, error, disabled et success examinés.
- [ ] Nom accessible, description et message d’erreur reliés au contrôle.
- [ ] Navigation clavier et `:focus-visible` vérifiées.
- [ ] Contraste vérifié en clair et sombre.
- [ ] Responsive vérifié à 320 px, 768 px et 1280 px.
- [ ] Test unitaire et test d’accessibilité ajoutés ou mis à jour.
- [ ] Statut (`Experimental`, `Beta`, `Stable`, `Deprecated`) et version documentés.

## Statuts et versionnage

Un composant est `Stable` quand son API, son accessibilité et ses comportements responsive sont couverts. Une modification compatible incrémente la version mineure, une correction la version patch, et une rupture la version majeure. Toute modification notable est inscrite dans `CHANGELOG.md` selon Keep a Changelog.

## Gouvernance

Les évolutions qui affectent l’API publique, les tokens, les patterns ou la
compatibilité suivent le processus décrit dans [`docs/governance.md`](./docs/governance.md).
Une RFC est requise avant de modifier un composant `Stable` de manière
incompatible.
