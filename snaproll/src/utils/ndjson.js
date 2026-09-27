export function parseStreamLine(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed) return null;

  let data;
  try {
    data = JSON.parse(trimmed);
  } catch {
    return null;
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  if (typeof data.error === "string" && data.error) throw new Error(data.error);

  return data;
}
