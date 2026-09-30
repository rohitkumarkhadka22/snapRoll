import CreateEvent from "../../../src/views/CreateEvent";

export const metadata = {
  title: "Create an event",
  description: "Create a SnapRoll event and invite guests with a simple QR code.",
  alternates: { canonical: "/events/create" },
  robots: { index: false, follow: true },
};

export default function CreateEventPage() {
  return <CreateEvent />;
}
