/**
 * skills.ts
 * ---------
 * Métadonnées NON traduisibles des catégories de compétences.
 * Les noms de technologies (React, Laravel...) sont des noms propres :
 * on ne les traduit jamais, donc ils restent ici et pas dans i18n.
 */
import { Code2, Database, Wrench } from "lucide-react";
import type { SkillCategoryMeta } from "@/types";

export const SKILL_CATEGORIES: SkillCategoryMeta[] = [
  {
    id: "frontend",
    icon: Code2,
    items: ["Next.js", "React", "React Native", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "backend",
    icon: Database,
    items: ["Laravel", "PHP", "SQL"],
  },
  {
    id: "tools",
    icon: Wrench,
    items: ["Excel", "Word", "PowerPoint"],
  },
];