# Pattern — Suivi d’une démarche

## Problème résolu

Donner au citoyen une réponse claire à trois questions : où en est son dossier,
quelle action est attendue de sa part et quand il recevra la prochaine réponse.

## Structure recommandée

1. Une référence administrative copiable avec `ReferenceNumber`.
2. Un résumé du service, du demandeur et de la dernière mise à jour.
3. Un `StatusTracker` chronologique avec une seule étape `current`.
4. Une `Alert` si une action, un document ou un paiement est requis.
5. Une `EmptyState` pour une référence inconnue ou sans historique.
6. Un bloc de contact pour l’aide et les horaires de l’administration.

## États du parcours

| État | Message attendu | Action |
| --- | --- | --- |
| Référence inconnue | « Vérifiez la référence saisie. » | Corriger ou recommencer la recherche. |
| Reçu | « Votre demande a été enregistrée. » | Consulter la référence. |
| En traitement | « Le dossier est en cours de vérification. » | Attendre, sans promettre de délai non confirmé. |
| Action requise | Nommer précisément la pièce ou l’information attendue. | Corriger depuis un bouton explicite. |
| Paiement requis | Afficher le montant en FCFA et le moyen disponible. | Payer une seule fois, avec confirmation. |
| Terminé | Expliquer le résultat et la prochaine étape. | Télécharger ou consulter le document. |
| Interrompu | Expliquer que l’état est temporairement indisponible. | Réessayer sans perdre la référence. |

## Accessibilité et responsive

- Le statut courant porte `aria-current="step"` et reste compréhensible sans
  la couleur ou l’icône.
- Les dates sont rendues dans la langue de l’interface avec une valeur ISO dans
  `datetime` lorsqu’elle est disponible.
- Les actions critiques ont un libellé explicite : « Payer les frais »,
  « Ajouter le document demandé », « Télécharger le certificat ».
- Sur mobile, la référence et l’état courant apparaissent avant l’historique.
- Les erreurs réseau sont annoncées et ne remplacent pas le dernier état connu
  lorsque celui-ci peut être conservé.
