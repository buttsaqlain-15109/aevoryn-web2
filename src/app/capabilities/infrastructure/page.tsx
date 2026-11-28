import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import InfrastructureClient from "./InfrastructureClient";

export const metadata: Metadata = {
  title: "Project Development Support | Aevoryn Services & Contracting Co.",
  description: "Comprehensive project development support, operational coordination, technical field support, and project facilitation for industrial and commercial projects across Saudi Arabia.",
  alternates: {
    canonical: `${SITE_URL}/capabilities/infrastructure`,
  },
  openGraph: {
    title: "Project Development Support | Aevoryn Services & Contracting Co.",
    description: "Comprehensive project development support, operational coordination, technical field support, and project facilitation for industrial and commercial projects across Saudi Arabia.",
    url: `${SITE_URL}/capabilities/infrastructure`,
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <InfrastructureClient />;
}
