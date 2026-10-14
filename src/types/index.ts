import type { LucideIcon } from "lucide-react";

export type Locale = "fr" | "en";

export type NavLink = {
  key: string;
  href: string;
};

// === SERVICES (déjà existant) ===
export type ServiceId = "web" | "data" | "strategy";

export type ServiceMeta = {
  id: ServiceId;
  icon: LucideIcon;
};

// === EXPÉRIENCE (nouveau) ===
// Les 3 identifiants doivent correspondre EXACTEMENT aux clés
// utilisées dans fr.json / en.json sous "experience.items.<id>"
export type ExperienceId = "kimia" | "unikin" | "vodacom";

export type ExperienceMeta = {
  id: ExperienceId;
  icon: LucideIcon; // icône générique représentant le type de mission
};

// === PROJETS (nouveau) ===

// Les 4 identifiants doivent correspondre EXACTEMENT aux clés
// utilisées dans fr.json / en.json sous "projects.items.<id>"
export type ProjectId = "unikin" | "kinalert" | "kimia" | "jolka";

export type ProjectLink = {
  labelKey: "viewDemo" | "viewUserApp" | "viewAdminApp";
  url: string;
};

// Données structurelles (non traduisibles) d'un projet
export type ProjectMeta = {
  id: ProjectId;
  cover: string;      // image principale de la carte
  gallery: string[];  // images supplémentaires affichées dans la modale
  links?: ProjectLink[];   // lien externe, optionnel (ex: Jolka uniquement)
};

// Une statistique chiffrée affichée dans la modale (ex: "84% — Taux de réussite")
export type ProjectStat = { value: string; label: string };

// Une fonctionnalité clé affichée dans la modale
export type ProjectFeature = { title: string; description: string };

// Une ligne du tableau de rôles/sécurité (RBAC), affiché pour les projets concernés
export type ProjectRole = { role: string; scope: string; auth: string };

// Le contenu textuel complet d'un projet (tout ce qui est traduit)
export type ProjectContent = {
  title: string;
  tag: string;
  status: string;
  shortDescription: string; // résumé affiché sur la carte
  modal: {
    overview: string;
    stats?: ProjectStat[];     // optionnel : tous les projets n'ont pas de stats chiffrées
    features: ProjectFeature[];
    roles?: ProjectRole[];     // optionnel : seuls KIN ALERT et KIM.IA ont une matrice RBAC
    techStack: string[];
  };
};


// === COMPÉTENCES (v2 — barres de progression + ticker technologique) ===

// Une ligne de la liste "Développement" avec son pourcentage de maîtrise
export type DevSkill = {
  name: string;
  percentage: number; // 0 à 100
};

// Un outil/techno affiché dans le ticker défilant
// On accepte soit une icône Lucide (générique), soit un SVG maison (ex: GithubIcon)
type IconComponent =
  | LucideIcon
  | ((props: { className?: string }) => React.JSX.Element);

export type TechItem = {
  name: string;
  icon: IconComponent;
};