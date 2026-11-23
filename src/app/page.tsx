import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Civil Infrastructure & Contracting Support | Aevoryn Services & Contracting Co.",
  description:
    "Aevoryn Services & Contracting Co. (CR 7054401679) provides civil infrastructure support, certified manpower, testing-compliant aggregates, and heavy equipment fleets across Saudi Arabia. Aramco Vendor Code: 10120422. Triple ISO certified.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/",
  },
  openGraph: {
    title: "Civil Infrastructure & Contracting Support | Aevoryn Services & Contracting Co.",
    description:
      "Aevoryn Services & Contracting Co. (CR 7054401679) provides civil infrastructure support, certified manpower, testing-compliant aggregates, and heavy equipment fleets across Saudi Arabia. Aramco Vendor Code: 10120422.",
    url: "https://aevoryn-web-17d.pages.dev/",
    siteName: "Aevoryn Services & Contracting Co.",
    images: [
      {
        url: "/images/branding/aevoryn-logo.png",
        width: 430,
        height: 430,
        alt: "Aevoryn Services & Contracting Co. Emblem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
