"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già accettato i cookie
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Mostra il banner dopo un breve delay per migliorare l'UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#222222] text-white border-t border-[#444444] shadow-lg">
      <div className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm leading-6 text-white/90 sm:text-base">
              Questo sito utilizza cookie tecnici per migliorare la tua esperienza di navigazione. 
              Continuando a navigare, accetti l'utilizzo dei cookie.{" "}
              <Link
                href="/cookie-policy"
                className="text-[#ff5a43] hover:underline transition"
              >
                Scopri di più
              </Link>
            </p>
          </div>
          <div className="flex gap-3 sm:flex-shrink-0">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm font-medium uppercase tracking-[0.1em] text-white/70 hover:text-white transition border border-white/20 hover:border-white/40 rounded-sm"
            >
              Rifiuta
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 text-sm font-semibold uppercase tracking-[0.1em] bg-[#ff5a43] text-white hover:bg-[#ff6b5a] transition rounded-sm"
            >
              Accetta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
