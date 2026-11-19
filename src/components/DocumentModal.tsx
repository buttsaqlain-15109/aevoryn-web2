"use client";

import React, { useState } from "react";
import { X, Download, Printer, ShieldCheck, CheckCircle2, Award, FileText, AlertTriangle } from "lucide-react";
import Image from "next/image";

export interface DocumentData {
  id: string;
  type: "iso" | "aramco";
  title: string;
  code?: string;
  certNo?: string;
  body: string;
  issueDate: string;
  expiryDate: string;
  scope: string;
  locationNote: string;
  vendorCode?: string;
  eRef?: string;
}

interface DocumentModalProps {
  document: DocumentData | null;
  onClose: () => void;
}

export function DocumentModal({ document, onClose }: DocumentModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!document) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
    // Create text file or simulation download
    const element = window.document.createElement("a");
    const file = new Blob(
      [
        `====================================================\n` +
        `AEVORYN SERVICES & CONTRACTING CO. - OFFICIAL CREDENTIAL\n` +
        `CR Number: 7054401679 | Kingdom of Saudi Arabia\n` +
        `====================================================\n\n` +
        `Document: ${document.title}\n` +
        `Reference / Code: ${document.code || document.vendorCode || "N/A"}\n` +
        `Certificate / E-Ref No: ${document.certNo || document.eRef || "N/A"}\n` +
        `Authority / Body: ${document.body}\n` +
        `Effective Date: ${document.issueDate}\n` +
        `Validity / Expiry: ${document.expiryDate}\n` +
        `Scope: ${document.scope}\n\n` +
        `Location Note: ${document.locationNote}\n` +
        `Verified Domain: https://aevoryn.net\n`
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `Aevoryn-${document.id}-Credential.txt`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-surface border border-subtle rounded-2xl shadow-2xl overflow-hidden neu-raised">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-primary/10 text-brand-primary">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-primary">{document.title}</h3>
              <p className="text-xs text-muted">
                {document.code ? `${document.code} • ` : ""}Official Verification Container
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Document"
              className="btn-secondary !h-[38px] !min-h-[38px] !px-3 text-xs hidden sm:flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              title="Download Document"
              className="btn-primary !h-[38px] !min-h-[38px] !px-4 text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? "Downloaded!" : "Download"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-[6px] btn-secondary !h-[38px] !min-h-[38px] !px-2.5 text-muted hover:text-primary ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-primary/30 space-y-6">
          {/* Certificate Sheet Display */}
          <div className="relative max-w-2xl mx-auto bg-white text-[#172438] p-8 sm:p-12 rounded-xl shadow-xl border-8 border-double border-[#123D70]/20 print:p-0">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#123D70]/40" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#123D70]/40" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#123D70]/40" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#123D70]/40" />

            {/* Document Header */}
            <div className="text-center pb-6 border-b border-[#E2E8F0] space-y-3">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/images/aevoryn-logo-circle.png"
                    alt="Aevoryn Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h4 className="text-sm font-semibold tracking-widest uppercase text-[#123D70]">
                {document.body}
              </h4>
              <p className="text-xs uppercase tracking-widest text-[#64748B]">
                Official Certificate of Registration
              </p>
              <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
                {document.title}
              </h2>
            </div>

            {/* Entity Grantee */}
            <div className="py-6 text-center space-y-2">
              <p className="text-xs text-[#64748B] uppercase tracking-wider">This is to certify that the management system of:</p>
              <h3 className="text-xl font-bold text-[#123D70]">
                AEVORYN SERVICES & CONTRACTING CO.
              </h3>
              <p className="text-xs text-[#475569]">
                CR Number: <strong>7054401679</strong>
              </p>
              <p className="text-xs text-[#64748B] italic max-w-md mx-auto">
                Facility Location: Baish, Jizan Region, Kingdom of Saudi Arabia
              </p>
            </div>

            {/* Scope Box */}
            <div className="my-4 p-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-center">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#123D70] mb-1">
                Certified Scope of Activities:
              </p>
              <p className="text-xs text-[#334155] leading-relaxed font-medium">
                &ldquo;{document.scope}&rdquo;
              </p>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 py-4 border-y border-[#E2E8F0] text-xs">
              <div>
                <span className="block text-[#64748B] text-[10px] uppercase font-semibold">
                  {document.type === "aramco" ? "Vendor Code" : "Certificate No."}
                </span>
                <span className="font-mono font-bold text-[#0B2545]">
                  {document.certNo || document.vendorCode}
                </span>
              </div>
              <div>
                <span className="block text-[#64748B] text-[10px] uppercase font-semibold">
                  {document.type === "aramco" ? "Registration Date" : "Initial Registration"}
                </span>
                <span className="font-medium text-[#334155]">{document.issueDate}</span>
              </div>
              <div>
                <span className="block text-[#64748B] text-[10px] uppercase font-semibold">
                  {document.type === "aramco" ? "Status" : "Expiry Date"}
                </span>
                <span className="font-medium text-[#334155]">{document.expiryDate}</span>
              </div>
            </div>

            {/* Seals & Signatures */}
            <div className="flex items-center justify-between pt-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full gold-seal flex items-center justify-center text-center p-1 text-[8px] font-bold uppercase shadow-inner">
                  Certified ISO Compliance
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#123D70]">Vatsin Certification</p>
                  <p className="text-[9px] text-[#64748B]">Accredited Registrar</p>
                </div>
              </div>

              <div className="text-right">
                <div className="w-24 border-b border-[#0B2545] mb-1 pb-4 flex justify-end">
                  <span className="italic text-xs text-[#123D70]">Authorized Registrar</span>
                </div>
                <p className="text-[9px] text-[#64748B]">Director of Certification</p>
              </div>
            </div>
          </div>

          {/* Location Verification Alert Notice */}
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Corporate & Operational Verification Note</p>
              <p className="leading-relaxed opacity-90">{document.locationNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
