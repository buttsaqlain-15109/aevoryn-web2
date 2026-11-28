import {
  legalIdentityFacts,
  locationFacts,
  communicationFacts,
  aramcoFacts,
  isoCertificationFacts,
  divisionFacts,
  clientFacts,
  corporateStatements,
  getVerified,
} from "./company.facts";

export type TranslationKey = string;

const registeredAddress = getVerified(locationFacts.registeredBaishAddress);
const verifiedPhone = getVerified(communicationFacts.registeredLandline);
const verifiedAdminEmail = getVerified(communicationFacts.adminEmail);
const verifiedChairmanEmail = getVerified(communicationFacts.chairmanEmail);
const sharedIsoScopeEn = getVerified(isoCertificationFacts.sharedVerbatimScopeEn);
const sharedIsoScopeAr = getVerified(isoCertificationFacts.sharedVerbatimScopeAr);

export const translations = {
  en: {
    brand: {
      name: getVerified(legalIdentityFacts.legalNameEn),
      shortName: getVerified(legalIdentityFacts.tradeNameEn),
      tagline: "Building Infrastructure. Enabling Progress.",
      cr: `CR No. ${getVerified(legalIdentityFacts.crNumber)}`,
      address: registeredAddress.fullAddressEn,
      phone: verifiedPhone,
      emailChairman: verifiedChairmanEmail,
      emailAdmin: verifiedAdminEmail,
    },
    nav: {
      home: "Home",
      about: "About Us",
      capabilities: "Capabilities",
      infrastructure: divisionFacts.list[0].titleEn,
      manpower: divisionFacts.list[1].titleEn,
      materials: divisionFacts.list[2].titleEn,
      equipment: divisionFacts.list[3].titleEn,
      qhse: "QHSE & Safety",
      certifications: "Certifications",
      aramco: "Saudi Aramco Registration",
      clients: "Clients & Partners",
      contact: "Contact Us",
      documents: "Company Documents",
      supplierRegistration: "Supplier Registration",
      requestConsultation: "Request Consultation",
      langSwitch: "العربية",
    },
    hero: {
      badge: "Saudi Arabia Infrastructure & Contracting Support",
      headline: "Building Infrastructure. Enabling Progress.",
      subheadline:
        "Aevoryn Services & Contracting Co. delivers integrated contracting support solutions through certified manpower, quality construction materials, heavy equipment fleets, and project development support across the Kingdom.",
      exploreBtn: "Explore Our Capabilities",
      contactBtn: "Contact Our Team",
      consultationBtn: "Request a Consultation",
      stats: {
        aramco: "Saudi Aramco",
        aramcoSub: `Vendor Code: ${getVerified(aramcoFacts.vendorCode)}`,
        divisions: `${divisionFacts.divisionsCount} Core Divisions`,
        divisionsSub: "Integrated Contracting Support",
        iso: "Triple ISO Certified",
        isoSub: "9001 / 14001 / 45001",
        qhse: "QHSE Commitment",
        qhseSub: "Safety & Compliance",
      },
    },
    intro: {
      badge: "Corporate Profile",
      headline: "Your Partner in Infrastructure Support",
      leadText:
        "Aevoryn Services & Contracting Co. stands as a dedicated industrial solutions provider supporting primary contractors, industrial developers, and infrastructure projects throughout Saudi Arabia.",
      paragraph1:
        "In alignment with Saudi Vision 2030, Aevoryn bridges critical project delivery gaps by providing dependable field execution, compliant manpower mobilization, quality construction materials, and heavy equipment fleets.",
      paragraph2:
        "Our operational agility, deep local knowledge, and strict QHSE protocols ensure that our partners execute industrial and infrastructure developments on schedule, safely, and within standard specifications.",
      readMore: "Learn More About Our Governance",
      highlights: [
        { label: "Kingdom-Wide Deployment", desc: "Operational capabilities across Riyadh, Eastern, and Southern Provinces." },
        { label: "Rigorous Regulatory Compliance", desc: "Full adherence to Saudi labor regulations and recognized project standards." },
        { label: "Integrated Delivery Model", desc: "One unified partner for materials, manpower, logistics, and plant equipment." },
      ],
    },
    capabilities: {
      badge: "Core Divisions",
      headline: "Four Integrated Infrastructure Capabilities",
      subheadline:
        "We deliver synchronized contracting support services engineered to resolve critical site bottlenecks and accelerate project velocity.",
      viewDetails: "View Full Capability Scope",
      items: [
        {
          id: "infrastructure",
          title: divisionFacts.list[0].titleEn,
          subtitle: "Operational Coordination & Technical Support",
          desc: divisionFacts.list[0].scopeSummaryEn,
          features: [...divisionFacts.list[0].verbatimBulletsEn],
          image: "/images/content/infrastructure.jpg",
          link: divisionFacts.list[0].route,
        },
        {
          id: "manpower",
          title: divisionFacts.list[1].titleEn,
          subtitle: "Compliant Workforce Solutions",
          desc: divisionFacts.list[1].scopeSummaryEn,
          features: [...divisionFacts.list[1].verbatimBulletsEn],
          image: "/images/content/manpower.jpg",
          link: divisionFacts.list[1].route,
        },
        {
          id: "materials",
          title: divisionFacts.list[2].titleEn,
          subtitle: "Reliable Sourcing & Site Delivery",
          desc: divisionFacts.list[2].scopeSummaryEn,
          features: [...divisionFacts.list[2].verbatimBulletsEn],
          image: "/images/content/materials.jpg",
          link: divisionFacts.list[2].route,
        },
        {
          id: "equipment",
          title: divisionFacts.list[3].titleEn,
          subtitle: "Heavy Machinery & Lifting Plant",
          desc: divisionFacts.list[3].scopeSummaryEn,
          features: [...divisionFacts.list[3].verbatimBulletsEn],
          image: "/images/content/equipment.jpg",
          link: divisionFacts.list[3].route,
        },
      ],
    },
    projectSupport: {
      badge: "Operational Excellence",
      headline: "Project Development Support & Governance",
      subheadline:
        "Aevoryn reinforces project management teams by executing mission-critical operational support without disrupting primary contractor workflows.",
      pillars: [
        {
          title: "Operational Coordination",
          desc: "Direct synchronization between procurement, field logistics, and daily site production schedules.",
        },
        {
          title: "Technical Field Support",
          desc: "On-site troubleshooting, methodology optimization, and practical problem resolution by experienced supervisors.",
        },
        {
          title: "Project Facilitation",
          desc: "Seamless coordination across site access, resource allocation, and field interfaces to maintain progress.",
        },
        {
          title: "Quality Assurance (QA/QC)",
          desc: "Audited management regimes certified under ISO 9001:2015 standards.",
        },
        {
          title: "Safety Compliance (HSE)",
          desc: "Rigorous ISO 45001:2018 health and safety protocols prioritizing workforce welfare and hazard prevention.",
        },
        {
          title: "Timely Delivery",
          desc: "Structured mobilization frameworks that safeguard critical-path milestones and prevent expensive delays.",
        },
        {
          title: "Environmental Care",
          desc: "ISO 14001:2015 environmental management systems, resource efficiency, and site protection.",
        },
      ],
      disclaimer:
        "Note: Aevoryn operates as an integrated contracting and infrastructure support services provider. We work in direct partnership with principal contractors and developers; we do not claim unconfirmed EPC or principal contractor status.",
    },
    whyChoose: {
      badge: "Proven Strengths",
      headline: "Why Choose Aevoryn",
      subheadline:
        "Eight core institutional advantages that make Aevoryn the preferred infrastructure partner across Saudi Arabia.",
      items: [
        {
          title: "Integrated Service Capability",
          desc: "Combining materials, manpower, heavy machinery, and project support under a single reliable point of accountability.",
        },
        {
          title: "Operational Reliability",
          desc: "Consistently delivering on contractual commitments with proven mobilization speed and contingency preparedness.",
        },
        {
          title: "Safety-First Culture",
          desc: "Embedded ISO 45001 standards where workforce safety and environmental protection supersede operational pressures.",
        },
        {
          title: "Scalable Workforce Solutions",
          desc: "Dynamic recruitment channels capable of mobilizing qualified personnel to industrial locations.",
        },
        {
          title: "Quality-Controlled Supply Chain",
          desc: "Direct partnerships with verified quarries and certified manufacturers ensure compliance with specifications.",
        },
        {
          title: "Well-Maintained Equipment",
          desc: "Preventive maintenance schedules and regular safety inspections minimize site downtime.",
        },
        {
          title: "Experienced Management & Supervision",
          desc: "Field leadership with cumulative infrastructure and civil construction experience.",
        },
        {
          title: "Commitment to Client Satisfaction",
          desc: "Long-term relationship ethos based on commercial transparency, open communication, and proactive execution.",
        },
      ],
    },
    certifications: {
      badge: "Accreditations & Compliance",
      headline: "International Quality & Safety Certifications",
      subheadline:
        "Our operations are governed by internationally audited management systems certified under ISO standards by Vatsin Certification Private Limited.",
      initialRegistration: `Initial Registration: ${getVerified(isoCertificationFacts.issueDate)}`,
      expiryDate: `Valid Through: ${getVerified(isoCertificationFacts.expiryDate)}`,
      body: `Certification Body: ${getVerified(isoCertificationFacts.registrar)} (${getVerified(isoCertificationFacts.accreditationBody)})`,
      viewDoc: "Inspect Official Certificate",
      downloadPdf: "View Verification Details",
      disclaimer:
        "Verification Notice: Certificates are issued to Aevoryn Services & Contracting Co. for its registered facility in Baish, Jizan Region. Registration and validity are publicly verifiable via the accredited certification body.",
      items: [
        {
          id: "iso-45001",
          code: isoCertificationFacts.iso45001.value.standard,
          title: isoCertificationFacts.iso45001.value.titleEn,
          certNo: isoCertificationFacts.iso45001.value.certificateNumber,
          desc: "Audited management system ensuring strict workplace safety, risk mitigation, and occupational health governance across all contracting activities.",
          scope: sharedIsoScopeEn,
          icon: "ShieldAlert",
        },
        {
          id: "iso-9001",
          code: isoCertificationFacts.iso9001.value.standard,
          title: isoCertificationFacts.iso9001.value.titleEn,
          certNo: isoCertificationFacts.iso9001.value.certificateNumber,
          desc: "Audited quality management framework governing operational coordination, materials supply, and service delivery consistency.",
          scope: sharedIsoScopeEn,
          icon: "Award",
        },
        {
          id: "iso-14001",
          code: isoCertificationFacts.iso14001.value.standard,
          title: isoCertificationFacts.iso14001.value.titleEn,
          certNo: isoCertificationFacts.iso14001.value.certificateNumber,
          desc: "Audited environmental management framework confirming responsible resource consumption and ecological protection across operational sites.",
          scope: sharedIsoScopeEn,
          icon: "Leaf",
        },
      ],
    },
    aramco: {
      badge: "Vendor Registration",
      headline: "Saudi Aramco Supplier Registration",
      officialStatement: "Registered in the Saudi Aramco Supplier Management System.",
      desc:
        "Aevoryn Services & Contracting Co. is officially registered in the Saudi Aramco Supplier Management System as a Service Provider.",
      details: {
        vendorCode: getVerified(aramcoFacts.vendorCode),
        vendorCodeLabel: "Vendor Code",
        eRef: getVerified(aramcoFacts.eReference),
        eRefLabel: "E-Reference Number",
        cr: getVerified(legalIdentityFacts.crNumber),
        crLabel: "Commercial Registration (CR)",
        date: getVerified(aramcoFacts.registrationDate),
        dateLabel: "Registration Letter Date",
        supplierType: getVerified(aramcoFacts.supplierType),
        supplierTypeLabel: "Registered Supplier Classification",
      },
      disclaimer: getVerified(aramcoFacts.mandatoryDisclaimerEn),
      cta: "Verify Registration Credentials",
    },
    clients: {
      badge: "Industry Collaboration",
      headline: "Clients & Strategic Collaborations",
      subheadline:
        "Aevoryn has provided contracting support and resources to leading organizations across the Kingdom.",
      note: "Client names reflect project collaborations and service engagements. Trademarks belong to their respective corporate entities.",
      partners: clientFacts.verifiedList.map((client) => ({
        name: client.nameEn,
      })),
    },
    values: {
      badge: "Guiding Principles",
      headline: "Vision, Mission & Core Values",
      visionTitle: "Our Vision",
      visionText: getVerified(corporateStatements.visionEn),
      missionTitle: "Our Mission",
      missionText: getVerified(corporateStatements.missionEn),
      valuesTitle: "Our Six Core Values",
      items: getVerified(corporateStatements.coreValuesEn).map((val) => ({
        title: val,
        desc: "Institutional principle guiding daily operations and client partnership.",
      })),
    },
    ctaSection: {
      headline: "Let's Build Better Together.",
      subheadline:
        "Whether you require immediate heavy equipment deployment, certified industrial manpower, or reliable construction material supply in Saudi Arabia, Aevoryn is ready to mobilize.",
      contactBtn: "Contact Our Management",
      rfqBtn: "Request a Project Quotation",
    },
    footer: {
      aboutText:
        "Aevoryn Services & Contracting Co. is a Saudi corporate provider of integrated contracting support, compliant manpower, quality construction materials, and heavy equipment fleets.",
      quickLinks: "Quick Navigation",
      divisions: "Core Capabilities",
      governance: "Compliance & Legal",
      headquarters: "Registered Office",
      rights: "All rights reserved. Aevoryn Services & Contracting Co.",
      crNotice: `Commercial Registration No. ${getVerified(legalIdentityFacts.crNumber)} | Kingdom of Saudi Arabia`,
    },
    contactPage: {
      title: "Contact Aevoryn",
      subtitle: "Connect with our management, estimation, and project mobilization teams.",
      formTitle: "Submit a Business Inquiry / RFQ",
      fullName: "Full Name",
      companyName: "Company / Organization",
      email: "Business Email",
      phone: "Phone Number",
      division: "Primary Division of Interest",
      divisionPlaceholder: "Select Division",
      message: "Project Details / Scope of Requirement",
      submit: "Send Official Inquiry",
      submitting: "Transmitting...",
      success: "Thank you. Your inquiry has been logged. Our commercial team will contact you within 24 hours.",
      officesTitle: "Corporate Locations",
      baishTitle: "Registered Legal Office",
      baishAddress: registeredAddress.fullAddressEn,
      adminVerification: "Official registered legal address recorded on commercial registration and ISO certifications.",
      directContacts: "Direct Communications",
    },
  },

  ar: {
    brand: {
      name: getVerified(legalIdentityFacts.legalNameAr),
      shortName: getVerified(legalIdentityFacts.tradeNameAr),
      tagline: "بناء البنية التحتية. تمكين التقدم.",
      cr: `سجل تجاري: ${getVerified(legalIdentityFacts.crNumber)}`,
      address: registeredAddress.fullAddressAr,
      phone: verifiedPhone,
      emailChairman: verifiedChairmanEmail,
      emailAdmin: verifiedAdminEmail,
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      capabilities: "قدراتنا وخدماتنا",
      infrastructure: divisionFacts.list[0].titleAr,
      manpower: divisionFacts.list[1].titleAr,
      materials: divisionFacts.list[2].titleAr,
      equipment: divisionFacts.list[3].titleAr,
      qhse: "الجودة والسلامة والبيئة",
      certifications: "الشهادات والاعتمادات",
      aramco: "تسجيل أرامكو السعودية",
      clients: "العملاء والشركاء",
      contact: "اتصل بنا",
      documents: "وثائق الشركة",
      supplierRegistration: "تسجيل الموردين",
      requestConsultation: "طلب استشارة ومقايسة",
      langSwitch: "English",
    },
    hero: {
      badge: "دعم مشاريع البنية التحتية والمقاولات في المملكة العربية السعودية",
      headline: "بناء البنية التحتية. تمكين التقدم.",
      subheadline:
        "تقدم شركة ايفورين للخدمات والمقاولات حلول دعم متكاملة من خلال قوى عاملة متوافقة، ومواد بناء عالية الجودة، وأساطيل معدات ثقيلة، ودعم احترافي لتطوير المشاريع عبر كافة مناطق المملكة.",
      exploreBtn: "استكشف قدراتنا التشغيلية",
      contactBtn: "تواصل مع فريقنا",
      consultationBtn: "طلب استشارة ومقايسة",
      stats: {
        aramco: "أرامكو السعودية",
        aramcoSub: `رمز المورد: ${getVerified(aramcoFacts.vendorCode)}`,
        divisions: `${divisionFacts.divisionsCount} قطاعات رئيسية`,
        divisionsSub: "دعم مقاولات متكامل",
        iso: "شهادات آيزو ثلاثية",
        isoSub: "9001 / 14001 / 45001",
        qhse: "التزام الجودة والسلامة",
        qhseSub: "السلامة والامتثال",
      },
    },
    intro: {
      badge: "نبذة عن الشركة",
      headline: "شريككم الموثوق في دعم البنية التحتية",
      leadText:
        "تعد شركة ايفورين للخدمات والمقاولات مزوداً وطنياً متخصصاً للحلول الصناعية ودعم المقاولين الرئيسيين والمطورين ومشاريع البنية التحتية في المملكة العربية السعودية.",
      paragraph1:
        "تماشياً مع مستهدفات رؤية السعودية 2030، تدعم ايفورين تنفيذ المشاريع من خلال تقديم خدمات ميدانية موثوقة، وتوفير كوادر بشرية مؤهلة، وتوريد مواد بناء مطابقة للمواصفات، وتوفير معدات وآليات ثقيلة.",
      paragraph2:
        "إن مرونتنا التشغيلية، ومعرفتنا العميقة بمتطلبات السوق المحلي، والتزامنا الصارم بمعايير الجودة والسلامة والبيئة، تضمن لشركائنا إنجاز المشاريع بكفاءة وموثوقية عالية.",
      readMore: "تعرف على هيكلنا الإداري وحوكمتنا",
      highlights: [
        { label: "انتشار تشغيلي واسع", desc: "جاهزية تشغيلية لتغطية مشاريع مختلف مناطق المملكة." },
        { label: "امتثال تنظيمي صارم", desc: "التزام كامل بأنظمة العمل السعودية ومعايير الجودة والسلامة." },
        { label: "نموذج خدمات متكامل", desc: "شريك واحد يوفر المواد والعمالة والدعم اللوجستي والمعدات بتناغم تام." },
      ],
    },
    capabilities: {
      badge: "القطاعات الرئيسية",
      headline: "أربع قدرات متكاملة لدعم البنية التحتية",
      subheadline:
        "نقدم باقة منسقة من خدمات دعم المقاولات المصممة خصيصاً لتيسير أعمال المواقع وتسريع وتيرة إنجاز المشاريع الإنشائية والصناعية.",
      viewDetails: "تفاصيل نطاق الخدمة",
      items: [
        {
          id: "infrastructure",
          title: divisionFacts.list[0].titleAr,
          subtitle: "التنسيق التشغيلي والدعم الميداني",
          desc: divisionFacts.list[0].scopeSummaryAr,
          features: [...divisionFacts.list[0].verbatimBulletsAr],
          image: "/images/content/infrastructure.jpg",
          link: divisionFacts.list[0].route,
        },
        {
          id: "manpower",
          title: divisionFacts.list[1].titleAr,
          subtitle: "حلول القوى العاملة المتوافقة",
          desc: divisionFacts.list[1].scopeSummaryAr,
          features: [...divisionFacts.list[1].verbatimBulletsAr],
          image: "/images/content/manpower.jpg",
          link: divisionFacts.list[1].route,
        },
        {
          id: "materials",
          title: divisionFacts.list[2].titleAr,
          subtitle: "توريد موثوق وتسليم للموقع",
          desc: divisionFacts.list[2].scopeSummaryAr,
          features: [...divisionFacts.list[2].verbatimBulletsAr],
          image: "/images/content/materials.jpg",
          link: divisionFacts.list[2].route,
        },
        {
          id: "equipment",
          title: divisionFacts.list[3].titleAr,
          subtitle: "معدات ثقيلة ورافعات",
          desc: divisionFacts.list[3].scopeSummaryAr,
          features: [...divisionFacts.list[3].verbatimBulletsAr],
          image: "/images/content/equipment.jpg",
          link: divisionFacts.list[3].route,
        },
      ],
    },
    projectSupport: {
      badge: "التميز التشغيلي",
      headline: "دعم تطوير المشاريع والحوكمة الميدانية",
      subheadline:
        "تعزز ايفورين قدرات فرق إدارة المشاريع عبر تنفيذ الدعم التشغيلي الحرج بتناغم مع المقاولين والجهات المطورة.",
      pillars: [
        {
          title: "التنسيق التشغيلي",
          desc: "تزامن دقيق بين عمليات التوريد، واللوجستيات الميدانية، وجداول الإنتاج اليومية في الموقع.",
        },
        {
          title: "الدعم الفني والميداني",
          desc: "معالجة التحديات الميدانية، وتيسير طرق التنفيذ تحت إشراف كوادر ذات خبرة.",
        },
        {
          title: "تسهيل أعمال المشاريع",
          desc: "تنسيق متكامل لمسارات العمل وتوزيع الموارد لضمان سير المشاريع بسلاسة.",
        },
        {
          title: "ضمان الجودة (QA/QC)",
          desc: "تطبيق أنظمة فحص وفق متطلبات إدارة الجودة المعتمدة بموجب ISO 9001:2015.",
        },
        {
          title: "الامتثال للسلامة والصحة المهنية",
          desc: "إجراءات صارمة بموجب ISO 45001:2018 واجتماعات دورية للحد من المخاطر.",
        },
        {
          title: "دقة الالتزام بالمواعيد",
          desc: "أطر عمل مرنة وحشد منظم يحمي الجداول الزمنية للمشاريع.",
        },
        {
          title: "الممارسات البيئية المستدامة",
          desc: "التزام بمعايير ISO 14001:2015 لإدارة وحماية البيئة المحيطة بالمواقع.",
        },
      ],
      disclaimer:
        "إشعار تنظيمي: تعمل شركة ايفورين كمزود متكامل لخدمات المقاولات ودعم المشاريع بالشراكة مع المقاولين الرئيسيين والمطورين، ولا تدعي صفة مقاول رئيسي (EPC) دون تكليف رسمي مثبت.",
    },
    whyChoose: {
      badge: "نقاط القوة المؤسسية",
      headline: "لماذا تختار ايفورين؟",
      subheadline:
        "ثماني مزايا تنافسية رئيسية تجعل من شركة ايفورين الشريك المفضل لدعم مشاريع البنية التحتية في المملكة.",
      items: [
        {
          title: "قدرات خدمية متكاملة",
          desc: "دمج توريد المواد والعمالة المؤهلة والآليات ودعم المشاريع تحت مظلة واحدة ذات مسؤولية موحدة.",
        },
        {
          title: "الموثوقية التشغيلية",
          desc: "التزام راسخ بالعقود والمواعيد مع جاهزية وسرعة استجابة وخطط تشغيلية مدروسة.",
        },
        {
          title: "ثقافة السلامة أولاً",
          desc: "تطبيق معايير ISO 45001 الدولية حيث تأتي سلامة الكوادر وحماية البيئة في صدارة الأولويات.",
        },
        {
          title: "حلول قوى عاملة مرنة",
          desc: "قنوات استقطاب ديناميكية قادرة على توفير وتوزيع الكوادر الفنية والمهنية للمشاريع.",
        },
        {
          title: "سلسلة توريد خاضعة لرقابة الجودة",
          desc: "شراكات مع موردين ومصنعين معتمدين تضمن توريد مواد مطابقة تماماً للمواصفات المطلوبة.",
        },
        {
          title: "معدات وآليات بحالة تشغيلية ممتازة",
          desc: "برامج صيانة وقائية دورية وفحوصات سلامة تضمن كفاءة المعدات واستمرارية العمل.",
        },
        {
          title: "إدارة وإشراف بخبرات عريقة",
          desc: "قيادات ميدانية تمتلك خبرات متراكمة في قطاعات البنية التحتية والإنشاءات الصناعية.",
        },
        {
          title: "الالتزام برضا العملاء",
          desc: "نهج علاقات قائم على النزاهة والشفافية التامة والتنفيذ الاستباقي للالتزامات.",
        },
      ],
    },
    certifications: {
      badge: "الاعتمادات والتراخيص",
      headline: "شهادات الجودة والسلامة والبيئة الدولية (ISO)",
      subheadline:
        "تخضع عملياتنا التشغيلية لأنظمة إدارة مدققة دولياً وممنوحة بموجب معايير الآيزو من هيئة Vatsin Certification Private Limited.",
      initialRegistration: `تاريخ التسجيل الأولي: ${getVerified(isoCertificationFacts.issueDate)}`,
      expiryDate: `صالحة حتى: ${getVerified(isoCertificationFacts.expiryDate)}`,
      body: `جهة المنح والاعتماد: ${getVerified(isoCertificationFacts.registrar)} (${getVerified(isoCertificationFacts.accreditationBody)})`,
      viewDoc: "معاينة الوثيقة الرسمية",
      downloadPdf: "بيانات التحقق الرسمية",
      disclaimer:
        "إفصاح إداري: الشهادات صادرة لشركة ايفورين للخدمات والمقاولات لمنشأتها المسجلة في بيش بمنطقة جازان. بيانات التحقق والتسجيل متاحة للتحقق المباشر لدى جهة الاعتماد.",
      items: [
        {
          id: "iso-45001",
          code: isoCertificationFacts.iso45001.value.standard,
          title: isoCertificationFacts.iso45001.value.titleAr,
          certNo: isoCertificationFacts.iso45001.value.certificateNumber,
          desc: "نظام إدارة موثق يضمن معايير السلامة المهنية، وإدارة المخاطر في كافة أنشطة وعمليات المقاولات.",
          scope: sharedIsoScopeAr,
          icon: "ShieldAlert",
        },
        {
          id: "iso-9001",
          code: isoCertificationFacts.iso9001.value.standard,
          title: isoCertificationFacts.iso9001.value.titleAr,
          certNo: isoCertificationFacts.iso9001.value.certificateNumber,
          desc: "إطار إدارة الجودة المعتمد الذي يحكم التنسيق التشغيلي وتوريد المواد والخدمات بكفاءة مستمرة.",
          scope: sharedIsoScopeAr,
          icon: "Award",
        },
        {
          id: "iso-14001",
          code: isoCertificationFacts.iso14001.value.standard,
          title: isoCertificationFacts.iso14001.value.titleAr,
          certNo: isoCertificationFacts.iso14001.value.certificateNumber,
          desc: "نظام الإدارة البيئية المعتمد لضمان حماية البيئة والاستخدام المسؤول للموارد في المواقع التشغيلية.",
          scope: sharedIsoScopeAr,
          icon: "Leaf",
        },
      ],
    },
    aramco: {
      badge: "تسجيل الموردين",
      headline: "تسجيل الموردين لدى أرامكو السعودية",
      officialStatement: "مسجلة في نظام إدارة الموردين لدى أرامكو السعودية كمزود خدمات.",
      desc:
        "تم تسجيل شركة ايفورين للخدمات والمقاولات رسمياً في نظام إدارة الموردين لدى أرامكو السعودية كمزود خدمات.",
      details: {
        vendorCode: getVerified(aramcoFacts.vendorCode),
        vendorCodeLabel: "رمز المورد (Vendor Code)",
        eRef: getVerified(aramcoFacts.eReference),
        eRefLabel: "الرقم المرجعي الإلكتروني (E-Ref)",
        cr: getVerified(legalIdentityFacts.crNumber),
        crLabel: "رقم السجل التجاري",
        date: getVerified(aramcoFacts.registrationDate),
        dateLabel: "تاريخ خطاب التسجيل",
        supplierType: getVerified(aramcoFacts.supplierType),
        supplierTypeLabel: "تصنيف المورد المعتمد",
      },
      disclaimer: getVerified(aramcoFacts.mandatoryDisclaimerAr),
      cta: "التحقق من بيانات التسجيل",
    },
    clients: {
      badge: "التعاون والشراكات",
      headline: "العملاء والشراكات",
      subheadline:
        "قدمت ايفورين خدمات الدعم والمقاولات لعدد من الشركات والجهات البارزة في المملكة.",
      note: "الأسماء تمثل مشاريع وتعاملات تشغيلية، وتعود كافة العلامات التجارية لمالكيها.",
      partners: clientFacts.verifiedList.map((client) => ({
        name: client.nameAr,
      })),
    },
    values: {
      badge: "المبادئ التوجيهية",
      headline: "الرؤية والرسالة والقيم الجوهرية",
      visionTitle: "رؤيتنا",
      visionText: getVerified(corporateStatements.visionAr),
      missionTitle: "رسالتنا",
      missionText: getVerified(corporateStatements.missionAr),
      valuesTitle: "قيمنا الجوهرية الست",
      items: getVerified(corporateStatements.coreValuesAr).map((val) => ({
        title: val,
        desc: "مبدأ مؤسسي يوجه الأداء اليومي وخدمة العملاء.",
      })),
    },
    ctaSection: {
      headline: "معاً نبني مستقبلاً أقوى وأكثر استدامة.",
      subheadline:
        "سواء كنتم بحاجة إلى حشد الآليات والمعدات، أو توفير كوادر فنية متوافقة، أو توريد مواد بناء مطابقة للمواصفات، فإن فريق ايفورين مستعد للعمل.",
      contactBtn: "تواصل مع الإدارة",
      rfqBtn: "طلب عرض سعر ومقايسة",
    },
    footer: {
      aboutText:
        "شركة ايفورين للخدمات والمقاولات شركة سعودية متخصصة في تقديم حلول الدعم للمقاولات، والقوى العاملة، وتوريد مواد البناء والمعدات.",
      quickLinks: "روابط سريعة",
      divisions: "القطاعات والخدمات",
      governance: "الحوكمة والامتثال",
      headquarters: "المقر المسجل",
      rights: "جميع الحقوق محفوظة. شركة ايفورين للخدمات والمقاولات.",
      crNotice: `سجل تجاري رقم ${getVerified(legalIdentityFacts.crNumber)} | المملكة العربية السعودية`,
    },
    contactPage: {
      title: "اتصل بشركة ايفورين",
      subtitle: "تواصل مباشرة مع فرق الإدارة والتسعير والحشد التشغيلي لمشاريعك.",
      formTitle: "إرسال استفسار تجاري / طلب عرض سعر (RFQ)",
      fullName: "الاسم الكامل",
      companyName: "اسم الشركة / المنظمة",
      email: "البريد الإلكتروني للعمل",
      phone: "رقم الهاتف / الجوال",
      division: "القطاع الرئيسي المطلوب",
      divisionPlaceholder: "اختر القطاع المعني",
      message: "تفاصيل ونطاق المشروع والاحتياجات",
      submit: "إرسال الطلب الرسمي",
      submitting: "جاري الإرسال...",
      success: "شكراً لتواصلكم. تم تسجيل استفساركم بنجاح، وسيتواصل معكم فريقنا التجاري خلال 24 ساعة.",
      officesTitle: "المواقع والمرافق الرسمية",
      baishTitle: "المقر القانوني المسجل",
      baishAddress: registeredAddress.fullAddressAr,
      adminVerification: "المقر القانوني الرسمي المسجل في السجل التجاري وشهادات الآيزو المعتمدة.",
      directContacts: "قنوات الاتصال المباشرة",
    },
  },
};
