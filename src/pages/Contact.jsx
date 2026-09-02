import { useState } from "react";
import {
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  Mail,
  MessageCircle,
  MousePointer2,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "What’s your name?";
    }

    if (!form.email.trim()) {
      newErrors.email = "Where can we reach you?";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "That email doesn’t look quite right.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "What’s this about?";
    }

    if (!form.message.trim()) {
      newErrors.message = "Tell us a little more.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-150 w-150 -translate-x-1/2 rounded-full bg-white/[0.035] blur-[150px]" />

        <div className="absolute -left-60 top-[45%] h-125 w-125 rounded-full bg-white/[0.025] blur-[140px]" />

        <div className="absolute -right-60 bottom-[-100px] h-150 w-150 rounded-full bg-white/[0.025] blur-[150px]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative z-10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-14 lg:grid-cols-[1fr_0.7fr]">
            {/* LEFT */}
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-9 bg-white/30" />

                <span className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                  SnapRoll / Contact
                </span>
              </div>

              <h1 className="max-w-5xl font-serif text-[3.7rem] leading-[0.88] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-[9rem]">
                Let&apos;s
                <br />
                <span className="text-white/30">connect.</span>
              </h1>
            </div>

            {/* RIGHT */}
            <div className="lg:pb-3">
              <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base">
                Have a question, an idea, or an event you&apos;re planning? Tell
                us what you&apos;re thinking. We&apos;re always happy to hear
                from you.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <MessageCircle size={15} className="text-white/60" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                  We&apos;d love to hear from you
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              PREMIUM VISUAL
          ===================================================== */}
          <div className="relative mt-20 h-115 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070707] sm:h-135 lg:h-150">
            {/* Background lines */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />

              <div className="absolute left-[25%] top-0 h-full w-px bg-white/[0.035]" />
              <div className="absolute left-[75%] top-0 h-full w-px bg-white/[0.035]" />
            </div>

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[100px]" />

            {/* Floating labels */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl sm:left-8 sm:top-8">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

              <span className="text-[8px] uppercase tracking-[0.25em] text-white/40">
                Always rolling
              </span>
            </div>

            <div className="absolute right-5 top-5 hidden rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl sm:right-8 sm:top-8 sm:flex">
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                24 moments
              </span>
            </div>

            {/* =================================================
                CAMERA / PHONE OBJECT
            ================================================= */}
            <div className="absolute left-1/2 top-1/2 h-75 w-45 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] rounded-[2.5rem] border border-white/20 bg-[#111] p-2 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-0 sm:h-100 sm:w-60 sm:p-2.5">
              {/* Phone frame */}
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-3 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

                {/* Screen */}
                <div className="relative flex h-full flex-col bg-linear-to-b from-[#161616] via-[#080808] to-black px-4 pb-5 pt-12 sm:px-5 sm:pb-6 sm:pt-14">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[6px] uppercase tracking-[0.2em] text-white/35 sm:text-[7px]">
                        SUMMER PARTY
                      </p>

                      <p className="mt-1 font-serif text-sm sm:text-base">
                        The good stuff.
                      </p>
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Camera size={11} className="text-white/50" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-1.5">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                      <p className="text-[5px] uppercase tracking-wider text-white/30">
                        Moments
                      </p>

                      <p className="mt-1 text-xs">18</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                      <p className="text-[5px] uppercase tracking-wider text-white/30">
                        Left
                      </p>

                      <p className="mt-1 text-xs">06</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                      <p className="text-[5px] uppercase tracking-wider text-white/30">
                        People
                      </p>

                      <p className="mt-1 text-xs">42</p>
                    </div>
                  </div>

                  {/* Photo grid */}
                  <div className="mt-5 grid flex-1 grid-cols-2 gap-1.5 overflow-hidden">
                    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white/20 via-white/5 to-black">
                      <div className="absolute bottom-2 left-2 h-8 w-8 rounded-full bg-white/10 blur-md" />
                    </div>

                    <div className="relative overflow-hidden rounded-xl bg-linear-to-bl from-white/15 via-white/5 to-black">
                      <div className="absolute right-2 top-3 h-10 w-10 rounded-full bg-white/10 blur-md" />
                    </div>

                    <div className="relative overflow-hidden rounded-xl bg-linear-to-tr from-white/15 via-black to-white/5">
                      <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-white/10 blur-lg" />
                    </div>

                    <div className="relative overflow-hidden rounded-xl bg-linear-to-tl from-white/20 via-white/5 to-black">
                      <div className="absolute left-2 top-2 h-7 w-7 rounded-full bg-white/10 blur-md" />
                    </div>
                  </div>

                  {/* Camera button */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white/20 bg-white">
                      <div className="h-8 w-8 rounded-full border border-black/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone buttons */}
              <div className="absolute -left-1 top-25 h-9 w-1 rounded-l-full bg-white/20" />
              <div className="absolute -left-1 top-38 h-9 w-1 rounded-l-full bg-white/20" />
              <div className="absolute -right-1 top-32 h-14 w-1 rounded-r-full bg-white/20" />
            </div>

            {/* LEFT floating card */}
            <div className="absolute bottom-8 left-5 hidden w-45 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-2xl sm:block lg:left-10 lg:w-55">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                  Your event
                </span>

                <ArrowUpRight size={12} className="text-white/30" />
              </div>

              <p className="mt-3 font-serif text-lg">Make memories.</p>

              <div className="mt-4 h-px bg-white/10" />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[8px] text-white/30">Shared camera</span>

                <Camera size={12} className="text-white/40" />
              </div>
            </div>

            {/* RIGHT floating card */}
            <div className="absolute bottom-8 right-5 hidden w-45 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-2xl sm:block lg:right-10 lg:w-55">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Users size={13} className="text-white/50" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Guests
                  </p>

                  <p className="mt-1 text-xs text-white/70">50 people</p>
                </div>
              </div>
            </div>

            {/* Cursor */}
            <div className="absolute bottom-[27%] left-[31%] hidden items-center gap-2 sm:flex">
              <MousePointer2
                size={21}
                className="rotate-[-12deg] fill-white text-black"
              />

              <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-white/50 backdrop-blur-xl">
                Say hello
              </span>
            </div>

            {/* Bottom center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.3em] text-white/20">
                <span>Snap</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Share</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Remember</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT SECTION
      ========================================================= */}
      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            {/* INFO */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <Sparkles size={16} className="text-white/55" />
              </div>

              <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-white/30">
                Get in touch
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Good things
                <br />
                start with hello.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/35">
                Questions about your event? Need some help? Or simply want to
                talk about cameras and memories?
              </p>

              {/* Email */}
              <a
                href="mailto:snapRoll67@gmail.com"
                className="group mt-10 flex items-center gap-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.06]">
                  <Mail size={15} className="text-white/50" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Email us
                  </p>

                  <p className="mt-1 text-sm text-white/65 transition-colors group-hover:text-white">
                    snapRoll67@gmail.com
                  </p>
                </div>

                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60"
                />
              </a>

              {/* Social */}
              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                  Find us
                </p>

                <div className="mt-4 flex gap-2">
                  <a
                    href="#"
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-[9px] uppercase tracking-wider text-white/40 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                  >
                    Instagram
                    <ArrowUpRight
                      size={11}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>

                  <a
                    href="#"
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-[9px] uppercase tracking-wider text-white/40 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                  >
                    TikTok
                    <ArrowUpRight
                      size={11}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="mt-8 flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />

                <span className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                  Usually replies within 24h
                </span>
              </div>
            </div>

            {/* FORM */}
            <div className="relative rounded-[2rem] border border-white/10 bg-[#080808] p-6 sm:p-8 lg:p-10">
              {/* top shine */}
              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                    Drop us a line
                  </p>

                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                    Tell us everything.
                  </h2>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] sm:flex">
                  <Send size={15} className="text-white/35" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/30"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`h-13 w-full rounded-xl border ${
                        errors.name
                          ? "border-white/30 bg-white/[0.045]"
                          : "border-white/10 bg-white/[0.025]"
                      } px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-white/30 focus:bg-white/[0.05]`}
                    />

                    {errors.name && (
                      <p className="mt-2 px-1 text-[9px] text-white/40">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/30"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`h-13 w-full rounded-xl border ${
                        errors.email
                          ? "border-white/30 bg-white/[0.045]"
                          : "border-white/10 bg-white/[0.025]"
                      } px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-white/30 focus:bg-white/[0.05]`}
                    />

                    {errors.email && (
                      <p className="mt-2 px-1 text-[9px] text-white/40">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="mt-5">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/30"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What can we help with?"
                    className={`h-13 w-full rounded-xl border ${
                      errors.subject
                        ? "border-white/30 bg-white/[0.045]"
                        : "border-white/10 bg-white/[0.025]"
                    } px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-white/30 focus:bg-white/[0.05]`}
                  />

                  {errors.subject && (
                    <p className="mt-2 px-1 text-[9px] text-white/40">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/30"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what’s happening..."
                    className={`w-full resize-none rounded-xl border ${
                      errors.message
                        ? "border-white/30 bg-white/[0.045]"
                        : "border-white/10 bg-white/[0.025]"
                    } px-4 py-4 text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-white/15 focus:border-white/30 focus:bg-white/[0.05]`}
                  />

                  {errors.message && (
                    <p className="mt-2 px-1 text-[9px] text-white/40">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Button */}
                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[9px] leading-5 text-white/20">
                    No forms, no fuss. Just tell us what&apos;s on your mind.
                  </p>

                  <button
                    type="submit"
                    className="group relative flex h-13 cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.025] hover:bg-white/90 active:scale-[0.98]"
                  >
                    {submitted ? (
                      <>
                        <span>Message sent</span>
                        <Check size={15} />
                      </>
                    ) : (
                      <>
                        <span>Send message</span>

                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}

                    {!submitted && (
                      <MousePointer2
                        size={17}
                        className="absolute -bottom-5 -right-4 rotate-[-12deg] fill-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100"
                      />
                    )}
                  </button>
                </div>
              </form>

              {/* Success message */}
              {submitted && (
                <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                    <Check size={12} />
                  </div>

                  <span className="whitespace-nowrap text-[9px] text-white/60">
                    Thanks — we&apos;ll be in touch.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025] px-6 py-16 text-center sm:px-10 sm:py-24">
            <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px]" />

            <div className="relative">
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">
                Ready when you are
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Turn your next event
                <br />
                into a <span className="text-white/30">memory.</span>
              </h2>

              <p className="mx-auto mt-7 max-w-md text-sm leading-6 text-white/35">
                Create a shared camera roll and let everyone capture the moments
                you&apos;ll want to keep.
              </p>

              <a
                href="/events"
                className="group relative mx-auto mt-9 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-xs text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1]"
              >
                Build your event
                <ChevronRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
                <MousePointer2
                  size={17}
                  className="absolute -bottom-5 -right-5 rotate-[-12deg] fill-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
