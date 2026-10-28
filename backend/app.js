import express from "express";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { gzipSync } from "node:zlib";
import { createApiController } from "./controllers/apiController.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { createApiRoutes } from "./routes/apiRoutes.js";
import { createProjectService } from "./services/projectService.js";
import { createSettingsService } from "./services/settingsService.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Keep this identical to the Content-Security-Policy in vercel.json; Vercel serves the
// production build, this copy lets `node backend/server.js` enforce the same policy locally.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'wasm-unsafe-eval' https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://assets.ccbp.in https://d2clawv67efefq.cloudfront.net https://certificates.ccbp.in https://img.youtube.com https://media-content.ccbp.in https://new-assets.ccbp.in https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com",
  "media-src 'self' blob: https://assets.ccbp.in https://d2clawv67efefq.cloudfront.net",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "connect-src 'self' https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
].join("; ");

const COMPRESSIBLE_TYPE = /^(?:text\/|application\/(?:json|javascript|manifest\+json|x-javascript|xml)|image\/svg\+xml)/;
const COMPRESS_MIN_BYTES = 1024;

// Vite writes every chunk as <name>-<8-char base64url hash>.<ext>, with a hyphen before the
// hash and not a dot. The old hex-only pattern looked for ".<hash>.js", which no filename has,
// so no script or stylesheet ever got an immutable response: every repeat visit revalidated all
// of them. Matching the real alphabet makes the hashed assets in dist/assets fully cacheable.
const IMMUTABLE_ASSET = /-[A-Za-z0-9_-]{8}\.(?:js|css)$/;

// The catalogue JSON is the one payload that changes without its filename changing: a rebuild
// writes a new data/catalog.json with the same URL. Caching it for the same hour as the rest of
// the static files means a returning visitor keeps the old records — and the old certificate
// ids, counts and project list — until the entry expires. Revalidation is cheap (the files are
// gzipped and small), so these are served with a revalidate-every-time header instead.
const REVALIDATED_DATA = /(?:^|[\\/])data[\\/].*\.json$/;

// Express has no compression built in and this app stays dependency-light, so gzip is done
// with node:zlib. Responses are buffered — the largest payload here is a ~290 kB catalog.
function compressWithGzip(request, response, next) {
  const acceptEncoding = request.headers["accept-encoding"] || "";
  const alreadyEncoded = () => response.getHeader("content-encoding");
  if (request.method === "HEAD" || request.headers.range || !/\bgzip\b/i.test(acceptEncoding)) return next();

  const chunks = [];
  const originalWrite = response.write.bind(response);
  const originalEnd = response.end.bind(response);

  const push = (chunk, encoding, callback) => {
    const done = typeof encoding === "function" ? encoding : callback;
    if (chunk && !alreadyEncoded()) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    if (typeof done === "function") done();
    return true;
  };

  response.write = push;
  response.end = (chunk, encoding, callback) => {
    response.write = originalWrite;
    response.end = originalEnd;
    if (chunk) push(chunk, encoding, callback);
    else if (typeof encoding === "function") encoding();
    else if (typeof callback === "function") callback();

    const body = Buffer.concat(chunks);
    if (alreadyEncoded() || body.length < COMPRESS_MIN_BYTES || !COMPRESSIBLE_TYPE.test(String(response.getHeader("content-type") || ""))) {
      return originalEnd(body.length ? body : undefined);
    }
    try {
      const gzipped = gzipSync(body, { level: 6 });
      if (gzipped.length >= body.length) return originalEnd(body);
      response.setHeader("Content-Encoding", "gzip");
      response.setHeader("Vary", "Accept-Encoding");
      response.setHeader("Content-Length", String(gzipped.length));
      return originalEnd(gzipped);
    } catch {
      return originalEnd(body);
    }
  };
  return next();
}

export function createApp({ database, databaseName, staticDirectory = resolve(projectRoot, "dist") }) {
  const app = express();
  const projectService = createProjectService(database.projectRepository);
  const settingsService = createSettingsService(database.settingsRepository);
  const controller = createApiController({
    projects: projectService,
    settings: settingsService,
    portfolio: database.portfolioRepository,
    databaseName,
  });

  app.disable("x-powered-by");
  app.use((_request, response, next) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("X-Frame-Options", "SAMEORIGIN");
    response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
    response.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
    response.setHeader("Content-Security-Policy", CONTENT_SECURITY_POLICY);
    next();
  });
  app.use(compressWithGzip);
  app.use(express.json({ limit: "32kb", strict: true }));
  app.use("/api", createApiRoutes(controller));
  app.use("/api", notFoundHandler);

  if (staticDirectory !== false && existsSync(staticDirectory)) {
    app.use(express.static(staticDirectory, {
      index: false,
      fallthrough: true,
      maxAge: process.env.NODE_ENV === "production" ? "1h" : 0,
      setHeaders(response, path) {
        if (IMMUTABLE_ASSET.test(path)) response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        // The HTML shell is the pointer to every hashed asset, so it must revalidate too — a
        // one-hour-old index.html is how a deploy leaves visitors running the previous build.
        else if (REVALIDATED_DATA.test(path) || /index\.html$/.test(path)) {
          response.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        }
      },
    }));
    app.get("*path", (request, response, next) => {
      if (request.path.startsWith("/api/")) return next();
      response.sendFile(resolve(staticDirectory, "index.html"));
    });
  }

  app.use(errorHandler);
  return app;
}
