/**
 * resend.ts
 * ---------
 * Point d'entrée unique vers le client Resend.
 *
 * ⚠️ IMPORTANT : la librairie Resend lève une ERREUR FATALE si on lui passe
 * une clé "undefined" à la construction — ça suffit à faire planter TOUT
 * le build Next.js (même les pages qui n'ont rien à voir avec le contact).
 * On protège donc la création de l'instance avec une valeur de secours.
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn(
    "⚠️ RESEND_API_KEY est manquante. Le formulaire de contact ne pourra pas envoyer d'emails tant que cette clé n'est pas configurée (fichier .env.local en local, Environment Variables sur Vercel en production)."
  );
}

// "re_dummy" est une fausse clé qui permet juste à l'objet Resend de se
// construire sans planter. Si jamais route.ts tente un envoi réel avec
// cette fausse clé, Resend renverra une erreur propre (catchée dans route.ts),
// au lieu de faire planter tout le site au build.
export const resend = new Resend(apiKey || "re_dummy_key_for_build");