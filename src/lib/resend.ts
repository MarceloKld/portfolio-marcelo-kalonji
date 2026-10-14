/**
 * resend.ts
 * ---------
 * Point d'entrée unique vers le client Resend.
 * On centralise l'instanciation ici pour ne jamais répéter
 * "new Resend(...)" dans plusieurs fichiers.
 */
import { Resend } from "resend";

// Si la clé manque, on préfère le voir tout de suite dans les logs serveur
// plutôt que d'avoir une erreur obscure au moment de l'envoi.
if (!process.env.RESEND_API_KEY) {
  console.warn("⚠️ RESEND_API_KEY est manquante dans .env.local");
}

export const resend = new Resend(process.env.RESEND_API_KEY);