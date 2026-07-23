/**
 * Minimal in-memory rate limiter.
 *
 * Deliberately not Redis. At this site's traffic a fixed window per IP in
 * process memory is enough to stop a spam script, and it costs nothing to run.
 * The trade-off is that the counter resets on deploy and isn't shared between
 * serverless instances — acceptable for enquiry forms, not for anything
 * security-critical.
 */

type Entry = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

const hits = new Map<string, Entry>();

export function rateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  entry.count += 1;

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now > v.resetAt) hits.delete(k);
    }
  }

  return { allowed: entry.count <= MAX_PER_WINDOW };
}
