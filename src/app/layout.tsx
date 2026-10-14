import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { PreloaderProvider } from "@/components/providers/PreloaderProvider"; // NOUVEAU
import { Preloader } from "@/components/ui/Preloader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcelo Kalonji Kashala — Concepteur & Développeur Web",
  description: "Je conçois, développe et déploie des solutions numériques performantes, fiables et évolutives.",
  keywords: ["développeur web", "Laravel", "Next.js", "React", "Kinshasa"],
  // AJOUT : déclaration explicite des icônes
  icons: {
    icon: "/icon.svg",              // onglet navigateur classique
    apple: "/apple-touch-icon.png",    // icône iOS (ajout écran d'accueil)
  },
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
            {/* PreloaderProvider doit englober À LA FOIS le Preloader
                ET le contenu de la page, pour qu'ils partagent le même signal */}
            <PreloaderProvider>
              <Preloader />
              {children}
              <WhatsAppButton />
            </PreloaderProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}