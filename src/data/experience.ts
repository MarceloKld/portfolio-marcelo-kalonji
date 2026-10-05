import { Laptop, Users, Building2 } from "lucide-react";
import type { ExperienceMeta } from "@/types";

/**
 * Liste des 3 expériences, DANS L'ORDRE CHRONOLOGIQUE DÉCROISSANT
 * (la plus récente en premier — convention standard d'un CV/portfolio).
 *
 * Icônes choisies (toutes génériques, aucun logo de marque donc
 * aucun risque de problème d'export avec lucide-react) :
 * - Laptop   : mission de développement freelance à distance
 * - Users    : mission de coordination / gestion d'équipe
 * - Building2 : stage en entreprise classique
 */
export const EXPERIENCE_META: ExperienceMeta[] = [
  { id: "kimia", icon: Laptop },
  { id: "unikin", icon: Users },
  { id: "vodacom", icon: Building2 },
];