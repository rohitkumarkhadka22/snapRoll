import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";
import useLanguage from "../context/useLanguage";

const Home = () => {
  // =========================================================
  // GLOBAL LANGUAGE
  // =========================================================
  const { t } = useLanguage();

  // =========================================================
  // STEPS
  // =========================================================
  const steps = [
    {
      number: "01",
      title: t.home.steps.create.title,
      text: t.home.steps.create.text,
    },
    {
      number: "02",
      title: t.home.steps.share.title,
      text: t.home.steps.share.text,
    },
    {
      number: "03",
      title: t.home.steps.shoot.title,
      text: t.home.steps.shoot.text,
    },
    {
      number: "04",
      title: t.home.steps.reveal.title,
      text: t.home.steps.reveal.text,
    },
  ];

  const eventUrl = "https://snaproll.app/event/demo";

  return (
    <main className="overflow-hidden bg-black text-white">
      {/* =========================================================
      HERO
      ========================================================== */}
      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-24">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          {/* LEFT CONTENT */}
          <div className="relative z-20 max-w-xl">
            <ScrollReveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-sm">
                {t.home.eyebrow}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <h1 className="font-serif text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                {t.home.heroTitle1}
                <br />
                <span className="text-gray-500">{t.home.heroTitle2}</span>
                <br />
                {t.home.heroTitle3}
                <br className="sm:hidden" /> {t.home.heroTitle4}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="mt-6 max-w-lg text-base leading-7 text-gray-400 sm:mt-7 sm:text-lg sm:leading-8">
                {t.home.heroDescription}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={450}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/events"
                  className="group inline-flex h-13 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-xl hover:shadow-white/10"
                >
                  {t.home.getStarted}

                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/how-it-works"
                  className="group inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
                >
                  {t.home.howItWorks}

                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="mt-8">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-gray-600">
                  {t.home.comingSoon}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {/* APP STORE */}
                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Apple App Store"
                    className="flex h-14 w-40 cursor-pointer items-center gap-3 rounded-xl bg-white px-4 text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-7 w-7 shrink-0 fill-black"
                      aria-hidden="true"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25C11.88 5.02 13.69 3.18 15.78 3c.29 2.58-2.34 4.5-3.75 4.25z" />
                    </svg>

                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="whitespace-nowrap text-[9px] font-medium leading-none text-gray-600">
                        {t.home.downloadOn}
                      </p>

                      <p className="mt-1.5 whitespace-nowrap text-base font-semibold leading-none text-black">
                        {t.home.appStore}
                      </p>
                    </div>
                  </a>

                  {/* GOOGLE PLAY */}
                  <a
                    href="https://play.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Google Play Store"
                    className="flex h-14 w-40 cursor-pointer items-center gap-3 rounded-xl bg-white px-4 text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-7 w-7 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        fill="#34A853"
                        d="M3.27 2.96c-.17.18-.27.46-.27.81v16.46c0 .35.1.63.27.81L12.48 12 3.27 2.96z"
                      />
                      <path
                        fill="#FBBC04"
                        d="m15.55 15.07-3.07-3.07L3.27 21.04c.3.32.8.36 1.37.04l10.91-6.01z"
                      />
                      <path
                        fill="#EA4335"
                        d="m18.99 10.77-3.44-1.9L12.48 12l3.07 3.07 3.45-1.9c.98-.54.98-1.86-.01-2.4z"
                      />
                      <path
                        fill="#4285F4"
                        d="M4.64 2.92c-.57-.32-.1.28-1.37.04L12.48 12l3.07-3.07L4.64 2.92z"
                      />
                    </svg>

                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="whitespace-nowrap text-[9px] font-medium leading-none text-gray-600">
                        {t.home.getItOn}
                      </p>

                      <p className="mt-1.5 whitespace-nowrap text-base font-semibold leading-none text-black">
                        {t.home.googlePlay}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* =====================================================
          RIGHT — SNAPROLL VISUAL
          ====================================================== */}
          <ScrollReveal delay={250} direction="left">
            <div className="relative mx-auto h-135 w-full max-w-150 sm:h-155 lg:h-170">
              {/* MEMORY 02 */}
              <div className="absolute right-[3%] top-[5%] hidden w-53.75 rotate-10 rounded-2xl bg-white p-3 shadow-2xl shadow-white/10 transition-transform duration-700 hover:rotate-7 sm:block lg:right-[8%] lg:w-61.25">
                <div className="flex aspect-4/5 items-center justify-center rounded-xl bg-neutral-900">
                  <div className="text-center">
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-gray-600">
                      {t.home.memory}
                    </span>

                    <span className="mt-2 block font-serif text-3xl text-gray-700">
                      02
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 pt-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black">
                    SnapRoll
                  </span>

                  <span className="text-[9px] text-gray-400">2026</span>
                </div>
              </div>

              {/* PHONE */}
              <div className="absolute left-1/2 top-1/2 z-20 h-117.5 w-58.75 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] transition-transform duration-700 hover:-rotate-1 sm:h-137.5 sm:w-68.75 lg:h-147.5 lg:w-73.75">
                {/* LEFT SIDE BUTTONS */}
                <div className="pointer-events-none absolute -left-4 top-[19%] z-50 flex flex-col gap-5 sm:-left-5">
                  <span className="block h-6 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-7" />

                  <span className="block h-9 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-10" />

                  <span className="block h-9 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-10" />
                </div>

                {/* RIGHT SIDE POWER BUTTON */}
                <div className="pointer-events-none absolute -right-2.5 top-[29%] z-50">
                  <span className="block h-12 w-1 rounded-r-full border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-14" />
                </div>

                {/* OUTER PHONE FRAME */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-[42px]
                    border
                    border-white/30
                    bg-linear-to-br
                    from-white
                    via-gray-200
                    to-gray-500
                    p-1.5
                    shadow-[0_35px_90px_rgba(255,255,255,0.12)]
                    sm:rounded-[48px]
                  "
                >
                  {/* INNER BLACK BODY */}
                  <div
                    className="
                      relative
                      h-full
                      w-full
                      overflow-hidden
                      rounded-[36px]
                      border
                      border-black/80
                      bg-black
                      p-1
                      sm:rounded-[41px]
                    "
                  >
                    {/* SCREEN */}
                    <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-neutral-950 sm:rounded-[36px]">
                      {/* DYNAMIC ISLAND */}
                      <div className="absolute left-1/2 top-2.5 z-40 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-inner sm:top-3 sm:h-8 sm:w-28" />

                      {/* CAMERA DOT */}
                      <div className="absolute left-1/2 top-[18px] z-50 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-700 sm:top-[20px]" />

                      {/* TOP CONTENT */}
                      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 pt-12 sm:px-6 sm:pt-14">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                          SnapRoll
                        </span>

                        <span className="text-[9px] text-gray-500">
                          01 / 24
                        </span>
                      </div>

                      {/* MAIN SCREEN CONTENT */}
                      <div className="flex h-full flex-col justify-end p-5 sm:p-6">
                        <div className="mb-4 rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-sm sm:mb-5 sm:p-5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                              {t.home.yourStory}
                            </span>

                            <span className="text-[9px] text-gray-600">
                              {t.home.today}
                            </span>
                          </div>

                          <p className="mt-3 font-serif text-2xl leading-tight text-white sm:text-3xl">
                            {t.home.littleMoments}
                            <br />
                            {t.home.becomeStories}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                            {t.home.capture}
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black sm:h-10 sm:w-10">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEMORY 01 */}
              <div className="absolute bottom-[5%] left-[2%] z-30 w-41.25 rotate-[-11deg] rounded-2xl bg-white p-3 shadow-2xl shadow-white/10 transition-transform duration-700 hover:rotate-[-7deg] sm:w-48.75 lg:left-[6%] lg:w-52.5">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-neutral-900">
                  <div className="text-center">
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-gray-600">
                      {t.home.memory}
                    </span>

                    <span className="mt-2 block font-serif text-4xl text-gray-700">
                      01
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-black">
                    {t.home.aMomentWorthKeeping}
                  </p>
                </div>
              </div>

              {/* KEEP THE MOMENT */}
              <div className="absolute bottom-[18%] right-[1%] z-30 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md sm:block lg:right-[3%]">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400">
                  {t.home.keepTheMoment}
                </span>
              </div>

              {/* 24 */}
              <div className="absolute bottom-[1%] right-[10%] hidden font-serif text-7xl text-white/4 sm:block">
                24
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-black to-transparent" />
      </section>

      {/* =========================================================
      WHAT IT DOES
      ========================================================== */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-24">
            <ScrollReveal direction="right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                  {t.home.whatItDoes}
                </p>

                <p className="mt-6 max-w-xs text-sm leading-6 text-gray-600">
                  {t.home.disposableCamera}
                </p>

                <div className="mt-10">
                  <div className="inline-flex flex-col items-center">
                    <div className="rounded-[28px] bg-white p-5 shadow-2xl shadow-white/5 transition-transform duration-500 hover:-translate-y-2">
                      <QRCodeSVG
                        value={eventUrl}
                        size={220}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={false}
                      />
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <span className="h-px w-7 bg-white/20" />

                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-gray-500">
                        {t.home.scanToJoin}
                      </p>

                      <span className="h-px w-7 bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} direction="left">
              <div>
                <h2 className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-6xl">
                  {t.home.oneEvent}
                  <br />
                  {t.home.oneSharedCamera}
                  <br />
                  <span className="text-gray-500">
                    {t.home.everyoneMemories}
                  </span>
                </h2>

                <p className="mt-8 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  {t.home.whatItDoesDescription1}
                </p>

                <p className="mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  {t.home.whatItDoesDescription2}
                </p>

                <div className="mt-12 border-l border-white/20 pl-6 sm:pl-8">
                  <p className="max-w-2xl font-serif text-2xl leading-tight text-white sm:text-3xl">
                    {t.home.scanOnce}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================
      HOW IT WORKS
      ========================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <ScrollReveal direction="right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                  {t.home.howItWorksTitle}
                </p>

                <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                  {t.home.fourSteps}
                  <br />
                  <span className="text-gray-500">
                    {t.home.oneUnforgettableEvent}
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <Link
                to="/how-it-works"
                className="group inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {t.home.exploreHowItWorks}

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </ScrollReveal>
          </div>

          {/* LIQUID GLASS STEPS */}
          <div className="relative mt-16">
            <div
              className="
                relative
                cursor-pointer
                overflow-hidden
                rounded-[26px]
                border
                border-white/10
                bg-white/1
                shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                backdrop-blur-3xl
                backdrop-saturate-150
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-20
                  bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_40%)]
                  blur-3xl
                "
              />

              <div className="relative grid md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <LiquidStepCard key={step.number} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
      FINAL CTA
      ========================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-28 text-center sm:px-8 sm:py-36 lg:px-12">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
              {t.home.ready}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
              {t.home.finalTitle}
              <br />
              <span className="text-gray-500">{t.home.finalTitle2}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <Link
              to="/events"
              className="group mt-10 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-xl hover:shadow-white/10"
            >
              {t.home.getStarted}

              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

/* ===============================================================
LIQUID GLASS STEP CARD
================================================================ */

const LiquidStepCard = ({ step, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!cardRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -5;
    const rotateY = (x / rect.width - 0.5) * 5;

    cardRef.current.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.015)
    `;

    glowRef.current.style.opacity = "1";

    glowRef.current.style.transform = `
      translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;

    cardRef.current.style.transform = "";
    glowRef.current.style.opacity = "0";
  };

  return (
    <ScrollReveal delay={index * 120} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          group
          relative
          h-full
          min-h-70
          overflow-hidden
          border-white/8
          bg-white/1.5
          p-7
          transition-[transform,background,border-color,box-shadow]
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:border-white/18
          hover:bg-white/4.5
          hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]
          md:border-r
          md:last:border-r-0
          lg:border-r
          lg:last:border-r-0
          sm:p-8
        "
      >
        {/* CURSOR LIGHT */}
        <div
          ref={glowRef}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-0
            h-45
            w-45
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/10
            opacity-0
            transition-opacity
            duration-300
          "
        />

        {/* TOP LIGHT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-linear-to-r
            from-transparent
            via-white/30
            to-transparent
            opacity-40
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* INNER BORDER */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-none
            ring-1
            ring-inset
            ring-white/3
            transition-all
            duration-500
            group-hover:ring-white/10
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span
              className="
                text-xs
                tracking-[0.15em]
                text-gray-600
                transition-colors
                duration-300
                group-hover:text-gray-400
              "
            >
              {step.number}
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/2.5
                text-[10px]
                text-white/15
                transition-all
                duration-500
                group-hover:border-white/25
                group-hover:bg-white/10
                group-hover:text-white
                group-hover:rotate-[-8deg]
              "
            >
              ↗
            </span>
          </div>

          <div className="mt-10">
            <h3
              className="
                font-serif
                text-3xl
                text-white
                transition-all
                duration-500
                ease-out
                group-hover:translate-x-1
                group-hover:text-white
              "
            >
              {step.title}
            </h3>

            <p
              className="
                mt-10
                max-w-xs
                translate-y-2
                text-sm
                leading-6
                text-white/8
                transition-all
                duration-500
                ease-out
                group-hover:translate-y-0
                group-hover:text-white
              "
            >
              {step.text}
            </p>
          </div>
        </div>

        {/* BOTTOM GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            left-1/2
            h-32
            w-3/4
            -translate-x-1/2
            rounded-full
            bg-white/2.5
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />
      </div>
    </ScrollReveal>
  );
};

export default Home;
