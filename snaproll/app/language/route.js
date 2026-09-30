import { NextResponse } from "next/server";

const SUPPORTED_LANGUAGES = new Set(["en", "es", "fr", "pt"]);

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
  response.cookies.set("snaproll-language", code, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
