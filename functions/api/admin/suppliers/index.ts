/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Cloudflare Pages Function: GET /api/admin/suppliers
 * Protected by Cloudflare Access (Zero Trust)
 * ============================================================================
 */

interface Env {
  DB: D1Database;
  ADMIN_API_KEY?: string;
  ENVIRONMENT?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // 1. Verify Cloudflare Access Authentication
  const cfUserEmail = request.headers.get("Cf-Access-Authenticated-User-Email");
  const authHeader = request.headers.get("Authorization") || "";
  const adminKey = request.headers.get("X-Admin-Key") || "";
  const isValidAdminKey = env.ADMIN_API_KEY && (adminKey === env.ADMIN_API_KEY || authHeader === `Bearer ${env.ADMIN_API_KEY}`);

  if (!cfUserEmail && !isValidAdminKey && env.ENVIRONMENT !== "development") {
    // If neither Cloudflare Access nor admin key is present
    return new Response(
      JSON.stringify({
        success: false,
        error: "Unauthorized. This endpoint requires Cloudflare Access authentication.",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "Database not connected." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Query Parameters
  const url = new URL(request.url);
  const statusFilter = url.searchParams.get("status");
  const search = url.searchParams.get("search");

  try {
    let query = `
      SELECT 
        s.id,
        s.reference_number,
        s.company_name,
        s.cr_number,
        s.vat_number,
        s.year_established,
        s.category,
        s.contact_name,
        s.contact_email,
        s.contact_phone,
        s.status,
        s.created_at,
        COUNT(d.id) as document_count
      FROM supplier_submissions s
      LEFT JOIN supplier_documents d ON s.id = d.submission_id
    `;
    const params: any[] = [];
    const conditions: string[] = [];

    if (statusFilter && statusFilter !== "ALL") {
      conditions.push("s.status = ?");
      params.push(statusFilter);
    }

    if (search && search.trim()) {
      conditions.push("(s.company_name LIKE ? OR s.cr_number LIKE ? OR s.reference_number LIKE ? OR s.contact_email LIKE ?)");
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` GROUP BY s.id ORDER BY s.created_at DESC LIMIT 100`;

    const stmt = env.DB.prepare(query);
    const bound = params.length > 0 ? stmt.bind(...params) : stmt;
    const { results } = await bound.all();

    return new Response(
      JSON.stringify({
        success: true,
        authenticatedUser: cfUserEmail || "authorized-admin",
        total: results.length,
        submissions: results,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Admin suppliers list error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Failed to query submissions." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
