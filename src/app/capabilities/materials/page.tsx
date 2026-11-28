import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import MaterialsClient from "./MaterialsClient";

export const metadata: Metadata = {
  title: "Construction Materials Supply | Aevoryn Services & Contracting Co.",
  description: "Reliable sourcing, efficient transportation, and on-time delivery of construction materials adhering strictly to project specifications across Saudi Arabia.",
  alternates: {
    canonical: `${SITE_URL}/capabilities/materials`,
  },
  openGraph: {
    title: "Construction Materials Supply | Aevoryn Services & Contracting Co.",
    description: "Reliable sourcing, efficient transportation, and on-time delivery of construction materials adhering strictly to project specifications across Saudi Arabia.",
    url: `${SITE_URL}/capabilities/materials`,
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <MaterialsClient />;
}
