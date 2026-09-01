import { useState } from "react";

const faqGroups = [
  {
    label: "Getting Started",
    description: "Everything you need to know before joining an event.",
    items: [
      {
        question: "Do guests need to create an account?",
        answer:
          "No. Guests scan the event's QR code, type in a display name, and start shooting — no sign-up, no password, no app-store detour required.",
      },
      {
        question: "Do I need to download the app to join an event?",
        answer:
          "No. Guests can join an event by scanning its QR code or entering the event code, then choosing a display name. No app download is required to join.",
      },
    ],
  },
  {
    label: "Events & Features",
    description: "How Snaproll works once your event is underway.",
    items: [
      {
        question: "When do we get to see the photos?",
        answer:
          "Photos stay hidden until the host's chosen reveal moment. They can be revealed during the event, right after it ends, or at a scheduled date and time.",
      },
      {
        question: "Is there a limit on guests or photos?",
        answer:
          "Hosts can choose the guest and shot limits for their event. Guest options include 5, 10, 15, 20, 25, or a custom number. Shot options include 20, 35, 50, 100, 200, or unlimited.",
      },
    ],
  },
  {
    label: "Filters",
    description: "Give every event its own visual character.",
    items: [
      {
        question: "What filters can I use?",
        answer:
          "Snaproll offers seven filters: Normal, Vintage, Black & White, Dreamy, Nostalgic, Cool, and Grainy. The host can choose which filters are available for the event.",
      },
    ],
  },
  {
    label: "Pricing",
    description: "Simple and straightforward.",
    items: [
      {
        question: "Is Snaproll free?",
        answer:
          "Yes. Snaproll currently has no in-app purchases or paid tiers.",
      },
    ],
  },
  {
    label: "Account & App",
    description: "A few things worth knowing about the app.",
    items: [
      {
        question: "Can I delete my account and data?",
        answer:
          "Yes. A host can permanently delete their profile and data from within the app.",
      },
      {
        question: "What languages is the app available in?",
        answer:
          "The app is fully translated into five languages: English, Français, Español, Português, and नेपाली.",
      },
      {
        question: "Is Snaproll available on iOS and Android?",
        answer: "Snaproll is designed to be available on both iOS and Android.",
      },
    ],
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState("0-0");

  const toggleItem = (groupIndex, itemIndex) => {
    const id = `${groupIndex}-${itemIndex}`;

    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* HERO */}

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* PHONE */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-8 self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                FAQ
              </p>
            </div>

            <div className="relative h-105 w-52.5 -rotate-6 rounded-[36px] bg-white p-2 shadow-2xl shadow-white/10 transition-transform duration-700 hover:-rotate-3 sm:h-120 sm:w-60">
              <div className="relative h-full w-full overflow-hidden rounded-[29px] bg-neutral-950">
                {/* NOTCH */}
                <div className="absolute left-1/2 top-3 z-30 h-5 w-18 -translate-x-1/2 rounded-full bg-black" />

                {/* HEADER */}
                <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 pt-11">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white">
                    SnapRoll
                  </span>

                  <span className="text-[8px] text-gray-600">01 / 24</span>
                </div>

                {/* CAMERA AREA */}
                <div className="absolute inset-x-4 top-22 bottom-20 overflow-hidden rounded-[22px] bg-neutral-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-[7px] uppercase tracking-[0.3em] text-gray-600">
                        Your Story
                      </span>

                      <p className="mt-3 font-serif text-2xl leading-tight text-gray-700">
                        Little
                        <br />
                        moments.
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-3 rounded-[18px] border border-white/10" />

                  <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-[7px] uppercase tracking-[0.2em] text-gray-500">
                      Vintage
                    </span>
                  </div>
                </div>

                {/* CAMERA BUTTON */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white/20">
                    <div className="h-7 w-7 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-xs text-center text-sm leading-6 text-gray-600 lg:text-left">
              A few answers before you start capturing the moments.
            </p>
          </div>

          {/* HERO TEXT */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">
              Need to know
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
              Questions,
              <br />
              <span className="text-gray-500">without the guesswork.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              From joining an event to choosing filters and revealing the final
              roll, here's what you need to know about Snaproll.
            </p>
          </div>
        </div>

        {/* FADE */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-linear-to-t from-black to-transparent" />
      </section>

      {/* FAQ LIST */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            {/* LEFT SIDE */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                Frequently asked
              </p>

              <h2 className="mt-5 max-w-xs font-serif text-3xl leading-tight sm:text-4xl">
                Everything
                <br />
                <span className="text-gray-500">in one place.</span>
              </h2>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-white/20" />

                <span className="text-[10px] uppercase tracking-[0.22em] text-gray-600">
                  09 questions
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {faqGroups.map((group, groupIndex) => (
                <div
                  key={group.label}
                  className={groupIndex !== 0 ? "mt-16 sm:mt-20" : ""}
                >
                  {/* CATEGORY */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                        {group.label}
                      </span>

                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      {group.description}
                    </p>
                  </div>

                  {/* QUESTIONS */}
                  <div className="border-t border-white/10">
                    {group.items.map((faq, itemIndex) => {
                      const id = `${groupIndex}-${itemIndex}`;
                      const isOpen = openItem === id;

                      /*
                       * Calculate the question number without
                       * mutating any variable during render.
                       */
                      const previousQuestions = faqGroups
                        .slice(0, groupIndex)
                        .reduce(
                          (total, currentGroup) =>
                            total + currentGroup.items.length,
                          0,
                        );

                      const questionNumber = previousQuestions + itemIndex + 1;

                      return (
                        <div
                          key={faq.question}
                          className="border-b border-white/10"
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(groupIndex, itemIndex)}
                            aria-expanded={isOpen}
                            className="group flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                          >
                            <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                              {/* NUMBER */}
                              <span className="pt-1 text-[9px] tracking-[0.2em] text-gray-700">
                                {String(questionNumber).padStart(2, "0")}
                              </span>

                              {/* QUESTION */}
                              <span
                                className={`font-serif text-[17px] leading-6 transition-colors duration-300 sm:text-lg ${
                                  isOpen
                                    ? "text-white"
                                    : "text-gray-300 group-hover:text-white"
                                }`}
                              >
                                {faq.question}
                              </span>
                            </div>

                            {/* ICON */}
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-base font-light transition-all duration-300 ${
                                isOpen
                                  ? "rotate-180 border-white bg-white text-black"
                                  : "border-white/15 text-gray-500 group-hover:border-white/50 group-hover:text-white"
                              }`}
                            >
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>

                          {/* ANSWER */}
                          <div
                            className={`grid transition-all duration-500 ease-in-out ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="pb-6 pl-8 sm:pl-12">
                                <p className="max-w-2xl text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                Snaproll
              </p>
            </div>

            <div>
              <p className="max-w-3xl font-serif text-2xl leading-tight tracking-[-0.02em] sm:text-3xl md:text-4xl">
                The answers are simple.
                <br />
                <span className="text-gray-500">The memories are yours.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
