"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Building2, Phone, Mail, User, ShieldCheck, Loader2, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitRfq } from "@/lib/api-client";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RFQModal({ isOpen, onClose }: RFQModalProps) {
  const { t, locale, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rfqRef, setRfqRef] = useState<string>("");
  const [apiErrors, setApiErrors] = useState<string[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiErrors([]);

    try {
      const res = await submitRfq({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        division: formData.division,
        projectLocation: formData.location,
        scope: formData.message,
      });

      if (res.success) {
        setSubmitted(true);
        if (res.rfqId) setRfqRef(res.rfqId);
      } else {
        setApiErrors(res.errors || ["Failed to submit RFQ. Please check the form fields."]);
      }
    } catch {
      setApiErrors(["Network connection error. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface rounded-2xl border border-hairline shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 hairline-b bg-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-hairline bg-wash text-cobalt-accent flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-primary font-display tracking-wide">
                {locale === "en" ? "REQUEST A CONSULTATION & RFQ" : "طلب استشارة ومقايسة للمشاريع"}
              </h3>
              <p className="label-tech text-[10px] text-muted">
                {locale === "en"
                  ? "AEVORYN COMMERCIAL ESTIMATION TEAM // SAUDI ARABIA"
                  : "فريق التقدير التجاري وإدارة المشاريع // المملكة العربية السعودية"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-hairline hover:bg-wash transition-colors text-primary"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 bg-page">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 border border-emerald-500/40 bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display text-primary tracking-wide">
                {locale === "en" ? "INQUIRY LOGGED SUCCESSFULLY" : "تم تسجيل طلبكم بنجاح"}
              </h4>
              <p className="body-regular text-secondary max-w-md mx-auto leading-relaxed text-sm">
                {locale === "en"
                  ? "Thank you for contacting Aevoryn Services & Contracting Co. Our commercial management team in Riyadh has received your specifications and will respond promptly."
                  : "شكراً لتواصلكم مع شركة إيفورين للخدمات والمقاولات. لقد استلم فريقنا التجاري بالرياض متطلباتكم وسيتواصل معكم في أقرب وقت."}
              </p>
              {rfqRef && (
                <div className="p-3 border border-hairline bg-surface max-w-xs mx-auto">
                  <span className="text-[10px] font-mono-tech text-muted block">RFQ TRACKING NUMBER</span>
                  <span className="font-mono-tech font-bold text-brand-cobalt text-xs">{rfqRef}</span>
                </div>
              )}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setRfqRef("");
                    onClose();
                  }}
                  className="btn-cobalt"
                >
                  {locale === "en" ? "CLOSE DIALOG" : "إغلاق النافذة"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiErrors.length > 0 && (
                <div className="p-4 border border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold font-mono-tech">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{locale === "en" ? "SUBMISSION ERROR" : "خطأ في الإرسال"}</span>
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
                    {locale === "en" ? "Full Name *" : "الاسم الكامل *"}
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
                    {locale === "en" ? "Company / Organization *" : "اسم الشركة / الجهة *"}
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
                    {locale === "en" ? "Corporate Email *" : "البريد الإلكتروني الرسمي *"}
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="form-input-editorial"
                  />
                </div>

                <div>
                  <label className="form-label-editorial">
                    {locale === "en" ? "Direct Telephone *" : "رقم الاتصال المباشر *"}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label-editorial">
                    {locale === "en" ? "Target Capability Division" : "قطاع الخدمة المطلوب"}
                  </label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="form-input-editorial bg-surface"
                  >
                    <option value="infrastructure">Infrastructure & Project Support</option>
                    <option value="manpower">Manpower Supply & Workforce</option>
                    <option value="materials">Construction Materials Supply</option>
                    <option value="equipment">Heavy Equipment & Machinery Rental</option>
                  </select>
                </div>

                <div>
                  <label className="form-label-editorial">
                    {locale === "en" ? "Jobsite Location" : "موقع المشروع"}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={locale === "en" ? "e.g., Riyadh, Eastern Province, NEOM" : "مثال: الرياض، المنطقة الشرقية"}
                    className="form-input-editorial"
                  />
                </div>
              </div>

              <div>
                <label className="form-label-editorial">
                  {locale === "en" ? "Project Specifications & Scope *" : "المواصفات ونطاق العمل المطلوب *"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    locale === "en"
                      ? "Detail your required equipment types, manpower trades, material volumes, or civil timelines..."
                      : "يرجى ذكر تفاصيل المعدات المطلوبة، التخصصات العمالية، كميات المواد، أو الجداول الزمنية للمشروع..."
                  }
                  className="form-textarea-editorial"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="label-tech text-[10px] text-muted">
                  CR: 7054401679 // ARAMCO: 10120422
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
                      <span>{locale === "en" ? "TRANSMIT INQUIRY" : "إرسال الطلب"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
