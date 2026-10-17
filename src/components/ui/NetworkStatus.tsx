"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

type Status = "online" | "offline" | null;

export function NetworkStatus() {
  const { locale } = useLanguage();

  // Initialisation correcte (évite le setState synchrone dans useEffect)
  const [status, setStatus] = useState<Status>(() => {
    if (typeof navigator === "undefined") return null;
    return navigator.onLine ? "online" : "offline";
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setStatus("online");
      setVisible(true);
    };

    const handleOffline = () => {
      setStatus("offline");
      setVisible(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Cache automatiquement la notification
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, status === "offline" ? 6000 : 3500);

    return () => clearTimeout(timer);
  }, [visible, status]);

  if (!status || !visible) return null;

  const isOnline = status === "online";

  const messages = {
    fr: {
      online: "Connexion rétablie",
      offline: "Vous êtes hors ligne — réseau instable",
    },
    en: {
      online: "Connection restored",
      offline: "You are offline — unstable network",
    },
  };

  const text =
    messages[locale as "fr" | "en"]?.[isOnline ? "online" : "offline"] ??
    (isOnline
      ? "Connexion rétablie"
      : "Vous êtes hors ligne — réseau instable");

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium shadow-2xl backdrop-blur-md transition-all duration-500",
        "animate-in fade-in slide-in-from-bottom-4",
        isOnline
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-red-500/30 bg-red-500/10 text-red-400"
      )}
    >
      {isOnline ? (
        <Wifi size={18} className="shrink-0" />
      ) : (
        <WifiOff size={18} className="shrink-0" />
      )}

      <span>{text}</span>

      <button
        onClick={() => setVisible(false)}
        className="ml-1 rounded-full p-1 opacity-60 transition hover:opacity-100"
        aria-label={locale === "fr" ? "Fermer" : "Close"}
      >
        ✕
      </button>
    </div>
  );
}