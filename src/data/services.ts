import { Code2, Database, Compass } from "lucide-react";
import type { ServiceMeta } from "@/types";

/**
 * Liste des 3 services, dans l'ordre d'affichage.
 * Chaque "id" doit avoir une entrée correspondante dans
 * i18n/fr.json et i18n/en.json sous la clé "services.items.<id>".
 *
 * Icônes choisies (toutes génériques, donc disponibles dans lucide-react
 * sans problème de droits de marque — voir notre convention §6.4 de l'audit) :
 * - Code2    : représente le développement web
 * - Database : représente la gestion de données
 * - Compass  : représente le conseil / la stratégie (orientation, cap à suivre)
 */
export const SERVICES_META: ServiceMeta[] = [
  { id: "web", icon: Code2 },
  { id: "data", icon: Database },
  { id: "strategy", icon: Compass },
];