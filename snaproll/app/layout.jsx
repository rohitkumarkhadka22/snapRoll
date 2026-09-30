import "../src/index.css";

import { cookies } from "next/headers";
import Providers from "./providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SnapRoll — Shared event photo experiences",
    template: "%s | SnapRoll",
  },
  description:
    "Create a shared digital disposable camera for weddings, birthdays, parties, graduations, and unforgettable events.",
  applicationName: "SnapRoll",
  keywords: [
    "event photo sharing",
    "digital disposable camera",
    "wedding photo sharing",
    "party photo app",
    "event gallery",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SnapRoll",
    title: "SnapRoll — Shared event photo experiences",
    description: "Let every guest capture candid moments in one private, shared event gallery.",
    url: "/",
    images: [{ url: "/favicon.png", width: 256, height: 256, alt: "SnapRoll" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapRoll — Shared event photo experiences",
    description: "Let every guest capture candid moments in one private, shared event gallery.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("snaproll-language")?.value;
  const initialLanguageCode = ["en", "es", "fr", "pt"].includes(savedLanguage)
    ? savedLanguage
    : null;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SnapRoll",
    url: siteUrl,
    applicationCategory: "PhotographyApplication",
    operatingSystem: "Web",
    description:
      "A shared digital disposable camera experience for weddings, birthdays, parties, graduations, and other events.",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers initialLanguageCode={initialLanguageCode}>{children}</Providers>
      </body>
    </html>
  );
}
