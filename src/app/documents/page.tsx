import type { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";

export const metadata: Metadata = {
  title: "Company Documents & Legal Library",
  description:
    "Official verified company documents: Commercial Registration (CR: 7054401679), Saudi Aramco vendor registration record (10120422), ISO 9001/14001/45001 certificates, and National Address proof.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/documents",
  },
  openGraph: {
    title: "Company Documents & Legal Library | Aevoryn Services & Contracting Co.",
    description:
      "Official verified company documents: Commercial Registration (CR: 7054401679), Saudi Aramco vendor registration (10120422), and ISO certificates.",
    url: "https://aevoryn-web-17d.pages.dev/documents",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function DocumentsPage() {
  return <DocumentsClient />;
}
