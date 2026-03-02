import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edizione 2025",
  description:
    "Archivio fotografico dell'edizione 2025 di Nonsonocosa, festival di fotografia sociale a Castelvetrano-Selinunte.",
  openGraph: {
    title: "Edizione 2025 | Nonsonocosa",
    description: "Archivio fotografico dell'edizione 2025 di Nonsonocosa.",
    type: "website",
    url: "https://nonsonocosa.it/edizioni/2025",
  },
  alternates: {
    canonical: "/edizioni/2025",
  },
};

export default function Edizione2025Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
