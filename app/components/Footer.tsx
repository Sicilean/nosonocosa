"use client";

import Link from "next/link";
import Image from "next/image";

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



export function Footer() {
  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Previeni il comportamento predefinito per evitare che il browser apra l'app
    e.preventDefault();
    const url = new URL(href);
    url.searchParams.set('utm_source', 'web');
    url.searchParams.set('utm_medium', 'website');
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#222222] text-[#cfcfcf]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_0.8fr]">
          <div className="flex flex-col gap-4">
            <Image
              src="/loghi/logo primario.svg"
              alt="Nonsonocosa 2026"
              width={220}
              height={88}
              className="h-auto w-44 sm:w-52"
            />
            <div className="text-sm leading-6 sm:text-base">
              <p>Opening: 08–11 Maggio 2026</p>
              <p>Mostre fino al 7 Giugno 2026</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 text-sm sm:text-base lg:col-start-3 lg:items-end lg:text-right">
            <ul className="space-y-1">
              {[
                { text: "Senzano.me", href: "https://www.senzano.me/" },
                {
                  text: "Instagram",
                  href: "https://www.instagram.com/nonsonocosa_/",
                },
                {
                  text: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61587359586094",
                },
              ].map((item) => (
                <li key={item.text}>
                  <a
                    className="transition hover:text-white cursor-pointer"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Solo per Instagram e Facebook, forza l'apertura nel browser
                      if (item.href.includes('instagram.com') || item.href.includes('facebook.com')) {
                        handleSocialClick(e, item.href);
                      }
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                    className="transition hover:text-white cursor-pointer"
                  >
                  Cookie Policy
                </Link>
                </li>
            </ul>
          </div>
        </div>
        
        {/* Partner Band */}
        <div className="mt-12 pt-8 border-t border-[#3a3a3a]">
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
        
        {/* Credits Sicilean */}
        <div className="mt-8 pt-8 border-t border-[#3a3a3a] flex items-center justify-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <a
            href="https://www.sicilean.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-white"
            aria-label="Sicilean"
          >
            <span className="text-xs text-[#cfcfcf] tracking-wide">
              Powered by
            </span>
            <Image
              src="/icons/mini_logo_sicilean.svg"
              alt="Sicilean"
              width={20}
              height={20}
            />
            <span className="text-xs text-[#cfcfcf] tracking-wide">
              Sicilean
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}



