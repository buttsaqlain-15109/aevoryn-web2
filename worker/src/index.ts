/**
 * ============================================================================
 * AEVORYN SERVICES & CONTRACTING CO.
 * Master Cloudflare Worker API Engine (aevoryn-api)
 * Service URL: https://api.aevoryn.net/
 * ============================================================================
 */

import { Env } from "./types/env";
import { handleCors } from "./middleware/cors";
import { checkRateLimit } from "./middleware/rateLimit";
import { handleContactSubmission } from "./controllers/contactController";
import { handleRfqSubmission } from "./controllers/rfqController";
import { handleHealthCheck } from "./controllers/healthController";
import { handleDocumentsVerification } from "./controllers/documentsController";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const requestId = `req_${crypto.randomUUID().slice(0, 12)}`;
    const url = new URL(request.url);
    const { headers: corsHeaders, isPreflight } = handleCors(request, env);

    // 1. Handle CORS Preflight immediately
    if (isPreflight) {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 2. Global Security Headers
    corsHeaders.set("X-Content-Type-Options", "nosniff");
    corsHeaders.set("X-Frame-Options", "DENY");
    corsHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    corsHeaders.set("X-Request-Id", requestId);

    // 3. Sliding-window Rate Limiter (Protects mutating endpoints)
    if (request.method === "POST") {
      const { allowed, remaining } = await checkRateLimit(request, env, 20, 60);
      corsHeaders.set("X-RateLimit-Remaining", remaining.toString());
      if (!allowed) {
        return new Response(
          JSON.stringify({
            success: false,
            errors: ["Too many requests from this address. Please wait a moment before trying again."],
            timestamp: new Date().toISOString(),
            requestId,
          }),
          { status: 429, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
        );
      }
    }

    const path = url.pathname.replace(/\/+$/, "") || "/";

    try {
      // 4. API Route Dispatcher
      if (request.method === "GET" && (path === "" || path === "/" || path === "/api" || path === "/api/health")) {
        return await handleHealthCheck(env, corsHeaders, requestId);
      }

      if (request.method === "POST" && (path === "/api/contact" || path === "/api/inquiries")) {
        return await handleContactSubmission(request, env, corsHeaders, requestId);
      }

      if (request.method === "POST" && (path === "/api/rfq" || path === "/api/quotation")) {
        return await handleRfqSubmission(request, env, corsHeaders, requestId);
      }

      if (request.method === "GET" && path.startsWith("/api/documents")) {
        return await handleDocumentsVerification(url, corsHeaders, requestId);
      }

      // 5. 404 Route Not Found
      return new Response(
        JSON.stringify({
          success: false,
          errors: [`The requested route '${url.pathname}' does not exist on aevoryn-api.`],
          timestamp: new Date().toISOString(),
          requestId,
        }),
        { status: 404, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      console.error(`[CRITICAL] Unhandled Worker Error (Req ID: ${requestId}):`, error);
      return new Response(
        JSON.stringify({
          success: false,
          errors: ["An unexpected server error occurred."],
          timestamp: new Date().toISOString(),
          requestId,
        }),
        { status: 500, headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" } }
      );
    }
  },
};
