const DEFAULT_PORT = 5001;

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseAllowedOrigins(value, nodeEnv = process.env.NODE_ENV) {
  if (value) {
    return value
      .split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean);
  }

  return nodeEnv === "production"
    ? []
    : ["http://localhost:5173", "http://127.0.0.1:5173"];
}

function getConfig(env = process.env) {
  return {
    nodeEnv: env.NODE_ENV || "development",
    port: parsePositiveInteger(env.PORT, DEFAULT_PORT),
    allowedOrigins: parseAllowedOrigins(env.CLIENT_ORIGINS, env.NODE_ENV),
    rateLimitWindowMs: parsePositiveInteger(env.RATE_LIMIT_WINDOW_MS, 60_000),
    rateLimitMax: parsePositiveInteger(env.RATE_LIMIT_MAX, 20),
  };
}

module.exports = { getConfig, parseAllowedOrigins, parsePositiveInteger };
