import type { Metadata } from "next";
import MaterialsClient from "./MaterialsClient";

export const metadata: Metadata = {
  title: "Industrial Materials & Aggregate Supply",
  description: "Specification-grade aggregate, structural steel, ready-mix concrete, backfill materials, and industrial bulk supplies delivered to project sites across Saudi Arabia.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/capabilities/materials",
  },
  openGraph: {
    title: "Industrial Materials & Aggregate Supply",
    description: "Specification-grade aggregate, structural steel, ready-mix concrete, backfill materials, and industrial bulk supplies delivered to project sites across Saudi Arabia.",
    url: "https://aevoryn-web-17d.pages.dev/capabilities/materials",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <MaterialsClient />;
}
