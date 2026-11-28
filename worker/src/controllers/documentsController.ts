import { Env } from "../types/env";

export async function handleDocumentsVerification(
  url: URL,
  corsHeaders: Headers,
  requestId: string
): Promise<Response> {
  const documents = [
    {
      id: "iso-45001",
      standard: "ISO 45001:2018",
      scope: "PROJECT DEVELOPMENT SUPPORT, SUPPLY OF MANPOWER, MATERIALS & HEAVY EQUIPMENTS",
      certificateNumber: "VC23032689",
      registrar: "Vatsin Certification Private Limited",
      registrationDate: "2026-08-04",
      expiryDate: "2029-08-03",
      status: "Active & Valid",
      certifiedSite: "Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Zipcode 87311, Baish, Jazan Region, Saudi Arabia",
      verified: true,
    },
    {
      id: "iso-9001",
      standard: "ISO 9001:2015",
      scope: "PROJECT DEVELOPMENT SUPPORT, SUPPLY OF MANPOWER, MATERIALS & HEAVY EQUIPMENTS",
      certificateNumber: "VC23018822",
      registrar: "Vatsin Certification Private Limited",
      registrationDate: "2026-08-04",
      expiryDate: "2029-08-03",
      status: "Active & Valid",
      certifiedSite: "Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Zipcode 87311, Baish, Jazan Region, Saudi Arabia",
      verified: true,
    },
    {
      id: "iso-14001",
      standard: "ISO 14001:2015",
      scope: "PROJECT DEVELOPMENT SUPPORT, SUPPLY OF MANPOWER, MATERIALS & HEAVY EQUIPMENTS",
      certificateNumber: "VC23022982",
      registrar: "Vatsin Certification Private Limited",
      registrationDate: "2026-08-04",
      expiryDate: "2029-08-03",
      status: "Active & Valid",
      certifiedSite: "Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Zipcode 87311, Baish, Jazan Region, Saudi Arabia",
      verified: true,
    },
    {
      id: "aramco-supplier-code",
      standard: "Saudi Aramco Supplier Management System",
      scope: "Service Provider Only",
      vendorCode: "10120422",
      electronicReference: "0019448",
      registrationDate: "2026-07-28",
      status: "Active Registration",
      disclaimer: "Registration as a supplier does not guarantee the award of any purchase order or contract, nor does it obligate Saudi Aramco to solicit bids from your company.",
      verified: true,
    },
  ];

  const docId = url.pathname.split("/").pop();
  if (docId && docId !== "documents") {
    const found = documents.find((d) => d.id === docId);
    if (!found) {
      return new Response(
        JSON.stringify({ success: false, errors: ["Document not found."], timestamp: new Date().toISOString(), requestId }),
        { status: 404, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, data: found, timestamp: new Date().toISOString(), requestId }),
      { status: 200, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, count: documents.length, data: documents, timestamp: new Date().toISOString(), requestId }),
    { status: 200, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
  );
}
