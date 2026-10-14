"use client";

/**
 * Contact.tsx — Section "Contact"
 * ---------------------------------
 * Layout 2 colonnes :
 *  - gauche : infos directes (email, téléphone, localisation, réseaux)
 *  - droite : formulaire fonctionnel qui POST vers /api/contact
 *
 * ⚠️ Ici on utilise useState classique (pas useSyncExternalStore) :
 * la règle "useSyncExternalStore obligatoire" ne concerne QUE la lecture
 * de sources externes (localStorage, matchMedia...). Un formulaire est
 * un état 100% interne au composant → useState est la bonne solution.
 */

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SOCIAL_LINKS } from "@/data/socials";

// Les différents états possibles de l'envoi du formulaire
type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useLanguage();

  // État du formulaire (contrôlé) : chaque champ est lié à une valeur en state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // empêche le rechargement de page par défaut du <form>
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Échec de l'envoi");

      setStatus("success");
      // On vide le formulaire après un envoi réussi
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">

        {/* Colonne gauche : infos directes */}
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            {t.contact.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-[var(--foreground)]/60">
            {t.contact.subtitle}
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <Mail size={18} className="text-[var(--accent)]" />
              </span>
              <div>
                <p className="text-xs text-[var(--foreground)]/50">{t.contact.info.emailLabel}</p>
                <p className="font-medium">kalonji905@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <MapPin size={18} className="text-[var(--accent)]" />
              </span>
              <div>
                <p className="text-xs text-[var(--foreground)]/50">{t.contact.info.locationLabel}</p>
                <p className="font-medium">{t.contact.info.location}</p>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux — réutilisation de la donnée déjà existante */}
          <div className="mt-8 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:border-[var(--accent)]/50"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Colonne droite : formulaire */}
        <Reveal delay={150}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border p-6 sm:p-8"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-color)" }}
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                {t.contact.form.name}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.form.namePlaceholder}
                className="w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{ borderColor: "var(--border-color)" }}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                {t.contact.form.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{ borderColor: "var(--border-color)" }}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contact.form.messagePlaceholder}
                className="w-full resize-none rounded-lg border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)]"
                style={{ borderColor: "var(--border-color)" }}
              />
            </div>

            <Button type="submit" variant="primary" className="w-full justify-center" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t.contact.form.sending}
                </>
              ) : (
                t.contact.form.submit
              )}
            </Button>

            {/* Messages de confirmation / erreur, visibles seulement après tentative d'envoi */}
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-[var(--accent)]">
                <CheckCircle2 size={16} />
                {t.contact.form.success}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={16} />
                {t.contact.form.error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}