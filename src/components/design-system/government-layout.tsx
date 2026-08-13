import { ExternalLink, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

function Mark() {
  return (
    <span className="government-mark">
      <i>★</i>
    </span>
  );
}

export function GovernmentHeader({
  serviceName = "Nom du service",
}: {
  serviceName?: string;
}) {
  return (
    <header className="government-header">
      <div className="government-identity">
        <Mark />
        <div>
          <small>Burkina Faso</small>
          <strong>{serviceName}</strong>
        </div>
      </div>
      <nav aria-label="Navigation principale">
        <a href="#vue-d’ensemble">Accueil</a>
        <a href="#tableau-de-bord">Mes démarches</a>
        <a href="#référentiel">Aide</a>
      </nav>
      <div>
        <Button variant="ghost" size="icon" aria-label="Rechercher">
          <Search />
        </Button>
        <Button variant="outline" size="sm">
          Se connecter
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="government-menu"
          aria-label="Menu"
        >
          <Menu />
        </Button>
      </div>
    </header>
  );
}

export function GovernmentFooter() {
  return (
    <footer className="government-footer">
      <div className="government-identity">
        <Mark />
        <div>
          <small>Burkina Faso</small>
          <strong>Service public numérique</strong>
        </div>
      </div>
      <div>
        <strong>Liens utiles</strong>
        <a href="#référentiel">Accessibilité</a>
        <a href="#principes">Données personnelles</a>
        <a href="mailto:aide@service-public.gov.bf">Aide et contact</a>
      </div>
      <div>
        <strong>Sites de référence</strong>
        <a href="https://servicepublic.gov.bf" target="_blank" rel="noreferrer">
          Service public <ExternalLink />
        </a>
        <a
          href="https://www.gouvernement.gov.bf"
          target="_blank"
          rel="noreferrer"
        >
          Gouvernement <ExternalLink />
        </a>
      </div>
    </footer>
  );
}
