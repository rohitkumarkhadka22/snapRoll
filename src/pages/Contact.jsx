import { useState } from "react";

import {
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  MessageCircle,
  MousePointer2,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

import useLanguage from "../context/useLanguage";

const Contact = () => {
  const { t } = useLanguage();

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
      newErrors.name = t.contact.nameError;
    }

    if (!form.email.trim()) {
      newErrors.email = t.contact.emailError;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t.contact.emailInvalid;
    }

    if (!form.subject.trim()) {
      newErrors.subject = t.contact.subjectError;
    }

    if (!form.message.trim()) {
      newErrors.message = t.contact.messageError;
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
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-150 w-150 -translate-x-1/2 rounded-full bg-white/[0.035] blur-[160px]" />
        <div className="absolute -left-60 top-[42%] h-125 w-125 rounded-full bg-white/[0.025] blur-[150px]" />
        <div className="absolute -right-60 bottom-[-120px] h-150 w-150 rounded-full bg-white/[0.025] blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-white/30" />
                <span className="text-[9px] uppercase tracking-[0.38em] text-white/35">
                  {t.contact.badge}
                </span>
              </div>

              <h1 className="max-w-5xl font-serif text-[4rem] leading-[0.84] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[9rem]">
                {t.contact.title1}
                <br />
                <span className="text-white/25">{t.contact.title2}</span>
              </h1>
            </div>

            <div className="lg:pb-4">
              <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base">
                {t.contact.description}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                  <MessageCircle size={15} className="text-white/55" />
                </div>

                <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                  {t.contact.sayHello}
                </span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mt-20 h-105 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#060606] sm:h-125 lg:h-145">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.08]" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.08]" />
              <div className="absolute left-[25%] top-0 h-full w-px bg-white/[0.025]" />
              <div className="absolute left-[75%] top-0 h-full w-px bg-white/[0.025]" />
            </div>

            <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[110px]" />

            {/* Status */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-xl sm:left-8 sm:top-8">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

              <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                {t.contact.alwaysRolling}
              </span>
            </div>

            {/* Top right */}
            <div className="absolute right-5 top-5 hidden rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-xl sm:right-8 sm:top-8 sm:block">
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                {t.contact.sharedMemories}
              </span>
            </div>

            {/* PHONE */}
            <div className="absolute left-1/2 top-1/2 h-78 w-47 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] rounded-[2.6rem] border border-white/20 bg-[#111] p-2 shadow-[0_45px_110px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:rotate-0 sm:h-100 sm:w-60 sm:p-2.5">
              <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] border border-white/10 bg-black">
                <div className="absolute left-1/2 top-3 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

                <div className="relative flex h-full flex-col bg-linear-to-b from-[#181818] via-[#090909] to-black px-4 pb-5 pt-12 sm:px-5 sm:pb-6 sm:pt-14">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[6px] uppercase tracking-[0.22em] text-white/30 sm:text-[7px]">
                        {t.contact.summerParty}
                      </p>

                      <p className="mt-1 font-serif text-sm sm:text-base">
                        {t.contact.theGoodStuff}
                      </p>
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Camera size={11} className="text-white/45" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-1.5">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                      <p className="text-[5px] uppercase tracking-wider text-white/25">
                        {t.contact.moments}
                      </p>
                      <p className="mt-1 text-xs">18</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                      <p className="text-[5px] uppercase tracking-wider text-white/25">
                        {t.contact.left}
                      </p>
                      <p className="mt-1 text-xs">06</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2">
                      <p className="text-[5px] uppercase tracking-wider text-white/25">
                        {t.contact.people}
                      </p>
                      <p className="mt-1 text-xs">42</p>
                    </div>
                  </div>

                  {/* Memory grid */}
                  <div className="mt-5 grid flex-1 grid-cols-2 gap-1.5 overflow-hidden">
                    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white/20 via-white/5 to-black">
                      <div className="absolute bottom-2 left-2 h-8 w-8 rounded-full bg-white/10 blur-md" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="relative overflow-hidden rounded-xl bg-linear-to-bl from-white/15 via-white/5 to-black">
                      <div className="absolute right-2 top-3 h-10 w-10 rounded-full bg-white/10 blur-md" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    </div>

                    <div className="relative overflow-hidden rounded-xl bg-linear-to-tr from-white/15 via-black to-white/5">
                      <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-white/10 blur-lg" />
                    </div>

                    <div className="relative overflow-hidden rounded-xl bg-linear-to-tl from-white/20 via-white/5 to-black">
                      <div className="absolute left-2 top-2 h-7 w-7 rounded-full bg-white/10 blur-md" />
                    </div>
                  </div>

                  {/* Shutter */}
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

            {/* Left floating card */}
            <div className="absolute bottom-8 left-5 hidden w-50 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-2xl sm:block lg:left-10 lg:w-56">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                  {t.contact.yourEvent}
                </span>

                <ArrowUpRight size={12} className="text-white/25" />
              </div>

              <p className="mt-3 font-serif text-lg">
                {t.contact.makeMemories}
              </p>

              <div className="mt-4 h-px bg-white/10" />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[8px] text-white/25">
                  {t.contact.oneSharedCamera}
                </span>

                <Camera size={12} className="text-white/35" />
              </div>
            </div>

            {/* Right floating card */}
            <div className="absolute bottom-8 right-5 hidden w-50 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-2xl sm:block lg:right-10 lg:w-56">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Users size={13} className="text-white/45" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                    {t.contact.guests}
                  </p>

                  <p className="mt-1 text-xs text-white/65">
                    {t.contact.guestCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Cursor */}
            <div className="absolute bottom-[27%] left-[30%] hidden items-center gap-2 sm:flex">
              <MousePointer2
                size={20}
                className="rotate-[-12deg] fill-white text-black"
              />

              <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-white/40 backdrop-blur-xl">
                {t.contact.sayHello}
              </span>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.3em] text-white/20">
                <span>{t.contact.snap}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{t.contact.share}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{t.contact.remember}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT AREA */}
      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            {/* INFO CARD */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="absolute right-[-80px] top-[-80px] h-45 w-45 rounded-full bg-white/[0.025] blur-[70px]" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Sparkles size={16} className="text-white/50" />
                </div>

                <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-white/25">
                  {t.contact.getInTouch}
                </p>

                <h2 className="mt-3 font-serif text-3xl leading-[1.05] sm:text-4xl">
                  {t.contact.goodThings}
                  <br />
                  {t.contact.startWithHello}
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-6 text-white/35">
                  {t.contact.contactDescription}
                </p>

                {/* Email */}
                <a
                  href="mailto:snapRoll67@gmail.com"
                  className="group mt-10 flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.06]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2.5"
                        fill="none"
                        stroke="#EA4335"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M4 7l8 6 8-6"
                        fill="none"
                        stroke="#EA4335"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                      {t.contact.emailUs}
                    </p>

                    <p className="mt-1 truncate text-sm text-white/60 transition-colors group-hover:text-white">
                      snapRoll67@gmail.com
                    </p>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="ml-auto shrink-0 text-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60"
                  />
                </a>

                {/* FIND US */}
                <div className="mt-8 border-t border-white/10 pt-7">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                    {t.contact.findUs}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {/* Instagram */}
                    <a
                      href="#"
                      aria-label={`SnapRoll on ${t.contact.instagram}`}
                      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-[9px] uppercase tracking-wider text-white/40 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="5"
                          stroke="url(#instagramGradient)"
                          strokeWidth="1.8"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          r="4"
                          stroke="url(#instagramGradient)"
                          strokeWidth="1.8"
                        />

                        <circle cx="17.5" cy="6.5" r="1" fill="#F56040" />

                        <defs>
                          <linearGradient
                            id="instagramGradient"
                            x1="3"
                            y1="21"
                            x2="21"
                            y2="3"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FFDC80" />
                            <stop offset="0.25" stopColor="#FCAF45" />
                            <stop offset="0.5" stopColor="#F77737" />
                            <stop offset="0.75" stopColor="#E1306C" />
                            <stop offset="1" stopColor="#833AB4" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <span>{t.contact.instagram}</span>

                      <ArrowUpRight
                        size={11}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>

                    {/* TikTok */}
                    <a
                      href="#"
                      aria-label={`SnapRoll on ${t.contact.tiktok}`}
                      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-[9px] uppercase tracking-wider text-white/40 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M14 4v10.2a3.2 3.2 0 1 1-2.6-3.15"
                          stroke="#25F4EE"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M14 4c.4 2.4 1.8 4 4.2 4.6"
                          stroke="#FE2C55"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />

                        <path
                          d="M14 4c.4 2.4 1.8 4 4.2 4.6"
                          stroke="white"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          opacity="0.85"
                        />
                      </svg>

                      <span>{t.contact.tiktok}</span>

                      <ArrowUpRight
                        size={11}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="mt-8 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />

                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                    {t.contact.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] p-6 sm:p-8 lg:p-10">
              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                    {t.contact.dropUsALine}
                  </p>

                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                    {t.contact.tellUsEverything}
                  </h2>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] sm:flex">
                  <Send size={15} className="text-white/30" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/25"
                    >
                      {t.contact.name}
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.contact.yourName}
                      aria-invalid={Boolean(errors.name)}
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
                      className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/25"
                    >
                      {t.contact.email}
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
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
                    className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/25"
                  >
                    {t.contact.subject}
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t.contact.subjectPlaceholder}
                    aria-invalid={Boolean(errors.subject)}
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
                    className="mb-2 block text-[8px] uppercase tracking-[0.22em] text-white/25"
                  >
                    {t.contact.message}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
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

                {/* Submit */}
                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[9px] leading-5 text-white/20">
                    {t.contact.formNote}
                  </p>

                  <button
                    type="submit"
                    className="group relative flex h-13 cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.025] hover:bg-white/90 active:scale-[0.98]"
                  >
                    {submitted ? (
                      <>
                        <span>{t.contact.messageSent}</span>
                        <Check size={15} />
                      </>
                    ) : (
                      <>
                        <span>{t.contact.sendMessage}</span>

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

              {/* Success */}
              {submitted && (
                <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                    <Check size={12} />
                  </div>

                  <span className="whitespace-nowrap text-[9px] text-white/60">
                    {t.contact.successMessage}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070707] px-6 py-16 text-center sm:px-10 sm:py-24">
            <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[110px]" />

            <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.025]" />

            <div className="relative">
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
                {t.contact.readyWhenYouAre}
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                {t.contact.finalTitle1}
                <br />
                <span className="text-white/25">{t.contact.finalTitle2}</span>
              </h2>

              <p className="mx-auto mt-7 max-w-md text-sm leading-6 text-white/30">
                {t.contact.finalDescription}
              </p>

              <a
                href="/events"
                className="group relative mx-auto mt-9 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-xs text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1]"
              >
                {t.contact.buildYourEvent}

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
