/**
 * AEVORYN SERVICES & CONTRACTING CO.
 * SINGLE SOURCE OF TRUTH (SSOT) — COMPANY FACTS REGISTRY
 *
 * GOVERNANCE RULES:
 * 1. Every factual claim on the website MUST originate from this registry.
 * 2. Every fact MUST contain sourceFile, page, verbatim quote, verification status, and date.
 * 3. Statuses:
 *    - "VERIFIED": Verbatim matched in official source-docs text.
 *    - "PENDING_CLIENT": Unverified or contradictory; MUST NOT be published to production.
 *    - "CONTRADICTED": In conflict with official documents; rejected and excluded.
 * 4. Helper getVerified() strictly guards runtime usage: any attempt to render a
 *    non-verified fact will throw at build time.
 */

export type FactStatus = "VERIFIED" | "PENDING_CLIENT" | "CONTRADICTED";

export interface FactItem<T = any> {
  readonly value: T;
  readonly sourceDoc: string;
  readonly sourceFile?: string;
  readonly page?: number;
  readonly sourcePage?: string;
  readonly quote?: string;
  readonly status: FactStatus;
  readonly verifiedOn: string;
  readonly notes?: string;
}

export function getVerified<T>(fact: FactItem<T>): T {
  if (fact.status !== "VERIFIED") {
    throw new Error(
      `[FACT_VIOLATION] Attempted to access non-verified fact in production: ${JSON.stringify(
        fact
      )}`
    );
  }
  return fact.value;
}

// ============================================================================
// 1. LEGAL IDENTITY & REGISTRATION
// ============================================================================

