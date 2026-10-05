// Type qui liste les deux langues possibles du site.
// TypeScript nous empêchera d'écrire autre chose que "fr" ou "en" par erreur.
export type Locale = "fr" | "en";

// Structure d'un lien de navigation
export type NavLink = {
  key: string;   // La clé de traduction (ex: "home")
  href: string;  // L'ancre vers laquelle on scroll (ex: "#accueil")
};