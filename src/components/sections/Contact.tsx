"use client";

/**
 * Contact.tsx — Section "Contact"
 * ---------------------------------
 * Layout 2 colonnes :
 *  - gauche : infos directes (email, localisation, réseaux)
 *  - droite : formulaire fonctionnel qui POST vers /api/contact
 */
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SOCIAL_LINKS } from "@/data/socials";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Échec de l'envoi");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[380px] w-[480px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[110px]"
      />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ===== COLONNE GAUCHE ===== */}
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:text-sm">
              {t.contact.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              {t.contact.title}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--foreground)]/60 sm:text-base">
              {t.contact.subtitle}
            </p>
          </Reveal>

          {/* Infos de contact */}
          <div className="mt-9 space-y-5">
            <Reveal delay={180}>
              <a
                href="mailto:kalonji905@gmail.com"
                className="group flex items-center gap-4 transition-all duration-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)]/20">
                  <Mail size={18} className="text-[var(--accent)]" />
                </span>
                <div>
                  <p className="text-xs text-[var(--foreground)]/50">
                    {t.contact.info.emailLabel}
                  </p>
                  <p className="font-medium transition-colors duration-300 group-hover:text-[var(--accent)]">
                    kalonji905@gmail.com
                  </p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <MapPin size={18} className="text-[var(--accent)]" />
                </span>
                <div>
                  <p className="text-xs text-[var(--foreground)]/50">
                    {t.contact.info.locationLabel}
                  </p>
                  <p className="font-medium">{t.contact.info.location}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Réseaux sociaux */}
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300
                               hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-md"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ===== COLONNE DROITE : FORMULAIRE ===== */}
        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Nom */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium"
              >
                {t.contact.form.name}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.form.namePlaceholder}
                className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200
                           focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                style={{ borderColor: "var(--border-color)" }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                {t.contact.form.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200
                           focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                style={{ borderColor: "var(--border-color)" }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contact.form.messagePlaceholder}
                className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200
                           focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                style={{ borderColor: "var(--border-color)" }}
              />
            </div>

            {/* Bouton */}
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t.contact.form.sending}
                </>
              ) : (
                t.contact.form.submit
              )}
            </Button>

            {/* Messages de statut */}
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-[var(--accent)] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <CheckCircle2 size={16} />
                {t.contact.form.success}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
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