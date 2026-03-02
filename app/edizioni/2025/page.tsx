"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Footer } from "../../components/Footer";

// Aggiungi qui tutti i nomi dei file immagine presenti in public/edizioni/2025
// Non è necessario rinominare i file, basta aggiungere i loro nomi qui
const imageFiles: string[] = [
  "nonsonocosa-6.jpg",
  "nonsonocosa-7.jpg",
  "nonsonocosa-8.jpg",
  "nonsonocosa-9.jpg",
  "nonsonocosa-10.jpg",
  "nonsonocosa-11.jpg",
  "nonsonocosa-12.jpg",
  "nonsonocosa-13.jpg",
  "nonsonocosa-14.jpg",
  "nonsonocosa-15.jpg",
  "nonsonocosa-16.jpg",
  "nonsonocosa-17.jpg",
  "nonsonocosa-18.jpg",
  "nonsonocosa-19.jpg",
  "nonsonocosa-20.jpg",
  "nonsonocosa-21.jpg",
  "nonsonocosa-22.jpg",
  "nonsonocosa-23.jpg",
  "nonsonocosa-24.jpg",
  "nonsonocosa-25.jpg",
  "nonsonocosa-26.jpg",
  "nonsonocosa-27.jpg",
  "nonsonocosa-28.jpg",
  "nonsonocosa-29.jpg",
  "nonsonocosa-30.jpg",
  "nonsonocosa-31.jpg",
  "nonsonocosa-32.jpg",
  "nonsonocosa-33.jpg",
  "nonsonocosa-34.jpg",
  "nonsonocosa-35.jpg",
  "nonsonocosa-36.jpg",
  "nonsonocosa-37.jpg",
  "nonsonocosa-38.jpg",
  "nonsonocosa-39.jpg",
  "nonsonocosa-40.jpg",
  "nonsonocosa-41.jpg",
  "nonsonocosa-42.jpg",
  "nonsonocosa-43.jpg",
  "nonsonocosa-44.jpg",
  "nonsonocosa-45.jpg",
  "nonsonocosa-46.jpg",
  "nonsonocosa-47.jpg",
  "nonsonocosa-48.jpg",
  "nonsonocosa-49.jpg",
  "nonsonocosa-50.jpg",
  "nonsonocosa-51.jpg",
  "nonsonocosa-52.jpg",
  "nonsonocosa-53.jpg",
  "nonsonocosa-54.jpg",
  "nonsonocosa-55.jpg",
  "nonsonocosa-56.jpg",
  "nonsonocosa-57.jpg",
];

const galleryImages = imageFiles.map((filename, index) => ({
  id: index + 1,
  src: `/edizioni/2025/${filename}`,
  alt: `Immagine edizione 2025`,
}));

