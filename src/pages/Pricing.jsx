import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import useLanguage from "../context/useLanguage";

const Pricing = () => {
  useLanguage();

  const plans = [
    {
      name: "Free",
      description: "Everything you need to try SnapRoll.",
      price: "$0",
      period: "forever",
      popular: false,
      features: [
        "1 event",
        "Up to 25 guests",
        "Up to 50 photos",
        "QR code sharing",
        "Basic film filters",
        "Private event gallery",
      ],
      button: "Get Started",
      link: "/",
    },
    {
      name: "Event",
      description: "The perfect plan for your next big moment.",
      price: "$9",
      period: "per event",
      popular: true,
      features: [
        "1 complete event",
        "Up to 100 guests",
        "Unlimited photos",
        "Custom event name",
        "All film filters",
        "Private shared gallery",
        "Photo reveal controls",
        "No app download required",
      ],
      button: "Create an Event",
      link: "/",
    },
    {
      name: "Pro",
      description: "For people who never want to miss a memory.",
      price: "$19",
      period: "per month",
      popular: false,
      features: [
        "Unlimited events",
        "Unlimited guests",
        "Unlimited photos",
        "All film filters",
        "Advanced reveal controls",
        "Custom event experiences",
        "Priority support",
        "Everything in Event",
      ],
      button: "Go Pro",
      link: "/",
    },
  ];

  const faqs = [
    {
      question: "Do my guests need to create an account?",
      answer:
        "No. Guests can simply scan the event QR code, enter their name, and start capturing memories. No account or app download is required.",
    },
    {
      question: "What happens after my event?",
      answer:
        "Your photos stay together in your private event gallery so you can revisit the memories whenever you want.",
    },
    {
      question: "Can I control when everyone sees the photos?",
      answer:
        "Yes. SnapRoll lets the host control when photos are revealed, whether that is during the event, after the event, or at a scheduled time.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes. You can choose the experience that fits your event and upgrade when you need more capacity or features.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <div className="mb-6 inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.18em] text-white/60 backdrop-blur-xl">
              <Sparkles size={13} strokeWidth={1.5} />
              SIMPLE PRICING
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="mx-auto max-w-4xl cursor-default font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Simple pricing.
              <br />
              <span className="text-white/40">No surprises.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <p className="mx-auto mt-7 max-w-2xl cursor-default text-base leading-7 text-white/55 sm:text-lg">
              Bring everyone into the moment, capture every memory, and keep
              everything together in one shared event.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          PRICING CARDS
      ========================================================= */}
      <section className="px-6 pb-28 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <ScrollReveal key={plan.name}>
              <div
                className={`group relative flex h-full cursor-default flex-col overflow-hidden rounded-[30px] border p-7 transition-all duration-500 sm:p-8 ${
                  plan.popular
                    ? "border-white/20 bg-white/[0.09] shadow-[0_0_80px_rgba(255,255,255,0.05)]"
                    : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.055]"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute right-5 top-5 cursor-default rounded-full border border-white/10 bg-white px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-black">
                    MOST POPULAR
                  </div>
                )}

                {/* Soft glass highlight */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl transition-all duration-700 group-hover:bg-white/[0.07]" />

                <div className="relative">
                  <p className="cursor-default text-sm font-medium tracking-wide text-white/60">
                    {plan.name}
                  </p>

                  <p className="mt-3 max-w-[220px] cursor-default text-sm leading-6 text-white/40">
                    {plan.description}
                  </p>

                  <div className="mt-8 flex cursor-default items-end gap-2">
                    <span className="font-serif text-5xl tracking-tight sm:text-6xl">
                      {plan.price}
                    </span>

                    <span className="mb-2 text-xs text-white/35">
                      {plan.period}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    to={plan.link}
                    className={`mt-8 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                      plan.popular
                        ? "border-white bg-white text-black hover:bg-white/90"
                        : "border-white/10 bg-white/[0.06] text-white hover:border-white/20 hover:bg-white/[0.1]"
                    }`}
                  >
                    {plan.button}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-white/[0.08]" />

                {/* Features */}
                <div className="relative flex-1">
                  <p className="mb-5 cursor-default text-xs uppercase tracking-[0.16em] text-white/35">
                    Includes
                  </p>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex cursor-default items-start gap-3 text-sm text-white/65"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                          <Check size={11} strokeWidth={2} />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================
          WHY SNAPROLL
      ========================================================= */}
      <section className="border-y border-white/[0.07] px-6 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
              <div>
                <p className="cursor-default text-xs uppercase tracking-[0.2em] text-white/35">
                  Why SnapRoll
                </p>

                <h2 className="mt-5 max-w-md cursor-default font-serif text-4xl leading-tight sm:text-5xl">
                  Your event.
                  <br />
                  <span className="text-white/40">Everyone’s memories.</span>
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="cursor-default">
                  <p className="font-serif text-2xl">No downloads.</p>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    Guests scan a QR code and start capturing. There is nothing
                    to install and no account to create.
                  </p>
                </div>

                <div className="cursor-default">
                  <p className="font-serif text-2xl">One shared roll.</p>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    Everyone contributes to the same collection, making your
                    event feel like one giant disposable camera.
                  </p>
                </div>

                <div className="cursor-default">
                  <p className="font-serif text-2xl">Built for moments.</p>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    From birthdays to weddings, SnapRoll keeps the experience
                    simple so people stay present.
                  </p>
                </div>

                <div className="cursor-default">
                  <p className="font-serif text-2xl">Reveal when ready.</p>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    Keep the photos hidden and reveal them together for a little
                    extra anticipation.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="px-6 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center">
              <p className="cursor-default text-xs uppercase tracking-[0.2em] text-white/35">
                Questions
              </p>

              <h2 className="mt-5 cursor-default font-serif text-4xl sm:text-5xl md:text-6xl">
                Pricing, clarified.
              </h2>

              <p className="mx-auto mt-5 max-w-xl cursor-default text-sm leading-6 text-white/45">
                Everything you need to know before bringing SnapRoll to your
                next event.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((faq) => (
              <ScrollReveal key={faq.question}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                    <span className="font-serif text-lg sm:text-xl">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-transform duration-300 group-open:rotate-45">
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </summary>

                  <p className="max-w-2xl cursor-default pt-4 text-sm leading-7 text-white/45">
                    {faq.answer}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-6 pb-28 sm:px-8 md:pb-36">
        <ScrollReveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.045] px-6 py-16 text-center backdrop-blur-xl sm:px-10 md:py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl" />

            <div className="relative">
              <p className="cursor-default text-xs uppercase tracking-[0.2em] text-white/35">
                Ready?
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl cursor-default font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                Turn your next event into a roll of memories.
              </h2>

              <p className="mx-auto mt-5 max-w-xl cursor-default text-sm leading-6 text-white/45">
                Create an event, share the QR code, and let everyone capture the
                moment together.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white bg-white px-7 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                >
                  Get Started
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  to="/how-it-works"
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-7 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09]"
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Pricing;
