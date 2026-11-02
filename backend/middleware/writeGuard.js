// The one mutating route in this app is PATCH /api/settings. It has no account behind it, because the
// server it runs on is a loopback process owned by the same person using the browser — but "no account"
// is not the same as "no gate". Three checks make the write behave like the admin-ish endpoint it is:
//
//   1. when the server is bound somewhere reachable from outside this machine, writes need a token —
//      and because only a scripted client can hold one, that means a LAN-exposed server is read-only
//      for the browser page by design rather than left open to the network;
//   2. when API_WRITE_TOKEN is configured, the write must carry it, compared without leaking its
//      length or contents through timing;
//   3. a request that carries an Origin must come from the origin the browser is being served from, so
//      a page on somebody else's site cannot push settings into a local instance.
import { createHash, timingSafeEqual } from "node:crypto";

// Addresses that answer on this machine only. Anything else — 0.0.0.0, :: or a LAN interface — means a
// request from another box could arrive, so the write endpoint needs a token to be open at all.
const LOOPBACK_HOSTS = new Set(["127.0.0.1", "::1", "localhost"]);
// The whole 127.0.0.0/8 block is loopback, not just 127.0.0.1 — resolvers on Linux answer on
// 127.0.0.53, and binding there is no more exposed than binding on 127.0.0.1. Anchored to a full
// dotted quad on purpose: "127.0.0.1.nip.io" points at loopback but is a site of its own.
const LOOPBACK_V4 = /^127(?:\.\d{1,3}){3}$/;

export function isLoopbackName(name) {
  const bare = String(name || "").replace(/^\[|\]$/g, "").toLowerCase();
  return LOOPBACK_HOSTS.has(bare) || LOOPBACK_V4.test(bare);
}

// 0.0.0.0 is how the dev server is deliberately exposed on the LAN; it is reachable from outside,
// so it counts as open even though every request still arrives on this machine.
export function isReachableFromOutside(bindHost) {
  if (bindHost === false || bindHost === undefined || bindHost === "") return false;
  return !isLoopbackName(bindHost);
}

function deny(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

// Hashing both sides first means the comparison always runs over 32 bytes, so neither a wrong length
// nor an early byte gives away where a guess went wrong.
function tokenMatches(expected, supplied) {
  const digest = (value) => createHash("sha256").update(String(value)).digest();
  return timingSafeEqual(digest(expected), digest(supplied));
}

// Host identity with the port and the spelling of the interface removed, because the tooling in front
// of this API rewrites both: Vite proxies /api to the API port with changeOrigin, so a write from the
// page at http://127.0.0.1:3000 arrives with Host 127.0.0.1:3001, and a "localhost" address bar
// reaches a server bound to 127.0.0.1.
function canonicalHost(hostname) {
  const bare = String(hostname || "").replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (!bare) return "";
  return isLoopbackName(bare) ? "loopback" : bare;
}

function authorityHost(authority) {
  const value = String(authority || "").trim();
  if (!value) return "";
  return canonicalHost(value.startsWith("[") ? value.slice(0, value.indexOf("]") + 1) : value.split(":")[0]);
}

// The origin the browser reported, against the host this request is being answered on. `Origin` is
// written by the browser and cannot be set from another page, so a site on the public internet cannot
// present a loopback origin, and the page-on-evil.example case fails here however it dresses the rest
// of the request. An opaque origin — `null`, from a file:// or sandboxed context — has no host at all
// and is refused.
function sameOriginAsRequest(origin, request) {
  let parsed;
  try {
    parsed = new URL(origin);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;

  const originHost = canonicalHost(parsed.hostname);
  if (!originHost) return false;
  if (originHost === "loopback") return true;

  const forwardedHost = String(request.headers["x-forwarded-host"] || "").split(",")[0];
  return [request.headers.host, forwardedHost].some((candidate) => authorityHost(candidate) === originHost);
}

export function createWriteGuard({ bindHost = "127.0.0.1", writeToken = "" } = {}) {
  const reachableFromOutside = isReachableFromOutside(bindHost);

  return function writeGuard(request, response, next) {
    // Only requests that could change something are gated; an OPTIONS preflight asks for permission
    // without taking any, and the router has no handler for it, so it ends in a 404 either way.
    if (request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") return next();

    if (reachableFromOutside && !writeToken) {
      return next(deny(403, "WRITE_LOCKED", "This server is reachable from outside this machine, so settings writes require API_WRITE_TOKEN. The page does not carry it: bind HOST=127.0.0.1 to edit settings from the browser."));
    }

    if (writeToken) {
      const header = String(request.headers.authorization || "");
      const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
      if (!supplied || !tokenMatches(writeToken, supplied)) {
        return next(deny(401, "UNAUTHORIZED", "A valid API_WRITE_TOKEN bearer token is required to change settings."));
      }
    }

    const origin = request.headers.origin;
    if (origin && !sameOriginAsRequest(origin, request)) {
      return next(deny(403, "FORBIDDEN_ORIGIN", "This request may only be made from the page served by this API."));
    }

    return next();
  };
}
