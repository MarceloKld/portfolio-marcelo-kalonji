import type { NavLink } from "@/types";

/**
 * Liste centralisée des liens de la Navbar, organisés par priorité
 * comme demandé : Accueil, Services, Projets, Expérience, Compétences, À propos, Contact.
 *
 * "key" correspond à une clé du fichier de traduction (fr.json / en.json)
 * "href" correspond à l'ID de la section cible sur la page (ancre #)
 */
export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "#accueil" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projets" },
  { key: "experience", href: "#experience" },
  { key: "skills", href: "#competences" },
  { key: "about", href: "#apropos" },
  { key: "contact", href: "#contact" },
];