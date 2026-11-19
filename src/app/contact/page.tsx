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
} from "lucide-react";

export default function ContactPage() {
  const { t, locale, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    division: "infrastructure",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("contactPage.title")}
          subtitle={t("contactPage.subtitle")}
          badge={locale === "en" ? "Commercial & Corporate Enquiries" : "قنوات الاتصال والاستفسارات التجارية"}
          breadcrumbs={[{ label: t("nav.contact") }]}
          imageSrc="/images/content/contact-hero.jpg"
        />

        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-[16px] neu-raised bg-surface space-y-6">
                  <div>
                    <h2 className="text-h2 text-primary font-bold">
                      {t("contactPage.formTitle")}
                    </h2>
                    <p className="body-large text-secondary pt-1">
                      {locale === "en"
                        ? "Complete the inquiry form below. Our commercial estimation team in Riyadh will review your requirements and respond promptly."
                        : "يرجى ملء النموذج أدناه. سيتولى فريق التقدير التجاري بالرياض مراجعة متطلباتكم والتواصل معكم في أسرع وقت."}
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-xl font-bold text-primary">
                        {locale === "en" ? "Inquiry Successfully Transmitted" : "تم إرسال الطلب بنجاح"}
                      </h4>
                      <p className="body-regular text-secondary max-w-md mx-auto leading-relaxed">
                        {t("contactPage.success")}
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary"
                      >
                        {locale === "en" ? "Submit Another Request" : "إرسال طلب آخر"}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">
                            {t("contactPage.fullName")} *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={locale === "en" ? "Eng. Saud Al-Ghamdi" : "م. سعود الغامدي"}
                            className="form-input"
                          />
                        </div>

                        <div>
                          <label className="form-label">
                            {t("contactPage.companyName")} *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder={locale === "en" ? "Contracting & Engineering Co." : "شركة المقاولات والهندسة"}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">
                            {t("contactPage.email")} *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="commercial@company.com"
                            className="form-input"
                          />
                        </div>

                        <div>
                          <label className="form-label">
                            {t("contactPage.phone")} *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+966 5X XXX XXXX"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label">
                          {t("contactPage.division")}
                        </label>
                        <select
                          value={formData.division}
                          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                          className="form-input"
                        >
                          <option value="infrastructure">{t("capabilities.items.0.title")}</option>
                          <option value="manpower">{t("capabilities.items.1.title")}</option>
                          <option value="materials">{t("capabilities.items.2.title")}</option>
                          <option value="equipment">{t("capabilities.items.3.title")}</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label">
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
                          className="form-textarea"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="caption-text text-muted font-mono">
                          CR: 7054401679
                        </span>

                        <button
                          type="submit"
                          className="btn-primary flex items-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{t("contactPage.submit")}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Corporate Addresses & Contacts (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Riyadh Corporate Headquarters */}
                <div className="p-7 rounded-[16px] neu-raised space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-primary">
                        {t("contactPage.riyadhTitle")}
                      </h4>
                      <span className="text-[10px] text-brand-accent font-semibold uppercase tracking-wider">
                        {locale === "en" ? "Executive Headquarters" : "المقر التنفيذي والإداري"}
                      </span>
                    </div>
                  </div>

                  <p className="caption-text text-secondary leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                    <span>{t("contactPage.riyadhAddress")}</span>
                  </p>

                  <div className="pt-2 border-t border-subtle space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-accent" />
                      <a href="tel:+966173229527" className="font-mono text-primary hover:text-brand-accent font-semibold">
                        +966 1732 29527
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Communications Matrix */}
                <div className="p-7 rounded-[16px] neu-raised space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted pb-1 border-b border-subtle">
                    {t("contactPage.directContacts")}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-[8px] neu-inset">
                      <span className="text-muted font-medium">Administration:</span>
                      <a href="mailto:admin@aevoryn.net" className="font-mono font-bold text-primary hover:text-brand-accent">
                        admin@aevoryn.net
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-[8px] neu-inset">
                      <span className="text-muted font-medium">Executive Office (CEO):</span>
                      <a href="mailto:ceo@aevoryn.net" className="font-mono font-bold text-primary hover:text-brand-accent">
                        ceo@aevoryn.net
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-[8px] neu-inset">
                      <span className="text-muted font-medium">Chairman Office:</span>
                      <a href="mailto:chairman@aevoryn.net" className="font-mono font-bold text-primary hover:text-brand-accent">
                        chairman@aevoryn.net
                      </a>
                    </div>
                  </div>
                </div>

                {/* Administrative Address Verification Box */}
                <div className="p-5 rounded-[16px] bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{locale === "en" ? "Address Disclosure & Facility Notice" : "إفصاح إداري حول مقار ومنشآت الشركة"}</span>
                  </div>
                  <p className="leading-relaxed opacity-90">
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
