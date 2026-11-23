# Aevoryn Supplier Registration Portal & Documents Infrastructure

This document details the architecture, deployment instructions, environment variables, and testing procedures for the **Supplier Registration Portal** and **Company Documents Library** deployed on Cloudflare Pages.

---

## 1. System Architecture

```
[EPC Contractors / Suppliers]
         │
         ▼
[Next.js Static Frontend (Cloudflare Pages CDN)]
 ├── /supplier-registration (Multi-step form + PDPL consent)
 ├── /supplier-registration/thank-you (Reference docket: AEV-SUP-YYYY-XXXX)
 ├── /documents (Verified legal & ISO document library)
 └── /admin/suppliers (Procurement ledger protected by Cloudflare Access)
         │
         ▼
[Cloudflare Pages Functions (/functions/api/)]
 ├── POST  /api/supplier-register ────────► [Cloudflare D1: supplier_submissions]
 │    ├── Turnstile anti-bot check        └► [Cloudflare R2: private doc storage]
 │    ├── File validation (10MB, max 8)   └► [Email Dispatch: info@aevoryn.net]
 │    └── Rate-limiting by IP
 │
 └── /api/admin/suppliers/*
      ├── GET   /api/admin/suppliers (List with status filter)
      ├── GET   /api/admin/suppliers/:id (Details & attachments)
      ├── PATCH /api/admin/suppliers/:id (Update status & notes)
      └── GET   /api/admin/suppliers/:id/document/:docId (Secure R2 stream)
```

---

## 2. Infrastructure Setup Commands

Run these commands using Wrangler or execute them in the Cloudflare Dashboard:

### Step A: Apply D1 Database Migration
Execute the migration to create the `supplier_submissions` and `supplier_documents` tables:
```bash
npx wrangler d1 execute aevoryn-production --file=./migrations/0002_supplier_portal.sql --remote
```
*(For local testing: `npx wrangler d1 execute aevoryn-production --file=./migrations/0002_supplier_portal.sql --local`)*

### Step B: Create Private Cloudflare R2 Bucket
Create the private bucket to store uploaded supplier compliance files:
```bash
npx wrangler r2 bucket create aevoryn-supplier-files
```

---

## 3. Cloudflare Pages Bindings & Environment Variables

Navigate to **Cloudflare Dashboard** -> **Workers & Pages** -> **`aevoryn-web`** -> **Settings** -> **Functions**:

### 1. D1 Database Bindings
| Variable name | D1 Database |
| :--- | :--- |
| `DB` | `aevoryn-production` (ID: `2c831b5f-4048-4f97-901e-06198806d401`) |

### 2. R2 Bucket Bindings
| Variable name | R2 Bucket Name |
| :--- | :--- |
| `SUPPLIER_FILES` | `aevoryn-supplier-files` |

### 3. Environment Variables & Secrets
Under **Settings** -> **Environment variables**:
| Variable Name | Required | Description |
| :--- | :---: | :--- |
| `TURNSTILE_SECRET_KEY` | Recommended | Cloudflare Turnstile Secret Key (created in Cloudflare Dashboard -> Turnstile). If omitted, falls back to pass-through in development. |
| `ADMIN_NOTIFICATION_EMAIL`| Required | Target email for new supplier alerts: `info@aevoryn.net` |
| `ADMIN_API_KEY` | Optional | Secure secret token for emergency / automated API queries. |
| `ENVIRONMENT` | Optional | Set to `production` |

---

## 4. Cloudflare Access (Zero Trust) Protection for Admin Portal

No custom password or login code is required on the site because the admin area is secured by Cloudflare Zero Trust:

1. Open **Cloudflare One** (Zero Trust Dashboard) -> **Access** -> **Applications**.
2. Click **Add an Application** -> Select **Self-hosted**.
3. Configure Application:
   - **Application name:** `Aevoryn Procurement Admin`
   - **Application domain:** `aevoryn-web-17d.pages.dev`
   - **Path:** `admin/*` and `api/admin/*`
4. Add Policy:
   - **Policy name:** `Procurement Staff Only`
   - **Action:** `Allow`
   - **Include Rule:** Emails ending in `@aevoryn.net` (or specific email `info@aevoryn.net`).
5. Save Application. Cloudflare Access will automatically prompt users with a One-Time PIN or Google/SSO login and inject the verified `Cf-Access-Authenticated-User-Email` header.

---

## 5. End-to-End Form Testing Guide

### Test 1: Public Documents Library (`/documents`)
1. Open `https://aevoryn-web-17d.pages.dev/documents`.
2. Verify all official records are displayed: Commercial Registration (CR: 7054401679), Saudi Aramco Vendor Record (10120422), and Triple ISO certifications (9001, 14001, 45001).
3. Verify that category filter tabs work.
4. Verify the Saudi Aramco Mandatory Regulatory Disclaimer box is rendered.

### Test 2: Multi-Step Supplier Registration (`/supplier-registration`)
1. Navigate to `/supplier-registration`.
2. **Step 1 (Company Details):** Enter legal name, CR (10 digits e.g. `1010458921`), VAT (15 digits e.g. `300458921000003`), year established (`2019`), and address. Click **Continue**.
3. **Step 2 (Contact Person):** Enter full name, job title, email, and phone (+966...). Click **Continue**.
4. **Step 3 (Category & Capability):** Select category (e.g. Materials), enter operational summary, past client references. Click **Continue**.
5. **Step 4 (Document Uploads):** Attach test PDF or JPG files for CR, VAT, and National Address. Verify size limit (max 10MB) and format validation.
6. **Step 5 (Review & Consent):** Verify the read-only summary, check the mandatory Saudi PDPL data handling consent checkbox.
7. Click **Submit Registration**.
8. Verify redirect to `/supplier-registration/thank-you?ref=AEV-SUP-2026-XXXX`.

### Test 3: Admin Review (`/admin/suppliers`)
1. Open `/admin/suppliers`.
2. Review the list of submissions with status badges (`New`, `Under Review`, `Approved`, `Rejected`).
3. Click **Inspect** on any submission to view full details and attached documents.
4. Test changing status (e.g. to `Under Review` or `Approved`) and saving internal notes.
5. Click **Download** on any document to verify that the file is served with proper headers from private R2 storage without exposing raw storage URLs.

---

## 6. Files to be Supplied by Owner

Place physical scans in `/public/documents/`:
1. `aevoryn-cr-7054401679.pdf` (Commercial Registration)
2. `aevoryn-aramco-vendor-10120422.pdf` (Saudi Aramco Vendor Registration Confirmation)
3. `aevoryn-iso-9001-vc23018822.pdf` (ISO 9001:2015 Certificate)
4. `aevoryn-iso-14001-vc23022982.pdf` (ISO 14001:2015 Certificate)
5. `aevoryn-iso-45001-vc23032689.pdf` (ISO 45001:2018 Certificate)
6. `aevoryn-national-address.pdf` (SPL National Address Certificate)
