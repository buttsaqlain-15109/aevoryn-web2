import { Env } from "../types/env";

export async function handleHealthCheck(
  env: Env,
  corsHeaders: Headers,
  requestId: string
): Promise<Response> {
  const start = Date.now();
  let dbStatus = "healthy";
  let dbLatency = 0;

  try {
    const dbStart = Date.now();
    await env.DB.prepare("SELECT 1").first();
    dbLatency = Date.now() - dbStart;
  } catch (err) {
    dbStatus = "unhealthy";
    console.error("Database health check failed:", err);
  }

  const isHealthy = dbStatus === "healthy";
  return new Response(
    JSON.stringify({
      status: isHealthy ? "operational" : "degraded",
      service: "aevoryn-api",
      version: "1.0.0",
      environment: env.ENVIRONMENT || "production",
      database: {
        status: dbStatus,
        latencyMs: dbLatency,
      },
      region: "APAC",
      uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
      requestId,
    }),
    {
      status: isHealthy ? 200 : 503,
      headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
    }
  );
}
