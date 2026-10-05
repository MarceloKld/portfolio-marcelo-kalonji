import { useSyncExternalStore } from "react";

// Cette fonction "subscribe" ne fait rien car on n'a pas besoin
// d'écouter un vrai changement — on veut juste savoir si on est
// côté client (après hydratation) ou côté serveur.
const subscribe = () => () => {};

/**
 * Hook réutilisable qui répond à la question :
 * "Est-ce que le composant est bien monté dans le navigateur ?"
 *
 * - Pendant le rendu serveur (SSR) ou avant l'hydratation → retourne false
 * - Une fois dans le navigateur, après hydratation → retourne true
 *
 * Avantage par rapport à useState+useEffect : aucun warning React,
 * et c'est le pattern officiellement recommandé par React pour ce cas précis.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,   // Valeur retournée côté client
    () => false   // Valeur retournée côté serveur
  );
}