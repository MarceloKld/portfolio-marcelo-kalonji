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