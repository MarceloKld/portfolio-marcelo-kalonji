import type { LucideIcon } from "lucide-react";
import { Mail } from "lucide-react"; // Mail est une icône GÉNÉRIQUE, elle reste dans Lucide
import { GithubIcon } from "@/components/icons/GithubIcon";       // icône maison
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";   // icône maison
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";   // icône maison (déjà créée Phase 3)

// Type générique qui accepte aussi bien une icône Lucide qu'une icône SVG maison,
// du moment qu'elle accepte une prop "className" (toutes nos icônes maison le font)
type IconComponent = LucideIcon | ((props: { className?: string }) => React.JSX.Element);

export type SocialLink = {
  label: string;
  href: string;
  icon: IconComponent;
};

/**
 * ⚠️ À FAIRE : remplace les liens GitHub et LinkedIn ci-dessous
 * par tes vraies URLs de profil.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/TON-PSEUDO", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/TON-PROFIL", icon: LinkedinIcon },
  { label: "Email", href: "mailto:kalonji905@gmail.com", icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/243817655587", icon: WhatsAppIcon },
];