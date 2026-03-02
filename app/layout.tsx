import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SwupProvider } from "./components/SwupProvider";
import { PageLoader } from "./components/PageLoader";
import { BackToTop } from "./components/BackToTop";
import { Header } from "./components/Header";
import { CookieBanner } from "./components/CookieBanner";

const ppNeueBody = localFont({
  variable: "--font-body-var",
  src: [
    {
      path: "../public/fonts/PPNeueMontreal/PPNeueMontreal-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/PPNeueMontreal/PPNeueMontreal-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PPNeueMontreal/PPNeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/PPNeueMontreal/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PPNeueMontreal/PPNeueMontreal-SemiBolditalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/PPNeueMontreal/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const drukCondensed = localFont({
  variable: "--font-heading-var",
  src: [
    {
      path: "../public/fonts/Druk Condensed Family/DrukCond-Super-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Druk Condensed Family/DrukCond-SuperItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Nonsonocosa — Soglie | Festival di Fotografia",
    template: "%s | Nonsonocosa",
  },
  description:
    "Nonsonocosa è un festival di fotografia sociale che si svolge a Castelvetrano-Selinunte. L'edizione 2026 'Soglie' esplora la soglia come spazio tra il conosciuto e l'ignoto, con mostre, talk e proiezioni al Parco Archeologico di Selinunte.",
  keywords: [
    "festival fotografia",
    "fotografia sociale",
    "Nonsonocosa",
    "Soglie",
    "Castelvetrano",
    "Selinunte",
    "Parco Archeologico Selinunte",
    "fotografia documentaria",
    "mostre fotografia",
    "fotografia contemporanea",
    "Sicilia",
    "eventi culturali Sicilia",
  ],
  authors: [{ name: "Nonsonocosa" }],
  creator: "Nonsonocosa",
  publisher: "Nonsonocosa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nonsonocosa.it"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://nonsonocosa.it",
    siteName: "Nonsonocosa",
    title: "Nonsonocosa — Soglie | Festival di Fotografia",
    description:
      "Festival di fotografia sociale a Castelvetrano-Selinunte. Edizione 2026 'Soglie' con mostre, talk e proiezioni al Parco Archeologico di Selinunte.",
    images: [
      {
        url: "/open-call-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Nonsonocosa — Soglie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nonsonocosa — Soglie | Festival di Fotografia",
    description:
      "Festival di fotografia sociale a Castelvetrano-Selinunte. Edizione 2026 'Soglie'.",
    images: ["/open-call-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${ppNeueBody.variable} ${drukCondensed.variable} antialiased`}
      >
        {/* 
          Page Loader: mostra l'animazione di pre-caricamento iniziale
          con effetto Codrops PageLoadingEffects usando shape diagonale
        */}
        <PageLoader />
        
        {/* 
          Swup Provider: inizializza Swup con il theme overlay.
          Questo componente gestisce le transizioni tra pagine.
        */}
        <SwupProvider />
        
        {/* 
          Header globale: fuori dal contenitore Swup per evitare che venga sostituito.
          Il tipo di logo viene gestito dinamicamente in base alla pagina corrente.
        */}
        <Header />
        
        {/* 
          Container principale per Swup.
          L'id "swup" è richiesto da Swup per identificare il contenuto da aggiornare.
          Tutto il contenuto delle pagine deve essere dentro questo div.
        */}
        <div id="swup">
          {children}
        </div>
        
        {/* 
          Back to Top: pulsante con indicatore di progresso circolare
          Appare quando si scrolla verso il basso e permette di tornare all'inizio
        */}
        <BackToTop />
        
        {/* 
          Cookie Banner: banner per il consenso ai cookie
          Appare in basso alla pagina per la gestione del consenso GDPR
        */}
        <CookieBanner />
        
        {/* Structured Data (JSON-LD) per SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Nonsonocosa — Soglie",
              description:
                "Festival di fotografia sociale a Castelvetrano-Selinunte. Edizione 2026 'Soglie' con mostre, talk e proiezioni al Parco Archeologico di Selinunte.",
              startDate: "2026-05-08",
              endDate: "2026-06-07",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Parco Archeologico di Selinunte",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Castelvetrano-Selinunte",
                  addressRegion: "Trapani",
                  addressCountry: "IT",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Nonsonocosa",
                url: "https://nonsonocosa.it",
                sameAs: [
                  "https://www.instagram.com/nonsonocosa_/",
                  "https://www.facebook.com/profile.php?id=61587359586094",
                  "https://www.senzano.me/",
                ],
              },
              image: "https://nonsonocosa.it/open-call-bg.jpg",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: "https://nonsonocosa.it",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nonsonocosa",
              url: "https://nonsonocosa.it",
              logo: "https://nonsonocosa.it/icon.svg",
              description:
                "Festival di fotografia sociale che si svolge a Castelvetrano-Selinunte",
              sameAs: [
                "https://www.instagram.com/nonsonocosa_/",
                "https://www.facebook.com/profile.php?id=61587359586094",
                "https://www.senzano.me/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@nonsonocosa.it",
                contactType: "Informazioni generali",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
