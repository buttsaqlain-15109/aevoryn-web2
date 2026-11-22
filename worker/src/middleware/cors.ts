import { Env } from "../types/env";

export function handleCors(request: Request, env: Env): { headers: Headers; isPreflight: boolean } {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = (env.CORS_ORIGIN || "*").split(",").map((s) => s.trim());

  let allowOrigin = "*";
  if (allowedOrigins.includes("*")) {
    allowOrigin = "*";
  } else if (allowedOrigins.includes(origin)) {
    allowOrigin = origin;
  } else if (allowedOrigins.length > 0) {
    allowOrigin = allowedOrigins[0];
  }

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", allowOrigin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  headers.set("Access-Control-Max-Age", "86400");
  headers.set("Vary", "Origin");

  const isPreflight = request.method === "OPTIONS";
  return { headers, isPreflight };
}
