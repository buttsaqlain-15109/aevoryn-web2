import { Env } from "../types/env";

/**
 * Sliding Window Database-backed Rate Limiter for Cloudflare D1
 * Limits requests per IP (Default: 30 requests per 60 seconds)
 */
export async function checkRateLimit(
  request: Request,
  env: Env,
  maxRequests = 30,
  windowSeconds = 60
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
    const now = Math.floor(Date.now() / 1000);
    const windowSlot = Math.floor(now / windowSeconds);
    const key = `rl:${clientIp}:${windowSlot}`;

    // Clean up expired keys periodically
    await env.DB.prepare("DELETE FROM rate_limits WHERE expires_at < ?")
      .bind(now)
      .run();

    // Query or insert current slot
    const existing = await env.DB.prepare(
      "SELECT count FROM rate_limits WHERE key = ?"
    )
      .bind(key)
      .first<{ count: number }>();

    if (existing) {
      if (existing.count >= maxRequests) {
        return { allowed: false, remaining: 0 };
      }
      await env.DB.prepare("UPDATE rate_limits SET count = count + 1 WHERE key = ?")
        .bind(key)
        .run();
      return { allowed: true, remaining: maxRequests - (existing.count + 1) };
    } else {
      await env.DB.prepare(
        "INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?)"
      )
        .bind(key, now + windowSeconds)
        .run();
      return { allowed: true, remaining: maxRequests - 1 };
    }
  } catch (err) {
    console.error("Rate limit check warning:", err);
    // Fail open in case of rate-limiting database error to ensure availability
    return { allowed: true, remaining: 10 };
  }
}
