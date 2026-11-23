import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Corporate Profile & Operational Governance",
  description: "Corporate structure, operational governance, and civil contracting profile of Aevoryn Services & Contracting Co. (CR 7054401679), headquartered in Riyadh, Saudi Arabia.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/about",
  },
  openGraph: {
    title: "Corporate Profile & Operational Governance",
    description: "Corporate structure, operational governance, and civil contracting profile of Aevoryn Services & Contracting Co. (CR 7054401679), headquartered in Riyadh, Saudi Arabia.",
    url: "https://aevoryn-web-17d.pages.dev/about",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
