import Events from "../../src/views/Events";

export const metadata = {
  title: "Photo sharing for weddings, birthdays and events",
  description:
    "Create shared photo experiences for weddings, birthdays, anniversaries, graduations, parties, and other celebrations.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return <Events />;
}
