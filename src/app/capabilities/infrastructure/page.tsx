import type { Metadata } from "next";
import InfrastructureClient from "./InfrastructureClient";

export const metadata: Metadata = {
  title: "Civil Infrastructure & Site Development",
  description: "Heavy earthmoving, site grading, utility trenching, and concrete structural foundations for major industrial and civil jobsites across Saudi Arabia.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/capabilities/infrastructure",
  },
  openGraph: {
    title: "Civil Infrastructure & Site Development",
    description: "Heavy earthmoving, site grading, utility trenching, and concrete structural foundations for major industrial and civil jobsites across Saudi Arabia.",
    url: "https://aevoryn-web-17d.pages.dev/capabilities/infrastructure",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <InfrastructureClient />;
}
