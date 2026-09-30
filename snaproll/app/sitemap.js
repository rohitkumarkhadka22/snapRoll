const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default function sitemap() {
  const routes = [
    ["", "weekly", 1],
    ["/events", "weekly", 0.9],
    ["/how-it-works", "monthly", 0.8],
    ["/pricing", "monthly", 0.8],
    ["/faq", "monthly", 0.7],
    ["/contact", "yearly", 0.5],
  ];

  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
