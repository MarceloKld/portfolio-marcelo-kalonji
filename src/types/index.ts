import type { LucideIcon } from "lucide-react";

export type Locale = "fr" | "en";

export type NavLink = {
  key: string;
  href: string;
};

// Identifiants uniques de chaque service — doivent correspondre
// EXACTEMENT aux clés utilisées dans fr.json / en.json (services.items.*)
export type ServiceId = "web" | "data" | "strategy";

// Les données "structurelles" d'un service (icône) sont séparées
// du texte (qui vit dans les fichiers de traduction) — voir data/services.ts
export type ServiceMeta = {
  id: ServiceId;
  icon: LucideIcon;
};