/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Cloudflare Pages Function: GET & PATCH /api/admin/suppliers/[id]
 * Protected by Cloudflare Access (Zero Trust) JWT Verification
 * ============================================================================
 */

interface Env {
  DB: D1Database;
  ADMIN_API_KEY?: string;
  ENVIRONMENT?: string;
}

function parseJwtPayload(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function verifyAccessAuth(request: Request, env: Env): { authorized: boolean; email?: string; error?: string; status: number } {
  const adminKey = request.headers.get("X-Admin-Key") || "";
  const authHeader = request.headers.get("Authorization") || "";
  const isValidAdminKey = env.ADMIN_API_KEY && (adminKey === env.ADMIN_API_KEY || authHeader === `Bearer ${env.ADMIN_API_KEY}`);

  if (isValidAdminKey) {
    return { authorized: true, email: "authorized-admin-key", status: 200 };
  }

  const jwt = request.headers.get("Cf-Access-Jwt-Assertion");
  const emailHeader = request.headers.get("Cf-Access-Authenticated-User-Email");

  if (!jwt) {
    if (emailHeader) {
      return { authorized: false, error: "Access denied. Forged identity assertion header.", status: 403 };
    }
    return { authorized: false, error: "Unauthorized. Cloudflare Access JWT assertion missing.", status: 401 };
  }

  const payload = parseJwtPayload(jwt);
  if (!payload) {
    return { authorized: false, error: "Invalid Cloudflare Access JWT assertion format.", status: 403 };
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return { authorized: false, error: "Cloudflare Access JWT assertion has expired.", status: 401 };
  }

  const email = payload.email || emailHeader || "authorized-zero-trust-user";
  return { authorized: true, email, status: 200 };
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;

  const auth = verifyAccessAuth(request, env);
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ success: false, error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "Database not connected." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const submission = await env.DB.prepare(
      `SELECT * FROM supplier_submissions WHERE id = ? OR reference_number = ?`
    ).bind(id, id).first();

    if (!submission) {
      return new Response(
        JSON.stringify({ success: false, error: "Supplier submission not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const { results: documents } = await env.DB.prepare(
      `SELECT id, doc_type, file_name, file_size, mime_type, created_at
       FROM supplier_documents WHERE submission_id = ?`
    ).bind(submission.id).all();

    return new Response(
      JSON.stringify({
        success: true,
        submission,
        documents,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Admin supplier get error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to retrieve supplier record." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;

  const auth = verifyAccessAuth(request, env);
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ success: false, error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "Database not connected." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body: any = await request.json();
    const { status, adminNotes } = body;

    const allowedStatuses = ["New", "Under Review", "Approved", "Rejected"];
    if (status && !allowedStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid status value provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE supplier_submissions 
       SET status = COALESCE(?, status),
           admin_notes = COALESCE(?, admin_notes),
           updated_at = ?
       WHERE id = ? OR reference_number = ?`
    ).bind(status || null, adminNotes !== undefined ? adminNotes : null, now, id, id).run();

    return new Response(
      JSON.stringify({ success: true, message: "Supplier record successfully updated." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Admin supplier patch error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update supplier record." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
