/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Cloudflare Pages Function: POST /api/supplier-register
 * ============================================================================
 */

interface Env {
  DB: D1Database;
  SUPPLIER_FILES?: R2Bucket;
  TURNSTILE_SECRET_KEY?: string;
  ADMIN_NOTIFICATION_EMAIL?: string;
  ENVIRONMENT?: string;
}

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
]);

const ALLOWED_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 8;

function sanitizeFilename(filename: string): string {
  const clean = filename
    .replace(/[^a-zA-Z0-9.\-_]/g, "_")
    .replace(/\.{2,}/g, "_")
    .slice(0, 100);
  return clean || "document";
}

async function verifyTurnstile(token: string, secretKey?: string, ip?: string): Promise<boolean> {
  if (!secretKey || secretKey.trim() === "" || secretKey === "dummy_turnstile_secret") {
    // If secret key is not yet configured, allow pass-through for development/testing
    return true;
  }
  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const result: any = await res.json();
    return !!result.success;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

async function sendEmailNotification(env: Env, data: {
  referenceNumber: string;
  companyName: string;
  crNumber: string;
  category: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  docCount: number;
}) {
  const recipient = env.ADMIN_NOTIFICATION_EMAIL || "admin@aevoryn.net";
  const subject = `[New Supplier Submission] ${data.companyName} (${data.referenceNumber})`;
  const bodyText = `New supplier registration submitted on Aevoryn Portal.

Reference Number: ${data.referenceNumber}
Company Name: ${data.companyName}
CR Number: ${data.crNumber}
Category: ${data.category}
Contact Person: ${data.contactName} (${data.contactEmail}, ${data.contactPhone})
Documents Uploaded: ${data.docCount}

Access the admin dashboard at: https://aevoryn-web-17d.pages.dev/admin/suppliers to review and verify this application.`;

  try {
    // Attempt dispatch via MailChannels (standard Cloudflare Pages email gateway)
    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: recipient, name: "Aevoryn Procurement" }] }],
        from: { email: "no-reply@aevoryn.net", name: "Aevoryn Supplier Portal" },
        subject,
        content: [{ type: "text/plain", value: bodyText }],
      }),
    });
  } catch (emailErr) {
    console.warn("Email dispatch notification notice:", emailErr);
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "127.0.0.1";
  const userAgent = request.headers.get("User-Agent") || "";

  // 1. IP Rate Limiting Check (10 requests per 10 minutes)
  if (env.DB) {
    try {
      const now = Math.floor(Date.now() / 1000);
      const windowSec = 600; // 10 minutes
      const rateKey = `rate:sup:${clientIp}`;

      await env.DB.prepare(
        `INSERT INTO rate_limits (key, count, expires_at)
         VALUES (?, 1, ?)
         ON CONFLICT(key) DO UPDATE SET count = count + 1`
      ).bind(rateKey, now + windowSec).run();

      const rateCheck = await env.DB.prepare(
        `SELECT count, expires_at FROM rate_limits WHERE key = ?`
      ).bind(rateKey).first<{ count: number; expires_at: number }>();

      if (rateCheck && rateCheck.expires_at > now && rateCheck.count > 10) {
        return new Response(
          JSON.stringify({
            success: false,
            errors: ["Too many submission attempts from this address. Please try again after 10 minutes."],
          }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (e) {
      console.warn("Rate limit check notice (continuing):", e);
    }
  }

  // 2. Parse Multipart Form Data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, errors: ["Invalid form submission. Multipart form-data expected."] }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Extract and Validate Text Fields
  const companyName = (formData.get("companyName") as string || "").trim();
  const crNumber = (formData.get("crNumber") as string || "").trim();
  const vatNumber = (formData.get("vatNumber") as string || "").trim();
  const yearEstablishedStr = (formData.get("yearEstablished") as string || "").trim();
  const address = (formData.get("address") as string || "").trim();
  const contactName = (formData.get("contactName") as string || "").trim();
  const contactRole = (formData.get("contactRole") as string || "").trim();
  const contactEmail = (formData.get("contactEmail") as string || "").trim().toLowerCase();
  const contactPhone = (formData.get("contactPhone") as string || "").trim();
  const category = (formData.get("category") as string || "").trim();
  const capabilitySummary = (formData.get("capabilitySummary") as string || "").trim();
  const pastClients = (formData.get("pastClients") as string || "").trim();
  const pdplConsent = formData.get("pdplConsent") === "true" || formData.get("pdplConsent") === "on";
  const turnstileToken = (formData.get("turnstileToken") as string || formData.get("cf-turnstile-response") as string || "").trim();

  const errors: string[] = [];

  if (companyName.length < 3) errors.push("Company name must be at least 3 characters.");
  if (!/^\d{10}$/.test(crNumber)) errors.push("CR number must be exactly 10 digits.");
  if (!/^\d{15}$/.test(vatNumber)) errors.push("VAT number must be exactly 15 digits.");

  const yearEstablished = parseInt(yearEstablishedStr, 10);
  const currentYear = new Date().getFullYear();
  if (isNaN(yearEstablished) || yearEstablished < 1900 || yearEstablished > currentYear) {
    errors.push(`Year established must be between 1900 and ${currentYear}.`);
  }

  if (address.length < 5) errors.push("Physical or registered address must be provided.");
  if (contactName.length < 3) errors.push("Contact person name must be at least 3 characters.");
  if (contactRole.length < 2) errors.push("Contact person role/title must be specified.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) errors.push("A valid contact email is required.");
  if (contactPhone.length < 8) errors.push("A valid contact phone number is required.");

  const validCategories = ["materials", "equipment", "manpower", "services", "other"];
  if (!validCategories.includes(category.toLowerCase())) {
    errors.push("Please select a valid supplier category.");
  }

  if (capabilitySummary.length < 10) {
    errors.push("Capability and operational summary must be at least 10 characters.");
  }

  if (!pdplConsent) {
    errors.push("You must review and agree to the Personal Data Protection Law (PDPL) consent terms.");
  }

  // 4. Verify Turnstile
  if (turnstileToken) {
    const isHuman = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp);
    if (!isHuman) {
      errors.push("Security verification failed. Please complete the captcha challenge.");
    }
  }

  // 5. Validate File Uploads
  const docFields = [
    { field: "crCertificate", type: "cr_certificate", label: "Commercial Registration Certificate" },
    { field: "vatCertificate", type: "vat_certificate", label: "VAT Registration Certificate" },
    { field: "nationalAddress", type: "national_address", label: "National Address Proof" },
    { field: "isoCertificates", type: "iso_certificates", label: "ISO Certificates" },
    { field: "companyProfile", type: "company_profile", label: "Company Profile" },
    { field: "bankLetter", type: "bank_letter", label: "Bank Account Letter" },
  ];

  const filesToUpload: Array<{
    field: string;
    type: string;
    file: File;
    sanitizedName: string;
  }> = [];

  for (const item of docFields) {
    const file = formData.get(item.field) as File | null;
    if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${item.label} exceeds the maximum size limit of 10 MB.`);
      }
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(ext)) {
        errors.push(`${item.label} must be a PDF, JPG, or PNG document.`);
      }
      filesToUpload.push({
        field: item.field,
        type: item.type,
        file,
        sanitizedName: sanitizeFilename(file.name),
      });
    }
  }

  if (filesToUpload.length > MAX_FILES) {
    errors.push(`Maximum ${MAX_FILES} documents can be uploaded per submission.`);
  }

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({ success: false, errors }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 6. Generate Unique IDs and Sequence Reference Number
  const submissionId = `sub_${crypto.randomUUID()}`;
  let referenceNumber = `AEV-SUP-${currentYear}-${Math.floor(1000 + Math.random() * 9000)}`;

  if (env.DB) {
    try {
      const countRes = await env.DB.prepare(
        `SELECT COUNT(*) as count FROM supplier_submissions WHERE created_at LIKE ?`
      ).bind(`${currentYear}%`).first<{ count: number }>();
      const seq = (countRes?.count || 0) + 1;
      referenceNumber = `AEV-SUP-${currentYear}-${seq.toString().padStart(4, "0")}`;
    } catch (e) {
      console.warn("Sequence counter notice:", e);
    }
  }

  // 7. Store Files in Private Cloudflare R2 Bucket
  const uploadedDocRecords: Array<{
    id: string;
    docType: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    r2Key: string;
  }> = [];

  for (const item of filesToUpload) {
    const docId = `doc_${crypto.randomUUID().slice(0, 12)}`;
    const r2Key = `suppliers/${submissionId}/${docId}_${item.sanitizedName}`;

    if (env.SUPPLIER_FILES) {
      try {
        const buffer = await item.file.arrayBuffer();
        await env.SUPPLIER_FILES.put(r2Key, buffer, {
          httpMetadata: {
            contentType: item.file.type || "application/octet-stream",
          },
          customMetadata: {
            submissionId,
            docType: item.type,
            originalName: item.sanitizedName,
          },
        });
      } catch (r2Err) {
        console.error("R2 upload error:", r2Err);
      }
    }

    uploadedDocRecords.push({
      id: docId,
      docType: item.type,
      fileName: item.sanitizedName,
      fileSize: item.file.size,
      mimeType: item.file.type || "application/octet-stream",
      r2Key,
    });
  }

  // 8. Record in D1 Database
  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO supplier_submissions (
          id, reference_number, company_name, cr_number, vat_number,
          year_established, address, contact_name, contact_role,
          contact_email, contact_phone, category, capability_summary,
          past_clients, pdpl_consent, status, ip_address, user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?)`
      ).bind(
        submissionId,
        referenceNumber,
        companyName,
        crNumber,
        vatNumber,
        yearEstablished,
        address,
        contactName,
        contactRole,
        contactEmail,
        contactPhone,
        category,
        capabilitySummary,
        pastClients,
        pdplConsent ? 1 : 0,
        clientIp,
        userAgent
      ).run();

      // Insert document attachments
      for (const doc of uploadedDocRecords) {
        await env.DB.prepare(
          `INSERT INTO supplier_documents (
            id, submission_id, doc_type, file_name, file_size, mime_type, r2_key
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          doc.id,
          submissionId,
          doc.docType,
          doc.fileName,
          doc.fileSize,
          doc.mimeType,
          doc.r2Key
        ).run();
      }
    } catch (dbErr: any) {
      console.error("D1 record insertion error:", dbErr);
      return new Response(
        JSON.stringify({
          success: false,
          errors: ["Failed to save submission records. Please try again."],
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // 9. Dispatch Email Notification
  await sendEmailNotification(env, {
    referenceNumber,
    companyName,
    crNumber,
    category,
    contactName,
    contactEmail,
    contactPhone,
    docCount: uploadedDocRecords.length,
  });

  return new Response(
    JSON.stringify({
      success: true,
      referenceNumber,
      message: "Supplier registration successfully submitted.",
      uploadedDocuments: uploadedDocRecords.length,
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
