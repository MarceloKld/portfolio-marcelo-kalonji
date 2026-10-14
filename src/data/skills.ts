/**
 * skills.ts
 * ---------
 * Les noms de technologies sont des noms propres → jamais traduits,
 * donc ils restent ici (données structurelles), pas dans i18n.
 */
import {
  Layers, Code2, Smartphone, Server, Braces,
  Globe, Database, GitBranch, Workflow,
  FileSpreadsheet, FileText, Presentation,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import type { DevSkill, TechItem } from "@/types";

// Barres de progression — ajuste les pourcentages quand tu veux
export const DEV_SKILLS: DevSkill[] = [
  { name: "Laravel / REST API", percentage: 92 },
  { name: "Next.js / React", percentage: 88 },
  { name: "SQL / Bases de données", percentage: 85 },
  { name: "PHP / JavaScript", percentage: 82 },
  { name: "Git / Déploiement", percentage: 78 },
];

// Ticker défilant — ajoute/retire des outils librement ici
export const TECH_STACK: TechItem[] = [
  { name: "Next.js", icon: Layers },
  { name: "React", icon: Code2 },
  { name: "React Native", icon: Smartphone },
  { name: "Laravel", icon: Server },
  { name: "PHP", icon: Braces },
  { name: "JavaScript", icon: Braces },
  { name: "HTML / CSS", icon: Globe },
  { name: "SQL", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GithubIcon },
  { name: "REST API", icon: Workflow },
  { name: "Excel", icon: FileSpreadsheet },
  { name: "Word", icon: FileText },
  { name: "PowerPoint", icon: Presentation },
];