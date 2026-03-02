import Image from "next/image";
import Link from "next/link";
import { exhibitions } from "../data/exhibitions";
import { Footer } from "../components/Footer";

export default function MostrePage() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1f1c1a]">
      <main className="bg-[#f7f3ef] pt-28 pb-16 lg:pb-4">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="lg:max-w-5xl lg:mx-auto">
            <h1 className="font-heading text-center text-6xl font-semibold uppercase tracking-[0.02em] text-[#1f1c1a] sm:text-7xl mb-10">
              Mostre
            </h1>
            <div className="grid gap-8 lg:grid-cols-2">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
