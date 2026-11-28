import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Commercial Inquiries & Project Estimation (RFQ)",
  description: "Submit requests for quotation (RFQ), commercial tenders, and operational manpower or equipment inquiries to Aevoryn Services & Contracting Co. across the Kingdom of Saudi Arabia.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/contact",
  },
  openGraph: {
    title: "Commercial Inquiries & Project Estimation (RFQ)",
    description: "Submit requests for quotation (RFQ), commercial tenders, and operational manpower or equipment inquiries to Aevoryn Services & Contracting Co. across the Kingdom of Saudi Arabia.",
    url: "https://aevoryn-web-17d.pages.dev/contact",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <ContactClient />;
}