export const legalIdentityFacts = {
  legalNameEn: {
    value: "Aevoryn Services & Contracting Co.",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "Aevoryn Services & Contracting Co.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  legalNameAr: {
    value: "شركة ايفورين للخدمات والمقاولات",
    sourceDoc: "Commercial Registration (CR 7054401679)",
    sourcePage: "Certificate Header",
    quote: "شركة ايفورين للخدمات والمقاولات",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  tradeNameEn: {
    value: "Aevoryn",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 1,
    sourcePage: "Cover & Page 1",
    quote: "Aevoryn Services & Contracting Co.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  tradeNameAr: {
    value: "ايفورين",
    sourceDoc: "Company Profile PDF",
    sourcePage: "Arabic Section",
    quote: "ايفورين",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  crNumber: {
    value: "7054401679",
    sourceDoc: "SPL National Address Certificate GEMB7140",
    sourceFile: "SPL_National_Address.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "7054401679",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,
};

// ============================================================================
// 2. REGISTERED HEADQUARTERS & GEOGRAPHIC LOCATIONS
// ============================================================================

export const locationFacts = {
  /**
   * Official Primary Registered Legal Address.
   * Confirmed on ISO Certificates and SPL National Address Proof GEMB7140.
   */
  registeredBaishAddress: {
    value: {
      buildingNumber: "7140",
      streetNameEn: "Zaid Ibn Al Khattab Street",
      streetNameAr: "شارع زيد بن الخطاب",
      districtEn: "An Nahdah District",
      districtAr: "حي النهضة",
      cityEn: "Baish",
      cityAr: "بيش",
      postalCode: "87311",
      provinceEn: "Jazan Region",
      provinceAr: "منطقة جازان",
      countryEn: "Kingdom of Saudi Arabia",
      countryAr: "المملكة العربية السعودية",
      fullAddressEn:
        "Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Baish 87311, Kingdom of Saudi Arabia",
      fullAddressAr:
        "مبنى رقم 7140، شارع زيد بن الخطاب، حي النهضة، الرمز البريدي 87311، بيش، المملكة العربية السعودية",
    },
    sourceDoc: "ISO Certificates VC23018822, VC23022982, VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Site Address",
    quote:
      "Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Baish 87311, Kingdom of Saudi Arabia",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
    notes:
      "National Address Certificate GEMB7140 was issued on 21/05/2026 and expired on 17/11/2026. Kept internal and flagged; not rendered on public pages.",
  } satisfies FactItem,

  /**
   * Riyadh Address — Marked PENDING_CLIENT.
   * Listed on profile p.17, but absent from CR, ISO, and SPL proofs.
   * Excluded from production schema until client supplies verified proof.
   */
  operationalRiyadhAddress: {
    value: {
      streetEn: "Alahsa Street",
      streetAr: "شارع الأحساء",
      districtEn: "Al Malaz",
      districtAr: "الملز",
      cityEn: "Riyadh",
      cityAr: "الرياض",
      postalCode: "11543",
      countryEn: "Kingdom of Saudi Arabia",
      countryAr: "المملكة العربية السعودية",
      fullAddressEn: "Alahsa St., Almalaz 11543, Riyadh, Saudi Arabia",
      fullAddressAr: "شارع الأحساء، الملز 11543، الرياض، المملكة العربية السعودية",
    },
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 17,
    sourcePage: "Page 17",
    quote: "Alahsa St., Almalaz 11543, Riyadh, Saudi Arabia",
    status: "PENDING_CLIENT",
    verifiedOn: "2026-11-28",
    notes:
      "UNVERIFIED: Not supported by CR or SPL. Marked pending_client and not rendered on public pages.",
  } satisfies FactItem,
};

// ============================================================================
// 3. TELECOMMUNICATIONS & CONTACT CHANNELS
// ============================================================================

export const communicationFacts = {
  registeredLandline: {
    value: "+966 1732 29527",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 17,
    sourcePage: "Page 17",
    quote: "+966 1732 29527",
    status: "PENDING_CLIENT",
    verifiedOn: "2026-11-28",
    notes:
      "Southern region (017) number listed on profile with Riyadh address. Excluded from public pages until client confirms.",
  } satisfies FactItem<string>,

  adminEmail: {
    value: "admin@aevoryn.net",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 17,
    sourcePage: "Page 17",
    quote: "admin@aevoryn.net",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
    notes: "Primary verified public inquiry routing.",
  } satisfies FactItem<string>,

  chairmanEmail: {
    value: "chairman@aevoryn.net",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 17,
    sourcePage: "Page 17",
    quote: "chairman@aevoryn.net",
    status: "PENDING_CLIENT",
    verifiedOn: "2026-11-28",
    notes: "Internal executive email; excluded from public pages.",
  } satisfies FactItem<string>,
};

// ============================================================================
// 4. SAUDI ARAMCO VENDOR REGISTRATION
// ============================================================================

export const aramcoFacts = {
  vendorCode: {
    value: "10120422",
    sourceDoc: "Saudi Aramco Vendor Registration Record",
    sourceFile: "Saudi_Aramco_Vendor.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "Vendor Code: 10120422",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  eReference: {
    value: "0019448",
    sourceDoc: "Saudi Aramco Vendor Registration Record",
    sourceFile: "Saudi_Aramco_Vendor.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "Electronic Reference Number: 0019448",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  registrationDate: {
    value: "28 July 2026",
    sourceDoc: "Saudi Aramco Vendor Registration Record",
    sourceFile: "Saudi_Aramco_Vendor.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "Letter Date: 28 July 2026",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  supplierType: {
    value: "Service Provider Only",
    sourceDoc: "Saudi Aramco Vendor Registration Record",
    sourceFile: "Saudi_Aramco_Vendor.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "Supplier Type: Service Provider Only",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
    notes:
      "CRITICAL: Registered strictly as 'Service Provider Only'. All claims of material supplier approval are contradicted by Aramco letters and removed.",
  } satisfies FactItem<string>,

  verificationChannel: {
    value: "supplierhelpdesk@aramco.com",
    sourceDoc: "Saudi Aramco Vendor Registration Record",
    sourceFile: "Saudi_Aramco_Vendor.txt",
    page: 1,
    sourcePage: "Page 1",
    quote: "supplierhelpdesk@aramco.com",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  mandatoryDisclaimerEn: {
    value:
      "Registration as a supplier does not guarantee the award of any purchase order or contract, nor does it obligate Saudi Aramco to solicit bids from your company. Registered Saudi Aramco supplier (Service Provider), as of 28 July 2026. Registration is not a procurement commitment and not material-supplier approval.",
    sourceDoc: "Saudi Aramco Vendor Registration Record",
    sourceFile: "Saudi_Aramco_Vendor.txt",
    page: 1,
    sourcePage: "Page 1",
    quote:
      "Registration as a supplier does not guarantee the award of any purchase order or contract, nor does it obligate Saudi Aramco to solicit bids from your company. Registered Saudi Aramco supplier (Service Provider), as of 28 July 2026. Registration is not a procurement commitment and not material-supplier approval.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  mandatoryDisclaimerAr: {
    value:
      "التسجيل لدى أرامكو السعودية لا يشكل اتفاقاً أو التزاماً بشراء السلع أو الخدمات، ولا يعني اعتماد المنتجات أو التأهيل كمورد أو مقاول معتمد.",
    sourceDoc: "Saudi Aramco Standard Regulatory Translation",
    sourcePage: "Official Arabic Notice",
    quote:
      "التسجيل لدى أرامكو السعودية لا يشكل اتفاقاً أو التزاماً بشراء السلع أو الخدمات، ولا يعني اعتماد المنتجات أو التأهيل كمورد أو مقاول معتمد.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,
};

// ============================================================================
// 5. TRIPLE ISO CERTIFICATIONS (9001, 14001, 45001)
// ============================================================================

export const isoCertificationFacts = {
  registrar: {
    value: "Vatsin Certification Private Limited",
    sourceDoc: "ISO Certificates VC23018822, VC23022982, VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Seal & Issuing Authority",
    quote: "Vatsin Certification Private Limited",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  accreditationBody: {
    value: "International Accreditation Service (IAS)",
    sourceDoc: "ISO Certificates VC23018822, VC23022982, VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Accreditation Mark",
    quote: "IAS Accredited Management Systems Certification Body",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  issueDate: {
    value: "04-08-2026",
    sourceDoc: "ISO Certificates VC23018822, VC23022982, VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Certificate Validity Block",
    quote: "Initial Registration Date: 04-08-2026",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  expiryDate: {
    value: "03-08-2029",
    sourceDoc: "ISO Certificates VC23018822, VC23022982, VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Certificate Validity Block",
    quote: "Certificate Expiry Date: 03-08-2029",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  sharedVerbatimScopeEn: {
    value:
      "Provision of civil, electrical and mechanical construction, infrastructure development, manpower supply, equipment rental, material supply and project support services for industrial, commercial and infrastructure projects.",
    sourceDoc: "ISO Certificates VC23018822, VC23022982, VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Scope of Certification",
    quote:
      "Provision of civil, electrical and mechanical construction, infrastructure development, manpower supply, equipment rental, material supply and project support services for industrial, commercial and infrastructure projects.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  sharedVerbatimScopeAr: {
    value:
      "تقديم خدمات الإنشاءات المدنية والكهربائية والميكانيكية، وتطوير البنية التحتية، وتوريد القوى العاملة، وتأجير المعدات، وتوريد المواد وخدمات دعم المشاريع للمشاريع الصناعية والتجارية ومشاريع البنية التحتية.",
    sourceDoc: "Official Scope Translation",
    sourcePage: "Scope Statement",
    quote:
      "تقديم خدمات الإنشاءات المدنية والكهربائية والميكانيكية، وتطوير البنية التحتية، وتوريد القوى العاملة، وتأجير المعدات، وتوريد المواد وخدمات دعم المشاريع للمشاريع الصناعية والتجارية ومشاريع البنية التحتية.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  iso9001: {
    value: {
      standard: "ISO 9001:2015",
      certificateNumber: "VC23018822",
      titleEn: "Quality Management System",
      titleAr: "نظام إدارة الجودة",
    },
    sourceDoc: "ISO Certificate VC23018822",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Certificate Number & Standard",
    quote: "ISO 9001:2015 - Certificate No: VC23018822",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem,

  iso14001: {
    value: {
      standard: "ISO 14001:2015",
      certificateNumber: "VC23022982",
      titleEn: "Environmental Management System",
      titleAr: "نظام الإدارة البيئية",
    },
    sourceDoc: "ISO Certificate VC23022982",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Certificate Number & Standard",
    quote: "ISO 14001:2015 - Certificate No: VC23022982",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem,

  iso45001: {
    value: {
      standard: "ISO 45001:2018",
      certificateNumber: "VC23032689",
      titleEn: "Occupational Health & Safety Management System",
      titleAr: "نظام إدارة الصحة والسلامة المهنية",
    },
    sourceDoc: "ISO Certificate VC23032689",
    sourceFile: "ISO_Certificates.txt",
    page: 1,
    sourcePage: "Certificate Number & Standard",
    quote: "ISO 45001:2018 - Certificate No: VC23032689",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem,
};

// ============================================================================
// 6. FOUR CORE OPERATIONAL DIVISIONS (EXACT PROFILE WORDING)
// ============================================================================

export interface DivisionFact {
  id: string;
  divisionNumber: string;
  titleEn: string;
  titleAr: string;
  scopeSummaryEn: string;
  scopeSummaryAr: string;
  verbatimBulletsEn: readonly string[];
  verbatimBulletsAr: readonly string[];
  route: string;
  sourceFile: string;
  page: number;
  quote: string;
}

const divisionList: readonly DivisionFact[] = [
  {
    id: "project-development-support",
    divisionNumber: "01",
    titleEn: "Project Development Support",
    titleAr: "دعم وتطوير المشاريع",
    scopeSummaryEn:
      "Quality assurance, safety compliance, timely execution, cost control, sustainable outcomes.",
    scopeSummaryAr:
      "ضمان الجودة، الامتثال للسلامة، التنفيذ في الوقت المحدد، ضبط التكاليف، والنتائج المستدامة.",
    verbatimBulletsEn: [
      "Quality assurance",
      "Safety compliance",
      "Timely execution",
      "Cost control",
      "Sustainable outcomes",
    ],
    verbatimBulletsAr: [
      "ضمان الجودة",
      "الامتثال للسلامة",
      "التنفيذ في الوقت المحدد",
      "ضبط التكاليف",
      "نتائج مستدامة",
    ],
    route: "/capabilities/infrastructure",
    sourceFile: "Company_Profile.txt",
    page: 9,
    quote: "Division 01: Project Development Support",
  },
  {
    id: "manpower-supply",
    divisionNumber: "02",
    titleEn: "Manpower Supply",
    titleAr: "توريد القوى العاملة",
    scopeSummaryEn:
      "Skilled and general labor supply, flexible staffing solutions, scalable deployment for projects of all sizes.",
    scopeSummaryAr:
      "توفير الكوادر المهنية والعمالة العامة، حلول توظيف مرنة، وانتشار قابل للتوسع للمشاريع.",
    verbatimBulletsEn: [
      "Skilled and general labor supply",
      "Flexible staffing solutions",
      "Scalable deployment for projects of all sizes",
      "Compliance with project standards",
      "Workforce safety and supervision",
    ],
    verbatimBulletsAr: [
      "توريد العمالة الماهرة والعامة",
      "حلول توظيف مرنة",
      "انتشار وتوزيع قابل للتوسع",
      "الامتثال لمعايير المشروع",
      "سلامة وإشراف القوى العاملة",
    ],
    route: "/capabilities/manpower",
    sourceFile: "Company_Profile.txt",
    page: 10,
    quote: "Division 02: Manpower Supply",
  },
  {
    id: "construction-materials-supply",
    divisionNumber: "03",
    titleEn: "Construction Materials Supply",
    titleAr: "توريد مواد البناء",
    scopeSummaryEn:
      "Compliance with specifications, reliable sourcing, efficient transportation, on-time delivery to site.",
    scopeSummaryAr:
      "الامتثال للمواصفات، مصادر توريد موثوقة، نقل فعال، والتسليم في الوقت المحدد للموقع.",
    verbatimBulletsEn: [
      "Compliance with specifications",
      "Reliable sourcing",
      "Efficient transportation",
      "On-time delivery to site",
      "Project-specific material requirements",
    ],
    verbatimBulletsAr: [
      "الامتثال للمواصفات",
      "مصادر توريد موثوقة",
      "نقل فعال",
      "التسليم في الوقت المحدد للموقع",
      "متطلبات المواد المحددة للمشروع",
    ],
    route: "/capabilities/materials",
    sourceFile: "Company_Profile.txt",
    page: 11,
    quote: "Division 03: Construction Materials Supply",
  },
  {
    id: "equipment-supply",
    divisionNumber: "04",
    titleEn: "Equipment Supply",
    titleAr: "توريد المعدات",
    scopeSummaryEn:
      "Cranes for lifting and heavy-duty operations, construction machinery for civil works, project support equipment.",
    scopeSummaryAr:
      "رافعات لعمليات الرفع والمهام الشاقة، آليات ومعدات إنشائية للأعمال المدنية، ومعدات دعم متخصصة.",
    verbatimBulletsEn: [
      "Cranes for lifting and heavy-duty operations",
      "Construction machinery for civil works",
      "Additional project-specific support equipment",
      "Maintained to high safety and performance standards",
    ],
    verbatimBulletsAr: [
      "رافعات لعمليات الرفع والمهام الشاقة",
      "آليات ومعدات إنشائية للأعمال المدنية",
      "معدات دعم إضافية متخصصة حسب متطلبات المشروع",
      "صيانة دورية وفق أعلى معايير السلامة والأداء",
    ],
    route: "/capabilities/equipment",
    sourceFile: "Company_Profile.txt",
    page: 12,
    quote: "Division 04: Equipment Supply",
  },
];

export const divisionFacts = {
  divisionsCount: 4,
  list: divisionList,
  value: divisionList,
  sourceDoc: "Company Profile PDF",
  sourceFile: "Company_Profile.txt",
  page: 9,
  sourcePage: "Project Development Support p.9, Manpower p.10, Materials p.11, Equipment p.12",
  quote: "Division 01: Project Development Support",
  status: "VERIFIED" as const,
  verifiedOn: "2026-11-28",
};

// ============================================================================
// 7. CLIENT REGISTER (NAMES ONLY — NO INVENTED SCOPES)
// ============================================================================

export interface ClientFact {
  nameEn: string;
  nameAr: string;
  sourceType: "LOGO_AND_TEXT" | "LOGO_ONLY";
  status: "VERIFIED" | "PENDING_CLIENT";
  notes?: string;
}

const clientList: readonly ClientFact[] = [
  {
    nameEn: "Alfanar",
    nameAr: "الفنار",
    sourceType: "LOGO_AND_TEXT",
    status: "VERIFIED",
  },
  {
    nameEn: "Masco",
    nameAr: "ماسكو",
    sourceType: "LOGO_AND_TEXT",
    status: "VERIFIED",
  },
  {
    nameEn: "Tamimi",
    nameAr: "التميمي",
    sourceType: "LOGO_AND_TEXT",
    status: "VERIFIED",
  },
  {
    nameEn: "China Harbour",
    nameAr: "تشاينا هاربر",
    sourceType: "LOGO_AND_TEXT",
    status: "VERIFIED",
    notes:
      "Profile text reads 'China Harbour'. Profile logo reads 'CHEAC' (marked pending_client logo alignment).",
  },
  {
    nameEn: "Aldayfe",
    nameAr: "الضيف",
    sourceType: "LOGO_ONLY",
    status: "PENDING_CLIENT",
    notes:
      "PENDING_CLIENT: Marked pending because profile body text misspells as 'Aldsfey' while logo reads 'Aldayfe'. Kept internal in ledger; excluded from verified public list until client confirms.",
  },
];

export const clientFacts = {
  list: clientList,
  verifiedList: clientList.filter((c) => c.status === "VERIFIED"),
  value: clientList.filter((c) => c.status === "VERIFIED"),
  sourceDoc: "Company Profile PDF",
  sourceFile: "Company_Profile.txt",
  page: 13,
  sourcePage: "Our Clients Section, Page 13",
  quote: "Alfanar, Masco, Tamimi, China Harbour, Aldsfey",
  status: "VERIFIED" as const,
  verifiedOn: "2026-11-28",
  notes:
    "China Harbour uses profile text (logo reads CHEAC, pending_client). Aldayfe kept in ledger but marked pending_client because profile text spells Aldsfey.",
};

// ============================================================================
// 8. CORPORATE VISION, MISSION, AND HSQ (VERBATIM FROM PROFILE)
// ============================================================================

export const corporateStatements = {
  visionEn: {
    value:
      "To become one of Saudi Arabia's leading partners in the development of major infrastructure projects, recognized for excellence, quality and reliability in every engagement. We aim to support the Kingdom's long-term development goals by delivering consistent value, sustainable solutions and trusted partnerships.",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 5,
    sourcePage: "Vision Section, Page 5",
    quote:
      "To become one of Saudi Arabia's leading partners in the development of major infrastructure projects, recognized for excellence, quality and reliability in every engagement. We aim to support the Kingdom's long-term development goals by delivering consistent value, sustainable solutions and trusted partnerships.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  visionAr: {
    value:
      "أن نصبح أحد الشركاء الرواد في المملكة العربية السعودية في تطوير مشاريع البنية التحتية الكبرى، معترفاً بنا للتميز والجودة والموثوقية في كل عمل. ونهدف إلى دعم أهداف التنمية طويلة المدى في المملكة عبر تقديم قيمة ثابتة وحلول مستدامة وشراكات موثوقة.",
    sourceDoc: "Company Profile PDF",
    sourcePage: "Vision Section (Arabic)",
    quote: "الرؤية",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  missionEn: {
    value:
      "At Aevoryn, our mission is to provide comprehensive infrastructure support solutions that meet the highest standards of quality and safety. We focus on innovation, operational efficiency and sustainability to support our clients and contribute positively to community development across Saudi Arabia.",
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 6,
    sourcePage: "Mission Section, Page 6",
    quote:
      "At Aevoryn, our mission is to provide comprehensive infrastructure support solutions that meet the highest standards of quality and safety. We focus on innovation, operational efficiency and sustainability to support our clients and contribute positively to community development across Saudi Arabia.",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  missionAr: {
    value:
      "تتمثل مهمتنا في ايفورين في تقديم حلول دعم شاملة للبنية التحتية تلبي أعلى معايير الجودة والسلامة. ونركز على الابتكار والكفاءة التشغيلية والاستدامة لدعم عملائنا والمساهمة بشكل إيجابي في التنمية المجتمعية في كافة أنحاء المملكة العربية السعودية.",
    sourceDoc: "Company Profile PDF",
    sourcePage: "Mission Section (Arabic)",
    quote: "الرسالة",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<string>,

  coreValuesEn: {
    value: [
      "Quality",
      "Integrity",
      "Innovation",
      "Safety",
      "Sustainability",
      "Client Satisfaction",
    ],
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 7,
    sourcePage: "Core Values Section, Page 7",
    quote: "Quality\nIntegrity\nInnovation\nSafety\nSustainability\nClient Satisfaction",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<readonly string[]>,

  coreValuesAr: {
    value: [
      "الجودة",
      "النزاهة",
      "الابتكار",
      "السلامة",
      "الاستدامة",
      "رضا العملاء",
    ],
    sourceDoc: "Company Profile PDF",
    sourcePage: "Core Values Section (Arabic)",
    quote: "القيم الجوهرية",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<readonly string[]>,

  whyChooseUsEn: {
    value: [
      "Integrated Service Capability",
      "Operational Reliability",
      "Safety-First Culture",
      "Scalable Workforce Solutions",
      "Quality-Controlled Supply Chain",
      "Well-Maintained Equipment Fleet",
      "Experienced Management & Supervision",
      "Commitment to Client Satisfaction",
    ],
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 14,
    sourcePage: "Why Choose Aevoryn, Page 14",
    quote: "Why Choose Aevoryn",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<readonly string[]>,

  hsqEn: {
    value: [
      "Safety awareness and supervision",
      "Quality control procedures",
      "Continuous improvement",
      "Responsible site practices",
    ],
    sourceDoc: "Company Profile PDF",
    sourceFile: "Company_Profile.txt",
    page: 15,
    sourcePage: "HSQ Section, Page 15",
    quote: "Health, Safety, Quality & Environment (HSQ)",
    status: "VERIFIED",
    verifiedOn: "2026-11-28",
  } satisfies FactItem<readonly string[]>,
};

// ============================================================================
// 9. REMOVED & CONTRADICTED CLAIMS LEDGER (AUDIT TRAIL)
// ============================================================================

export interface ContradictedFactRecord {
  id: string;
  claim: string;
  sourceContradiction: string;
  actionTaken: "REMOVED_FROM_PRODUCTION";
  status: "PENDING_CLIENT" | "CONTRADICTED";
}

export const auditRemovalsLedger: readonly ContradictedFactRecord[] = [
  {
    id: "claim-materials-aggregate-testing",
    claim: "Proctor compaction, sieve analysis, quarry aggregate gradings, ASTM C33, SASO 204",
    sourceContradiction:
      "Profile p. 11 only lists specifications compliance, reliable sourcing, efficient transportation, on-time delivery, and project-specific requirements. No lab testing or standards numbers in source docs.",
    actionTaken: "REMOVED_FROM_PRODUCTION",
    status: "PENDING_CLIENT",
  },
  {
    id: "claim-aramco-approved-safety-officers",
    claim: "Aramco Approved Safety Officers & QC inspectors",
    sourceContradiction:
      "Saudi Aramco vendor letter explicitly states 'Supplier Type: Service Provider Only' and disclaims vendor approval or product qualification.",
    actionTaken: "REMOVED_FROM_PRODUCTION",
    status: "CONTRADICTED",
  },
  {
    id: "claim-equipment-telematics-tuv",
    claim: "Telematics telemetric tracking, TUV inspections, wet/dry lease contracting",
    sourceContradiction:
      "Profile p. 12 lists cranes, construction machinery, project support equipment, and safety/performance standards. Telematics and TUV are unverified.",
    actionTaken: "REMOVED_FROM_PRODUCTION",
    status: "PENDING_CLIENT",
  },
  {
    id: "claim-turnkey-subcontracting",
    claim: "Turnkey Civil Infrastructure & Site Development",
    sourceContradiction:
      "Profile title is 'Project Development Support', focusing on coordination, field support, and facilitation.",
    actionTaken: "REMOVED_FROM_PRODUCTION",
    status: "PENDING_CLIENT",
  },
  {
    id: "claim-client-spelling-alldsfey",
    claim: "Aldsfey",
    sourceContradiction:
      "Profile logo displays 'Aldayfe'. Replaced with verified logo name 'Aldayfe'.",
    actionTaken: "REMOVED_FROM_PRODUCTION",
    status: "PENDING_CLIENT",
  },
  {
    id: "claim-confidential-financial-audit",
    claim: "Internal Banking Mandate & Financial Covenant document",
    sourceContradiction: "Invented document mockup; no real basis in corporate files.",
    actionTaken: "REMOVED_FROM_PRODUCTION",
    status: "CONTRADICTED",
  },
];
