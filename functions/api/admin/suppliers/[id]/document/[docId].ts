/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Cloudflare Pages Function: GET /api/admin/suppliers/[id]/document/[docId]
 * Private authenticated document stream from Cloudflare R2
 * ============================================================================
 */

interface Env {
  DB: D1Database;
  SUPPLIER_FILES?: R2Bucket;
  ADMIN_API_KEY?: string;
  ENVIRONMENT?: string;
}

function isAuthorized(request: Request, env: Env): boolean {
  const cfUserEmail = request.headers.get("Cf-Access-Authenticated-User-Email");
  const authHeader = request.headers.get("Authorization") || "";
  const adminKey = request.headers.get("X-Admin-Key") || "";
  const isValidAdminKey = env.ADMIN_API_KEY && (adminKey === env.ADMIN_API_KEY || authHeader === `Bearer ${env.ADMIN_API_KEY}`);
  return !!cfUserEmail || !!isValidAdminKey || env.ENVIRONMENT === "development";
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const submissionId = params.id as string;
  const docId = params.docId as string;

  if (!isAuthorized(request, env)) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized access to private document." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "Database not connected." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const docRecord = await env.DB.prepare(
      `SELECT d.* FROM supplier_documents d
       JOIN supplier_submissions s ON d.submission_id = s.id
       WHERE (s.id = ? OR s.reference_number = ?) AND d.id = ?`
    ).bind(submissionId, submissionId, docId).first<{
      id: string;
      doc_type: string;
      file_name: string;
      mime_type: string;
      r2_key: string;
    }>();

    if (!docRecord) {
      return new Response(
        JSON.stringify({ success: false, error: "Document record not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!env.SUPPLIER_FILES) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Cloudflare R2 private bucket binding (SUPPLIER_FILES) is not configured.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const object = await env.SUPPLIER_FILES.get(docRecord.r2_key);
    if (!object) {
      return new Response(
        JSON.stringify({ success: false, error: "Document file not found in storage." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", docRecord.mime_type || "application/octet-stream");
    headers.set("Content-Disposition", `inline; filename="${encodeURIComponent(docRecord.file_name)}"`);
    headers.set("Cache-Control", "private, no-transform, max-age=300");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "SAMEORIGIN");

    return new Response(object.body, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error("Document download error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to retrieve document." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
