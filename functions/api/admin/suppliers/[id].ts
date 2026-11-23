/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Cloudflare Pages Function: GET & PATCH /api/admin/suppliers/[id]
 * Protected by Cloudflare Access (Zero Trust)
 * ============================================================================
 */

interface Env {
  DB: D1Database;
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
  const id = params.id as string;

  if (!isAuthorized(request, env)) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized access." }),
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
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Failed to fetch submission details." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;

  if (!isAuthorized(request, env)) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized access." }),
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
    const body: any = await request.json();
    const { status, adminNotes } = body;

    const validStatuses = ["New", "Under Review", "Approved", "Rejected"];
    if (status && !validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let updateQuery = `UPDATE supplier_submissions SET updated_at = datetime('now')`;
    const updateParams: any[] = [];

    if (status) {
      updateQuery += `, status = ?`;
      updateParams.push(status);
    }

    if (typeof adminNotes === "string") {
      updateQuery += `, admin_notes = ?`;
      updateParams.push(adminNotes);
    }

    updateQuery += ` WHERE id = ? OR reference_number = ?`;
    updateParams.push(id, id);

    await env.DB.prepare(updateQuery).bind(...updateParams).run();

    return new Response(
      JSON.stringify({ success: true, message: "Supplier submission updated successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Failed to update submission." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
