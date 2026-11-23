import type { Metadata } from "next";
import ManpowerClient from "./ManpowerClient";

export const metadata: Metadata = {
  title: "Certified Technical & Industrial Manpower",
  description: "Supplying certified welders, civil supervisors, safety inspectors, and skilled industrial workforce compliant with Saudi labor standards and site safety mandates.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/capabilities/manpower",
  },
  openGraph: {
    title: "Certified Technical & Industrial Manpower",
    description: "Supplying certified welders, civil supervisors, safety inspectors, and skilled industrial workforce compliant with Saudi labor standards and site safety mandates.",
    url: "https://aevoryn-web-17d.pages.dev/capabilities/manpower",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <ManpowerClient />;
}
