"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { submitContactInquiry } from "@/lib/api-client";

export default function ContactPage() {
  const { t, locale, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string>("");
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    division: "infrastructure",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiErrors([]);

    try {
      const res = await submitContactInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        if (res.inquiryId) setInquiryRef(res.inquiryId);
      } else {
        setApiErrors(res.errors || ["An error occurred while transmitting your inquiry. Please try again."]);
      }
    } catch {
      setApiErrors(["Network error. Please check your connection and try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("contactPage.title")}
          subtitle={t("contactPage.subtitle")}
          badge={locale === "en" ? "COMMERCIAL & CORPORATE INQUIRIES" : "قنوات الاتصال والاستفسارات التجارية"}
          breadcrumbs={[{ label: t("nav.contact") }]}
          imageSrc="/images/content/contact-hero.jpg"
        />

        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 border border-hairline bg-page rounded-2xl shadow-subtle space-y-6">
                  <div>
                    <span className="badge-tech inline-block mb-3">
                      {locale === "en" ? "INQUIRY SUBMISSION" : "تقديم طلب"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-bold font-display uppercase tracking-tight text-primary">
                      {t("contactPage.formTitle")}
                    </h2>
                    <p className="text-sm sm:text-base text-secondary pt-1 font-body">
                      {locale === "en"
                        ? "Complete the inquiry form below. Our commercial estimation team in Riyadh will review your requirements and respond promptly."
                        : "يرجى ملء النموذج أدناه. سيتولى فريق التقدير التجاري بالرياض مراجعة متطلباتكم والتواصل معكم في أسرع وقت."}
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                        {locale === "en" ? "Inquiry Successfully Transmitted" : "تم إرسال الطلب بنجاح"}
                      </h4>
                      <p className="text-sm text-secondary max-w-md mx-auto leading-relaxed font-body">
                        {t("contactPage.success")}
                      </p>
                      {inquiryRef && (
                        <div className="p-3 border border-hairline bg-surface rounded-xl max-w-xs mx-auto">
                          <span className="text-[11px] font-mono-tech text-muted block">REFERENCE TRACKING ID</span>
                          <span className="font-mono-tech font-bold text-brand-cobalt text-xs">{inquiryRef}</span>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setInquiryRef("");
                        }}
                        className="btn-cobalt"
                      >
                        {locale === "en" ? "Submit Another Request" : "إرسال طلب آخر"}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {apiErrors.length > 0 && (
                        <div className="p-4 border border-rose-500/30 bg-rose-500/5 rounded-xl text-rose-600 dark:text-rose-400 text-xs space-y-1">
                          <div className="flex items-center gap-2 font-bold font-mono-tech">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span>{locale === "en" ? "PLEASE REVIEW REQUIRED FIELDS" : "يرجى مراجعة الحقول المطلوبة"}</span>
                          </div>
                          <ul className="list-disc list-inside font-body">
                            {apiErrors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label-editorial">
                            {t("contactPage.fullName")} *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={locale === "en" ? "Eng. Saud Al-Ghamdi" : "م. سعود الغامدي"}
                            className="form-input-editorial"
                          />
                        </div>

                        <div>
                          <label className="form-label-editorial">
                            {t("contactPage.companyName")} *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder={locale === "en" ? "Contracting & Engineering Co." : "شركة المقاولات والهندسة"}
                            className="form-input-editorial"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label-editorial">
                            {t("contactPage.email")} *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="commercial@company.com"
                            className="form-input-editorial"
                          />
                        </div>

                        <div>
                          <label className="form-label-editorial">
                            {t("contactPage.phone")} *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+966 5X XXX XXXX"
                            className="form-input-editorial"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label-editorial">
                          {t("contactPage.division")}
                        </label>
                        <select
                          value={formData.division}
                          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                          className="form-input-editorial"
                        >
                          <option value="infrastructure">{t("capabilities.items.0.title")}</option>
                          <option value="manpower">{t("capabilities.items.1.title")}</option>
                          <option value="materials">{t("capabilities.items.2.title")}</option>
                          <option value="equipment">{t("capabilities.items.3.title")}</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label-editorial">
                          {t("contactPage.message")} *
                        </label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={
                            locale === "en"
                              ? "Provide details on required machinery, manpower trades, material specifications, or jobsite location..."
                              : "يرجى ذكر تفاصيل المعدات المطلوبة، التخصصات العمالية، مواصفات المواد، أو موقع المشروع الميداني..."
                          }
                          className="form-textarea-editorial"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-muted font-mono-tech">
                          CR: 7054401679
                        </span>

                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-cobalt flex items-center gap-2 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>{locale === "en" ? "TRANSMITTING..." : "جاري الإرسال..."}</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>{t("contactPage.submit")}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Corporate Addresses & Contacts (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Riyadh Corporate Headquarters */}
                <div className="p-8 border border-hairline bg-page rounded-2xl shadow-subtle space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-hairline bg-surface rounded-xl text-brand-cobalt flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display uppercase tracking-tight text-primary">
                        {t("contactPage.riyadhTitle")}
                      </h4>
                      <span className="text-[10px] text-brand-cobalt font-mono-tech uppercase tracking-wider block">
                        {locale === "en" ? "EXECUTIVE HEADQUARTERS" : "المقر التنفيذي والإداري"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed flex items-start gap-2 font-body">
                    <MapPin className="w-4 h-4 text-brand-cobalt flex-shrink-0 mt-0.5" />
                    <span>{t("contactPage.riyadhAddress")}</span>
                  </p>

                  <div className="pt-3 border-t border-hairline space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-cobalt" />
                      <a href="tel:+966173229527" className="font-mono-tech text-primary hover:text-brand-cobalt font-semibold">
                        +966 1732 29527
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Communications Matrix */}
                <div className="p-8 border border-hairline bg-page rounded-2xl shadow-subtle space-y-4">
                  <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-muted pb-2 border-b border-hairline">
                    {t("contactPage.directContacts")}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-3 border border-hairline bg-surface rounded-xl">
                      <span className="text-muted font-medium">Administration:</span>
                      <a href="mailto:admin@aevoryn.net" className="font-mono-tech font-bold text-primary hover:text-brand-cobalt">
                        admin@aevoryn.net
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-hairline bg-surface rounded-xl">
                      <span className="text-muted font-medium">Executive Office (CEO):</span>
                      <a href="mailto:ceo@aevoryn.net" className="font-mono-tech font-bold text-primary hover:text-brand-cobalt">
                        ceo@aevoryn.net
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-hairline bg-surface rounded-xl">
                      <span className="text-muted font-medium">Chairman Office:</span>
                      <a href="mailto:chairman@aevoryn.net" className="font-mono-tech font-bold text-primary hover:text-brand-cobalt">
                        chairman@aevoryn.net
                      </a>
                    </div>
                  </div>
                </div>

                {/* Administrative Address Verification Box */}
                <div className="p-5 border border-amber-500/30 bg-amber-500/5 rounded-xl text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 font-mono-tech uppercase">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{locale === "en" ? "ADDRESS DISCLOSURE & FACILITY NOTICE" : "إفصاح إداري حول مقار ومنشآت الشركة"}</span>
                  </div>
                  <p className="leading-relaxed text-secondary font-body">
                    {t("contactPage.adminVerification")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
