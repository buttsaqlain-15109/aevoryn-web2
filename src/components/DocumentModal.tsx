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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-surface border border-hairline shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 hairline-b bg-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-hairline bg-wash text-cobalt-accent flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-primary font-display tracking-wide">{document.title}</h3>
              <p className="label-tech text-[10px] text-muted">
                {document.code ? `${document.code} // ` : ""}OFFICIAL AUDIT CREDENTIAL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Document"
              className="btn-outline !h-9 !px-3 text-xs hidden sm:flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              title="Download Document"
              className="btn-cobalt !h-9 !px-4 text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? "Downloaded!" : "Download"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 border border-hairline hover:bg-wash transition-colors text-primary ml-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-page">
          {/* Official Document Editorial Layout */}
          <div className="max-w-2xl mx-auto p-8 sm:p-12 border border-hairline bg-white text-neutral-900 shadow-sm relative">
            {/* Header of Certificate */}
            <div className="text-center space-y-3 pb-6 hairline-b">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image
                  src="/images/aevoryn-logo-circle.png"
                  alt="Aevoryn Official Seal"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="label-tech text-xs text-brand-cobalt">
                {document.body}
              </h4>
              <p className="label-tech text-[10px] text-neutral-500">
                OFFICIAL REGISTRATION REGISTRY
              </p>
              <h2 className="text-2xl font-bold font-display text-neutral-900 tracking-wide">
                {document.title}
              </h2>
            </div>

            {/* Entity Grantee */}
            <div className="py-6 text-center space-y-1.5">
              <p className="label-tech text-[10px] text-neutral-500">MANAGEMENT SYSTEM OF:</p>
              <h3 className="text-xl font-display text-neutral-900 tracking-wide">
                AEVORYN SERVICES & CONTRACTING CO.
              </h3>
              <p className="text-xs text-neutral-600 font-mono">
                CR NUMBER: <strong>7054401679</strong>
              </p>
              <p className="text-xs text-neutral-500 italic max-w-md mx-auto pt-1">
                Operational Facility Site: Baish, Jizan Region, Saudi Arabia
              </p>
            </div>

            {/* Scope Box */}
            <div className="my-4 p-4 border border-neutral-200 bg-neutral-50 text-center">
              <p className="label-tech text-[10px] text-brand-cobalt mb-1">
                CERTIFIED SCOPE OF ACTIVITIES:
              </p>
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                &ldquo;{document.scope}&rdquo;
              </p>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 py-4 border-y border-neutral-200 text-xs font-mono">
              <div>
                <span className="label-tech text-[10px] text-neutral-500 block">
                  {document.type === "aramco" ? "VENDOR CODE" : "CERTIFICATE NO."}
                </span>
                <span className="font-bold text-neutral-900">
                  {document.certNo || document.vendorCode}
                </span>
              </div>
              <div>
                <span className="label-tech text-[10px] text-neutral-500 block">
                  {document.type === "aramco" ? "REGISTRATION DATE" : "ISSUE DATE"}
                </span>
                <span className="text-neutral-700">{document.issueDate}</span>
              </div>
              <div>
                <span className="label-tech text-[10px] text-neutral-500 block">
                  {document.type === "aramco" ? "STATUS" : "EXPIRY DATE"}
                </span>
                <span className="text-neutral-700">{document.expiryDate}</span>
              </div>
            </div>

            {/* Seals & Signatures */}
            <div className="flex items-center justify-between pt-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-amber-600 flex items-center justify-center text-center p-1 font-mono text-[7px] font-bold text-amber-700 uppercase">
                  VERIFIED AUDIT
                </div>
                <div>
                  <p className="label-tech text-[10px] text-neutral-900">Vatsin Certification</p>
                  <p className="text-[9px] text-neutral-500">Accredited Registrar</p>
                </div>
              </div>

              <div className="text-right">
                <div className="w-24 border-b border-neutral-800 mb-1 pb-3 flex justify-end">
                  <span className="italic text-xs text-brand-cobalt">Registrar</span>
                </div>
                <p className="text-[9px] text-neutral-500">Director of Audits</p>
              </div>
            </div>
          </div>

          {/* Location Verification Alert Notice */}
          <div className="max-w-2xl mx-auto p-4 border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5 label-tech text-[10px]">FACILITY REGISTRATION DISCLOSURE</p>
              <p className="leading-relaxed opacity-90">
                {document.locationNote} Commercial operations, client contract execution, and project mobilization reside at our confirmed Riyadh commercial headquarters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
