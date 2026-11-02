// A request budget for the local API, kept in memory and dependency-free like the rest of this
// server's middleware. Reads are generous because one catalogue page pulls a dozen JSON calls; writes
// are capped per client IP rather than tightened to the smallest number that still works, because the
// studio debounces its PATCH by 250ms and a session of dragging sliders legitimately fires dozens.
// A scripted flood still hits the ceiling within a second, which is what the limit is for.
//
// The store is bounded by construction: every window the map is dropped rather than aged entry by
// entry, and a map that reaches its ceiling is cleared outright. Losing a few counts is a better
// failure than growing without limit under a flood of new keys.
export function createRateLimiter({ read = 600, write = 120, windowMs = 60_000, maxTracked = 4096 } = {}) {
  const buckets = new Map();
  let windowStart = Date.now();

  // OPTIONS never changes state, so a CORS preflight is budgeted as a read rather than burning the
  // write allowance on a request that only asks for permission.
  const isWrite = (method) => method !== "GET" && method !== "HEAD" && method !== "OPTIONS";

  return function rateLimit(request, response, next) {
    const now = Date.now();
    if (now - windowStart >= windowMs) {
      buckets.clear();
      windowStart = now;
    }

    const writing = isWrite(request.method);
    const limit = writing ? write : read;
    const key = `${writing ? "w" : "r"}:${request.ip || "unknown"}`;

    let bucket = buckets.get(key);
    if (!bucket) {
      if (buckets.size >= maxTracked) buckets.clear();
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;

    if (bucket.count > limit) {
      const error = new Error("Too many requests to the local API. Try again shortly.");
      error.status = 429;
      error.code = "RATE_LIMITED";
      error.headers = { "Retry-After": String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))) };
      return next(error);
    }
    return next();
  };
}
