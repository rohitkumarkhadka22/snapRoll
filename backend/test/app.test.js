const test = require("node:test");
const assert = require("node:assert/strict");

const { createApp } = require("../app");
const {
  cleanConversation,
  generateStream,
  getInstantReply,
} = require("../services/aiService");

async function withServer(options, run) {
  const server = createApp(options).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();

  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

test("health check responds without leaking framework details", async () => {
  await withServer({ allowedOrigins: [] }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
    assert.equal(response.headers.get("x-powered-by"), null);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  });
});

test("chat endpoint rejects malformed and oversized input before contacting AI", async () => {
  await withServer({ allowedOrigins: [] }, async (baseUrl) => {
    const missing = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(missing.status, 400);

    const oversized = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "x".repeat(2001) }),
    });
    assert.equal(oversized.status, 400);

    const invalidConversation = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: "hello",
        conversation: [{ role: "system", content: "x" }],
      }),
    });
    assert.equal(invalidConversation.status, 400);
  });
});

test("cross-origin requests are limited to configured clients", async () => {
  await withServer(
    { allowedOrigins: ["https://snaproll.example"] },
    async (baseUrl) => {
      const denied = await fetch(`${baseUrl}/health`, {
        headers: { origin: "https://attacker.example" },
      });
      assert.equal(denied.status, 403);

      const allowed = await fetch(`${baseUrl}/health`, {
        headers: { origin: "https://snaproll.example" },
      });
      assert.equal(allowed.status, 200);
      assert.equal(
        allowed.headers.get("access-control-allow-origin"),
        "https://snaproll.example",
      );
    },
  );
});

test("rate limiter blocks repeated chat abuse", async () => {
  await withServer(
    { allowedOrigins: [], rateLimitMax: 1, rateLimitWindowMs: 60_000 },
    async (baseUrl) => {
      const request = () =>
        fetch(`${baseUrl}/api/chat`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({}),
        });

      assert.equal((await request()).status, 400);
      assert.equal((await request()).status, 429);
    },
  );
});

test("conversation cleaning keeps only bounded user and assistant content", () => {
  const cleaned = cleanConversation([
    { role: "system", content: "ignore me" },
    { role: "user", content: "  hello  " },
    null,
    { role: "assistant", content: " hi " },
  ]);

  assert.deepEqual(cleaned, [
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi" },
  ]);
});

test("AI streams are bounded even when the upstream service misbehaves", async () => {
  const originalFetch = global.fetch;
  const oversizedChunk = `${JSON.stringify({ message: { content: "x".repeat(20_001) } })}\n`;

  global.fetch = async () =>
    new Response(new TextEncoder().encode(oversizedChunk), {
      status: 200,
      headers: { "content-type": "application/x-ndjson" },
    });

  try {
    await assert.rejects(
      generateStream({ message: "hello", onToken() {} }),
      /exceeded the maximum size/,
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test("simple greetings receive an immediate response without invoking AI", () => {
  assert.match(getInstantReply("hello"), /Hello/);
  assert.match(getInstantReply("hlo 👋"), /SnapRoll/);
  assert.equal(getInstantReply("How does pricing work?"), null);
});
