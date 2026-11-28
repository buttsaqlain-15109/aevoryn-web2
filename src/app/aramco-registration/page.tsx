import type { Metadata } from "next";
import AramcoClient from "./AramcoClient";

export const metadata: Metadata = {
  title: "Saudi Aramco Vendor Record (Code 10120422)",
  description: "Official Saudi Aramco e-Marketplace vendor record: Vendor Code 10120422, E-Reference 0019448 (Registered 28 July 2026, Service Provider Only). Includes regulatory disclaimers.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/aramco-registration",
  },
  openGraph: {
    title: "Saudi Aramco Vendor Record (Code 10120422)",
    description: "Official Saudi Aramco e-Marketplace vendor record: Vendor Code 10120422, E-Reference 0019448 (Registered 28 July 2026, Service Provider Only). Includes regulatory disclaimers.",
    url: "https://aevoryn-web-17d.pages.dev/aramco-registration",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AramcoClient />;
}
