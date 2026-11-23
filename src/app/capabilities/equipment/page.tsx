import type { Metadata } from "next";
import EquipmentClient from "./EquipmentClient";

export const metadata: Metadata = {
  title: "Heavy Equipment Logistics & Machinery Fleet",
  description: "Mobilization of certified excavators, mobile cranes, bulldozers, wheel loaders, and specialized heavy machinery with certified operators.",
  alternates: {
    canonical: "https://aevoryn-web-17d.pages.dev/capabilities/equipment",
  },
  openGraph: {
    title: "Heavy Equipment Logistics & Machinery Fleet",
    description: "Mobilization of certified excavators, mobile cranes, bulldozers, wheel loaders, and specialized heavy machinery with certified operators.",
    url: "https://aevoryn-web-17d.pages.dev/capabilities/equipment",
    siteName: "Aevoryn Services & Contracting Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <EquipmentClient />;
}
