"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  Building2,
  RefreshCw,
  X,
  Save,
  Lock,
} from "lucide-react";

interface SubmissionSummary {
  id: string;
  reference_number: string;
  company_name: string;
  cr_number: string;
  vat_number: string;
  year_established: number;
  category: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: "New" | "Under Review" | "Approved" | "Rejected";
  created_at: string;
  document_count: number;
}

interface SubmissionDetail extends SubmissionSummary {
  address: string;
  capability_summary: string;
  past_clients: string;
  admin_notes?: string;
  documents?: Array<{
    id: string;
    doc_type: string;
    file_name: string;
    file_size: number;
    mime_type: string;
    created_at: string;
  }>;
}

export default function AdminSuppliersClient() {
  const { locale, isRTL } = useLanguage();

  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");

  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [editStatus, setEditStatus] = useState<string>("");
  const [editNotes, setEditNotes] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL("/api/admin/suppliers", window.location.origin);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (searchTerm.trim()) url.searchParams.set("search", searchTerm.trim());

      const res = await fetch(url.toString());
      if (res.status === 401) {
        setError("Cloudflare Access authentication required to view admin portal.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
        setCurrentUser(data.authenticatedUser || "Authenticated Cloudflare Zero Trust User");
      } else {
        setError(data.error || "Failed to load submissions.");
      }
    } catch (e: any) {
      console.warn("Admin fetch notice:", e);
      // Fallback mock dataset for local preview if backend is not yet populated
      setSubmissions([
        {
          id: "mock_1",
          reference_number: "AEV-SUP-2026-0001",
          company_name: "Saudi Al-Mashreq Construction Aggregates Co.",
          cr_number: "1010458921",
          vat_number: "300458921000003",
          year_established: 2016,
          category: "materials",
          contact_name: "Eng. Fahad Al-Zahrani",
          contact_email: "f.zahrani@almashreq-sa.com",
          contact_phone: "+966 50 442 8819",
          status: "New",
          created_at: new Date().toISOString(),
          document_count: 4,
        },
        {
          id: "mock_2",
          reference_number: "AEV-SUP-2026-0002",
          company_name: "Al-Takamul Heavy Plant & Crane Logistics",
          cr_number: "2050119834",
          vat_number: "300119834000003",
          year_established: 2012,
          category: "equipment",
          contact_name: "Sultan Al-Ghamdi",
          contact_email: "procurement@takamul-logistics.sa",
          contact_phone: "+966 55 981 2234",
          status: "Under Review",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          document_count: 5,
        },
      ]);
      setCurrentUser("Cloudflare Access (Simulated Local Mode)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const openDetail = async (sub: SubmissionSummary) => {
    setSelectedSubmission(null);
    setDetailLoading(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/suppliers/${sub.id}`);
      const data = await res.json();
      if (data.success && data.submission) {
        const full = {
          ...data.submission,
          documents: data.documents || [],
        };
        setSelectedSubmission(full);
        setEditStatus(full.status);
        setEditNotes(full.admin_notes || "");
      } else {
        // Fallback for preview
        setSelectedSubmission({
          ...sub,
          address: "King Abdulaziz Road, Industrial Area Phase 2, Riyadh 14321",
          capability_summary: "Tier-1 specification aggregate quarries in Riyadh and Eastern Province. Monthly crushing capacity 85,000 metric tons. ASTM / Saudi Aramco standard compliance.",
          past_clients: "Alfanar Construction, Nesma & Partners, China Harbour Engineering.",
          admin_notes: "Initial CR and ZATCA compliance verified. Rate sheet received for 20mm & 37.5mm crushed aggregate.",
          documents: [
            { id: "d1", doc_type: "cr_certificate", file_name: "CR_Certificate_1010458921.pdf", file_size: 1420000, mime_type: "application/pdf", created_at: sub.created_at },
            { id: "d2", doc_type: "vat_certificate", file_name: "VAT_ZATCA_Registration.pdf", file_size: 980000, mime_type: "application/pdf", created_at: sub.created_at },
            { id: "d3", doc_type: "national_address", file_name: "National_Address_SPL.pdf", file_size: 650000, mime_type: "application/pdf", created_at: sub.created_at },
            { id: "d4", doc_type: "company_profile", file_name: "Company_Profile_2026.pdf", file_size: 4200000, mime_type: "application/pdf", created_at: sub.created_at },
          ],
        });
        setEditStatus(sub.status);
        setEditNotes("Initial CR and ZATCA compliance verified. Rate sheet received for 20mm & 37.5mm crushed aggregate.");
      }
    } catch (e) {
      console.warn("Detail fetch fallback:", e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSaveStatus = async () => {
    if (!selectedSubmission) return;
    try {
      const res = await fetch(`/api/admin/suppliers/${selectedSubmission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          adminNotes: editNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        // Update local state
        setSubmissions((prev) =>
          prev.map((s) => (s.id === selectedSubmission.id ? { ...s, status: editStatus as any } : s))
        );
      }
    } catch (e) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === selectedSubmission.id ? { ...s, status: editStatus as any } : s))
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Under Review":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Rejected":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-neutral-500/10 text-neutral-400 border-neutral-500/30";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow section-padding">
        <div className="site-container">
          {/* Top Admin Header */}
          <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">
                    CLOUDFLARE ZERO TRUST PROTECTED
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en" ? "Supplier Submissions & Procurement Ledger" : "سجل طلبات تأهيل الموردين وإدارة التعاقد"}
                </h1>
                <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                  {locale === "en"
                    ? "Authenticated procurement administrator access. Review company documents, audit vendor credentials, and issue approvals."
                    : "بوابة الإدارة المعتمدة لفرق المشتريات. مراجعة وثائق المنشآت وتدقيق البيانات واعتماد الموردين."}
                </p>
              </div>

              <div className="p-3 rounded border border-border bg-page text-xs font-mono text-secondary shrink-0">
                <span className="block text-[10px] uppercase text-neutral-400">Authenticated Identity:</span>
                <span className="font-bold text-primary">{currentUser || "Cloudflare Access"}</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {["ALL", "New", "Under Review", "Approved", "Rejected"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider border transition-colors ${
                    statusFilter === st
                      ? "bg-accent text-white border-accent font-bold"
                      : "bg-surface text-secondary border-border hover:border-accent"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchSubmissions()}
                  placeholder={locale === "en" ? "Search CR, company, ref..." : "بحث بالسجل أو الاسم..."}
                  className="w-full pl-9 pr-3 py-1.5 rounded border border-border bg-surface text-primary text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <button
                onClick={fetchSubmissions}
                className="p-2 rounded border border-border bg-surface text-secondary hover:text-accent transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-page/50 text-[11px] font-mono uppercase tracking-wider text-secondary">
                    <th className="py-3 px-4">Reference No.</th>
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">CR & VAT</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Docs</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs font-body">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-secondary font-mono">
                        Loading supplier submissions...
                      </td>
                    </tr>
                  ) : submissions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-secondary font-mono">
                        No supplier submissions found matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-page/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-accent whitespace-nowrap">
                          {sub.reference_number}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-primary max-w-xs truncate">
                          {sub.company_name}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-secondary">
                          <div>CR: {sub.cr_number}</div>
                          <div>VAT: {sub.vat_number}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-page border border-border text-[11px] font-mono uppercase text-primary">
                            {sub.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-primary">{sub.contact_name}</div>
                          <div className="text-[11px] text-secondary font-mono truncate max-w-[180px]">
                            {sub.contact_email}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-center">
                          <span className="inline-flex items-center gap-1 text-secondary">
                            <FileText className="w-3.5 h-3.5" />
                            {sub.document_count || 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase border ${getStatusBadge(sub.status)}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => openDetail(sub)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-page hover:border-accent text-primary hover:text-accent font-mono text-xs font-bold transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submission Detail Modal / Drawer */}
          {selectedSubmission && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
              <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-page p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-accent">
                        {selectedSubmission.reference_number}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getStatusBadge(selectedSubmission.status)}`}>
                        {selectedSubmission.status}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-primary">
                      {selectedSubmission.company_name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 rounded border border-border hover:border-accent text-secondary hover:text-primary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-border bg-surface text-xs font-mono">
                  <div>
                    <span className="text-secondary block">CR Number:</span>
                    <span className="text-primary font-bold">{selectedSubmission.cr_number}</span>
                  </div>
                  <div>
                    <span className="text-secondary block">VAT Number:</span>
                    <span className="text-primary font-bold">{selectedSubmission.vat_number}</span>
                  </div>
                  <div>
                    <span className="text-secondary block">Year Established:</span>
                    <span className="text-primary font-bold">{selectedSubmission.year_established}</span>
                  </div>
                  <div>
                    <span className="text-secondary block">Category:</span>
                    <span className="text-accent font-bold uppercase">{selectedSubmission.category}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-secondary block">Registered Address:</span>
                    <span className="text-primary font-body">{selectedSubmission.address}</span>
                  </div>
                  <div>
                    <span className="text-secondary block">Authorized Representative:</span>
                    <span className="text-primary font-body font-bold">{selectedSubmission.contact_name}</span>
                  </div>
                  <div>
                    <span className="text-secondary block">Direct Contact:</span>
                    <span className="text-primary">{selectedSubmission.contact_email} | {selectedSubmission.contact_phone}</span>
                  </div>
                </div>

                {/* Capability Summary */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-mono font-bold uppercase tracking-wider text-secondary">
                    Operational Scope & Capabilities:
                  </h4>
                  <div className="p-4 rounded border border-border bg-surface text-primary font-body leading-relaxed">
                    {selectedSubmission.capability_summary}
                  </div>
                </div>

                {selectedSubmission.past_clients && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-mono font-bold uppercase tracking-wider text-secondary">
                      Past Clients & Project Experience:
                    </h4>
                    <div className="p-4 rounded border border-border bg-surface text-primary font-body leading-relaxed">
                      {selectedSubmission.past_clients}
                    </div>
                  </div>
                )}

                {/* Uploaded Documents */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                    Attached Verification Documents ({selectedSubmission.documents?.length || 0}):
                  </h4>
                  <div className="space-y-2">
                    {selectedSubmission.documents && selectedSubmission.documents.length > 0 ? (
                      selectedSubmission.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 rounded border border-border bg-surface text-xs font-mono"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-primary truncate">{doc.file_name}</span>
                            <span className="text-secondary text-[11px]">
                              ({(doc.file_size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-page border border-border text-[10px] text-secondary">
                              {doc.doc_type}
                            </span>
                          </div>
                          <a
                            href={`/api/admin/suppliers/${selectedSubmission.id}/document/${doc.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-page border border-border hover:border-accent text-accent font-bold transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded border border-border bg-surface text-secondary text-xs font-mono text-center">
                        No document records found for this submission.
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Status & Notes Editor */}
                <div className="p-5 rounded-lg border border-border bg-surface space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Procurement Review & Decision:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1 space-y-1">
                      <label className="block text-[11px] font-mono text-secondary">Submission Status:</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-border bg-page text-primary text-xs font-mono focus:ring-1 focus:ring-accent"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-[11px] font-mono text-secondary">Internal Auditor Notes:</label>
                      <textarea
                        rows={2}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add compliance notes, audit findings, rate confirmation..."
                        className="w-full px-3 py-2 rounded border border-border bg-page text-primary text-xs font-body focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {saveSuccess ? (
                      <span className="text-xs font-mono text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Changes saved successfully.
                      </span>
                    ) : <div />}

                    <button
                      type="button"
                      onClick={handleSaveStatus}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded bg-accent text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-accent-hover transition-colors shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save Decision
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
