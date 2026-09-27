export function createEventSlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildEventUrl(name, baseUrl) {
  const normalizedBase = String(baseUrl || "").replace(/\/$/, "");
  const slug = createEventSlug(name) || "demo";
  return `${normalizedBase}/event/${encodeURIComponent(slug)}`;
}

export function buildJoinUrl(name, baseUrl) {
  const normalizedBase = String(baseUrl || "").replace(/\/$/, "");
  return `${normalizedBase}/join/${encodeURIComponent(String(name || "demo").trim() || "demo")}`;
}

export function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
