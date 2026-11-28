import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { SITE_URL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Corporate Profile & Operational Governance",
  description: "Corporate structure, operational governance, and civil contracting profile of Aevoryn Services & Contracting Co. (CR 7054401679), registered facility in Baish, Saudi Arabia.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "Corporate Profile & Operational Governance",
    description: "Corporate structure, operational governance, and civil contracting profile of Aevoryn Services & Contracting Co. (CR 7054401679), registered facility in Baish, Saudi Arabia.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
