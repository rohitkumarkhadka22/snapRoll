import { NextResponse } from "next/server";
import {
  LANGUAGE_CONFIRMATION_COOKIE,
  LANGUAGE_COOKIE,
  languages,
} from "../../src/context/languageConfig";

const SUPPORTED_LANGUAGES = new Set(languages.map(({ code }) => code));

export async function POST(request) {
  const formData = await request.formData();
  const requestedCode = formData.get("code");
  const code = SUPPORTED_LANGUAGES.has(requestedCode) ? requestedCode : "en";
  const acceptsJson = request.headers.get("accept")?.includes("application/json");

  const response = acceptsJson
    ? NextResponse.json({ ok: true, code })
    : new NextResponse(null, {
        status: 303,
        headers: { Location: "/" },
      });
  response.cookies.set(LANGUAGE_COOKIE, code, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  response.cookies.set(LANGUAGE_CONFIRMATION_COOKIE, "true", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
