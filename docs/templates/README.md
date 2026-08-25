# Templates de référence

Les templates sont des compositions de haut niveau : ils définissent la
structure d'une page, ses zones principales et ses états métier, sans imposer
les données ni le routage de l'application. Ils sont exportés par le package
React et peuvent être personnalisés avec `title`, `description` et `children`.

## Citoyens

| Template | Usage |
| --- | --- |
| `CitizenPortalTemplate` | Accueil et recherche de services |
| `ServiceDetailTemplate` | Conditions et démarrage d'une démarche |
| `ApplicationCreationTemplate` | Création multi-étapes |
| `CitizenDashboardTemplate` | Démarches et actions du citoyen |
| `ApplicationTrackingTemplate` | Historique et état d'une demande |
| `PaymentTemplate` | Paiement Mobile Money en FCFA |
| `ConfirmationTemplate` | Référence et récépissé |
| `ErrorTemplate` | Erreur et reprise après interruption |
| `MaintenanceTemplate` | Indisponibilité planifiée |

## Agents

| Template | Usage |
| --- | --- |
| `AgentDashboardTemplate` | Indicateurs d'activité |
| `CaseListTemplate` | Liste filtrable de dossiers |
| `AdministrativeSearchTemplate` | Recherche par référence ou identité |
| `CaseConsultationTemplate` | Consultation d'un dossier |
| `ApplicationProcessingTemplate` | Décision et demande de correction |
| `DocumentManagementTemplate` | Contrôle et annotation des pièces |

Chaque template doit être placé dans une route réelle avec les composants de
domaine adaptés. Les exemples inclus sont volontairement statiques : ils
servent de référence visuelle et de point de départ, pas de couche de données.

## API commune

Tous les templates acceptent les props suivantes :

| Prop | Type | Usage |
| --- | --- | --- |
| `title` | `string` | Remplace le titre de démonstration. |
| `description` | `string` | Remplace le texte d'introduction de `CitizenPortalTemplate`. |
| `children` | `ReactNode` | Ajoute du contenu métier à la zone principale. |

Les actions visibles dans les exemples servent à montrer la hiérarchie. Une
application doit relier ses événements, son routage et ses données métier.
