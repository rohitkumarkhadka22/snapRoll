const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:3b",

        messages: [
          {
            role: "system",
            content: `
You are the official SnapRoll Assistant.

SnapRoll is a digital disposable-camera experience for events.

SnapRoll allows:
- Hosts to create events.
- Guests to join events using a QR code.
- Guests to participate without creating an account.
- Guests to participate without downloading an app.
- Guests to capture and upload photos.
- Photos to remain hidden until the host reveals them.

SnapRoll can be used for weddings, birthdays, parties,
and other celebrations.

Answer naturally and conversationally.

Keep answers clear and helpful.

Only talk about SnapRoll features that you know.
Never invent SnapRoll features, prices, policies, or functionality.

If you don't know something about SnapRoll, say:
"I don't have that information yet."

You can answer general questions briefly, but your main purpose
is to help users understand and use SnapRoll.
            `,
          },
          {
            role: "user",
            content: message.trim(),
          },
        ],

        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Ollama error:", errorText);

      return res.status(500).json({
        error: "AI service failed",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      reply: data.message?.content || "Sorry, I couldn't generate a response.",
    });
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
