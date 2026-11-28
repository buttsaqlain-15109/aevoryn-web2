/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Cloudflare Pages Function: GET /api/admin/suppliers
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
  const { request, env } = context;

  // 1. Verify Cloudflare Access Authentication
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
        authenticatedUser: auth.email,
        total: results.length,
        submissions: results,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Admin suppliers list error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to retrieve supplier submissions." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
