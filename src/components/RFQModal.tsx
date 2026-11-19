"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Building2, Phone, Mail, User, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RFQModal({ isOpen, onClose }: RFQModalProps) {
  const { t, locale, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    division: "infrastructure",
    location: "Riyadh",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate receipt
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface border border-subtle rounded-[16px] shadow-2xl overflow-hidden panel-large">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] flex items-center justify-center bg-brand-primary/10 text-brand-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-primary">
                {locale === "en" ? "Request a Corporate Consultation & RFQ" : "طلب استشارة ومقايسة للمشاريع"}
              </h3>
              <p className="caption-text text-muted">
                {locale === "en"
                  ? "Aevoryn Commercial & Project Estimation Team"
                  : "فريق التقدير التجاري وإدارة المشاريع"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-[6px] btn-secondary text-muted hover:text-primary !h-auto !min-h-0 !p-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-primary">
                {locale === "en" ? "Inquiry Successfully Logged" : "تم تسجيل طلبكم بنجاح"}
              </h4>
              <p className="body-regular text-secondary max-w-md mx-auto leading-relaxed">
                {locale === "en"
                  ? "Thank you for contacting Aevoryn Services & Contracting Co. Our commercial management team in Riyadh has received your requirements and will reply within 24 hours."
                  : "شكراً لتواصلكم مع شركة إيفورين للخدمات والمقاولات. لقد استلم فريقنا التجاري بالرياض متطلباتكم وسيتواصل معكم خلال 24 ساعة."}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="btn-primary"
                >
                  {locale === "en" ? "Close Dialog" : "إغلاق النافذة"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">
                    {locale === "en" ? "Full Name *" : "الاسم الكامل *"}
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={locale === "en" ? "Eng. Ahmed Al-Otaibi" : "م. أحمد العتيبي"}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    {locale === "en" ? "Company / Organization *" : "اسم الشركة / الجهة *"}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={locale === "en" ? "General Contracting Ltd." : "شركة المقاولات العامة"}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">
                    {locale === "en" ? "Business Email *" : "البريد الإلكتروني للعمل *"}
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    {locale === "en" ? "Mobile / Phone Number *" : "رقم الجوال / الهاتف *"}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">
                    {locale === "en" ? "Core Capability Required" : "القطاع المعني"}
                  </label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="form-input"
                  >
                    <option value="infrastructure">
                      {locale === "en" ? "Infrastructure & Civil Support" : "دعم البنية التحتية والأعمال المدنية"}
                    </option>
                    <option value="manpower">
                      {locale === "en" ? "Manpower Supply (Certified Trades)" : "توريد القوى العاملة المعتمدة"}
                    </option>
                    <option value="materials">
                      {locale === "en" ? "Construction Materials Supply" : "توريد مواد البناء والتشييد"}
                    </option>
                    <option value="equipment">
                      {locale === "en" ? "Heavy Equipment Rental & Fleets" : "توريد وتأجير الآليات والمعدات الثقيلة"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="form-label">
                    {locale === "en" ? "Project Region" : "منطقة المشروع"}
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                  >
                    <option value="Riyadh">{locale === "en" ? "Riyadh & Central Province" : "الرياض والمنطقة الوسطى"}</option>
                    <option value="Eastern">{locale === "en" ? "Eastern Province (Dammam / Jubail)" : "المنطقة الشرقية (الدمام / الجبيل)"}</option>
                    <option value="Southern">{locale === "en" ? "Southern Province (Jizan / Baish)" : "المنطقة الجنوبية (جازان / بيش)"}</option>
                    <option value="Western">{locale === "en" ? "Western Province (Jeddah / Red Sea)" : "المنطقة الغربية (جدة / البحر الأحمر)"}</option>
                    <option value="NEOM">{locale === "en" ? "NEOM & Tabuk Region" : "نيوم ومنطقة تبوك"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">
                  {locale === "en" ? "Scope of Requirement / Technical Specifications" : "نطاق الاحتياج والمواصفات الفنية"}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    locale === "en"
                      ? "Describe personnel count, machinery types, material volume, or civil scope required..."
                      : "صف أعداد الكوادر، أنواع المعدات المطلوبة، كميات المواد، أو نطاق الأعمال المدنية..."
                  }
                  className="form-textarea"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="caption-text text-muted flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                  <span>
                    {locale === "en" ? "CR: 7054401679 • Strict Confidentiality" : "س.ت: 7054401679 • سرية تامة للبيانات"}
                  </span>
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary !h-[42px] !min-h-[42px] !px-4"
                  >
                    {locale === "en" ? "Cancel" : "إلغاء"}
                  </button>
                  <button
                    type="submit"
                    className="btn-primary !h-[42px] !min-h-[42px] !px-5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{locale === "en" ? "Submit RFQ" : "إرسال المقايسة"}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
