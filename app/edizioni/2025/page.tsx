"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { Footer } from "../../components/Footer";

const imageFiles: string[] = [
  "nonsonocosa-6.webp",
  "nonsonocosa-7.webp",
  "nonsonocosa-8.webp",
  "nonsonocosa-9.webp",
  "nonsonocosa-10.webp",
  "nonsonocosa-11.webp",
  "nonsonocosa-12.webp",
  "nonsonocosa-13.webp",
  "nonsonocosa-14.webp",
  "nonsonocosa-15.webp",
  "nonsonocosa-16.webp",
  "nonsonocosa-17.webp",
  "nonsonocosa-18.webp",
  "nonsonocosa-19.webp",
  "nonsonocosa-20.webp",
  "nonsonocosa-21.webp",
  "nonsonocosa-22.webp",
  "nonsonocosa-23.webp",
  "nonsonocosa-24.webp",
  "nonsonocosa-25.webp",
  "nonsonocosa-26.webp",
  "nonsonocosa-27.webp",
  "nonsonocosa-28.webp",
  "nonsonocosa-29.webp",
  "nonsonocosa-30.webp",
  "nonsonocosa-31.webp",
  "nonsonocosa-32.webp",
  "nonsonocosa-33.webp",
  "nonsonocosa-34.webp",
  "nonsonocosa-35.webp",
  "nonsonocosa-36.webp",
  "nonsonocosa-37.webp",
  "nonsonocosa-38.webp",
  "nonsonocosa-39.webp",
  "nonsonocosa-40.webp",
  "nonsonocosa-41.webp",
  "nonsonocosa-42.webp",
  "nonsonocosa-43.webp",
  "nonsonocosa-44.webp",
  "nonsonocosa-45.webp",
  "nonsonocosa-46.webp",
  "nonsonocosa-47.webp",
  "nonsonocosa-48.webp",
  "nonsonocosa-49.webp",
  "nonsonocosa-50.webp",
  "nonsonocosa-51.webp",
  "nonsonocosa-52.webp",
  "nonsonocosa-53.webp",
  "nonsonocosa-54.webp",
  "nonsonocosa-55.webp",
  "nonsonocosa-56.webp",
  "nonsonocosa-57.webp",
];

const galleryImages = imageFiles.map((filename, index) => ({
  id: index + 1,
  src: `/edizioni/2025/${filename}`,
  alt: `Immagine edizione 2025`,
}));

const total = galleryImages.length;

