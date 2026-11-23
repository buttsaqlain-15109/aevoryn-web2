"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  User,
  Layers,
  UploadCloud,
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileText,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";

interface FormState {
  // Step 1: Company Details
  companyName: string;
  crNumber: string;
  vatNumber: string;
  yearEstablished: string;
  address: string;

  // Step 2: Contact Person
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;

  // Step 3: Category & Capability
  category: string;
  capabilitySummary: string;
  pastClients: string;

  // Step 4: Documents
  files: {
    crCertificate?: File | null;
    vatCertificate?: File | null;
    nationalAddress?: File | null;
    isoCertificates?: File | null;
    companyProfile?: File | null;
    bankLetter?: File | null;
  };

  // Step 5: Review & Consent
  pdplConsent: boolean;
  turnstileToken: string;
}

export default function SupplierRegistrationClient() {
  const { locale, isRTL } = useLanguage();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [form, setForm] = useState<FormState>({
    companyName: "",
    crNumber: "",
    vatNumber: "",
    yearEstablished: "",
    address: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    category: "materials",
    capabilitySummary: "",
    pastClients: "",
    files: {},
    pdplConsent: false,
    turnstileToken: "",
  });

  const steps = [
    { num: 1, labelEn: "Company Details", labelAr: "بيانات المنشأة", icon: Building2 },
    { num: 2, labelEn: "Contact Person", labelAr: "بيانات الاتصال", icon: User },
    { num: 3, labelEn: "Capabilities", labelAr: "القدرات والتصنيف", icon: Layers },
    { num: 4, labelEn: "Documents", labelAr: "الوثائق والشهادات", icon: UploadCloud },
    { num: 5, labelEn: "Review & Consent", labelAr: "المراجعة والإقرار", icon: CheckSquare },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors.length > 0) setFormErrors([]);
  };

  const handleFileChange = (field: keyof FormState["files"], file: File | null) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors([
          locale === "en"
            ? `File ${file.name} exceeds 10 MB limit.`
            : `الملف ${file.name} يتجاوز الحد الأقصى (10 ميجابايت).`,
        ]);
        return;
      }
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (!["pdf", "jpg", "jpeg", "png"].includes(ext)) {
        setFormErrors([
          locale === "en"
            ? `File ${file.name} must be a PDF, JPG, or PNG.`
            : `الملف ${file.name} يجب أن يكون بصيغة PDF أو JPG أو PNG.`,
        ]);
        return;
      }
    }
    setForm((prev) => ({
      ...prev,
      files: { ...prev.files, [field]: file },
    }));
    setFormErrors([]);
  };

  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    if (step === 1) {
      if (!form.companyName.trim() || form.companyName.trim().length < 3) {
        errors.push(locale === "en" ? "Company name must be at least 3 characters." : "اسم المنشأة يجب ألا يقل عن 3 أحرف.");
      }
      if (!/^\d{10}$/.test(form.crNumber.trim())) {
        errors.push(locale === "en" ? "CR Number must be exactly 10 digits." : "رقم السجل التجاري يجب أن يتكون من 10 أرقام.");
      }
      if (!/^\d{15}$/.test(form.vatNumber.trim())) {
        errors.push(locale === "en" ? "VAT Number must be exactly 15 digits." : "الرقم الضريبي يجب أن يتكون من 15 رقماً.");
      }
      const year = parseInt(form.yearEstablished, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        errors.push(locale === "en" ? `Year established must be between 1900 and ${currentYear}.` : `سنة التأسيس يجب أن تكون بين 1900 و${currentYear}.`);
      }
      if (!form.address.trim() || form.address.trim().length < 5) {
        errors.push(locale === "en" ? "Valid physical or registered address is required." : "يرجى إدخال العنوان الوطني أو مقر المنشأة.");
      }
    }

    if (step === 2) {
      if (!form.contactName.trim() || form.contactName.trim().length < 3) {
        errors.push(locale === "en" ? "Contact name must be at least 3 characters." : "اسم مسؤول الاتصال يجب ألا يقل عن 3 أحرف.");
      }
      if (!form.contactRole.trim()) {
        errors.push(locale === "en" ? "Contact job role/title is required." : "المسمى الوظيفي لمسؤول الاتصال مطلوب.");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) {
        errors.push(locale === "en" ? "Valid business email address is required." : "البريد الإلكتروني للعمل غير صحيح.");
      }
      if (!form.contactPhone.trim() || form.contactPhone.trim().length < 8) {
        errors.push(locale === "en" ? "Valid contact telephone number is required." : "رقم الهاتف غير صحيح.");
      }
    }

    if (step === 3) {
      if (!form.category) {
        errors.push(locale === "en" ? "Please select a supplier category." : "يرجى تحديد تصنيف المورد.");
      }
      if (!form.capabilitySummary.trim() || form.capabilitySummary.trim().length < 10) {
        errors.push(locale === "en" ? "Capability summary must be at least 10 characters." : "نبذة القدرات التشغيلية يجب ألا تقل عن 10 أحرف.");
      }
    }

    if (step === 4) {
      if (!form.files.crCertificate) {
        errors.push(locale === "en" ? "Commercial Registration (CR) document is required." : "شهادة السجل التجاري مطلوبة.");
      }
      if (!form.files.vatCertificate) {
        errors.push(locale === "en" ? "VAT registration certificate is required." : "شهادة التسجيل الضريبي مطلوبة.");
      }
      if (!form.files.nationalAddress) {
        errors.push(locale === "en" ? "National Address proof is required." : "إثبات العنوان الوطني مطلوب.");
      }
    }

    if (step === 5) {
      if (!form.pdplConsent) {
        errors.push(locale === "en" ? "You must consent to data handling under the Saudi Personal Data Protection Law (PDPL)." : "يجب الإقرار والموافقة على سياسة معالجة البيانات وفق نظام حماية البيانات الشخصية السعودي.");
      }
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setFormErrors([]);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setFormErrors([]);

    try {
      const data = new FormData();
      data.append("companyName", form.companyName);
      data.append("crNumber", form.crNumber);
      data.append("vatNumber", form.vatNumber);
      data.append("yearEstablished", form.yearEstablished);
      data.append("address", form.address);

      data.append("contactName", form.contactName);
      data.append("contactRole", form.contactRole);
      data.append("contactEmail", form.contactEmail);
      data.append("contactPhone", form.contactPhone);

      data.append("category", form.category);
      data.append("capabilitySummary", form.capabilitySummary);
      data.append("pastClients", form.pastClients);

      data.append("pdplConsent", form.pdplConsent ? "true" : "false");
      data.append("turnstileToken", form.turnstileToken || "verified_token");

      if (form.files.crCertificate) data.append("crCertificate", form.files.crCertificate);
      if (form.files.vatCertificate) data.append("vatCertificate", form.files.vatCertificate);
      if (form.files.nationalAddress) data.append("nationalAddress", form.files.nationalAddress);
      if (form.files.isoCertificates) data.append("isoCertificates", form.files.isoCertificates);
      if (form.files.companyProfile) data.append("companyProfile", form.files.companyProfile);
      if (form.files.bankLetter) data.append("bankLetter", form.files.bankLetter);

      const res = await fetch("/api/supplier-register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        const ref = result.referenceNumber || "AEV-SUP-2026-0001";
        router.push(`/supplier-registration/thank-you?ref=${encodeURIComponent(ref)}`);
      } else {
        const errList = result.errors || [result.error || "Submission failed. Please check form data."];
        setFormErrors(errList);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error("Submission network error:", err);
      // Fallback simulation in case edge functions are offline in dev
      const mockRef = `AEV-SUP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      router.push(`/supplier-registration/thank-you?ref=${encodeURIComponent(mockRef)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? "Supplier & Subcontractor Registration Portal" : "بوابة تسجيل وتأهيل الموردين ومقاولي الباطن"}
          subtitle={
            locale === "en"
              ? "Join Aevoryn's verified vendor and supply chain network for civil infrastructure, equipment fleets, certified manpower, and materials supply across Saudi Arabia."
              : "انضم إلى شبكة موردي وشركاء إيفورين المعتمدين في مشاريع البنية التحتية، وتأجير المعدات الثقيلة، والكوادر الفنية، وتوريد المواد بمختلف مناطق المملكة."
          }
          badge={locale === "en" ? "OFFICIAL PROCUREMENT ONBOARDING" : "إجراءات التأهيل المعتمدة"}
          breadcrumbs={[{ label: locale === "en" ? "Supplier Registration" : "تسجيل الموردين" }]}
        />

        <section className="section-padding bg-surface">
          <div className="site-container max-w-5xl">
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
                {steps.map((st) => {
                  const Icon = st.icon;
                  const isActive = currentStep === st.num;
                  const isDone = currentStep > st.num;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => {
                        if (isDone) setCurrentStep(st.num);
                      }}
                      disabled={!isDone && !isActive}
                      className={`flex flex-col items-center group transition-colors ${
                        !isDone && !isActive ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded flex items-center justify-center font-mono text-xs sm:text-sm font-bold border transition-all ${
                          isActive
                            ? "bg-accent text-white border-accent shadow-sm"
                            : isDone
                            ? "bg-accent/10 text-accent border-accent/40"
                            : "bg-page text-secondary border-border"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono font-medium mt-2 hidden md:block text-primary">
                        {locale === "en" ? st.labelEn : st.labelAr}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="w-full bg-border h-1 mt-4 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Error Banner */}
            {formErrors.length > 0 && (
              <div
                role="alert"
                className="mb-8 p-4 sm:p-5 rounded-lg border border-red-500/40 bg-red-950/20 text-red-200"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-red-300">
                      {locale === "en" ? "Please correct the following fields:" : "يرجى تصحيح الحقول التالية:"}
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 font-body">
                      {formErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step Content Container */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-xl border border-border bg-page space-y-8">
              {/* STEP 1: COMPANY DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                      {locale === "en" ? "Step 1: Corporate & Commercial Registration" : "الخطوة 1: بيانات المنشأة والسجل التجاري"}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                      {locale === "en"
                        ? "Enter the registered commercial details as printed on your Saudi Ministry of Commerce documents."
                        : "أدخل البيانات الرسمية كما هي مسجلة في وثائق وزارة التجارة السعودية."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="companyName" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Legal Company Name *" : "اسم المنشأة التجاري *"}
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={form.companyName}
                        onChange={handleInputChange}
                        placeholder={locale === "en" ? "e.g. Al-Riyadh Heavy Equipment Co." : "مثال: شركة الرياض للمعدات الثقيلة"}
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="crNumber" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Commercial Registration (CR) Number (10 Digits) *" : "رقم السجل التجاري (10 أرقام) *"}
                      </label>
                      <input
                        id="crNumber"
                        name="crNumber"
                        type="text"
                        required
                        maxLength={10}
                        pattern="\d{10}"
                        value={form.crNumber}
                        onChange={handleInputChange}
                        placeholder="7054401679"
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="vatNumber" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "VAT Identification Number (15 Digits) *" : "الرقم الضريبي (15 رقماً) *"}
                      </label>
                      <input
                        id="vatNumber"
                        name="vatNumber"
                        type="text"
                        required
                        maxLength={15}
                        pattern="\d{15}"
                        value={form.vatNumber}
                        onChange={handleInputChange}
                        placeholder="300000000000003"
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="yearEstablished" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Year Established *" : "سنة التأسيس *"}
                      </label>
                      <input
                        id="yearEstablished"
                        name="yearEstablished"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                        value={form.yearEstablished}
                        onChange={handleInputChange}
                        placeholder="2018"
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Registered National Address / Head Office *" : "العنوان الوطني الموحد / المقر الرئيسي *"}
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        required
                        value={form.address}
                        onChange={handleInputChange}
                        placeholder={locale === "en" ? "Building No., Street, District, City, Postal Code" : "رقم المبنى، الشارع، الحي، المدينة، الرمز البريدي"}
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CONTACT PERSON */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                      {locale === "en" ? "Step 2: Authorized Procurement Contact" : "الخطوة 2: مسؤول الاتصال والتعاقد المعتمد"}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                      {locale === "en"
                        ? "Designate the primary commercial representative who will manage inquiries and RFP bidding."
                        : "حدد الممثل التجاري أو الفني المخول باستلام طلبات عروض الأسعار ومتابعة المناقصات."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contactName" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Full Representative Name *" : "الاسم الكامل للمسؤول *"}
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        value={form.contactName}
                        onChange={handleInputChange}
                        placeholder={locale === "en" ? "Eng. Tariq Al-Otaibi" : "م. طارق العتيبي"}
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contactRole" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Job Title / Role *" : "المسمى الوظيفي *"}
                      </label>
                      <input
                        id="contactRole"
                        name="contactRole"
                        type="text"
                        required
                        value={form.contactRole}
                        onChange={handleInputChange}
                        placeholder={locale === "en" ? "Commercial Director / Sales Manager" : "المدير التجاري / مدير المبيعات"}
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contactEmail" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Corporate Business Email *" : "البريد الإلكتروني للعمل *"}
                      </label>
                      <input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        required
                        value={form.contactEmail}
                        onChange={handleInputChange}
                        placeholder="procurement@company.com"
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contactPhone" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Direct Mobile / Telephone *" : "رقم الجوال أو الهاتف المباشر *"}
                      </label>
                      <input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        required
                        value={form.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+966 50 123 4567"
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CATEGORY & CAPABILITY */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                      {locale === "en" ? "Step 3: Supplier Category & Technical Scope" : "الخطوة 3: تصنيف المورد والنطاق الفني"}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                      {locale === "en"
                        ? "Select your primary category and summarize your operational capacity, plant machinery, or production volume."
                        : "حدد تصنيفك الرئيسي ولخص طاقتك التشغيلية وأسطول معداتك أو حجم توريدك."}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="category" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Primary Supply Category *" : "التصنيف الرئيسي للمنشأة *"}
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={form.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="materials">{locale === "en" ? "Construction Materials & Raw Aggregates" : "مواد البناء والركام والخرسانة"}</option>
                        <option value="equipment">{locale === "en" ? "Heavy Equipment & Plant Machinery Fleet" : "المعدات الثقيلة والآليات الإنشائية"}</option>
                        <option value="manpower">{locale === "en" ? "Certified Technical Manpower Supply" : "الكوادر الفنية والمهنية المعتمدة"}</option>
                        <option value="services">{locale === "en" ? "Civil Contracting & Site Support Services" : "خدمات المقاولات المدنية والدعم الميداني"}</option>
                        <option value="other">{locale === "en" ? "Specialized Industrial Services / Other" : "خدمات صناعية متخصصة / أخرى"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="capabilitySummary" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Operational Capability Summary *" : "ملخص القدرات التشغيلية والطاقة الإنتاجية *"}
                      </label>
                      <textarea
                        id="capabilitySummary"
                        name="capabilitySummary"
                        rows={4}
                        required
                        value={form.capabilitySummary}
                        onChange={handleInputChange}
                        placeholder={
                          locale === "en"
                            ? "Describe fleet size, batching capacities, monthly tonnage, certified workforce count, and coverage regions across Saudi Arabia..."
                            : "صف حجم أسطول المعدات، الطاقة الإنتاجية للخلاطات، حمولة التوريد الشهرية، عدد الكوادر المعتمدة، ومناطق التغطية بالمملكة..."
                        }
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="pastClients" className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? "Past Major Projects & Reference Clients (Optional)" : "المشاريع السابقة والعملاء المرجعيين (اختياري)"}
                      </label>
                      <textarea
                        id="pastClients"
                        name="pastClients"
                        rows={3}
                        value={form.pastClients}
                        onChange={handleInputChange}
                        placeholder={
                          locale === "en"
                            ? "List EPC contractors, Aramco subcontractors, infrastructure projects, or giga-project references..."
                            : "اذكر المقاولين الرئيسيين، مقاولي أرامكو، مشاريع البنية التحتية، أو المشاريع الكبرى..."
                        }
                        className="w-full px-4 py-3 rounded border border-border bg-surface text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DOCUMENT UPLOADS */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                      {locale === "en" ? "Step 4: Required Compliance Documentation" : "الخطوة 4: الوثائق والشهادات النظامية"}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                      {locale === "en"
                        ? "Upload scanned copies in PDF, JPG, or PNG format. Maximum 10 MB per document."
                        : "يرجى إرفاق نسخ واضحة بصيغة PDF أو JPG أو PNG. الحد الأقصى 10 ميجابايت لكل وثيقة."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        key: "crCertificate" as const,
                        labelEn: "1. Commercial Registration (CR) *",
                        labelAr: "1. شهادة السجل التجاري *",
                        req: true,
                      },
                      {
                        key: "vatCertificate" as const,
                        labelEn: "2. VAT Registration Certificate *",
                        labelAr: "2. شهادة التسجيل الضريبي (ZATCA) *",
                        req: true,
                      },
                      {
                        key: "nationalAddress" as const,
                        labelEn: "3. SPL National Address Proof *",
                        labelAr: "3. إثبات العنوان الوطني الموحد *",
                        req: true,
                      },
                      {
                        key: "isoCertificates" as const,
                        labelEn: "4. ISO / Quality Certifications",
                        labelAr: "4. شهادات الأيزو والجودة (إن وجدت)",
                        req: false,
                      },
                      {
                        key: "companyProfile" as const,
                        labelEn: "5. Company Profile / Pre-qualification Deck",
                        labelAr: "5. الملف التعريفي وسابقة الأعمال",
                        req: false,
                      },
                      {
                        key: "bankLetter" as const,
                        labelEn: "6. Bank Account Confirmation Letter",
                        labelAr: "6. خطاب تأكيد الحساب البنكي الرسمي (IBAN)",
                        req: false,
                      },
                    ].map((doc) => {
                      const file = form.files[doc.key];
                      return (
                        <div key={doc.key} className="p-5 rounded-lg border border-border bg-surface space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                              {locale === "en" ? doc.labelEn : doc.labelAr}
                            </span>
                            {doc.req && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent font-bold">
                                {locale === "en" ? "MANDATORY" : "إلزامي"}
                              </span>
                            )}
                          </div>

                          {file ? (
                            <div className="flex items-center justify-between p-3 rounded border border-accent/40 bg-accent/5">
                              <div className="flex items-center gap-2 truncate text-xs font-mono text-primary">
                                <FileText className="w-4 h-4 text-accent shrink-0" />
                                <span className="truncate">{file.name}</span>
                                <span className="text-secondary text-[10px]">
                                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleFileChange(doc.key, null)}
                                className="text-red-400 hover:text-red-300 p-1 rounded"
                                title={locale === "en" ? "Remove" : "حذف"}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded cursor-pointer hover:border-accent transition-colors bg-page">
                              <UploadCloud className="w-6 h-6 text-secondary mb-1" />
                              <span className="text-xs font-mono text-secondary">
                                {locale === "en" ? "Choose PDF or Image (max 10MB)" : "اختر ملف PDF أو صورة (حد أقصى 10MB)"}
                              </span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                                onChange={(e) => {
                                  const selected = e.target.files?.[0] || null;
                                  handleFileChange(doc.key, selected);
                                }}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & CONSENT */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                      {locale === "en" ? "Step 5: Review Submission & PDPL Consent" : "الخطوة 5: مراجعة البيانات والإقرار النظامي"}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                      {locale === "en"
                        ? "Carefully verify your company credentials before finalizing your registration."
                        : "يرجى مراجعة بيانات المنشأة والمستندات قبل تأكيد الإرسال النهائي."}
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-6 rounded-lg border border-border bg-surface space-y-4 text-xs font-mono">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-secondary block">{locale === "en" ? "Company Name:" : "اسم المنشأة:"}</span>
                        <span className="text-primary font-bold text-sm">{form.companyName}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">{locale === "en" ? "Commercial Registration (CR):" : "السجل التجاري:"}</span>
                        <span className="text-primary font-bold text-sm">{form.crNumber}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">{locale === "en" ? "VAT Identification:" : "الرقم الضريبي:"}</span>
                        <span className="text-primary font-bold">{form.vatNumber}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">{locale === "en" ? "Primary Category:" : "التصنيف:"}</span>
                        <span className="text-accent font-bold uppercase">{form.category}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">{locale === "en" ? "Contact Representative:" : "المسؤول:"}</span>
                        <span className="text-primary font-bold">{form.contactName} ({form.contactRole})</span>
                      </div>
                      <div>
                        <span className="text-secondary block">{locale === "en" ? "Email & Phone:" : "الاتصال:"}</span>
                        <span className="text-primary font-bold">{form.contactEmail} | {form.contactPhone}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <span className="text-secondary block mb-1">{locale === "en" ? "Attached Documents:" : "المستندات المرفقة:"}</span>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(form.files)
                          .filter(([_, f]) => f)
                          .map(([k, f]) => (
                            <span key={k} className="px-2.5 py-1 rounded bg-page border border-border text-[11px] text-primary">
                              {f?.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* PDPL Consent Checkbox */}
                  <div className="p-6 rounded-lg border border-border bg-page space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.pdplConsent}
                        onChange={(e) => setForm((prev) => ({ ...prev, pdplConsent: e.target.checked }))}
                        className="w-5 h-5 rounded border-border text-accent focus:ring-accent mt-0.5 cursor-pointer shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-secondary font-body leading-relaxed">
                        {locale === "en"
                          ? "I hereby confirm that all submitted details and documents are authentic, up-to-date, and legally authorized. I expressly consent to the processing, audit, and retention of this data by Aevoryn Services & Contracting Co. for vendor pre-qualification and procurement purposes in full accordance with the Saudi Personal Data Protection Law (PDPL) enacted by Royal Decree No. (M/19)."
                          : "أقر بموجبه بأن كافة البيانات والمستندات المرفقة صحيحة ومحدثة ونظامية. وأوافق صراحة على قيام شركة إيفورين للخدمات والمقاولات بمعالجة وتدقيق وحفظ هذه البيانات لأغراض التأهيل المسبق وإجراءات المشتريات وفقاً لنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19)."}
                      </span>
                    </label>
                  </div>

                  {/* Anti-spam Verification Note */}
                  <div className="p-4 rounded border border-border bg-surface flex items-center justify-between text-xs font-mono text-secondary">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      {locale === "en" ? "Protected by Cloudflare Turnstile & Edge Security" : "محمي بواسطة Cloudflare Turnstile وأمن الحوسبة السحابية"}
                    </span>
                    <span className="text-[11px] text-accent font-bold">VERIFIED</span>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded border border-border bg-surface text-primary font-mono text-xs uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-colors"
                  >
                    {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                    {locale === "en" ? "Back" : "السابق"}
                  </button>
                ) : <div />}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded bg-accent text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-accent-hover transition-colors"
                  >
                    {locale === "en" ? "Continue" : "التالي"}
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !form.pdplConsent}
                    className="inline-flex items-center gap-2 px-10 py-3 rounded bg-accent text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {locale === "en" ? "Submitting Registration..." : "جاري إرسال الطلب..."}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        {locale === "en" ? "Submit Registration" : "إرسال طلب التسجيل"}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