export default function Edizione2025Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Gestione touch/swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next image
      nextImage();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous image
      prevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };


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

            {/* Galleria a scorrimento */}
            <div className="relative w-full" ref={galleryRef}>
              {galleryImages.length > 0 ? (
                <>
                  <div 
                    className="relative aspect-[16/9] w-full overflow-hidden bg-[#dfe6ee] touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {galleryImages.map((image, index) => (
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
                    ))}
                    {/* Bottone per aprire modal su mobile */}
                    <button
                      type="button"
                      className="absolute inset-0 z-10 bg-transparent lg:pointer-events-none lg:hidden"
                      onClick={openModal}
                      onTouchStart={(e) => {
                        // Previeni l'apertura del modal se si tocca vicino ai bordi (dove potrebbero esserci controlli)
                        const rect = e.currentTarget.getBoundingClientRect();
                        const touch = e.touches[0];
                        const x = touch.clientX - rect.left;
                        const y = touch.clientY - rect.top;
                        // Se il touch è nella zona centrale, apri il modal
                        if (x > rect.width * 0.2 && x < rect.width * 0.8 && y > rect.height * 0.2 && y < rect.height * 0.8) {
                          openModal();
                        }
                      }}
                      aria-label="Apri galleria immagini"
                      style={{ touchAction: 'pan-y' }}
                    />
                    
                    {/* Controlli navigazione laterali - visibili su desktop */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center bg-white/80 text-[#1f1c1a] transition hover:bg-white cursor-pointer z-30 pointer-events-auto"
                      aria-label="Immagine precedente"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center bg-white/80 text-[#1f1c1a] transition hover:bg-white cursor-pointer z-30 pointer-events-auto"
                      aria-label="Immagine successiva"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Frecce in basso per mobile - solo frecce, senza indicatori */}
                  <div className="lg:hidden mt-4 flex items-center justify-center gap-6 z-50 relative">
                    <button
                      type="button"
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevImage();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="flex h-14 w-14 items-center justify-center bg-white/90 text-[#1f1c1a] transition hover:bg-white active:bg-white active:scale-95 cursor-pointer rounded-full border border-[#bcb6b0] shadow-sm touch-manipulation select-none"
                      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                      aria-label="Immagine precedente"
                    >
                      <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextImage();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="flex h-14 w-14 items-center justify-center bg-white/90 text-[#1f1c1a] transition hover:bg-white active:bg-white active:scale-95 cursor-pointer rounded-full border border-[#bcb6b0] shadow-sm touch-manipulation select-none"
                      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                      aria-label="Immagine successiva"
                    >
                      <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Indicatori desktop */}
                  <div className="hidden lg:flex mt-4 justify-center gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`h-2 w-2 rounded-full transition ${
                          index === currentIndex
                            ? "bg-[#ff5a43] w-8"
                            : "bg-[#bcb6b0] hover:bg-[#9a938a]"
                        } cursor-pointer`}
                        aria-label={`Vai all'immagine ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#dfe6ee] flex items-center justify-center">
                  <p className="text-[#6c655f] text-center px-4">
                    Aggiungi i nomi delle immagini nell'array imageFiles (riga 10-16)
                  </p>
                </div>
              )}
            </div>

            {/* Modal per visualizzazione mobile */}
            {isModalOpen && galleryImages.length > 0 && (
              <div 
                className="fixed inset-0 z-50 bg-black/95 lg:hidden"
                onClick={closeModal}
              >
                <div className="relative flex h-full w-full items-center justify-center">
                  {/* Bottone chiusura */}
                  <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center text-white transition hover:text-[#ff5a43] cursor-pointer"
                    aria-label="Chiudi"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Immagine */}
                  <div 
                    className="relative h-full w-full"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {galleryImages.map((image, index) => (
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
                    ))}
                  </div>

                  {/* Controlli navigazione modal */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onTouchStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          prevImage();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center bg-white/20 text-white transition hover:bg-white/30 active:bg-white/40 active:scale-95 cursor-pointer touch-manipulation select-none"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                        aria-label="Immagine precedente"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onTouchStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          nextImage();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center bg-white/20 text-white transition hover:bg-white/30 active:bg-white/40 active:scale-95 cursor-pointer touch-manipulation select-none"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                        aria-label="Immagine successiva"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Indicatori modal */}
                  {galleryImages.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(index);
                          }}
                          className={`h-2 rounded-full transition ${
                            index === currentIndex
                              ? "bg-[#ff5a43] w-8"
                              : "bg-white/50 w-2 hover:bg-white/70"
                          } cursor-pointer`}
                          aria-label={`Vai all'immagine ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Contatore */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm">
                    {currentIndex + 1} / {galleryImages.length}
                  </div>
                </div>
              </div>
            )}

            {/* Testo descrittivo */}
            <div className="max-w-3xl space-y-8">
              {/* Concept - testo principale più grande */}
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

              {/* Info edizione - testo più piccolo */}
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
                  <p className="text-sm font-bold text-[#1f1c1a]">
                    Inaugurazione
                  </p>
                  <p className="text-sm text-[#1f1c1a]">
                    01 maggio 2025
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">
                    Mostre
                  </p>
                  <p className="text-sm text-[#1f1c1a]">
                    Dal 1 Maggio al 15 Giugno
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">
                    Luogo
                  </p>
                  <div className="space-y-1 text-sm text-[#1f1c1a]">
                    <p>Collegiata di SS Pietro e Paolo</p>
                    <p>Xeniahome</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">
                    Mostre
                  </p>
                  <div className="space-y-1 text-sm text-[#1f1c1a]">
                    <p>Mattia Crocetti, X-Town</p>
                  <p>Camilla Miliani, Changemakers </p>
                  <p>Portal, tra passato e presente (archivio De Pasquale)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1f1c1a]">
                    Direttivo del Festival
                  </p>
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
