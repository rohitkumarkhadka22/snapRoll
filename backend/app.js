const express = require("express");
const cors = require("cors");

const { getConfig } = require("./config");
const chatRoutes = require("./routes/chatRoutes");
const { createRateLimiter } = require("./middleware/rateLimit");

function createApp(overrides = {}) {
  const config = { ...getConfig(), ...overrides };
  const app = express();

  app.disable("x-powered-by");
  if (config.nodeEnv === "production") app.set("trust proxy", 1);

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    next();
  });

  app.use(
    cors({
      origin(origin, callback) {
        if (
          !origin ||
          config.allowedOrigins.includes(origin.replace(/\/$/, ""))
        ) {
          callback(null, true);
          return;
        }
        callback(new Error("Origin is not allowed"));
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
      maxAge: 86_400,
    }),
  );
  app.use(express.json({ limit: "32kb", strict: true }));

  app.get("/health", (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ status: "ok" });
  });

  app.use(
    "/api/chat",
    createRateLimiter({
      windowMs: config.rateLimitWindowMs,
      max: config.rateLimitMax,
    }),
    chatRoutes,
  );

  app.use((req, res) => res.status(404).json({ error: "Not found" }));

  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);

    if (error?.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Request body must be valid JSON" });
    }

    if (error?.message === "Origin is not allowed") {
      return res.status(403).json({ error: "Origin is not allowed" });
    }

    console.error("Unhandled request error", error);
    return res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

module.exports = { createApp };
