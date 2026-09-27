function createRateLimiter({ windowMs, max }) {
  const clients = new Map();

  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of clients) {
      if (entry.resetAt <= now) clients.delete(key);
    }
  }, windowMs);
  cleanup.unref?.();

  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const current = clients.get(key);
    const entry =
      !current || current.resetAt <= now
        ? { count: 0, resetAt: now + windowMs }
        : current;

    entry.count += 1;
    clients.set(key, entry);

    res.setHeader("RateLimit-Limit", String(max));
    res.setHeader(
      "RateLimit-Remaining",
      String(Math.max(0, max - entry.count)),
    );
    res.setHeader("RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));

    if (entry.count > max) {
      res.setHeader(
        "Retry-After",
        String(Math.ceil((entry.resetAt - now) / 1000)),
      );
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again shortly." });
    }

    next();
  };
}

module.exports = { createRateLimiter };
