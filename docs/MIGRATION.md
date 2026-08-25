# Guide de migration

Ce guide accompagne la migration vers l'API publique de `@faso-ui/react` 1.0.

## Installer la feuille de styles

Importez la feuille de styles une seule fois au point d'entrée de
l'application :

```tsx
import "@faso-ui/react/styles.css";
```

## Utiliser les composants contrôlés

Quand une valeur est enregistrée, synchronisée ou envoyée à un service,
utilisez l'API contrôlée :

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen} title="Confirmer" />;
```

Les props `defaultValue` et `defaultOpen` restent réservées aux interactions
locales et aux démonstrations.

## Formats locaux

Utilisez les formateurs partagés au lieu de construire des chaînes à la main :

```tsx
import { formatAmount, formatDate, formatPhone } from "@faso-ui/react";

formatAmount(12500); // 12 500 FCFA
formatDate("2026-08-26");
formatPhone("70000000");
```

## Vérifier avant de publier

Exécutez les contrôles de type, les tests unitaires et les tests
d'accessibilité. Consultez aussi la checklist de
[`CONTRIBUTING.md`](../CONTRIBUTING.md) pour les états, le clavier et le
responsive.
