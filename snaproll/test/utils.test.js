import test from "node:test";
import assert from "node:assert/strict";

import {
  buildEventUrl,
  buildJoinUrl,
  createEventSlug,
  getLocalDateInputValue,
} from "../src/utils/eventLinks.js";
import { parseStreamLine } from "../src/utils/ndjson.js";
import { getLanguageByCode } from "../src/context/languageConfig.js";

test("event URLs are normalized and safely encoded", () => {
  assert.equal(createEventSlug("  Sam & Jo's Party!  "), "sam-jo-s-party");
  assert.equal(
    buildEventUrl("Sam & Jo's Party!", "https://snaproll.example/"),
    "https://snaproll.example/event/sam-jo-s-party",
  );
});

test("join links encode user-provided event names", () => {
  assert.equal(
    buildJoinUrl("Sam & Jo", "https://snaproll.example/"),
    "https://snaproll.example/join/Sam%20%26%20Jo",
  );
  assert.equal(getLocalDateInputValue(new Date(2026, 0, 9)), "2026-01-09");
});

test("stream parser preserves server errors instead of swallowing them", () => {
  assert.deepEqual(parseStreamLine('{"token":"hello"}'), { token: "hello" });
  assert.equal(parseStreamLine("not-json"), null);
  assert.throws(() => parseStreamLine('{"error":"service unavailable"}'), {
    message: "service unavailable",
  });
});

test("language selection accepts supported codes and safely falls back to English", () => {
  assert.equal(getLanguageByCode("fr").nativeName, "Français");
  assert.equal(getLanguageByCode("not-supported").code, "en");
});
