import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Police performante, chargée par Next.js
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider"; //

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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Les Providers s'imbriquent : Theme englobe Language, 
            l'ordre entre les deux n'a pas d'importance ici */}
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}