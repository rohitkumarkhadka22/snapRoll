const { generateReply } = require("../services/aiService");

const chat = async (req, res) => {
  try {
    const { message, conversation } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const reply = await generateReply({
      message,
      conversation,
    });

    console.log("USER:", message.trim());
    console.log("AI:", reply);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);

    return res.status(500).json({
      error: "Unable to connect to AI",
    });
  }
};

module.exports = {
  chat,
};
