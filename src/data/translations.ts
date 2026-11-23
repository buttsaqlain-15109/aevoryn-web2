export type TranslationKey = string;

export const translations = {
  en: {
    brand: {
      name: "Aevoryn Services & Contracting Co.",
      shortName: "Aevoryn",
      tagline: "Building Infrastructure. Enabling Progress.",
      cr: "CR No. 7054401679",
      address: "Alahsa Street, Almalaz, Riyadh 11543, Saudi Arabia",
      baishNote: "Administrative Note: ISO documentation references an operational facility in Baish, Jizan Region. Riyadh serves as the confirmed corporate management headquarters.",
      phone: "+966 1732 29527",
      emailCeo: "ceo@aevoryn.net",
      emailChairman: "chairman@aevoryn.net",
      emailAdmin: "admin@aevoryn.net",
    },
    nav: {
      home: "Home",
      about: "About Us",
      capabilities: "Capabilities",
      infrastructure: "Infrastructure & Project Support",
      manpower: "Manpower Supply",
      materials: "Construction Materials",
      equipment: "Equipment Supply & Rental",
      qhse: "QHSE & Safety",
      certifications: "Certifications",
      aramco: "Saudi Aramco Registration",
      clients: "Clients & Partners",
      contact: "Contact Us",
      requestConsultation: "Request Consultation",
      langSwitch: "العربية",
    },
    hero: {
      badge: "Saudi Arabia Infrastructure & Contracting Support",
      headline: "Building Infrastructure. Enabling Progress.",
      subheadline:
        "Aevoryn Services & Contracting Co. delivers integrated infrastructure support solutions through certified manpower, quality construction materials, heavy equipment fleets, and professional project development support across the Kingdom.",
      exploreBtn: "Explore Our Capabilities",
      contactBtn: "Contact Our Team",
      consultationBtn: "Request a Consultation",
      stats: {
        aramco: "Saudi Aramco",
        aramcoSub: "Vendor Code: 10120422",
        divisions: "4 Core Divisions",
        divisionsSub: "Integrated Contracting Support",
        iso: "Triple ISO Certified",
        isoSub: "9001 / 14001 / 45001",
        qhse: "100% Quality & Safety",
        qhseSub: "Zero-Harm Culture",
      },
    },
    intro: {
      badge: "Corporate Profile",
      headline: "Your Partner in Infrastructure Support",
      leadText:
        "Headquartered in Riyadh, Aevoryn Services & Contracting Co. stands as a dedicated industrial solutions provider supporting primary contractors, industrial developers, and infrastructure projects throughout Saudi Arabia.",
      paragraph1:
        "In alignment with Saudi Vision 2030, Aevoryn bridges critical project delivery gaps by providing dependable field execution, compliant manpower mobilization, precision construction materials, and heavy plant machinery.",
      paragraph2:
        "Our operational agility, deep local knowledge, and uncompromising QHSE protocols ensure that our partners execute complex industrial and infrastructure developments on schedule, safely, and within budget.",
      readMore: "Learn More About Our Governance",
      highlights: [
        { label: "Kingdom-Wide Deployment", desc: "Operational capabilities across Riyadh, Eastern, and Southern Provinces." },
        { label: "Rigorous Regulatory Compliance", desc: "Full adherence to Saudi labor regulations, Aramco standards, and SASO." },
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
          title: "Infrastructure & Project Support",
          subtitle: "Civil & Industrial Site Development",
          desc: "Comprehensive operational coordination, earthworks, foundations, site logistics, and specialized engineering support for large-scale developments.",
          features: [
            "Site clearance, bulk grading & deep excavation",
            "Underground utility trenching & backfilling",
            "QA/QC field inspection & testing coordination",
            "Subcontractor scheduling & milestone tracking",
          ],
          image: "/images/content/infrastructure.jpg",
          link: "/capabilities/infrastructure",
        },
        {
          id: "manpower",
          title: "Manpower Supply",
          subtitle: "Certified Technical & Field Workforce",
          desc: "Scalable recruitment and rapid deployment of certified multi-disciplinary professionals, engineers, safety inspectors, and skilled craftsmen.",
          features: [
            "Aramco-certified safety officers & QC inspectors",
            "Civil, mechanical & electrical engineers",
            "Certified heavy equipment operators & riggers",
            "Full labor law compliance & turnkey site welfare",
          ],
          image: "/images/content/manpower.jpg",
          link: "/capabilities/manpower",
        },
        {
          id: "materials",
          title: "Construction Materials Supply",
          subtitle: "Quality-Controlled Raw & Finished Materials",
          desc: "Dependable procurement and delivery of high-specification construction materials verified against SASO, ASTM, and client specifications.",
          features: [
            "Aggregates, road base & structural fill",
            "Rebar, structural steel & architectural metals",
            "Piping, valves, fittings & drainage systems",
            "Geotextiles, membrane barriers & site PPE",
          ],
          image: "/images/content/materials.jpg",
          link: "/capabilities/materials",
        },
        {
          id: "equipment",
          title: "Equipment Supply & Rental",
          subtitle: "Heavy Machinery & Transport Fleets",
          desc: "Modern, rigorously inspected fleet of heavy earthmovers, mobile cranes, material handlers, and power generation units with certified operators.",
          features: [
            "Excavators, wheel loaders & dozers",
            "Mobile telescopic cranes & boom trucks",
            "Compactors, rollers & asphalt equipment",
            "Generators, air compressors & lighting towers",
          ],
          image: "/images/content/equipment.jpg",
          link: "/capabilities/equipment",
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
          title: "Technical & Field Support",
          desc: "On-site troubleshooting, methodology optimization, and practical problem resolution by experienced supervisors.",
        },
        {
          title: "Quality Assurance (QA/QC)",
          desc: "Rigorous ISO 9001:2015 inspection regimes, material mill test verification, and documentation archiving.",
        },
        {
          title: "Safety Compliance (HSE)",
          desc: "Zero-compromise ISO 45001:2018 protocols, daily toolbox talks, task risk assessments, and proactive hazard prevention.",
        },
        {
          title: "Timely Execution",
          desc: "Rapid response mobilization frameworks that safeguard critical-path milestones and prevent expensive delays.",
        },
        {
          title: "Cost Control & Efficiency",
          desc: "Transparent commercial models, competitive unit rates, and waste-reduction procedures to optimize project budgets.",
        },
        {
          title: "Sustainable Practices",
          desc: "ISO 14001:2015 environmental stewardship, dust suppression, waste segregation, and resource efficiency.",
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
          desc: "Combining materials, manpower, heavy machinery, and civil support under a single reliable point of accountability.",
        },
        {
          title: "Operational Reliability",
          desc: "Consistently delivering on contractual commitments with proven mobilization speed and contingency preparedness.",
        },
        {
          title: "Safety-First Culture",
          desc: "Embedded ISO 45001 standards where workforce safety and environmental protection supersede all operational pressures.",
        },
        {
          title: "Scalable Workforce Solutions",
          desc: "Dynamic recruitment channels capable of mobilizing tens to hundreds of qualified technicians to remote locations.",
        },
        {
          title: "Quality-Controlled Supply Chain",
          desc: "Direct partnerships with verified quarries, steel fabricators, and certified manufacturers ensure zero material rejections.",
        },
        {
          title: "Well-Maintained Equipment",
          desc: "Preventive maintenance schedules, modern telematics, and regular third-party inspections minimize site downtime.",
        },
        {
          title: "Experienced Management & Supervision",
          desc: "Field leadership with decades of cumulative infrastructure, petrochemical, and civil construction experience.",
        },
        {
          title: "Commitment to Client Satisfaction",
          desc: "Long-term relationship ethos based on commercial transparency, open communication, and proactive problem solving.",
        },
      ],
    },
    certifications: {
      badge: "Accreditations & Compliance",
      headline: "International Quality & Safety Certifications",
      subheadline:
        "Our operations are governed by internationally audited management systems certified under ISO standards by Vatsin Certification Private Limited.",
      initialRegistration: "Initial Registration: 04 August 2026",
      expiryDate: "Valid Through: 03 August 2029",
      body: "Certification Body: Vatsin Certification Private Limited",
      viewDoc: "Inspect Official Certificate",
      downloadPdf: "Download Certificate (PDF)",
      disclaimer:
        "Verification Notice: The certificates displayed below are authentic credentials issued to Aevoryn Services & Contracting Co. Please note that original certificates display the operational facility located in Baish, Jizan Region. Corporate headquarters in Riyadh manage administrative operations.",
      items: [
        {
          id: "iso-45001",
          code: "ISO 45001:2018",
          title: "Occupational Health & Safety Management System",
          certNo: "VC23032689",
          desc: "Certifies that Aevoryn maintains strict hazard identification, risk assessment, and incident prevention protocols across all contracting sites and workforce operations.",
          scope: "Provision of Contracting, Infrastructure Support, Manpower, Materials, and Heavy Equipment Services.",
          icon: "ShieldAlert",
          status: "Active & Verified",
        },
        {
          id: "iso-9001",
          code: "ISO 9001:2015",
          title: "Quality Management System",
          certNo: "VC23018822",
          desc: "Validates our structured quality assurance framework covering materials procurement, field execution, subcontractor coordination, and continuous improvement.",
          scope: "Provision of Civil Contracting, Infrastructure Development Support, Industrial Manpower Supply, Material Trading, and Equipment Rental.",
          icon: "Award",
          status: "Active & Verified",
        },
        {
          id: "iso-14001",
          code: "ISO 14001:2015",
          title: "Environmental Management System",
          certNo: "VC23022982",
          desc: "Confirms proactive environmental protection, waste reduction, ecological risk mitigation, and sustainable resource utilization across all operational footprints.",
          scope: "Environmental Management for Construction Support, Material Handling, and Site Operations.",
          icon: "Leaf",
          status: "Active & Verified",
        },
      ],
    },
    aramco: {
      badge: "Strategic Registration",
      headline: "Saudi Aramco Supplier Registration",
      officialStatement: "Registered in the Saudi Aramco Supplier Management System.",
      desc:
        "Aevoryn Services & Contracting Co. is officially registered in the Saudi Aramco Supplier Management System, demonstrating our organizational compliance, fiscal validity, and adherence to premier Saudi industrial standards.",
      details: {
        vendorCode: "10120422",
        vendorCodeLabel: "Vendor Code",
        eRef: "0019448",
        eRefLabel: "E-Reference Number",
        cr: "7054401679",
        crLabel: "Commercial Registration (CR)",
        date: "28 July 2026",
        dateLabel: "Registration Letter Date",
        supplierType: "Service Provider Only",
        supplierTypeLabel: "Registered Supplier Classification",
      },
      disclaimer:
        "Mandatory Regulatory Disclaimer: Registration in the Saudi Aramco Supplier Management System indicates verified vendor prequalification status. Registration does not constitute an endorsement, guarantee of procurement, or contract award. Material supplier approval status is under administrative verification and subject to separate qualification documentation.",
      cta: "Verify Registration Credentials",
    },
    clients: {
      badge: "Industry Collaboration",
      headline: "Clients & Strategic Partnerships",
      subheadline:
        "Aevoryn has supported premier general contractors, industrial groups, and developers in their infrastructure delivery commitments.",
      note: "Corporate names represent project collaborations and service interactions. Logos and trademarks belong to their respective registered entities.",
      partners: [
        {
          name: "Alfanar",
          category: "Energy & Infrastructure",
          scope: "Manpower & civil infrastructure project support",
        },
        {
          name: "Masco Group",
          category: "Heavy Civil Contracting",
          scope: "Earthmoving equipment supply and materials logistics",
        },
        {
          name: "Aldsfey",
          category: "General Contracting",
          scope: "Specialized labor deployment and site facilitation",
        },
        {
          name: "Tamimi Global",
          category: "Industrial Services & Catering",
          scope: "Site support logistics and camp mobilization",
        },
        {
          name: "China Harbour (CHEC)",
          category: "Marine & Infrastructure EPC",
          scope: "Construction material supply and heavy machinery rental",
        },
      ],
    },
    values: {
      badge: "Guiding Principles",
      headline: "Vision, Mission & Core Values",
      visionTitle: "Our Vision",
      visionText:
        "To be recognized as the premier infrastructure and contracting support partner in Saudi Arabia, setting the benchmark for operational reliability, workforce safety, and project velocity in support of Saudi Vision 2030.",
      missionTitle: "Our Mission",
      missionText:
        "To empower contractors and industrial developers by delivering turnkey manpower, quality-verified construction materials, advanced equipment, and dependable field coordination with zero compromise on safety and ethics.",
      valuesTitle: "Our Six Core Values",
      items: [
        { title: "Quality", desc: "Rigorous standards in every material supplied and every tradesperson deployed." },
        { title: "Integrity", desc: "Uncompromising honesty, transparent commercial terms, and ethical execution." },
        { title: "Innovation", desc: "Modern logistical systems, telematics tracking, and agile operational methodologies." },
        { title: "Safety", desc: "An institutional commitment to zero incidents and the protection of every worker." },
        { title: "Sustainability", desc: "Responsible resource consumption and strict adherence to environmental regulations." },
        { title: "Client Satisfaction", desc: "Fostering long-term partnerships through responsiveness and consistent performance." },
      ],
    },
    ctaSection: {
      headline: "Let's Build Better Together.",
      subheadline:
        "Whether you require immediate heavy equipment deployment, certified industrial manpower, or reliable construction material supply in Saudi Arabia, Aevoryn is ready to mobilize.",
      contactBtn: "Contact Our Headquarters",
      rfqBtn: "Request a Project Quotation",
    },
    footer: {
      aboutText:
        "Aevoryn Services & Contracting Co. is a Saudi corporate provider of integrated contracting support, certified manpower, quality construction materials, and heavy equipment fleets.",
      quickLinks: "Quick Navigation",
      divisions: "Core Capabilities",
      governance: "Compliance & Legal",
      headquarters: "Corporate Headquarters",
      rights: "All rights reserved. Aevoryn Services & Contracting Co.",
      crNotice: "Commercial Registration No. 7054401679 | Kingdom of Saudi Arabia",
    },
    contactPage: {
      title: "Contact Aevoryn",
      subtitle: "Connect with our corporate management, project estimation, and mobilization teams.",
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
      riyadhTitle: "Riyadh Corporate Headquarters",
      riyadhAddress: "Alahsa Street, Almalaz, Riyadh 11543, Kingdom of Saudi Arabia",
      baishTitle: "Southern Operations & Logistics Facility",
      baishAddress: "Baish Industrial & Support Hub, Jizan Region, Saudi Arabia",
      adminVerification: "Administrative verification note: The Baish facility is listed on the company ISO certifications as the certified operational site.",
      directContacts: "Direct Communications",
    },
  },

  ar: {
    brand: {
      name: "شركة إيفورين للخدمات والمقاولات",
      shortName: "إيفورين",
      tagline: "بناء البنية التحتية. تمكين التقدم.",
      cr: "سجل تجاري: 7054401679",
      address: "شارع الأحساء، الملز، الرياض 11543، المملكة العربية السعودية",
      baishNote: "ملاحظة إدارية: تشير وثائق الآيزو المعتمدة إلى منشأة تشغيلية في بيش بمنطقة جازان. وتعمل الرياض كمقر رئيسي للإدارة العامة والتنفيذية.",
      phone: "+966 1732 29527",
      emailCeo: "ceo@aevoryn.net",
      emailChairman: "chairman@aevoryn.net",
      emailAdmin: "admin@aevoryn.net",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      capabilities: "قدراتنا وخدماتنا",
      infrastructure: "دعم البنية التحتية والمشاريع",
      manpower: "توريد القوى العاملة",
      materials: "توريد مواد البناء",
      equipment: "توريد وتأجير المعدات",
      qhse: "الجودة والسلامة والبيئة",
      certifications: "الشهادات والاعتمادات",
      aramco: "تسجيل أرامكو السعودية",
      clients: "العملاء والشركاء",
      contact: "اتصل بنا",
      requestConsultation: "طلب استشارة ومقايسة",
      langSwitch: "English",
    },
    hero: {
      badge: "دعم مشاريع البنية التحتية والمقاولات في المملكة العربية السعودية",
      headline: "بناء البنية التحتية. تمكين التقدم.",
      subheadline:
        "تقدم شركة إيفورين للخدمات والمقاولات حلول دعم متكاملة للبنية التحتية من خلال قوى عاملة معتمدة، ومواد بناء عالية الجودة، وأساطيل معدات ثقيلة، ودعم احترافي لتطوير المشاريع عبر كافة مناطق المملكة.",
      exploreBtn: "استكشف قدراتنا التشغيلية",
      contactBtn: "تواصل مع فريقنا",
      consultationBtn: "طلب استشارة ومقايسة",
      stats: {
        aramco: "أرامكو السعودية",
        aramcoSub: "رمز المورد: 10120422",
        divisions: "4 قطاعات رئيسية",
        divisionsSub: "دعم مقاولات متكامل",
        iso: "شهادات آيزو ثلاثية",
        isoSub: "9001 / 14001 / 45001",
        qhse: "100% جودة وسلامة",
        qhseSub: "ثقافة صفر حوادث",
      },
    },
    intro: {
      badge: "نبذة عن الشركة",
      headline: "شريككم الموثوق في دعم البنية التحتية",
      leadText:
        "انطلاقاً من مقرنا الرئيسي في الرياض، تبرز شركة إيفورين للخدمات والمقاولات كمزود وطني متخصص للحلول الصناعية ودعم المقاولين الرئيسيين والمطورين ومشاريع البنية التحتية الكبرى في المملكة العربية السعودية.",
      paragraph1:
        "تماشياً مع مستهدفات رؤية السعودية 2030، تسد إيفورين فجوات تنفيذ المشاريع من خلال تقديم خدمات ميدانية موثوقة، وحشد كوادر بشرية مؤهلة، وتوريد مواد بناء دقيقة ومطابقة للمواصفات، وتوفير معدات وآليات ثقيلة حديثة.",
      paragraph2:
        "إن مرونتنا التشغيلية، ومعرفتنا العميقة بمتطلبات السوق المحلي، والتزامنا الصارم بمعايير الجودة والسلامة والبيئة، تمنح شركاءنا الثقة لإنجاز المشاريع الصناعية المعقدة في مواعيدها المحددة وبأعلى درجات الكفاءة.",
      readMore: "تعرف على هيكلنا الإداري وحوكمتنا",
      highlights: [
        { label: "انتشار تشغيلي واسع", desc: "جاهزية تشغيلية لتغطية مشاريع الرياض والمنطقة الشرقية والمحافظات الجنوبية." },
        { label: "امتثال تنظيمي صارم", desc: "التزام كامل بأنظمة العمل السعودية ومعايير أرامكو وهيئة المواصفات (SASO)." },
        { label: "نموذج خدمات متكامل", desc: "شريك واحد يوفر المواد والعمالة والدعم اللوجستي والمعدات الثقيلة بتناغم تام." },
      ],
    },
    capabilities: {
      badge: "القطاعات الرئيسية",
      headline: "أربع قدرات متكاملة لدعم البنية التحتية",
      subheadline:
        "نقدم باقة منسقة من خدمات دعم المقاولات المصممة خصيصاً لإزالة معوقات المواقع وتسريع وتيرة إنجاز المشاريع الإنشائية.",
      viewDetails: "تفاصيل نطاق الخدمة",
      items: [
        {
          id: "infrastructure",
          title: "دعم البنية التحتية وتطوير المشاريع",
          subtitle: "تطوير المواقع المدنية والصناعية",
          desc: "تنسيق تشغيلي متكامل، أعمال ترابية، حفريات أساسات، خدمات لوجستية ميدانية، ودعم هندسي تخصصي للمشاريع العملاقة.",
          features: [
            "تسوية المواقع والردم والحفريات العميقة",
            "حفر وتجهيز مسارات المرافق والخدمات الأرضية",
            "فحص ومراقبة الجودة (QA/QC) وتنسيق الاختبارات",
            "جدولة مقاولي الباطن وتتبع المراحل الحرجة",
          ],
          image: "/images/content/infrastructure.jpg",
          link: "/capabilities/infrastructure",
        },
        {
          id: "manpower",
          title: "توريد القوى العاملة المتخصصة",
          subtitle: "كوادر فنية وهندسية معتمدة",
          desc: "استقطاب وحشد سريع لفرق عمل مؤهلة ومعتمدة من مهندسين ومفتشي سلامة وفنيين وحرفيين مهنيين للمشاريع الإنشائية.",
          features: [
            "مسؤولو سلامة ومفتشو جودة معتمدون من أرامكو",
            "مهندسون في تخصصات المدني والميكانيك والكهرباء",
            "مشغلو معدات ثقيلة وفنيو رفع وتوجيه معتمدون",
            "امتثال تام لأنظمة العمل وخدمات الإعاشة والإسكان",
          ],
          image: "/images/content/manpower.jpg",
          link: "/capabilities/manpower",
        },
        {
          id: "materials",
          title: "توريد مواد البناء والتشييد",
          subtitle: "مواد خام ومصنعة مطابقة لأعلى المعايير",
          desc: "توريد وإمداد موثوق لمواد البناء المعتمدة والمطابقة لمواصفات الهيئة السعودية للمواصفات (SASO) وASTM ومواصفات أرامكو.",
          features: [
            "الركام والبحص ومواد طبقات التأسيس والردم",
            "حديد التسليح والهياكل الفولاذية والمعادن المعمارية",
            "أنابيب وصمامات وأنظمة تصريف وتمديدات صناعية",
            "المنسوجات الأرضية (Geotextiles) ومعدات السلامة الشخصية",
          ],
          image: "/images/content/materials.jpg",
          link: "/capabilities/materials",
        },
        {
          id: "equipment",
          title: "توريد وتأجير المعدات والآليات الثقيلة",
          subtitle: "أسطول حديث ومجهز للنقل والحفر والرفع",
          desc: "أسطول حديث ومفحوص دورياً يشمل معدات تحريك التربة، الرافعات المتنقلة، مناولات المواد، ومولدات الطاقة مع مشغلين محترفين.",
          features: [
            "حفارات حديثة وجرافات وشيولات بمختلف الأحجام",
            "رافعات تلسكوبية متنقلة وشاحنات بوم ترك (Boom Trucks)",
            "مداحل ومعدات دمك التربة وآليات الأسفلت",
            "مولدات كهربائية وضواغط هواء وأبراج إنارة للمواقع",
          ],
          image: "/images/content/equipment.jpg",
          link: "/capabilities/equipment",
        },
      ],
    },
    projectSupport: {
      badge: "التميز التشغيلي",
      headline: "دعم تطوير المشاريع والحوكمة الميدانية",
      subheadline:
        "تعزز إيفورين قدرات فرق إدارة المشاريع عبر تنفيذ الدعم التشغيلي الحرج دون تعطيل مسارات عمل المقاول الرئيسي.",
      pillars: [
        {
          title: "التنسيق التشغيلي",
          desc: "تزامن دقيق بين عمليات التوريد، واللوجستيات الميدانية، وجداول الإنتاج اليومية في الموقع.",
        },
        {
          title: "الدعم الفني والميداني",
          desc: "معالجة التحديات الميدانية، وتحسين طرق التنفيذ وتقديم حلول عملية تحت إشراف كوادر ذات خبرة.",
        },
        {
          title: "ضمان الجودة (QA/QC)",
          desc: "تطبيق أنظمة فحص صارمة وفق ISO 9001:2015 والتحقق من شهادات المنشأ والاختبارات المخبرية.",
        },
        {
          title: "الامتثال للسلامة والصحة المهنية",
          desc: "إجراءات غير قابلة للمساومة بموجب ISO 45001:2018، واجتماعات سلامة دورية، وتقييم شامل للمخاطر.",
        },
        {
          title: "دقة الالتزام بالمواعيد",
          desc: "أطر عمل مرنة وحشد سريع يحمي المسار الحرج للمشروع ويمنع التأخيرات المكلفة.",
        },
        {
          title: "ضبط التكاليف والكفاءة المالية",
          desc: "نماذج تسعير تنافسية وشفافة، والحد من الهدر لتعظيم كفاءة ميزانيات المشاريع.",
        },
        {
          title: "الممارسات البيئية المستدامة",
          desc: "التزام كامل بمعايير ISO 14001:2015 لحماية البيئة المحيطة، وتدوير المخلفات، وكبح الغبار.",
        },
      ],
      disclaimer:
        "إشعار تنظيمي: تعمل شركة إيفورين كمزود متكامل لخدمات المقاولات ودعم البنية التحتية بالشراكة المباشرة مع المقاولين الرئيسيين والمطورين، ولا تدعي صفة مقاول رئيسي (EPC) دون تكليف رسمي مثبت.",
    },
    whyChoose: {
      badge: "نقاط القوة المؤسسية",
      headline: "لماذا تختار إيفورين؟",
      subheadline:
        "ثماني مزايا تنافسية رئيسية تجعل من شركة إيفورين الشريك المفضل لدعم مشاريع البنية التحتية في المملكة.",
      items: [
        {
          title: "قدرات خدمية متكاملة",
          desc: "دمج توريد المواد والعمالة المؤهلة والآليات الثقيلة والأعمال المدنية تحت مظلة واحدة ذات مسؤولية موحدة.",
        },
        {
          title: "الموثوقية التشغيلية",
          desc: "التزام راسخ بالعقود والمواعيد مع جاهزية مثبتة وسرعة استجابة وخطط طوارئ ميدانية مدروسة.",
        },
        {
          title: "ثقافة السلامة أولاً",
          desc: "تطبيق معايير ISO 45001 الدولية حيث تأتي سلامة الكوادر وحماية البيئة فوق أي ضغوط تشغيلية.",
        },
        {
          title: "حلول قوى عاملة مرنة",
          desc: "قنوات استقطاب وتوظيف ديناميكية قادرة على حشد عشرات ومئات الفنيين للمواقع والمناطق النائية.",
        },
        {
          title: "سلسلة توريد خاضعة لرقابة الجودة",
          desc: "شراكات مباشرة مع محاجر ومصانع حديد ومصنعين معتمدين تضمن توريد مواد بلا أدنى هدر أو رفض.",
        },
        {
          title: "معدات وآليات بحالة فنية ممتازة",
          desc: "برامج صيانة وقائية صارمة، وأنظمة تتبع حديثة، وفحوصات دورية معتمدة من جهات ثالثة تمنع توقف العمل.",
        },
        {
          title: "إدارة وإشراف بخبرات عريقة",
          desc: "قيادات ميدانية تمتلك عقوداً من الخبرات المتراكمة في مشاريع البنية التحتية والنفط والغاز والإنشاءات.",
        },
        {
          title: "الالتزام برضا العملاء",
          desc: "نهج علاقات طويل الأجل قائم على النزاهة التجارية، والشفافية التامة، والحلول الاستباقية للمشكلات.",
        },
      ],
    },
    certifications: {
      badge: "الاعتمادات والتراخيص",
      headline: "شهادات الجودة والسلامة والبيئة الدولية (ISO)",
      subheadline:
        "تخضع كافة عملياتنا التشغيلية لأنظمة إدارة مدققة دولياً وممنوحة بموجب معايير الآيزو من هيئة Vatsin Certification Private Limited.",
      initialRegistration: "تاريخ التسجيل الأولي: 04 أغسطس 2026",
      expiryDate: "صالحة حتى: 03 أغسطس 2029",
      body: "جهة المنح والتدقيق: Vatsin Certification Private Limited",
      viewDoc: "معاينة الوثيقة الرسمية",
      downloadPdf: "تحميل الشهادة الرسمية (PDF)",
      disclaimer:
        "إفصاح إداري وتنظيمي: الشهادات المعروضة أدناه هي وثائق اعتماد رسمية صادرة لشركة إيفورين للخدمات والمقاولات. يُرجى ملاحظة أن الشهادات تذكر المنشأة التشغيلية في بيش بمنطقة جازان، بينما يتولى المقر الرئيسي في الرياض إدارة كافة العمليات والتعاقدات العامة.",
      items: [
        {
          id: "iso-45001",
          code: "ISO 45001:2018",
          title: "نظام إدارة السلامة والصحة المهنية",
          certNo: "VC23032689",
          desc: "توثق الشهادة التزام إيفورين الصارم بتحديد المخاطر، وتقييمها، وبروتوكولات منع الحوادث في مواقع العمل ومسارات القوى العاملة.",
          scope: "تقديم خدمات المقاولات، ودعم البنية التحتية، وتوريد القوى العاملة، والمواد، والمعدات والآليات الثقيلة.",
          icon: "ShieldAlert",
          status: "سارية ومعتمدة",
        },
        {
          id: "iso-9001",
          code: "ISO 9001:2015",
          title: "نظام إدارة الجودة العالمي",
          certNo: "VC23018822",
          desc: "تثبت الشهادة متانة إطار ضمان الجودة الشامل المطبق لدينا، والذي يشمل توريد المواد، والتنفيذ الميداني، وضبط أداء المقاولين.",
          scope: "تقديم خدمات المقاولات المدنية، ودعم تطوير البنية التحتية، وتوريد القوى العاملة الصناعية، وتجارة المواد وتأجير المعدات.",
          icon: "Award",
          status: "سارية ومعتمدة",
        },
        {
          id: "iso-14001",
          code: "ISO 14001:2015",
          title: "نظام الإدارة البيئية",
          certNo: "VC23022982",
          desc: "تؤكد التزام الشركة الاستباقي بحماية البيئة، وخفض الانبعاثات، وتقليل المخلفات، والاستخدام المستدام للموارد في كافة العمليات.",
          scope: "الإدارة البيئية لعمليات دعم الإنشاءات، ومناولة وتداول المواد، وتشغيل المواقع الميدانية.",
          icon: "Leaf",
          status: "سارية ومعتمدة",
        },
      ],
    },
    aramco: {
      badge: "تسجيل الموردين المعتمد",
      headline: "تسجيل الموردين لدى أرامكو السعودية",
      officialStatement: "مسجلة في نظام إدارة الموردين لدى أرامكو السعودية.",
      desc:
        "تم تسجيل شركة إيفورين للخدمات والمقاولات رسمياً في نظام إدارة الموردين لدى شركة أرامكو السعودية، مما يبرهن على الملاءة التنظيمية والمالية للشركة والتزامها بالمعايير الصناعية السعودية المرموقة.",
      details: {
        vendorCode: "10120422",
        vendorCodeLabel: "رمز المورد (Vendor Code)",
        eRef: "0019448",
        eRefLabel: "الرقم المرجعي الإلكتروني (E-Ref)",
        cr: "7054401679",
        crLabel: "رقم السجل التجاري",
        date: "28 يوليو 2026",
        dateLabel: "تاريخ خطاب التسجيل",
        supplierType: "مزود خدمات فقط (Service Provider Only)",
        supplierTypeLabel: "تصنيف المورد المعتمد",
      },
      disclaimer:
        "إخلاء مسؤولية تنظيمي إلزامي: يشير التسجيل في نظام إدارة الموردين لدى أرامكو السعودية إلى أهلية الشركة وتأهيلها المسبق كمورد خدمات. لا يمثل هذا التسجيل ضماناً للمشتريات أو ترسية للعقود. كما أن اعتماد توريد المواد يخضع للتحقق الإداري ويتطلب وثائق تأهيل منفصلة.",
      cta: "التحقق من بيانات التسجيل",
    },
    clients: {
      badge: "التعاون والشراكات",
      headline: "العملاء والشراكات الاستراتيجية",
      subheadline:
        "قدمت إيفورين خدمات الدعم للمقاولين الرئيسيين والمجموعات الصناعية الكبرى لإنجاز التزاماتهم في مشاريع البنية التحتية.",
      note: "الأسماء والكيانات الواردة تمثل تعاملات ومشاريع تعاون تشغيلية، وتعود كافة الشعارات والعلامات التجارية لمالكيها المسجلين.",
      partners: [
        {
          name: "شركة الفنار (Alfanar)",
          category: "الطاقة والبنية التحتية",
          scope: "دعم القوى العاملة ومشاريع البنية التحتية المدنية",
        },
        {
          name: "مجموعة ماسكو (Masco)",
          category: "مقاولات الهندسة المدنية الكبرى",
          scope: "توريد معدات تحريك التربة واللوجستيات المساندة",
        },
        {
          name: "شركة الدصفي (Aldsfey)",
          category: "المقاولات العامة",
          scope: "تأمين الكوادر العمالية المتخصصة والمساندة الميدانية",
        },
        {
          name: "مجموعة التميمي (Tamimi)",
          category: "الخدمات الصناعية والتغذية",
          scope: "لوجستيات دعم المواقع وتجهيز المجمعات السكنية",
        },
        {
          name: "تشاينا هاربر (China Harbour)",
          category: "الهندسة البحرية والبنية التحتية",
          scope: "توريد مواد البناء وتأجير الآليات الثقيلة التخصصية",
        },
      ],
    },
    values: {
      badge: "المبادئ التوجيهية",
      headline: "الرؤية والرسالة والقيم الجوهرية",
      visionTitle: "رؤيتنا",
      visionText:
        "أن نكون الشريك الرائد والأول في خدمات المقاولات ودعم البنية التحتية بالمملكة العربية السعودية، واضعين المعيار القياسي للموثوقية التشغيلية، وسلامة الكوادر، وسرعة التنفيذ مساهمةً في تحقيق رؤية 2030.",
      missionTitle: "رسالتنا",
      missionText:
        "تمكين المقاولين والمطورين الصناعيين من خلال توريد قوى عاملة معتمدة، ومواد بناء مفحوصة ومطابقة للمواصفات، ومعدات متطورة، وتنسيق ميداني موثوق، دون أي مساومة على معايير السلامة والأخلاقيات المهنية.",
      valuesTitle: "قيمنا الجوهرية الست",
      items: [
        { title: "الجودة", desc: "معايير دقيقة في كل مادة يتم توريدها وكل كادر مهني يتم حشده للموقع." },
        { title: "النزاهة", desc: "شفافية مطلقة في التعاملات التجارية، ومصداقية تامة في تنفيذ الالتزامات." },
        { title: "الابتكار", desc: "تطبيق أحدث حلول التتبع وإدارة الأساطيل ومناهج التنفيذ المرنة." },
        { title: "السلامة", desc: "التزام مؤسسي غير قابل للتفاوض بحماية كل عامل وتحقيق صفر حوادث." },
        { title: "الاستدامة", desc: "إدارة مسؤولة للموارد الطبيعية وحماية صارمة للبيئة المحيطة بالمواقع." },
        { title: "رضا العملاء", desc: "بناء شراكات طويلة الأمد قائمة على سرعة الاستجابة والأداء الاستثنائي المتواصل." },
      ],
    },
    ctaSection: {
      headline: "معاً نبني مستقبلاً أقوى وأكثر استدامة.",
      subheadline:
        "سواء كنتم بحاجة إلى حشد فوري للآليات والمعدات الثقيلة، أو استقطاب كوادر فنية معتمدة، أو توريد مواد بناء مطابقة للمواصفات في السعودية، فإن فريق إيفورين على أتم الاستعداد للتنفيذ.",
      contactBtn: "تواصل مع الإدارة العامة",
      rfqBtn: "طلب عرض سعر ومقايسة",
    },
    footer: {
      aboutText:
        "شركة إيفورين للخدمات والمقاولات شركة سعودية متخصصة في تقديم حلول الدعم المتكاملة للمقاولات، والقوى العاملة المعتمدة، وتوريد مواد البناء وأساطيل المعدات الثقيلة.",
      quickLinks: "روابط سريعة",
      divisions: "القطاعات والخدمات",
      governance: "الحوكمة والامتثال",
      headquarters: "المقر الرئيسي للإدارة العامة",
      rights: "جميع الحقوق محفوظة. شركة إيفورين للخدمات والمقاولات.",
      crNotice: "سجل تجاري رقم 7054401679 | المملكة العربية السعودية",
    },
    contactPage: {
      title: "اتصل بشركة إيفورين",
      subtitle: "تواصل مباشرة مع فرق الإدارة التنفيذية، والتسعير، والحشد التشغيلي لمشاريعك.",
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
      riyadhTitle: "المقر الرئيسي للإدارة العامة - الرياض",
      riyadhAddress: "شارع الأحساء، حي الملز، الرياض 11543، المملكة العربية السعودية",
      baishTitle: "المنشأة التشغيلية واللوجستية - بيش",
      baishAddress: "مركز العمليات المساندة، بيش، منطقة جازان، المملكة العربية السعودية",
      adminVerification: "إفصاح إداري: تظهر منشأة بيش في شهادات الآيزو الخاصة بالشركة كموقع تشغيلي معتمد.",
      directContacts: "قنوات الاتصال المباشرة",
    },
  },
};
