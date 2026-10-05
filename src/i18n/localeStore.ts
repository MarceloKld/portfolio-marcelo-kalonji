import type { Locale } from "@/types";

const STORAGE_KEY = "locale";

// Liste des "abonnés" qui veulent être prévenus quand la langue change
let listeners: Array<() => void> = [];

// Prévient tous les composants abonnés qu'un changement a eu lieu
function emitChange() {
  for (const listener of listeners) listener();
}

/**
 * Fonction "subscribe" exigée par useSyncExternalStore.
 * Elle enregistre un listener et retourne une fonction de nettoyage.
 */
export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

/**
 * Lit la langue actuelle depuis localStorage (côté client uniquement).
 */
export function getSnapshot(): Locale {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "fr";
}

/**
 * Valeur utilisée côté serveur (SSR) : toujours "fr" par défaut.
 * Garantit qu'il n'y a jamais de décalage entre serveur et client.
 */
export function getServerSnapshot(): Locale {
  return "fr";
}

/**
 * Change la langue : on sauvegarde dans localStorage,
 * puis on prévient tous les composants abonnés de se re-rendre.
 */
export function setStoredLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  emitChange();
}