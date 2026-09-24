const { generateStream } = require("../services/aiService");

// =====================================================
// CHAT CONTROLLER
// =====================================================

const chat = async (req, res) => {
  try {
    const { message, conversation } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // =================================================
    // STREAM HEADERS
    // =================================================

    res.status(200);

    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");

    res.setHeader("Cache-Control", "no-cache, no-transform");

    res.setHeader("Connection", "keep-alive");

    // Helpful when using nginx/proxies
    res.setHeader("X-Accel-Buffering", "no");

    // =================================================
    // FLUSH HEADERS
    // =================================================

    if (typeof res.flushHeaders === "function") {
      res.flushHeaders();
    }

    let fullReply = "";

    // =================================================
    // STREAM FROM OLLAMA
    // =================================================

    await generateStream({
      message,
      conversation,

      onToken: (token) => {
        fullReply += token;

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

    console.log("USER:", message.trim());
    console.log("AI:", fullReply.trim());

    res.end();
  } catch (error) {
    console.error("Chat error:", error);

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
