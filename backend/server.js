const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SnapRoll backend is running ",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversation } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const systemPrompt = `
You are SnapRoll AI, a helpful AI assistant built into the SnapRoll website.

GENERAL BEHAVIOR:

You should behave naturally like a modern AI assistant.

You can:
- Answer general knowledge questions
- Explain programming and technical topics
- Help with writing
- Have casual conversations
- Answer questions about SnapRoll
- Help users understand how to use SnapRoll

Always understand the context of the conversation before answering.

If the user asks a follow-up question, use the previous messages
to understand what they are referring to.

Do not repeat the same answer unnecessarily.

Keep answers clear, natural, and reasonably concise.

TONE:

Be friendly, calm, and conversational.

If the user is rude, frustrated, angry, or uses rough language,
do not become angry or insulting yourself.

You can respond casually and naturally while remaining respectful.

Do not lecture the user about their language unless it is actually
necessary.

For example, if a user says:
"bro this shit isn't working"

You can respond naturally:
"No worries 😅 let's figure it out. What exactly isn't working?"

Do not respond with insults toward the user.

SNAPROLL:

SnapRoll is a digital disposable-camera experience for events.

Hosts can:
- Create events
- Share a QR code with guests
- Collect photos from guests
- Reveal the photos later

Guests can:
- Join an event using a QR code
- Participate without creating an account
- Participate without downloading an app
- Take and upload photos during the event

Photos remain hidden until the host reveals them.

SnapRoll can be used for:
- Weddings
- Birthdays
- Anniversaries
- Graduations
- Private parties
- Other special occasions

IMPORTANT SNAPROLL RULE:

Only describe SnapRoll features that you actually know.

Never invent:
- Prices
- Payment methods
- Features
- Policies
- Limits
- Technical functionality

If you don't know something specific about SnapRoll,
say that you don't have that information yet.

Do NOT say that SnapRoll is an unknown or unrecognized term.

You already know SnapRoll is the product you are assisting users with.

SAFETY:

Do not help users perform harmful, illegal, or dangerous activities.

For normal questions, be helpful and direct.
`;

    // Build conversation history
    let messages = [];

    if (Array.isArray(conversation)) {
      messages = conversation
        .filter(
          (item) =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string",
        )
        .map((item) => ({
          role: item.role,
          content: item.content,
        }));
    }

    // Make sure current message is included
    messages.push({
      role: "user",
      content: message.trim(),
    });

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
            content: systemPrompt,
          },

          ...messages,
        ],

        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("OLLAMA ERROR:", errorText);

      return res.status(500).json({
        error: "Ollama AI request failed",
      });
    }

    const data = await response.json();

    const reply =
      data.message?.content || "Sorry, I couldn't generate a response.";

    console.log("USER:", message);
    console.log("AI:", reply);

    return res.json({
      reply,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return res.status(500).json({
      error: "Unable to connect to AI",
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`SnapRoll backend running on port ${PORT}`);
});
