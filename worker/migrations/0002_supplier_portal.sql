-- ============================================================================
-- AEVORYN SERVICES & CONTRACTING CO.
-- D1 Database Migration: Supplier Registration Portal Schema (0002_supplier_portal.sql)
-- ============================================================================

-- Table 1: Supplier Registration Submissions
CREATE TABLE IF NOT EXISTS supplier_submissions (
    id TEXT PRIMARY KEY,
    reference_number TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    cr_number TEXT NOT NULL,
    vat_number TEXT NOT NULL,
    year_established INTEGER NOT NULL,
    address TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_role TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    category TEXT NOT NULL,
    capability_summary TEXT NOT NULL,
    past_clients TEXT,
    pdpl_consent INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'New',
    admin_notes TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_supplier_submissions_ref ON supplier_submissions(reference_number);
CREATE INDEX IF NOT EXISTS idx_supplier_submissions_cr ON supplier_submissions(cr_number);
CREATE INDEX IF NOT EXISTS idx_supplier_submissions_email ON supplier_submissions(contact_email);
CREATE INDEX IF NOT EXISTS idx_supplier_submissions_category ON supplier_submissions(category);
CREATE INDEX IF NOT EXISTS idx_supplier_submissions_status ON supplier_submissions(status);
CREATE INDEX IF NOT EXISTS idx_supplier_submissions_created ON supplier_submissions(created_at);

-- Table 2: Uploaded Supplier Verification Documents (Stored privately in Cloudflare R2)
CREATE TABLE IF NOT EXISTS supplier_documents (
    id TEXT PRIMARY KEY,
    submission_id TEXT NOT NULL REFERENCES supplier_submissions(id) ON DELETE CASCADE,
    doc_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    r2_key TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_supplier_docs_submission ON supplier_documents(submission_id);
CREATE INDEX IF NOT EXISTS idx_supplier_docs_type ON supplier_documents(doc_type);
