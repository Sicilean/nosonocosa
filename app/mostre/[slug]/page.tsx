import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getExhibitionBySlug, exhibitions } from "../../data/exhibitions";
import { Footer } from "../../components/Footer";
import { InstagramLink } from "../../components/InstagramLink";

export async function generateStaticParams() {
  return exhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = getExhibitionBySlug(slug);

  if (!exhibition) {
    return {
      title: "Mostra non trovata",
    };
  }

  const title = `${exhibition.artist} — ${exhibition.projectName}`;
  const description = exhibition.introduction
    .split("\n\n")[0]
    .substring(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://nonsonocosa.it/mostre/${slug}`,
      images: [
        {
          url: exhibition.image,
          width: 1200,
          height: 630,
          alt: `${exhibition.artist} — ${exhibition.projectName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [exhibition.image],
    },
    alternates: {
      canonical: `/mostre/${slug}`,
    },
  };
}

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibition = getExhibitionBySlug(slug);

  if (!exhibition) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="space-y-8 lg:space-y-3 lg:max-w-5xl lg:mx-auto">
            {/* Foto */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#dfe6ee] lg:aspect-[16/9]">
              <Image
                src={exhibition.image}
                alt={exhibition.projectName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </div>

            {/* Nome artista e progetto */}
            <div className="space-y-2 lg:space-y-1">
              <h1 className="font-heading text-4xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-5xl lg:text-6xl">
                {exhibition.artist}
              </h1>
              <h2 className="font-heading text-2xl font-medium uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-3xl lg:text-4xl">
                {exhibition.projectName}
              </h2>
            </div>

            {/* Spazio espositivo */}
            <div className="lg:mt-2">
              <p className="text-base font-bold text-[#1f1c1a] mb-2 lg:mb-1">
                Spazio espositivo
              </p>
              <p className="text-base text-[#1f1c1a]">
                {exhibition.exhibitionSpace || "spazio1"}
              </p>
            </div>

            {/* Breve paragrafo */}
            <div className="max-w-3xl lg:mt-2 lg:mx-0">
              <div className="text-lg leading-7 text-[#1f1c1a] sm:text-xl space-y-4">
                {exhibition.introduction.split("\n\n").map((paragraph, index) => {
                  // Per giulia-piermartiri-e-edoardo-delille, sostituiamo i nomi con link
                  if (exhibition.slug === "giulia-piermartiri-e-edoardo-delille") {
                    const parts = paragraph.split(/(Giulia Piermartiri|Edoardo Delille)/);
                    return (
                      <p key={index}>
                        {parts.map((part, i) => {
                          if (part === "Giulia Piermartiri") {
                            return (
                              <Link
                                key={i}
                                href="https://www.giuliapiermartiri.it"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          if (part === "Edoardo Delille") {
                            return (
                              <Link
                                key={i}
                                href="https://www.edoardodelille.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </p>
                    );
                  }
                  // Per cristina-vatielli, sostituiamo il nome con link
                  if (exhibition.slug === "cristina-vatielli") {
                    const parts = paragraph.split(/(Cristina Vatielli)/);
                    return (
                      <p key={index}>
                        {parts.map((part, i) => {
                          if (part === "Cristina Vatielli") {
                            return (
                              <Link
                                key={i}
                                href="https://www.cristinavatielli.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </p>
                    );
                  }
                  // Per francesco-pistilli, sostituiamo il nome con link
                  if (exhibition.slug === "francesco-pistilli") {
                    const parts = paragraph.split(/(Francesco Pistilli)/);
                    return (
                      <p key={index}>
                        {parts.map((part, i) => {
                          if (part === "Francesco Pistilli") {
                            return (
                              <Link
                                key={i}
                                href="https://www.francescopistilli.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </p>
                    );
                  }
                  // Per ronin-platform, sostituiamo tutti i nomi con link
                  if (exhibition.slug === "ronin-platform") {
                    const parts = paragraph.split(/(Ronin Platform|Alfredo Bosco|Giacomo d'Orlando|Karl Mancini|Annalaura Cattelan)/);
                    return (
                      <p key={index}>
                        {parts.map((part, i) => {
                          if (part === "Ronin Platform") {
                            return (
                              <Link
                                key={i}
                                href="https://www.roninplatform.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          if (part === "Alfredo Bosco") {
                            return (
                              <Link
                                key={i}
                                href="https://www.alfredobosco.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          if (part === "Giacomo d'Orlando") {
                            return (
                              <Link
                                key={i}
                                href="https://giacomodorlando.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          if (part === "Karl Mancini") {
                            return (
                              <Link
                                key={i}
                                href="https://www.karlmancini.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          if (part === "Annalaura Cattelan") {
                            return (
                              <Link
                                key={i}
                                href="https://www.annalauracattelan.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#ff5a43] hover:underline transition"
                              >
                                {part}
                              </Link>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </p>
                    );
                  }
                  // Per le altre mostre, renderizza normalmente
                  return <p key={index}>{paragraph}</p>;
                })}
                {/* Icone Instagram per giulia-piermartiri-e-edoardo-delille */}
                {exhibition.slug === "giulia-piermartiri-e-edoardo-delille" && (
                  <div className="pt-4 space-y-2">
                    <p className="text-lg font-bold text-[#ff5a43] sm:text-xl">
                      Segui il loro lavoro su Instagram:
                    </p>
                    <div className="space-y-2">
                      <InstagramLink
                        href="https://www.instagram.com/giuliapiermartiri/?hl=it"
                        username="giuliapiermartiri"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Giulia Piermartiri</span>
                      </InstagramLink>
                      <InstagramLink
                        href="https://www.instagram.com/edoardo_delille/?hl=it"
                        username="edoardo_delille"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Edoardo Delille</span>
                      </InstagramLink>
                    </div>
                  </div>
                )}
                {/* Icone Instagram per cristina-vatielli */}
                {exhibition.slug === "cristina-vatielli" && (
                  <div className="pt-4 space-y-2">
                    <p className="text-lg font-bold text-[#ff5a43] sm:text-xl">
                      Segui il suo lavoro su Instagram:
                    </p>
                    <div className="space-y-2">
                      <InstagramLink
                        href="https://www.instagram.com/cristinavatielli/?hl=it"
                        username="cristinavatielli"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Cristina Vatielli</span>
                      </InstagramLink>
                    </div>
                  </div>
                )}
                {/* Icone Instagram per francesco-pistilli */}
                {exhibition.slug === "francesco-pistilli" && (
                  <div className="pt-4 space-y-2">
                    <p className="text-lg font-bold text-[#ff5a43] sm:text-xl">
                      Segui il suo lavoro su Instagram:
                    </p>
                    <div className="space-y-2">
                      <InstagramLink
                        href="https://www.instagram.com/francesco.pistilli/?hl=it"
                        username="francesco.pistilli"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Francesco Pistilli</span>
                      </InstagramLink>
                    </div>
                  </div>
                )}
                {/* Icone Instagram per ronin-platform */}
                {exhibition.slug === "ronin-platform" && (
                  <div className="pt-4 space-y-2">
                    <p className="text-lg font-bold text-[#ff5a43] sm:text-xl">
                      Segui il loro lavoro su Instagram:
                    </p>
                    <div className="space-y-2">
                      <InstagramLink
                        href="https://www.instagram.com/ronin_platform/"
                        username="ronin_platform"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Ronin Platform</span>
                      </InstagramLink>
                      <InstagramLink
                        href="https://www.instagram.com/boscoalfredo/?hl=it"
                        username="boscoalfredo"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Alfredo Bosco</span>
                      </InstagramLink>
                      <InstagramLink
                        href="https://www.instagram.com/giacomo_dorlando/?hl=it"
                        username="giacomo_dorlando"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Giacomo d'Orlando</span>
                      </InstagramLink>
                      <InstagramLink
                        href="https://www.instagram.com/karlitomancini/?hl=it"
                        username="karlitomancini"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Karl Mancini</span>
                      </InstagramLink>
                      <InstagramLink
                        href="https://www.instagram.com/annalauracattelan/?hl=it"
                        username="annalauracattelan"
                        className="flex items-center gap-2 text-[#1f1c1a] hover:text-[#ff5a43] transition group"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={20}
                          className="group-hover:opacity-80 transition"
                        />
                        <span>Annalaura Cattelan</span>
                      </InstagramLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

