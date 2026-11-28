import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Supplier Registration Received",
  description:
    "Official confirmation and reference number for supplier registration with Aevoryn Services & Contracting Co. Procurement audit timeline and vendor onboarding details.",
  alternates: {
    canonical: `${SITE_URL}/supplier-registration/thank-you`,
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
