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
      scope: "Occupational Health & Safety Management System",
      certificateNumber: "VC23032689",
      registrar: "Vatsin Certification Private Limited",
      registrationDate: "2026-08-04",
      expiryDate: "2029-08-03",
      status: "Active & Valid",
      certifiedSite: "Baish, Jizan Region, Kingdom of Saudi Arabia",
      corporateHeadquarters: "Alahsa Street, Almalaz, Riyadh 11543, Saudi Arabia",
      verified: true,
    },
    {
      id: "iso-9001",
      standard: "ISO 9001:2015",
      scope: "Quality Management System",
      certificateNumber: "VC23018822",
      registrar: "Vatsin Certification Private Limited",
      registrationDate: "2026-08-04",
      expiryDate: "2029-08-03",
      status: "Active & Valid",
      certifiedSite: "Baish, Jizan Region, Kingdom of Saudi Arabia",
      corporateHeadquarters: "Alahsa Street, Almalaz, Riyadh 11543, Saudi Arabia",
      verified: true,
    },
    {
      id: "iso-14001",
      standard: "ISO 14001:2015",
      scope: "Environmental Management System",
      certificateNumber: "VC23022982",
      registrar: "Vatsin Certification Private Limited",
      registrationDate: "2026-08-04",
      expiryDate: "2029-08-03",
      status: "Active & Valid",
      certifiedSite: "Baish, Jizan Region, Kingdom of Saudi Arabia",
      corporateHeadquarters: "Alahsa Street, Almalaz, Riyadh 11543, Saudi Arabia",
      verified: true,
    },
    {
      id: "aramco-supplier-code",
      standard: "Saudi Aramco Supplier Management System",
      scope: "Registered Service Provider / Contractor",
      vendorCode: "10120422",
      electronicReference: "0019448",
      registrationDate: "2026-07-28",
      status: "Active Registration",
      disclaimer: "Registration in the Saudi Aramco Supplier Management System does not constitute direct endorsement, warranty, or guarantee of contracts by Saudi Aramco.",
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
