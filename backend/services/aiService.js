const { getRelevantKnowledge } = require("../data/snaprollKnowledge");

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/chat";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:3b";

const BASE_SYSTEM_PROMPT = `
You are SnapRoll Assistant, the AI assistant built into the SnapRoll website.

You can answer two kinds of questions:
1. General questions, casual conversation, writing help, programming, explanations, etc.
2. Questions about SnapRoll itself.

For SnapRoll questions, the WEBSITE KNOWLEDGE below is your source of truth. Use it instead of guessing.

Rules for SnapRoll:
- Never invent a SnapRoll feature, price, limit, policy, contact detail, or technical behavior.
- If the provided website knowledge does not contain a specific answer, say that you do not have that information yet.
- When information conflicts, prefer the dedicated/current page information explicitly marked as authoritative.
- Do not say SnapRoll is an unknown or unrecognized product.
- If the user asks a follow-up like "what about that one?" use the conversation context.

Conversation style:
- Be natural and conversational, like a helpful modern AI assistant.
- Keep simple questions concise.
- Give enough detail for product questions to be useful.
- Do not dump the entire knowledge base into every answer.
- If the user uses slang, rough wording, or mild profanity, stay calm and respond naturally without insulting them.
- Do not lecture the user about their language unless necessary.

For general questions, answer normally. Do not force SnapRoll into unrelated questions.

WEBSITE KNOWLEDGE:
`;

function cleanConversation(conversation, maxMessages = 16) {
  if (!Array.isArray(conversation)) return [];

  return conversation
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim(),
    )
    .slice(-maxMessages)
    .map((item) => ({
      role: item.role,
      content: item.content.trim(),
    }));
}

async function generateReply({ message, conversation = [] }) {
  const relevantSections = getRelevantKnowledge(message, 4);
  const websiteKnowledge = relevantSections
    .map((section) => `### ${section.title}\n${section.content}`)
    .join("\n\n");

  const messages = [
    {
      role: "system",
      content: `${BASE_SYSTEM_PROMPT}\n${websiteKnowledge}`,
    },
    ...cleanConversation(conversation),
    {
      role: "user",
      content: message.trim(),
    },
  ];

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.4,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama request failed: ${errorText}`);
  }

  const data = await response.json();
  return (
    data.message?.content?.trim() || "Sorry, I couldn't generate a response."
  );
}

module.exports = {
  generateReply,
};
