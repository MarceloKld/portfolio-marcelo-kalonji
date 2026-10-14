/**
 * route.ts — API Route "/api/contact"
 * -------------------------------------
 * C'est un "Server Component" spécial (Route Handler) : ce code ne tourne
 * JAMAIS dans le navigateur, uniquement sur le serveur. C'est indispensable
 * ici car la clé RESEND_API_KEY ne doit jamais être exposée côté client.
 *
 * Le formulaire (Contact.tsx) envoie une requête POST ici en JSON,
 * et ce fichier se charge d'envoyer le vrai email via Resend.
 */
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ContactEmail from "@/emails/ContactEmail";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validation serveur : on ne fait JAMAIS confiance aux données du client,
    // même si le formulaire a déjà une validation côté front.
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio Marcelo <onboarding@resend.dev>",
      to: "kalonji905@gmail.com",
      replyTo: email, // en répondant à l'email reçu, tu réponds directement au visiteur
      subject: `Nouveau message de ${name} — Portfolio`,
      react: ContactEmail({ name, email, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}