import { ArrowRight, BookOpen, CalendarDays, Check, ChevronRight, Clock3, GraduationCap, HelpCircle, LogOut, School, Search, UserRound } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CampusFasoApp() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="campus-app">
      <div className="civic-line" />
      <header className="campus-header">
        <a href="/exemple-campusfaso" className="campus-brand"><span><GraduationCap /></span><div><strong>CampusFaso</strong><small>Orientation universitaire</small></div></a>
        <nav><a href="#formations">Formations</a><a href="#calendrier">Calendrier</a><a href="#aide">Aide</a></nav>
        <Button variant={connected ? "ghost" : "outline"} size="sm" onClick={() => setConnected(!connected)}>{connected ? <><LogOut /> Déconnexion</> : <><UserRound /> Mon espace</>}</Button>
      </header>
      {connected ? <CandidateDashboard /> : <CampusHome onConnect={() => setConnected(true)} />}
      <footer className="campus-footer"><div><strong>CampusFaso</strong><span>Ministère de l’Enseignement supérieur, de la Recherche et de l’Innovation</span></div><div><a href="#aide">Assistance</a><a href="#formations">Guide du candidat</a><a href="/">Retour à Faso UI</a></div></footer>
    </div>
  );
}

function CampusHome({ onConnect }: { onConnect: () => void }) {
  return <main>
    <section className="campus-hero">
      <div><Badge variant="success"><span className="status-dot" /> Campagne 2026–2027 ouverte</Badge><h1>Choisis ta formation.<br /><span>Construis ton avenir.</span></h1><p>La plateforme nationale pour candidater aux formations des universités publiques et privées du Burkina Faso.</p><div className="campus-actions"><Button size="lg" onClick={onConnect}>Créer mon dossier <ArrowRight /></Button><Button variant="outline" size="lg"><Search /> Explorer les formations</Button></div></div>
      <Card className="campus-deadline"><span className="campus-deadline-icon"><CalendarDays /></span><div><small>Prochaine échéance</small><h2>Demandes d’orientation</h2></div><strong>26 juillet</strong><p>Clôture de la première session à 23 h 59.</p><div className="campus-meter"><span /></div><button>Voir tout le calendrier <ChevronRight /></button></Card>
    </section>
    <section className="campus-steps" id="formations"><div><span>01</span><BookOpen /><strong>Explore</strong><p>Compare les filières et leurs conditions d’accès.</p></div><div><span>02</span><Check /><strong>Candidate</strong><p>Classe tes choix et transmets ton dossier.</p></div><div><span>03</span><School /><strong>Confirme</strong><p>Consulte ton orientation et valide ton inscription.</p></div></section>
    <section className="campus-calendar" id="calendrier"><div><span>Campagne nationale</span><h2>Les dates à retenir</h2><p>Un calendrier lisible pour ne manquer aucune étape de ton orientation.</p></div><ol><li className="active"><time>19–26 juil.</time><span><strong>Candidatures</strong>Première session</span><Badge variant="success">En cours</Badge></li><li><time>10–13 sept.</time><span><strong>Résultats</strong>Publication des orientations</span></li><li><time>4–10 sept.</time><span><strong>Paiement</strong>Validation de l’inscription</span></li></ol></section>
    <section className="campus-help" id="aide"><HelpCircle /><div><strong>Besoin d’aide pour ton dossier ?</strong><p>Nos conseillers répondent les jours ouvrables, de 8 h à 18 h.</p></div><Button variant="outline">80 00 13 80</Button></section>
  </main>;
}

function CandidateDashboard() {
  return <main className="campus-dashboard"><div className="campus-dashboard-head"><div><span>Espace candidat</span><h1>Bonjour, Aïcha.</h1><p>Ton dossier avance bien. Il reste une action avant de pouvoir candidater.</p></div><Badge variant="success">Dossier actif</Badge></div><div className="campus-dashboard-grid"><Card className="campus-profile-card"><div><UserRound /><span><strong>Aïcha Kaboré</strong><small>Bac D · Session 2026</small></span></div><div><span>Complétude du dossier</span><strong>75 %</strong></div><div className="campus-progress"><span /></div><Button width="full">Compléter mon profil <ArrowRight /></Button></Card><section className="campus-choices"><div><span>Mes choix de formation</span><Button size="sm">Ajouter un choix</Button></div><Card><span className="choice-rank">1</span><div><strong>Licence Informatique</strong><small>Université Joseph Ki-Zerbo · Ouagadougou</small></div><Badge variant="success">Éligible</Badge><ChevronRight /></Card><Card><span className="choice-rank">2</span><div><strong>Licence Mathématiques</strong><small>Université Nazi Boni · Bobo-Dioulasso</small></div><Badge variant="neutral">À vérifier</Badge><ChevronRight /></Card><Card className="campus-action-card"><Clock3 /><div><strong>Finalise ton dossier avant le 26 juillet</strong><small>Ajoute ton relevé de notes pour transmettre tes choix.</small></div></Card></section></div></main>;
}