export default function Edizione2025Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const nextImage = useCallback(() => setCurrentIndex((prev) => (prev + 1) % total), []);
  const prevImage = useCallback(() => setCurrentIndex((prev) => (prev - 1 + total) % total), []);
  const goToImage = (index: number) => setCurrentIndex(index);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Navigazione da tastiera (frecce sinistra/destra)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, prevImage, nextImage]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  // openModalOnTap: true nel viewer principale, false nel modal
  const onTouchEnd = (openModalOnTap = false) => {
    if (touchStartX.current === null) return;

    const endX = touchEndX.current ?? touchStartX.current;
    const endY = touchEndY.current ?? touchStartY.current!;
    const deltaX = touchStartX.current - endX;
    const deltaY = Math.abs((touchStartY.current ?? 0) - endY);
    const MIN_SWIPE = 50;

    if (Math.abs(deltaX) > MIN_SWIPE && Math.abs(deltaX) > deltaY) {
      // Swipe orizzontale
      deltaX > 0 ? nextImage() : prevImage();
    } else if (openModalOnTap && Math.abs(deltaX) < 10 && deltaY < 10) {
      // Tap senza movimento → apre modal
      openModal();
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  // Windowing: solo prev/current/next nel DOM — le altre 49 immagini non vengono mai montate
  const prevIdx = (currentIndex - 1 + total) % total;
  const nextIdx = (currentIndex + 1) % total;
  const visibleSet = new Set([prevIdx, currentIndex, nextIdx]);

  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="space-y-8 lg:space-y-6 lg:max-w-5xl lg:mx-auto">

            {/* Titolo */}
            <div>
              <h1 className="font-heading text-5xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-6xl lg:text-7xl">
                Edizione 2025
              </h1>
            </div>

            {/* Galleria */}
            <div className="relative w-full">
              {/* Swipe area + click per aprire modal su mobile */}
              <div
                className="relative aspect-[16/9] w-full overflow-hidden bg-[#dfe6ee]"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={() => onTouchEnd(true)}
                style={{ touchAction: "pan-y" }}
              >
                {galleryImages.map((image, index) => {
                  if (!visibleSet.has(index)) return null;
                  return (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={index === currentIndex}
                      />
                    </div>
                  );
                })}

                {/* Frecce desktop — pointer-events-auto esplicito per robustezza */}
                <button
                  type="button"
                  onClick={() => prevImage()}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center bg-white/80 text-[#1f1c1a] transition hover:bg-white cursor-pointer z-30 pointer-events-auto"
                  aria-label="Immagine precedente"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => nextImage()}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center bg-white/80 text-[#1f1c1a] transition hover:bg-white cursor-pointer z-30 pointer-events-auto"
                  aria-label="Immagine successiva"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Frecce mobile — solo onClick, niente onTouchStart per evitare conflitti */}
              <div className="lg:hidden mt-4 flex items-center justify-center gap-6 relative z-50">
                <button
                  type="button"
                  onClick={() => prevImage()}
                  className="flex h-14 w-14 items-center justify-center bg-white/90 text-[#1f1c1a] transition hover:bg-white active:scale-95 cursor-pointer rounded-full border border-[#bcb6b0] shadow-sm select-none pointer-events-auto"
                  style={{ touchAction: "manipulation" } as React.CSSProperties}
                  aria-label="Immagine precedente"
                >
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => nextImage()}
                  className="flex h-14 w-14 items-center justify-center bg-white/90 text-[#1f1c1a] transition hover:bg-white active:scale-95 cursor-pointer rounded-full border border-[#bcb6b0] shadow-sm select-none pointer-events-auto"
                  style={{ touchAction: "manipulation" } as React.CSSProperties}
                  aria-label="Immagine successiva"
                >
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dot indicators desktop */}
              <div className="hidden lg:flex mt-4 justify-center gap-2 flex-wrap">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-[#ff5a43] w-8"
                        : "bg-[#bcb6b0] w-2 hover:bg-[#9a938a]"
                    } cursor-pointer`}
                    aria-label={`Vai all'immagine ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Modal fullscreen — solo mobile */}
            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 bg-black/95 lg:hidden"
                onClick={closeModal}
              >
                <div className="relative flex h-full w-full items-center justify-center">
                  {/* Chiudi */}
                  <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center text-white transition hover:text-[#ff5a43] cursor-pointer"
                    aria-label="Chiudi"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Immagine */}
                  <div
                    className="relative h-full w-full"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={() => onTouchEnd(false)}
                  >
                    {galleryImages.map((image, index) => {
                      if (!visibleSet.has(index)) return null;
                      return (
                        <div
                          key={image.id}
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Frecce modal */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center bg-white/20 text-white transition hover:bg-white/30 active:scale-95 cursor-pointer select-none pointer-events-auto"
                    style={{ touchAction: "manipulation" } as React.CSSProperties}
                    aria-label="Immagine precedente"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center bg-white/20 text-white transition hover:bg-white/30 active:scale-95 cursor-pointer select-none pointer-events-auto"
                    style={{ touchAction: "manipulation" } as React.CSSProperties}
                    aria-label="Immagine successiva"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dot indicators modal */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-xs px-4">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-[#ff5a43] w-8"
                            : "bg-white/50 w-2 hover:bg-white/70"
                        } cursor-pointer`}
                        aria-label={`Vai all'immagine ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Contatore */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm">
                    {currentIndex + 1} / {total}
                  </div>
                </div>
              </div>
            )}

            {/* Testo descrittivo */}
            <div className="max-w-3xl space-y-8">
              <div className="space-y-6">
                <div className="space-y-4 text-xl leading-8 text-[#1f1c1a] sm:text-2xl">
                  <p>
                    L'edizione 2025 di Nonsonocosa si è svolta nel nel centro storico di Castelvetrano e del parco archeologico di Selinunte
                    offrendo ai visitatori un'esperienza unica tra storia, archeologia e fotografia contemporanea.
                  </p>
                  <p>
                    Il festival ha esplorato la fotografia sociale come mezzo espressivo, come pezzo di racconto emotivo e sociale. 
                    Attraverso gli sguardi di fotografi e artisti, abbiamo indagato il rapporto tra passato e presente, 
                    tra le rovine antiche e la contemporaneità, tra memoria collettiva e identità individuale.
                  </p>
                  <p>
                    Viviamo in un'epoca in cui il temporaneo ha il sopravvento sul permanente e siamo impossibilitati 
                    a guardare con chiarezza al futuro. La fotografia sociale diventa strumento per comprendere la realtà, 
                    per indicarci vie e metodi, per aprire nuovi orizzonti del pensiero.
                  </p>
                  <p>
                    Le mostre hanno dialogato con lo spazio archeologico, creando un percorso visivo che ha invitato 
                    alla riflessione sul significato del tempo, della permanenza e del cambiamento. La fotografia come 
                    linguaggio per invocare la necessità di un cambiamento e suggerire altre prospettive di vita.
                  </p>
                  <p>
                    Potersi concedere una pausa di riflessione, ricercare una sintonia con il territorio, concedersi 
                    il lusso di costruire rapporti profondi. Abbattere le proprie difese e farsi coinvolgere dalle emozioni 
                    che la vita ci offre attraverso il racconto fotografico.
                  </p>
                </div>
              </div>

              <div className="pt-6 space-y-4 border-t border-[#bcb6b0]">
                <div>
                  <p className="text-sm font-bold text-[#1f1c1a] mb-1">
                    Edizione 2025
                  </p>
                  <p className="text-sm font-bold text-[#1f1c1a] mb-3">
                    Nonsonocosa
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">Inaugurazione</p>
                  <p className="text-sm text-[#1f1c1a]">01 maggio 2025</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">Mostre</p>
                  <p className="text-sm text-[#1f1c1a]">Dal 1 Maggio al 15 Giugno</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">Luogo</p>
                  <div className="space-y-1 text-sm text-[#1f1c1a]">
                    <p>Collegiata di SS Pietro e Paolo</p>
                    <p>Xeniahome</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">Mostre</p>
                  <div className="space-y-1 text-sm text-[#1f1c1a]">
                    <p>Mattia Crocetti, X-Town</p>
                    <p>Camilla Miliani, Changemakers</p>
                    <p>Portal, tra passato e presente (archivio De Pasquale)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">Direttivo del Festival</p>
                  <div className="space-y-1 text-sm text-[#1f1c1a]">
                    <p>Giancarlo Filardo</p>
                    <p>Giovanni Calia</p>
                    <p>Michele Milazzo</p>
                    <p>Giuseppe Caro</p>
                  </div>
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
