import express from "express";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
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
  app.use(express.json({ limit: "32kb", strict: true }));
  app.use("/api", createApiRoutes(controller));
  app.use("/api", notFoundHandler);

  if (staticDirectory !== false && existsSync(staticDirectory)) {
    app.use(express.static(staticDirectory, {
      index: false,
      fallthrough: true,
      maxAge: process.env.NODE_ENV === "production" ? "1h" : 0,
      setHeaders(response, path) {
        if (/\.[\da-f]{8,}\.(?:js|css)$/i.test(path)) response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
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
