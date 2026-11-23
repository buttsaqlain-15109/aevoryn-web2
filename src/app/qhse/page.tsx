import type { Metadata } from "next";
import QhseClient from "./QhseClient";

export const metadata: Metadata = {
  title: "QHSE Operational Standards & Safety Framework",
  description: "Comprehensive Quality, Health, Safety, and Environmental (QHSE) management framework governing all field operations, risk controls, and site compliance.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/qhse",
  },
  openGraph: {
    title: "QHSE Operational Standards & Safety Framework",
    description: "Comprehensive Quality, Health, Safety, and Environmental (QHSE) management framework governing all field operations, risk controls, and site compliance.",
    url: "https://aevoryn-web-17d.pages.dev/qhse",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <QhseClient />;
}
