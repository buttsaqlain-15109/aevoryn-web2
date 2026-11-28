import type { Metadata } from "next";
import InfrastructureClient from "./InfrastructureClient";

export const metadata: Metadata = {
  title: "Project Development Support | Aevoryn Services & Contracting Co.",
  description: "Comprehensive project development support, operational coordination, technical field support, and project facilitation for industrial and commercial projects across Saudi Arabia.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/capabilities/infrastructure",
  },
  openGraph: {
    title: "Project Development Support | Aevoryn Services & Contracting Co.",
    description: "Comprehensive project development support, operational coordination, technical field support, and project facilitation for industrial and commercial projects across Saudi Arabia.",
    url: "https://aevoryn-web-17d.pages.dev/capabilities/infrastructure",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <InfrastructureClient />;
}
