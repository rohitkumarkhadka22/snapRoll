import { useState } from "react";
import useLanguage from "../context/useLanguage";
import ScrollReveal from "../components/ScrollReveal";

const FAQ = () => {
  const { t } = useLanguage();
  const faq = t.faq;

  const [openItem, setOpenItem] = useState("0-0");

  const toggleItem = (groupIndex, itemIndex) => {
    const id = `${groupIndex}-${itemIndex}`;

    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 md:pb-24 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* =====================================================
              PHONE
          ====================================================== */}
          <ScrollReveal duration={1200} y={45}>
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-7 self-start sm:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                  {faq.badge}
                </p>
              </div>

              {/* PHONE VISUAL */}
              <div className="relative h-125 w-full max-w-135 sm:h-145 sm:max-w-150 md:h-150 lg:h-155">
                {/* PHONE */}
                <div className="absolute left-1/2 top-1/2 z-20 h-110 w-55 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] cursor-pointer transition-transform duration-700 hover:-rotate-1 sm:h-125 sm:w-62.5 md:h-130 md:w-65 lg:h-137.5 lg:w-68.75">
                  {/* LEFT SIDE BUTTONS */}
                  <div className="pointer-events-none absolute -left-3.5 top-[19%] z-50 flex flex-col gap-4 sm:-left-4 sm:gap-5 md:-left-4.5 lg:-left-5">
                    <span className="block h-5 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-6 md:h-6.5 lg:h-7" />

                    <span className="block h-8 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-9 md:h-9.5 lg:h-10" />

                    <span className="block h-8 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-9 md:h-9.5 lg:h-10" />
                  </div>

                  {/* RIGHT POWER BUTTON */}
                  <div className="pointer-events-none absolute -right-2 top-[29%] z-50 sm:-right-2.5">
                    <span className="block h-10 w-1 rounded-r-full border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-12 md:h-13 lg:h-14" />
                  </div>

                  {/* OUTER PHONE FRAME */}
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-[38px]
                      border
                      border-white/30
                      bg-linear-to-br
                      from-white
                      via-gray-200
                      to-gray-500
                      p-1.5
                      shadow-[0_35px_90px_rgba(255,255,255,0.12)]
                      sm:rounded-[42px]
                      lg:rounded-[48px]
                    "
                  >
                    {/* INNER BLACK BODY */}
                    <div
                      className="
                        relative
                        h-full
                        w-full
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-black/80
                        bg-black
                        p-1
                        sm:rounded-[36px]
                        lg:rounded-[41px]
                      "
                    >
                      {/* SCREEN */}
                      <div className="relative h-full w-full overflow-hidden rounded-[27px] bg-neutral-950 sm:rounded-[31px] lg:rounded-[36px]">
                        {/* DYNAMIC ISLAND */}
                        <div className="absolute left-1/2 top-2 z-40 h-6 w-20 -translate-x-1/2 rounded-full bg-black shadow-inner sm:top-2.5 sm:h-7 sm:w-24 lg:top-3 lg:h-8 lg:w-28" />

                        {/* CAMERA DOT */}
                        <div className="absolute left-1/2 top-[15px] z-50 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-700 sm:top-[18px] lg:top-[20px]" />

                        {/* TOP CONTENT */}
                        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 pt-10 sm:px-5 sm:pt-12 lg:px-6 lg:pt-14">
                          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white sm:text-[10px]">
                            SnapRoll
                          </span>

                          <span className="text-[8px] text-gray-500 sm:text-[9px]">
                            FAQ
                          </span>
                        </div>

                        {/* MAIN SCREEN CONTENT */}
                        <div className="flex h-full flex-col justify-end p-4 sm:p-5 lg:p-6">
                          {/* MAIN FAQ CARD */}
                          <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:mb-4 sm:p-4 lg:mb-5 lg:p-5">
                            {/* CARD HEADER */}
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 sm:text-[9px]">
                                {faq.frequentlyAsked}
                              </span>

                              <span className="text-[8px] text-gray-600 sm:text-[9px]">
                                FAQ
                              </span>
                            </div>

                            {/* CARD TITLE */}
                            <p className="mt-3 font-serif text-xl leading-tight text-white sm:mt-4 sm:text-2xl lg:text-3xl">
                              {faq.everything}
                              <br />
                              <span className="text-gray-500">
                                {faq.inOnePlace}
                              </span>
                            </p>

                            {/* QUESTION PREVIEW */}
                            {faq.groups?.[0]?.items?.[0] && (
                              <div className="mt-4 border-t border-white/10 pt-3 sm:mt-5 sm:pt-4">
                                <div className="flex items-center justify-between gap-2 sm:gap-3">
                                  <span className="min-w-0 text-[9px] leading-4 text-gray-300 sm:text-[10px]">
                                    {faq.groups[0].items[0].question}
                                  </span>

                                  <span className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-xs text-black transition-transform duration-300 hover:scale-110 sm:h-7 sm:w-7">
                                    −
                                  </span>
                                </div>

                                <p className="mt-2 line-clamp-3 text-[8px] leading-4 text-gray-500 sm:mt-3 sm:text-[9px]">
                                  {faq.groups[0].items[0].answer}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* BOTTOM BAR */}
                          <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4">
                            <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 sm:text-[9px]">
                              {faq.badge}
                            </span>

                            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110 sm:h-9 sm:w-9 lg:h-10 lg:w-10">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MEMORY CARD */}
                <div className="absolute bottom-[4%] left-[2%] z-30 hidden w-32 cursor-pointer rotate-[-10deg] rounded-2xl bg-white p-3 shadow-2xl shadow-white/10 transition-transform duration-700 hover:rotate-[-6deg] hover:scale-[1.02] sm:block md:w-34 lg:w-36">
                  <div className="flex aspect-square items-center justify-center rounded-xl bg-neutral-900">
                    <div className="text-center">
                      <span className="block text-[8px] uppercase tracking-[0.3em] text-gray-600">
                        SnapRoll
                      </span>

                      <span className="mt-2 block font-serif text-3xl text-gray-700">
                        ?
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-black">
                      {faq.questionCount}
                    </p>
                  </div>
                </div>

                {/* FLOATING LABEL */}
                <div className="absolute bottom-[16%] right-[2%] z-30 hidden cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/10 sm:block md:px-4">
                  <span className="text-[7px] uppercase tracking-[0.25em] text-gray-400 sm:text-[8px]">
                    {faq.phoneStory}
                  </span>
                </div>
              </div>

              {/* PHONE DESCRIPTION */}
              <p className="mt-6 max-w-xs text-center text-sm leading-6 text-gray-600 sm:mt-8 lg:text-left">
                {faq.phoneDescription}
              </p>
            </div>
          </ScrollReveal>

          {/* =====================================================
              HERO TEXT
          ====================================================== */}
          <div className="max-w-3xl">
            <ScrollReveal delay={180} duration={1000} y={35}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-600 sm:mb-5">
                {faq.eyebrow}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} duration={1100} y={40}>
              <h1 className="font-serif text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-[3.8rem] lg:text-7xl">
                {faq.title1}
                <br />
                <span className="text-gray-500">{faq.title2}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={420} duration={1000} y={35}>
              <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:mt-7 sm:text-lg sm:leading-8">
                {faq.heroDescription}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* FADE */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-linear-to-t from-black to-transparent sm:h-28" />
      </section>

      {/* =========================================================
          FAQ LIST
      ========================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-12 sm:gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            {/* LEFT SIDE */}
            <ScrollReveal duration={1000} y={35}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                  {faq.frequentlyAsked}
                </p>

                <h2 className="mt-4 max-w-xs font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl">
                  {faq.everything}
                  <br />
                  <span className="text-gray-500">{faq.inOnePlace}</span>
                </h2>

                <div className="mt-6 flex items-center gap-3 sm:mt-8">
                  <span className="h-px w-10 bg-white/20" />

                  <span className="text-[9px] uppercase tracking-[0.22em] text-gray-600 sm:text-[10px]">
                    {faq.questionCount}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT SIDE */}
            <div className="min-w-0">
              {faq.groups.map((group, groupIndex) => (
                <ScrollReveal
                  key={group.label}
                  delay={groupIndex * 120}
                  duration={1000}
                  y={35}
                >
                  <div
                    className={
                      groupIndex !== 0 ? "mt-12 sm:mt-16 lg:mt-20" : ""
                    }
                  >
                    {/* CATEGORY */}
                    <div className="mb-5 sm:mb-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-500 sm:text-[10px]">
                          {group.label}
                        </span>

                        <span className="h-px min-w-0 flex-1 bg-white/10" />
                      </div>

                      <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-600">
                        {group.description}
                      </p>
                    </div>

                    {/* QUESTIONS */}
                    <div className="border-t border-white/10">
                      {group.items.map((faqItem, itemIndex) => {
                        const id = `${groupIndex}-${itemIndex}`;
                        const isOpen = openItem === id;

                        const previousQuestions = faq.groups
                          .slice(0, groupIndex)
                          .reduce(
                            (total, currentGroup) =>
                              total + currentGroup.items.length,
                            0,
                          );

                        const questionNumber =
                          previousQuestions + itemIndex + 1;

                        return (
                          <ScrollReveal
                            key={faqItem.question}
                            delay={itemIndex * 100}
                            duration={850}
                            y={25}
                          >
                            <div className="border-b border-white/10">
                              {/* QUESTION BUTTON */}
                              <button
                                type="button"
                                onClick={() =>
                                  toggleItem(groupIndex, itemIndex)
                                }
                                aria-expanded={isOpen}
                                className="group flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left sm:gap-5 sm:py-5 md:py-6"
                              >
                                <div className="flex min-w-0 items-start gap-3 sm:gap-4 md:gap-6">
                                  {/* NUMBER */}
                                  <span className="shrink-0 pt-1 text-[8px] tracking-[0.2em] text-gray-700 sm:text-[9px]">
                                    {String(questionNumber).padStart(2, "0")}
                                  </span>

                                  {/* QUESTION */}
                                  <span
                                    className={`min-w-0 font-serif text-base leading-6 transition-colors duration-300 sm:text-[17px] md:text-lg ${
                                      isOpen
                                        ? "text-white"
                                        : "text-gray-300 group-hover:text-white"
                                    }`}
                                  >
                                    {faqItem.question}
                                  </span>
                                </div>

                                {/* ICON */}
                                <span
                                  className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border text-sm font-light transition-all duration-300 sm:h-8 sm:w-8 sm:text-base ${
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
                                  <div className="pb-5 pl-8 sm:pb-6 sm:pl-12">
                                    <p className="max-w-2xl text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7">
                                      {faqItem.answer}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL STATEMENT
      ========================================================== */}
      <section className="border-t border-white/10">
        <ScrollReveal duration={1100} y={40}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28">
            <div className="grid gap-7 sm:gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                  {faq.finalLabel}
                </p>
              </div>

              <div>
                <p className="max-w-3xl font-serif text-2xl leading-tight tracking-[-0.02em] sm:text-3xl md:text-4xl">
                  {faq.finalTitle1}
                  <br />
                  <span className="text-gray-500">{faq.finalTitle2}</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default FAQ;
