import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Upstash Redis client — singleton across the app.
 * Falls back gracefully if env vars missing (dev-only behavior).
 */
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

/**
 * Rate limiter for contact form submissions.
 * 3 submissions per email per 10 minutes.
 */
export const contactLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
      prefix: "rl:contact",
    })
  : null;

/**
 * Rate limiter for appointment form submissions.
 * 3 submissions per email per 10 minutes.
 */
export const appointmentLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
      prefix: "rl:appointment",
    })
  : null;

/**
 * Result of a rate-limit check.
 */
export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  reset: number; // unix ms timestamp when the window resets
};

/**
 * Check a rate limiter for a given key.
 * Falls open (allows) if the limiter is null (env vars missing in dev) — same
 * behavior as the previous in-memory limiter, but logged so we know.
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  key: string,
  logPrefix: string
): Promise<RateLimitResult> {
  if (!limiter) {
    console.warn(
      `${logPrefix} rate limiter not configured (UPSTASH env vars missing) — allowing request`
    );
    return { allowed: true, remaining: 999, reset: 0 };
  }

  try {
    const { success, remaining, reset } = await limiter.limit(key);
    return { allowed: success, remaining, reset };
  } catch (err) {
    // Fail-open with logging — if Redis is down we don't block all submissions
    console.error(`${logPrefix} rate limit check failed, failing open:`, err);
    return { allowed: true, remaining: 0, reset: 0 };
  }
}
