import type { Metadata } from "next";
import AdminSuppliersClient from "./AdminSuppliersClient";

export const metadata: Metadata = {
  title: "Supplier Submissions Ledger | Procurement Administration",
  description:
    "Internal procurement administration portal for auditing supplier submissions, reviewing compliance documents, and managing vendor onboarding for Aevoryn Services & Contracting Co.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/admin/suppliers",
  },
};

export default function AdminSuppliersPage() {
  return <AdminSuppliersClient />;
}
