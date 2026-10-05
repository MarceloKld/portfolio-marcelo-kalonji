import type { Config } from "tailwindcss";

const config: Config = {
  // Active le mode sombre piloté manuellement (via la classe "dark" sur le html)
  // plutôt que via les préférences système uniquement — nécessaire pour next-themes
  darkMode: "class",

  // Les dossiers que Tailwind doit scanner pour trouver les classes utilisées
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // === PALETTE RESTREINTE : Noir / Blanc / Vert ===

        // Nuances de noir (pour le fond en dark mode, le texte en light mode)
        ink: {
          DEFAULT: "#0A0A0A", // Noir principal (fond dark mode)
          soft: "#171717",    // Noir légèrement plus clair (cartes, sections)
        },

        // Nuances de blanc (pour le fond en light mode, le texte en dark mode)
        paper: {
          DEFAULT: "#FFFFFF", // Blanc principal (fond light mode)
          soft: "#F5F5F5",    // Blanc cassé (cartes, sections en light mode)
        },

        // Le VERT — utilisé UNIQUEMENT pour les accents (disponibilité, succès)
        accent: {
          DEFAULT: "#22C55E", // Vert principal (badge disponibilité, liens actifs)
          glow: "#4ADE80",    // Vert plus clair (effet de lueur/glow au hover)
        },
      },

      // Police d'écriture (on la configurera avec next/font à l'étape layout)
      fontFamily: {
        sans: ["var(--font-sans)"],
      },

      // Animations CSS natives (légères, sans framer-motion)
            keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // NOUVEAU : fait clignoter le curseur du typewriter (comme sur un vrai terminal)
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },

        letterIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        // NOUVEAU
        blink: "blink 1s step-end infinite",
        letterIn: "letterIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;