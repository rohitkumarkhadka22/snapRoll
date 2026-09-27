const { generateStream, getInstantReply } = require("../services/aiService");

// =====================================================
// CHAT CONTROLLER
// =====================================================

const chat = async (req, res) => {
  const upstreamController = new AbortController();

  res.on("close", () => {
    if (!res.writableEnded) upstreamController.abort();
  });

  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ error: "Request body must be a JSON object" });
    }

    const { message, conversation } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    if (message.trim().length > 2000) {
      return res
        .status(400)
        .json({ error: "Message must be 2,000 characters or fewer" });
    }

    if (conversation !== undefined && !Array.isArray(conversation)) {
      return res.status(400).json({ error: "Conversation must be an array" });
    }

    if (Array.isArray(conversation) && conversation.length > 16) {
      return res
        .status(400)
        .json({ error: "Conversation cannot exceed 16 messages" });
    }

    if (
      Array.isArray(conversation) &&
      conversation.some(
        (item) =>
          !item ||
          !["user", "assistant"].includes(item.role) ||
          typeof item.content !== "string" ||
          item.content.length > 4000,
      )
    ) {
      return res
        .status(400)
        .json({ error: "Conversation contains an invalid message" });
    }

    // =================================================
    // STREAM HEADERS
    // =================================================

    res.status(200);

    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");

    res.setHeader("Cache-Control", "no-cache, no-transform");

    // Helpful when using nginx/proxies
    res.setHeader("X-Accel-Buffering", "no");

    // =================================================
    // FLUSH HEADERS
    // =================================================

    if (typeof res.flushHeaders === "function") {
      res.flushHeaders();
    }

    const instantReply = getInstantReply(message);
    if (instantReply) {
      res.write(`${JSON.stringify({ token: instantReply })}\n`);
      res.write(`${JSON.stringify({ done: true })}\n`);
      res.end();
      return;
    }

    // =================================================
    // STREAM FROM OLLAMA
    // =================================================

    await generateStream({
      message,
      conversation,
      signal: upstreamController.signal,

      onToken: (token) => {
        // Send each token/chunk to frontend
        res.write(
          JSON.stringify({
            token,
          }) + "\n",
        );
      },
    });

    // =================================================
    // STREAM COMPLETE
    // =================================================

    res.write(
      JSON.stringify({
        done: true,
      }) + "\n",
    );

    res.end();
  } catch (error) {
    if (upstreamController.signal.aborted || res.destroyed) return;

    console.error("Chat request failed:", error?.message || "Unknown error");

    // If headers have already been sent,
    // send an error chunk instead of JSON response.
    if (res.headersSent) {
      res.write(
        JSON.stringify({
          error: "Unable to connect to AI",
        }) + "\n",
      );

      res.end();

      return;
    }

    return res.status(500).json({
      error: "Unable to connect to AI",
    });
  }
};

module.exports = {
  chat,
};
