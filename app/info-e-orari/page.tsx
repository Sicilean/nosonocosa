import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Info e Orari",
  description:
    "Informazioni pratiche per visitare Nonsonocosa — Soglie al Parco Archeologico di Selinunte. Date, orari, come raggiungerci e contatti. Opening: 08–11 Maggio 2026. Mostre fino al 7 Giugno 2026.",
  keywords: [
    "Nonsonocosa orari",
    "Parco Archeologico Selinunte",
    "come raggiungere Selinunte",
    "festival fotografia Sicilia",
    "eventi Castelvetrano",
    "mostre fotografia Trapani",
  ],
  openGraph: {
    title: "Info e Orari | Nonsonocosa — Soglie",
    description:
      "Informazioni pratiche per visitare il festival. Opening: 08–11 Maggio 2026. Mostre fino al 7 Giugno 2026.",
    type: "website",
    url: "https://nonsonocosa.it/info-e-orari",
    images: [
      {
        url: "/parco-selinunte.jpg",
        width: 1200,
        height: 630,
        alt: "Parco Archeologico di Selinunte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Info e Orari | Nonsonocosa — Soglie",
    description: "Informazioni pratiche per visitare il festival.",
    images: ["/parco-selinunte.jpg"],
  },
  alternates: {
    canonical: "/info-e-orari",
  },
};

export default function InfoEOriariPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="space-y-8 lg:space-y-6 lg:max-w-5xl lg:mx-auto">
            {/* Titolo */}
            <div>
              <h1 className="font-heading text-5xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-6xl lg:text-7xl">
                Info e orari
              </h1>
            </div>

            {/* Date e orari */}
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                    Opening
                  </h2>
                  <p className="text-lg text-[#1f1c1a]">
                    08–11 Maggio 2026
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                    Mostre
                  </h2>
                  <p className="text-lg text-[#1f1c1a]">
                    Fino al 7 Giugno 2026
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                    Orari
                  </h2>
                  <p className="text-lg text-[#1f1c1a]">
                    Da definire
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                    Ingresso
                  </h2>
                  <p className="text-lg text-[#1f1c1a]">
                    A pagamento
                  </p>
                </div>
              </div>
            </div>

            {/* Immagine Parco Archeologico */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#dfe6ee]">
              <Image
                src="/parco-selinunte.jpg"
                alt="Parco Archeologico di Selinunte"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            {/* Luoghi */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                Luoghi
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-lg font-semibold text-[#1f1c1a]">
                    Parco Archeologico di Selinunte
                  </p>
                  <p className="text-base text-[#6c655f]">
                    Castelvetrano-Selinunte, Trapani
                  </p>
                </div>
              </div>
            </div>

            {/* Contatti */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                Contatti
              </h2>
              <div className="space-y-2">
                <p className="text-lg text-[#1f1c1a]">
                  <a
                    href="mailto:info@nonsonocosa.it"
                    className="transition hover:text-[#ff5a43] cursor-pointer"
                  >
                    info@nonsonocosa.it
                  </a>
                </p>
                <p className="text-lg text-[#1f1c1a]">
                  <a
                    href="https://www.senzano.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[#ff5a43] cursor-pointer"
                  >
                    senzano.me
                  </a>
                </p>
              </div>
            </div>

            {/* Come raggiungerci */}
            <div className="space-y-6">
              <h2 className="text-base font-bold text-[#1f1c1a] mb-2">
                Come raggiungerci
              </h2>
              
              {/* In aereo */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#1f1c1a]">
                  In aereo
                </h3>
                <div className="max-w-3xl space-y-4 text-lg leading-7 text-[#1f1c1a]">
                  <p>
                    Il Parco Archeologico di Selinunte è raggiungibile dagli aeroporti di <strong>Palermo (Falcone-Borsellino)</strong> o <strong>Trapani (Birgi)</strong>.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-1">Da Palermo Aeroporto:</p>
                      <p>
                        L'aeroporto di Palermo dista circa 100 km dal Parco Archeologico di Selinunte. È possibile raggiungere Castelvetrano in bus con <em>AST</em> (Azienda Siciliana Trasporti) o in auto seguendo l'autostrada A29 in direzione Trapani, uscita Castelvetrano.
                      </p>
                      <p className="mt-2">
                        <strong>In bus:</strong> Collegamenti AST da Palermo Autostazione a Castelvetrano. Durata circa 2 ore.
                      </p>
                      <p>
                        <strong>In auto:</strong> Autostrada A29, uscita Castelvetrano. Seguire le indicazioni per Selinunte. Durata circa 1 ora e 15 minuti.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold mb-1">Da Trapani Aeroporto:</p>
                      <p>
                        L'aeroporto di Trapani dista circa 60 km dal Parco Archeologico di Selinunte. È possibile raggiungere Castelvetrano in bus con <em>Salemi</em> o in auto seguendo la strada statale SS 115 in direzione Marsala-Castelvetrano.
                      </p>
                      <p className="mt-2">
                        <strong>In bus:</strong> Collegamenti Salemi da Trapani a Castelvetrano. Durata circa 1 ora.
                      </p>
                      <p>
                        <strong>In auto:</strong> Strada statale SS 115 in direzione Marsala-Castelvetrano. Seguire le indicazioni per Selinunte. Durata circa 45 minuti.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* In auto */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#1f1c1a]">
                  In auto
                </h3>
                <div className="max-w-3xl space-y-2 text-lg leading-7 text-[#1f1c1a]">
                  <p>
                    <strong>Da Palermo:</strong> Autostrada A29, uscita Castelvetrano. Seguire le indicazioni per Selinunte e il Parco Archeologico.
                  </p>
                  <p>
                    <strong>Da Trapani:</strong> Strada statale SS 115 in direzione Marsala-Castelvetrano. Seguire le indicazioni per Selinunte.
                  </p>
                  <p>
                    <strong>Da Agrigento:</strong> Strada statale SS 115 in direzione Sciacca-Mazara del Vallo-Castelvetrano.
                  </p>
                  <p>
                    <strong>Da Catania:</strong> Autostrada A19 fino a Palermo, poi A29 in direzione Trapani, uscita Castelvetrano.
                  </p>
                </div>
              </div>

              {/* In treno */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#1f1c1a]">
                  In treno
                </h3>
                <div className="max-w-3xl space-y-2 text-lg leading-7 text-[#1f1c1a]">
                  <p>
                    Stazione di Castelvetrano, collegata con Palermo e Trapani. Dalla stazione, il Parco Archeologico di Selinunte dista circa 13 km ed è raggiungibile in taxi o con servizi di trasporto locale.
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

