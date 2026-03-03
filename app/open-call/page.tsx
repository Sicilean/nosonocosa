import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Open Call — Soglie",
  description:
    "Open Call per progetti fotografici che attraversano soglie, geografie e archivi personali. Scadenza: 1 Aprile 2026. Partecipazione gratuita per candidati under 35 residenti in Italia.",
  keywords: [
    "open call fotografia",
    "concorso fotografia",
    "call for entries",
    "fotografia emergente",
    "Nonsonocosa open call",
    "bando fotografia",
  ],
  openGraph: {
    title: "Open Call — Soglie | Nonsonocosa",
    description:
      "Open Call per progetti fotografici. Scadenza: 1 Aprile 2026. Partecipazione gratuita per candidati under 35.",
    type: "website",
    url: "https://nonsonocosa.it/open-call",
    images: [
      {
        url: "/open-call-bg.webp",
        width: 1200,
        height: 630,
        alt: "Open Call Nonsonocosa — Soglie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Call — Soglie | Nonsonocosa",
    description:
      "Open Call per progetti fotografici. Scadenza: 1 Aprile 2026.",
    images: ["/open-call-bg.webp"],
  },
  alternates: {
    canonical: "/open-call",
  },
};

export default function OpenCallPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="space-y-8 lg:space-y-6 lg:max-w-5xl lg:mx-auto">
            {/* Titolo */}
            <div>
              <h1 className="font-heading text-5xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-6xl lg:text-7xl">
                Open Call
              </h1>
            </div>

            {/* Tema e Descrizione */}
            <div className="space-y-6 max-w-3xl">
              <div className="space-y-4">
                
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  Al confine tra Paese e provincia, tra passato, presente ed un futuro incerto, al limine di un mondo che cambia e che vuole cambiare anche noi, la fotografia deve farsi carico della narrativa e della costruzione del linguaggio visivo del cambiamento. La soglia come spazio fra il conosciuto e l'ignoto, del precipizio che osserva il mondo che cambia, dell'esplorazione dei pessimismi e delle paure alla ricerca dell'appiglio della rinascita.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  Ai candidati si chiede un progetto composto da un numero massimo di 10 foto che abbracci e rappresenti il senso del vivere la soglia, dell'esistenza sul confine, del passaggio.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  La partecipazione è aperta a tutti i candidati residenti in Italia di età inferiore a 35 anni compiuti al 1 Maggio 2026 ed è completamente gratuita.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  La giuria valuterà liberamente e senza pregiudizi sulla qualità delle proposte e sull'aderenza al tema, ed esprimerà il progetto vincente entro e non oltre il 10 Aprile 2026.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  Il progetto vincente verrà stampato, installato ed esposto a Marinella di Selinunte, nel contesto del festival NONSONOCOSA26, dall'8 Maggio al 7 Giugno 2026, verrà promosso su tutti i canali di comunicazione del festival per massimizzarne l'esposizione e verrà poi incluso nel catalogo stampato della rassegna, nonché nella sua versione digitale mantenuta in perpetuità su nonsonocosa.it.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  I candidati si impegnano inoltre a non presentare progetti lesivi della dignità altrui, raffiguranti minori, che promuovono razzismo e politiche di esclusione, di natura non consensuale o di cui non detengono pienamente i diritti.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl">
                  Presentando la loro candidatura i candidati cedono in maniera non esclusiva, a titolo non commerciale e solo ed esclusivamente per i fini espositivi ed antologici di cui sopra, i diritti di pubblicazione delle loro opere a Senzanome APS, e la autorizzano titolo gratuito, e in piena conformità con gli artt. 10 e 320 del Codice Civile e gli artt. 96 e 97 della Legge 22 aprile 1941, n. 633 (Legge sul diritto d'autore), ad utilizzare le Fotografie sottoposte per l'Open Call.
                </p>
              </div>
            </div>

            {/* Scadenza */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                Scadenza invio candidature
              </h2>
              <p className="text-2xl text-[#1f1c1a] sm:text-3xl">
                1 Aprile 2026
              </p>
            </div>

            {/* Istruzioni per l'invio */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                I candidati inviino:
              </h2>
              <ul className="space-y-2 text-lg leading-7 text-[#1f1c1a] sm:text-xl max-w-3xl list-disc list-inside">
                <li>massimo num 10 foto in formato jpeg o png in piena risoluzione a 300dpi</li>
                <li>una piccola biografia con foto in formato pdf</li>
                <li>una descrizione del progetto in italiano in formato pdf</li>
                <li>copia firmata della liberatoria (scaricabile qui sotto)</li>
              </ul>
              <p className="text-lg leading-7 text-[#1f1c1a] sm:text-xl max-w-3xl mt-4">
                a <a href="mailto:info@senzano.me?subject=Candidatura Open Call Soglie" className="text-[#ff5a43] hover:underline cursor-pointer">info@senzano.me</a> entro e non oltre il 1 Aprile 2026
              </p>
            </div>

            {/* Download Liberatoria */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/liberatoria.pdf"
                download="liberatoria.pdf"
                className="inline-block rounded-sm bg-[#ff5a43] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#e04a35] cursor-pointer"
              >
                Scarica Liberatoria
              </a>
            </div>

            {/* Giuria */}
            <div className="space-y-6 pt-8">
              <h2 className="text-base font-bold text-[#1f1c1a] mb-4">
                Giuria
              </h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#1f1c1a] mb-2">
                    Mattia Crocetti
                  </h3>
                  <div className="grid gap-6 lg:grid-cols-[200px_1fr] lg:gap-8">
                    <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden bg-[#dfe6ee]">
                      <Image
                        src="/giuria/mattia-crocetti.webp"
                        alt="Mattia Crocetti"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 200px"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg leading-7 text-[#1f1c1a]">
                        Mattia Crocetti è un fotografo e documentarista italiano con base a Roma. Il suo lavoro si colloca tra fotografia documentaria e ricerca visiva contemporanea, con un'attenzione particolare alle tematiche sociali, culturali e ambientali.
                      </p>
                      <p className="text-lg leading-7 text-[#1f1c1a]">
                        Ha collaborato con importanti testate e istituzioni nazionali e internazionali, sviluppando progetti a lungo termine caratterizzati da un forte approccio narrativo e da una profonda sensibilità umana. La sua ricerca visiva si concentra sulla relazione tra individuo, territorio e memoria collettiva.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#1f1c1a] mb-2">
                    Camilla Miliani
                  </h3>
                  <div className="grid gap-6 lg:grid-cols-[200px_1fr] lg:gap-8">
                    <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden bg-[#dfe6ee]">
                      <Image
                        src="/giuria/camilla-miliani.webp"
                        alt="Camilla Miliani"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 200px"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg leading-7 text-[#1f1c1a]">
                        Camilla Miliani è una fotografa e ricercatrice visiva italiana. Il suo lavoro si muove tra fotografia documentaria e pratica artistica contemporanea, con una particolare attenzione ai temi dell'identità, del corpo, della memoria e delle dinamiche sociali.
                      </p>
                      <p className="text-lg leading-7 text-[#1f1c1a]">
                        Attraverso progetti a lungo termine, sviluppa un linguaggio visivo intimo e riflessivo, in cui l'immagine fotografica diventa strumento di indagine e relazione. Il suo approccio coniuga rigore concettuale e sensibilità narrativa, collocandosi all'interno della ricerca fotografica contemporanea.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#1f1c1a] mb-2">
                    Direttivo Festival
                  </h3>
                  <p className="text-lg leading-7 text-[#1f1c1a]">
                    Il Direttivo del Festival è composto dai membri dell'associazione promotrice, realtà indipendente impegnata nella progettazione e nella cura di iniziative culturali e artistiche sul territorio.
                  </p>
                  <p className="text-lg leading-7 text-[#1f1c1a]">
                    Il Direttivo svolge un ruolo attivo nella definizione della visione del festival, nella selezione dei progetti e nella costruzione di un dialogo tra pratiche artistiche, comunità e contesto sociale, garantendo coerenza curatoriale e attenzione ai valori fondanti della manifestazione.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

