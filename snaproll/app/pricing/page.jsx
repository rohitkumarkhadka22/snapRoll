import Pricing from "../../src/views/Pricing";

export const metadata = {
  title: "Event photo sharing pricing",
  description:
    "Compare SnapRoll plans for private event galleries, QR-code sharing, guests, and shared photos.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <Pricing />;
}
