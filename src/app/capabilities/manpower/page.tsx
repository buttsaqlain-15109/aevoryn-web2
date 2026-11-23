"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { RFQModal } from "@/components/RFQModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  HardHat,
  CheckCircle2,
  ShieldCheck,
  Users2,
  Award,
  Clock,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
} from "lucide-react";

export default function ManpowerPage() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const categories = [
    {
      role: locale === "en" ? "HSE & Quality Control Specialists" : "أخصائيو السلامة والصحة المهنية ومراقبو الجودة",
      desc:
        locale === "en"
          ? "Saudi Aramco-approved and OSHA/NEBOSH certified safety officers, environmental coordinators, and QA/QC civil and welding inspectors."
          : "مسؤولو سلامة معتمدون من أرامكو السعودية وحاصلون على شهادات OSHA/NEBOSH، ومنسقو بيئة، ومفتشو ضبط جودة للأعمال المدنية واللحام.",
      skills: ["Aramco / SABIC site work permits", "Risk assessment & incident reporting", "Material test verification"],
    },
    {
      role: locale === "en" ? "Certified Heavy Machinery Operators & Riggers" : "مشغلو آليات ثقيلة وفنيو رفع وتوجيه معتمدون",
      desc:
        locale === "en"
          ? "Third-party certified crane operators, heavy excavator drivers, bulldozer operators, and Level I-III certified riggers for critical lifts."
          : "مشغلو رافعات معتمدون من جهات ثالثة، وسائقو حفارات وجرافات ثقيلة، وفنيو ريجرز (Riggers) معتمدون للمستويات 1-3 لعمليات الرفع الحرجة.",
      skills: ["TUV / Saudi Aramco certified licenses", "Blind and tandem lift competencies", "Daily equipment pre-use check audits"],
    },
    {
      role: locale === "en" ? "Engineering & Technical Supervisors" : "مهندسون ومشرفون فنيون ميدانيون",
      desc:
        locale === "en"
          ? "Degree-qualified site engineers in civil, mechanical, piping, and electrical disciplines backed by experienced general foremen."
          : "مهندسون ميدانيون معتمدون في تخصصات المدني والميكانيك والأنابيب والكهرباء، مدعومون بمشرفين عامين ومراقبي مواقع ذوي خبرة عريقة.",
      skills: ["Daily site progress tracking", "Blueprint & CAD interpretation", "Subcontractor interface management"],
    },
    {
      role: locale === "en" ? "Skilled Industrial Trades & Craftsmen" : "حرفيون وفنيون مهنيون متخصصون",
      desc:
        locale === "en"
          ? "Trade-tested structural steel fixers, 6G ASME pipe welders, industrial electricians, carpenters, pipefitters, and masons."
          : "حدادو تسليح، ولحامو أنابيب معتمدون 6G وفق كود ASME، وفنيو كهرباء صناعية، ونجارو قوالب خرسانية، ومواسيريون وبناؤون.",
      skills: ["Trade-test center verified competency", "Zero-rejection craftsmanship", "Comprehensive PPE compliance"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("capabilities.items.1.title")}
          subtitle={t("capabilities.items.1.subtitle")}
          badge={locale === "en" ? "DIVISION 02 // CERTIFIED WORKFORCE" : "القطاع 02 // الكوادر والعمالة المتخصصة"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: t("capabilities.items.1.title") },
          ]}
          imageSrc="/images/content/manpower.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "WORKFORCE MOBILIZATION" : "حلول القوى العاملة بالمملكة"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Qualified, Compliant & Certified Manpower Mobilization"
                    : "حشد كوادر بشرية مؤهلة ومعتمدة وممتثلة للأنظمة"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Finding technically verified, safe, and legally compliant workforce in Saudi Arabia is one of the chief factors determining project profitability. Aevoryn maintains a deep pipeline of tested professionals ready for rapid deployment to industrial hubs, remote infrastructure sites, and giga-project developments."
                      : "يعد تأمين كوادر فنية مفحوصة وممتثلة للأنظمة من أهم ركائز نجاح وربحية المشاريع الإنشائية والصناعية في المملكة. تمتلك إيفورين شبكة استقطاب وتوظيف واسعة تتيح الحشد السريع للكوادر المؤهلة للمدن الصناعية والمواقع النائية ومشاريع الرؤية الكبرى."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "We take complete responsibility for worker onboarding, trade competency verification, site safety inductions, medical insurance, and ongoing camp welfare under strict adherence to the Saudi Ministry of Human Resources regulations."
                      : "نتحمل المسؤولية الكاملة عن فحص المهارات المهنية، وتدريبات السلامة الإلزامية، والتأمين الطبي الشامل، والإعاشة والإسكان الميداني وفق أعلى معايير وزارة الموارد البشرية والتنمية الاجتماعية."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Mobilize Manpower Now" : "طلب حشد كوادر للمشروع"}
                  </button>
                  <Link
                    href="/contact"
                    className="btn-outline"
                  >
                    {t("hero.contactBtn")}
                  </Link>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-5">
                <div className="relative h-96 border border-hairline bg-page rounded-2xl overflow-hidden shadow-subtle">
                  <Image
                    src="/images/content/manpower.jpg"
                    alt="Certified Industrial Engineers & Technicians"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-white/20 bg-black/75 backdrop-blur-md rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "100% REGULATORY & LABOR COMPLIANT" : "التزام قانوني وتنظيمي 100%"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Full compliance with Qiwa, Muqeem, and Saudi Labor Law regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Grid */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "TECHNICAL DISCIPLINES" : "التخصصات المهنية"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Available Workforce Categories" : "فئات الكوادر المتاحة للحشد الفوري"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Disciplined, pre-screened teams categorized by trade and technical certification level."
                  : "فرق عمل منضبطة ومفحوصة مسبقاً ومصنفة بحسب التخصص ومستوى الاعتماد الفني."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-hairline bg-surface rounded-2xl flex flex-col justify-between space-y-6 hover:border-brand-cobalt transition-all duration-200 shadow-subtle hover:shadow-card-hover"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-brand-cobalt font-bold">
                        DISCIPLINE // 0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-cobalt" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-primary">
                      {cat.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline space-y-2">
                    <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "CERTIFIED CAPABILITIES:" : "القدرات والشهادات المعتمدة:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-secondary font-body">
                      {cat.skills.map((sk, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
      </main>
      <Footer />
    </div>
  );
}
