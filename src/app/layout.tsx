import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext"; // Importation

export const metadata: Metadata = {
  title: "Marcelo KALONJI | Portfolio",
  description: "Concepteur & Développeur Web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider> {/* On ajoute ça ici */}
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}