import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import QhseClient from "./QhseClient";

export const metadata: Metadata = {
  title: "QHSE Operational Standards & Safety Framework",
  description: "Comprehensive Quality, Health, Safety, and Environmental (QHSE) management framework governing all field operations, risk controls, and site compliance.",
  alternates: {
    canonical: `${SITE_URL}/qhse`,
  },
  openGraph: {
    title: "QHSE Operational Standards & Safety Framework",
    description: "Comprehensive Quality, Health, Safety, and Environmental (QHSE) management framework governing all field operations, risk controls, and site compliance.",
    url: `${SITE_URL}/qhse`,
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <QhseClient />;
}
