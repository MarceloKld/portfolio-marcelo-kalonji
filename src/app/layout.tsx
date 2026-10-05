import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Police performante, chargée par Next.js
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Chargement optimisé de la police (next/font évite le "layout shift")
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // relié à tailwind.config.ts
  display: "swap",
});

// Métadonnées SEO — essentielles pour le référencement Google
export const metadata: Metadata = {
  title: "Marcelo Kalonji Kashala — Concepteur & Développeur Web",
  description:
    "Je conçois, développe et déploie des solutions numériques performantes, fiables et évolutives.",
  keywords: ["développeur web", "Laravel", "Next.js", "React", "Kinshasa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning est nécessaire car next-themes modifie le HTML
    // côté client avant l'hydratation (sinon React affiche un faux avertissement)
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}