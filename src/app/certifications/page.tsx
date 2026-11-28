import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import CertificationsClient from "./CertificationsClient";

export const metadata: Metadata = {
  title: "Quality, Environmental & Safety Certifications (ISO 9001, 14001, 45001)",
  description: "Verified ISO 9001:2015 (VC23018822), ISO 14001:2015 (VC23022982), and ISO 45001:2018 (VC23032689) accredited certifications issued by Vatsin Certification.",
  alternates: {
    canonical: `${SITE_URL}/certifications`,
  },
  openGraph: {
    title: "Quality, Environmental & Safety Certifications (ISO 9001, 14001, 45001)",
    description: "Verified ISO 9001:2015 (VC23018822), ISO 14001:2015 (VC23022982), and ISO 45001:2018 (VC23032689) accredited certifications issued by Vatsin Certification.",
    url: `${SITE_URL}/certifications`,
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <CertificationsClient />;
}
