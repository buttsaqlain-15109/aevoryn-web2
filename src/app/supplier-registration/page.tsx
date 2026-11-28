import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import SupplierRegistrationClient from "./SupplierRegistrationClient";

export const metadata: Metadata = {
  title: "Supplier & Subcontractor Registration Portal",
  description:
    "Official supplier registration portal for Aevoryn Services & Contracting Co. Onboard materials suppliers, heavy equipment rental fleets, and certified civil manpower across Saudi Arabia.",
  alternates: {
    canonical: `${SITE_URL}/supplier-registration`,
  },
  openGraph: {
    title: "Supplier & Subcontractor Registration Portal | Aevoryn Services & Contracting Co.",
    description:
      "Join Aevoryn's verified vendor and supply chain network for civil infrastructure, equipment fleets, certified manpower, and materials supply across Saudi Arabia.",
    url: `${SITE_URL}/supplier-registration`,
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function SupplierRegistrationPage() {
  return <SupplierRegistrationClient />;
}
