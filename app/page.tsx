"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { exhibitions } from "./data/exhibitions";
import { Footer } from "./components/Footer";

const partnerLogos = [
  {
    src: "/loghi/Castelvetrano-Stemma_1.png",
    alt: "Castelvetrano",
  },
  {
    src: "/loghi/logoparco.png",
    alt: "Parco Archeologico di Selinunte",
  },
  {
    src: "/loghi/senzanome.png",
    alt: "Senza Nome",
  },
  {
    src: "/loghi/proloco.png",
    alt: "Pro Loco",
  },
];

const conceptCopy = {
  title: "Concept",
  body: [
    "Al confine tra Paese e provincia, tra passato, presente ed un futuro incerto, al limine di un mondo che cambia e che vuole cambiare anche noi, la fotografia deve farsi carico della narrativa e della costruzione del linguaggio visivo del cambiamento. NONSONOCOSA 26 si dedica all'esplorazione della soglia come spazio fra il conosciuto e l'ignoto, del precipizio che osserva il mondo che cambia, dell'esplorazione dei pessimismi e delle paure alla ricerca dell'appiglio della rinascita.",
    /* "NONSONOCOSA è un festival di fotografia sociale che si svolge a Castelvetrano-Selinunte dal 2025, curato dall'Associazione Senzanome.",
    "Il festival nasce come aggregatore di interessi, di persone e di messaggi votato alla creazione di una comunità fotografica ed artistica, prefiggendosi di rimanere accessibile a tutti e di dare spazio a più voci possibili.",
    "NONSONOCOSA esiste alla periferia della provincia italiana, in luoghi largamente dimenticati e culturalmente depressi, è costruito su principi di inclusione e vuole valorizzare la fotografia come strumento di autodeterminazione e di liberazione culturale.",
    "L'edizione 2026 si legherà alla valorizzaione del patrimonio artistico del territorio e si svolgerà nella magnifica cornice del Parco Archeologico di Selinunte.", */
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Concept", href: "/#programma" },
  { label: "Mostre", href: "/#mostre" },
  { label: "Opencall", href: "/open-call" },
  { label: "Info e orari", href: "/info-e-orari" },
  { label: "Edizione 2025", href: "/edizioni/2025" },
];


function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    // Controlla se il loader viene mostrato o meno
    const checkLoaderStatus = () => {
      const loaderShown = sessionStorage.getItem('pageLoaderShown');
      
      const hasInternalReferrer = 
        document.referrer && 
        document.referrer.includes(window.location.origin) &&
        document.referrer !== window.location.href;

      if (loaderShown === 'true' || hasInternalReferrer) {
        setCanPlayVideo(true);
        return;
      }

      const loader = document.querySelector('[data-page-loader]');
      if (!loader || loader.getAttribute('data-loading') === 'false') {
        setCanPlayVideo(true);
      }
    };

    checkLoaderStatus();

    const handleLoaderComplete = () => setCanPlayVideo(true);
    window.addEventListener('pageLoaderComplete', handleLoaderComplete);

    // Quando si torna sulla home via navigazione SPA, React può riutilizzare
    // il componente dalla cache senza rimontarlo: canPlayVideo rimane true
    // ma il video è paused. swup:pageView viene dispatchiato da SwupProvider
    // ad ogni navigazione completata, forziamo qui il restart.
    const handlePageView = () => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    window.addEventListener('swup:pageView', handlePageView);

    return () => {
      window.removeEventListener('pageLoaderComplete', handleLoaderComplete);
      window.removeEventListener('swup:pageView', handlePageView);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlayVideo) {
      return;
    }

    // Avvia il video solo quando il caricamento è completato
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay can be blocked on some devices; ignore silently.
      });
    }
  }, [canPlayVideo]);

  return (
    <section id="hero-section" className="relative min-h-screen overflow-hidden bg-[#dfe6ee]">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#222222]/20" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 pb-20 pt-28 text-white sm:px-10 lg:px-16">
        <div className="flex max-w-2xl flex-col items-center text-center">
          <h1 className="font-heading text-8xl font-semibold uppercase italic tracking-[0.02em] sm:text-9xl lg:text-[10rem]">
            Soglie
          </h1>
          <div className="mt-4 h-[2px] w-32 bg-[#ff5a43]" />
          <div className="mt-4 space-y-1 text-sm uppercase tracking-[0.22em] text-white/90 sm:text-base">
            <p className="font-semibold">Parco Archeologico di Selinunte</p>
            <p className="font-medium">Opening: 08–11 Maggio 2026</p>
            <p>Mostre fino al 7 Giugno 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerBand() {
  return (
    <section className="bg-[#222222] py-10 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <h2 className="font-heading text-center text-5xl font-semibold uppercase tracking-[0.02em] sm:text-6xl sr-only">
          Loghi Partner
        </h2>
        <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
          {partnerLogos.map((partner) => (
            <div
              key={partner.src}
              className="flex flex-1 items-center justify-center px-2 sm:px-3 lg:px-4 min-w-0"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                className="w-full h-auto max-h-12 sm:max-h-16 lg:max-h-20 object-contain"
                loading="lazy"
                width={128}
                height={128}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptBlock() {
  return (
    <section id="programma" className="bg-[#ff5a43] py-14 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="lg:max-w-4xl lg:mx-auto">
        <h2 className="font-heading text-6xl font-semibold uppercase tracking-[0.02em] sm:text-7xl">
          {conceptCopy.title}
        </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-7 text-white/90 sm:text-xl lg:mx-0">
          {conceptCopy.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function ExhibitionsBlock() {
  return (
    <section id="mostre" className="bg-[#f7f3ef] py-16">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <h2 className="font-heading text-center text-6xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-7xl">
          Mostre
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {exhibitions.map((exhibition) => {
            return (
              <Link
                key={exhibition.id}
                href={`/mostre/${exhibition.slug}`}
                className="group relative flex flex-col overflow-hidden border border-[#bcb6b0] bg-white transition hover:border-[#ff5a43] cursor-pointer"
              >
                <div className="relative w-full overflow-hidden bg-[#dfe6ee] aspect-[4/3] lg:aspect-[4/3]">
                  <Image
                    src={exhibition.image}
                    alt={exhibition.projectName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-2 p-4 lg:p-6">
                  <span className="text-xs uppercase tracking-[0.24em] text-[#6c655f]">
                    {exhibition.artist}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-[0.05em] text-[#1f1c1a]">
                    {exhibition.projectName}
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 text-[#ff5a43] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-45"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WeekendInauguraleBlock() {
  return (
    <section id="weekend-inaugurale" className="bg-[#ff5a43] py-16 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="lg:max-w-4xl lg:mx-auto">
          <h2 className="font-heading text-6xl font-semibold uppercase tracking-[0.02em] text-white sm:text-7xl">
            Weekend inaugurale
          </h2>
          <div className="mt-6 max-w-3xl lg:mx-0">
          <p className="text-2xl font-semibold uppercase tracking-[0.05em] text-white mb-6 sm:text-3xl">
            8 · 9 · 10 maggio 2026
          </p>
          <p className="text-lg leading-7 text-white/90 mb-6 sm:text-xl">
            Il weekend inaugurale apre ufficialmente il programma espositivo con tre giornate dedicate all'incontro tra artisti, pubblico e territorio.
          </p>
          <div className="space-y-4 text-lg leading-7 text-white/90 sm:text-xl">
            <p>
              <span className="font-semibold">Letture portfolio</span> a cura degli artisti invitati, rivolte a fotografi e autori emergenti.
            </p>
            <p>
              <span className="font-semibold">Talk e proiezioni</span> presso il Parco Archeologico, in collaborazione con ActionAid, Scomodo e altri partner culturali.
            </p>
            <p>
              <span className="font-semibold">Presentazione e inaugurazione delle mostre</span>, con tour guidati e momenti di confronto alla presenza degli artisti.
            </p>
            <p>
              <span className="font-semibold">Aperitivi, degustazioni ed eventi sociali</span> diffusi a Marinella, realizzati insieme ai partner del territorio.
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function OpenCallBlock() {
  return (
    <section id="open-call" className="relative py-16 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/open-call-bg.webp"
          alt="Spazio espositivo"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[#222222]/70" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="lg:max-w-4xl lg:mx-auto">
          <h2 className="font-heading text-6xl font-semibold uppercase tracking-[0.02em] text-white sm:text-7xl mb-6">
            Open Call
          </h2>
          <div className="max-w-3xl lg:mx-0">
          <p className="text-lg leading-7 text-white/90 sm:text-xl mb-6">
              Una call aperta per progetti che attraversano soglie, geografie e
              archivi personali. Se lavori con immagini, memorie e passaggi
              silenziosi, questa edizione ti aspetta.
            </p>
            <Link
              href="/open-call"
            className="inline-block rounded-sm bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ff5a43] transition hover:bg-[#ffe7e2] hover:text-[#ff5a43] cursor-pointer"
            >
              Candidati
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviousEditionsBlock() {
  return (
    <section className="bg-[#f7f3ef] py-16">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <h2 className="text-base font-bold text-[#1f1c1a] mb-6">
            Edizioni precedenti
          </h2>
          <Link
            href="/edizioni/2025"
            className="font-heading text-6xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] transition hover:text-[#ff5a43] cursor-pointer sm:text-5xl lg:text-7xl"
          >
            2025
          </Link>
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <div className="px-0 pt-0">
        <Hero />
      </div>

      <main className="">
        <PartnerBand />
        <ConceptBlock />
        <ExhibitionsBlock />
        <WeekendInauguraleBlock />
        <OpenCallBlock />
        <PreviousEditionsBlock />
      </main>
      <Footer />
    </div>
  );
}
