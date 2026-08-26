# Résilience et connexion limitée

Une démarche ne doit pas perdre des informations parce que la connexion est
lente ou interrompue. Faso UI fournit deux hooks sans dépendance réseau pour
mettre en œuvre ce comportement dans une application React.

## Conserver un brouillon

`usePersistentDraft` stocke explicitement une valeur sérialisée dans le
stockage local. Il restaure le brouillon au prochain chargement et expose un
statut pour informer l’usager.

```tsx
const draft = usePersistentDraft("nationalite:v1", {
  initialValue: { nom: "", prenoms: "" },
});

<Button onClick={() => draft.save()}>
  Enregistrer le brouillon
</Button>;
```

N’enregistrez pas de données sensibles dans le navigateur sans évaluation de
sécurité. Effacez le brouillon après une transmission réussie.

## Empêcher un double envoi

`useIdempotentSubmission` transmet une clé stable au backend et retourne la
même promesse lorsqu’un second clic arrive pendant l’envoi.

```tsx
const submission = useIdempotentSubmission(async (request, context) => {
  return fetch("/api/demandes", {
    method: "POST",
    headers: { "Idempotency-Key": context.idempotencyKey },
    body: JSON.stringify(request),
  });
});

<Button loading={submission.isSubmitting} onClick={() => submission.submit(value)}>
  Transmettre la demande
</Button>;
```

Le serveur doit mémoriser cette clé et retourner le même résultat à une requête
répétée. C’est indispensable pour les paiements et les transmissions de dossier.

`OnlineApplicationPattern` montre cette intégration de bout en bout : le
brouillon est enregistré explicitement, la certification est exigée avant la
transmission et l’action affiche son état de chargement.

## Checklist de mise en production

- Afficher l’enregistrement du brouillon et ne jamais le supposer implicite.
- Ajouter une action « Réessayer » après une erreur réseau.
- Désactiver l’action primaire pendant la soumission.
- Tester la reprise en mode réseau lent et hors ligne.
- Ne considérer un paiement comme réussi qu’après confirmation du prestataire.

## Budget de performance

Le pipeline vérifie le poids gzip du catalogue construit : 30 kB maximum pour
le CSS et 130 kB pour le JavaScript. Exécutez le contrôle localement avant une
pull request :

```sh
npm run check:performance
```

## Dégradation sans JavaScript

Le catalogue affiche une instruction HTML autonome lorsque JavaScript n’est pas
disponible. Pour une démarche métier, adaptez ce principe : donnez un canal
alternatif concret (guichet, téléphone ou procédure papier) et évitez de
promettre une soumission hors ligne si le serveur ne peut pas la recevoir.
