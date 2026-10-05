import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Preloader } from "@/components/ui/Preloader";           // NOUVEAU
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";  // NOUVEAU

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

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
        <ThemeProvider>
          <LanguageProvider>
            {/* Le Preloader s'affiche PAR-DESSUS tout au chargement */}
            <Preloader />
            {children}
            {/* Le bouton WhatsApp est global : visible sur toutes les sections */}
            <WhatsAppButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}