import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import ClientsClient from "./ClientsClient";

export const metadata: Metadata = {
  title: "Contracting Partners & Project Collaborations",
  description: "Field collaboration record and industrial partnerships across energy, industrial construction, and civil infrastructure projects throughout the Kingdom of Saudi Arabia.",
  alternates: {
    canonical: `${SITE_URL}/clients`,
  },
  openGraph: {
    title: "Contracting Partners & Project Collaborations",
    description: "Field collaboration record and industrial partnerships across energy, industrial construction, and civil infrastructure projects throughout the Kingdom of Saudi Arabia.",
    url: `${SITE_URL}/clients`,
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <ClientsClient />;
}
