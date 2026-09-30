import HowItWorks from "../../src/views/HowItWorks";

export const metadata = {
  title: "How event photo sharing works",
  description:
    "Create an event, share a QR code, let guests capture candid photos, and reveal every memory in one private gallery.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}
