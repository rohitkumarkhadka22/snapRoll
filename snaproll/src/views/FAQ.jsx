"use client";

import { useState } from "react";
import Image from "next/image";
import useLanguage from "../context/useLanguage";
import ScrollReveal from "../components/ScrollReveal";
import phoneSunsetAsset from "../assets/images/faq-phone-sunset.png";
import questionWhiteAsset from "../assets/images/faq-question-white.png";

const FAQ = () => {
  const { t } = useLanguage();
  const faq = t.faq;

  const [openItem, setOpenItem] = useState("0-0");
  const [phoneQuestionIndex, setPhoneQuestionIndex] = useState(0);
  const [phoneAnswerOpen, setPhoneAnswerOpen] = useState(true);
  const phoneQuestions = faq.groups.flatMap((group) =>
    group.items.map((item) => ({ ...item, category: group.label })),
  );
  const activePhoneQuestion = phoneQuestions[phoneQuestionIndex] || phoneQuestions[0];

  const toggleItem = (groupIndex, itemIndex) => {
    const id = `${groupIndex}-${itemIndex}`;

    setOpenItem((current) => (current === id ? null : id));
  };

  const showNextPhoneQuestion = () => {
    setPhoneQuestionIndex((current) => (current + 1) % phoneQuestions.length);
    setPhoneAnswerOpen(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* HERO */}

      <section className="relative mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 md:pb-24 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* PHONE */}

          <ScrollReveal priority className="order-2 lg:order-1" duration={1200} y={45}>
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-7 self-start sm:mb-8">
                <p className="text-xs font-semibold tracking-[0.28em] text-gray-500 uppercase">
                  {faq.badge}
                </p>
              </div>

              {/* PHONE VISUAL */}
              <div className="relative h-125 w-full max-w-135 sm:h-145 sm:max-w-150 md:h-150 lg:h-155">
                <div className="pointer-events-none absolute top-[12%] right-[5%] h-52 w-52 rounded-full bg-rose-500/10 blur-[85px] sm:h-72 sm:w-72" />
                <div className="pointer-events-none absolute bottom-[8%] left-[4%] h-56 w-56 rounded-full bg-amber-400/12 blur-[90px] sm:h-80 sm:w-80" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[76%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 bg-white/[0.025] blur-sm" />

                {/* PHONE */}
                <div className="absolute top-1/2 left-1/2 z-20 h-110 w-55 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] cursor-pointer transition-transform duration-700 hover:-rotate-1 sm:h-125 sm:w-62.5 md:h-130 md:w-65 lg:h-137.5 lg:w-68.75">
                  {/* LEFT SIDE BUTTONS */}
                  <div className="pointer-events-none absolute top-[19%] -left-3.5 z-50 flex flex-col gap-4 sm:-left-4 sm:gap-5 md:-left-4.5 lg:-left-5">
                    <span className="block h-5 w-1 rounded-l-full rounded-r-sm border border-white/15 bg-zinc-700 shadow-[0_1px_5px_rgba(0,0,0,0.8)] sm:h-6 md:h-6.5 lg:h-7" />

                    <span className="block h-8 w-1 rounded-l-full rounded-r-sm border border-white/15 bg-zinc-700 shadow-[0_1px_5px_rgba(0,0,0,0.8)] sm:h-9 md:h-9.5 lg:h-10" />

                    <span className="block h-8 w-1 rounded-l-full rounded-r-sm border border-white/15 bg-zinc-700 shadow-[0_1px_5px_rgba(0,0,0,0.8)] sm:h-9 md:h-9.5 lg:h-10" />
                  </div>

                  {/* RIGHT POWER BUTTON */}
                  <div className="pointer-events-none absolute top-[29%] -right-2 z-50 sm:-right-2.5">
                    <span className="block h-10 w-1 rounded-r-full border border-white/15 bg-zinc-700 shadow-[0_1px_5px_rgba(0,0,0,0.8)] sm:h-12 md:h-13 lg:h-14" />
                  </div>

                  {/* OUTER PHONE FRAME */}
                  <div className="absolute inset-0 rounded-[38px] border border-white/20 bg-linear-to-br from-zinc-500 via-zinc-950 to-zinc-600 p-1.5 shadow-[0_36px_100px_rgba(0,0,0,0.75),0_0_70px_rgba(245,158,11,0.10)] sm:rounded-[42px] lg:rounded-[48px]">
                    {/* INNER BLACK BODY */}
                    <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/8 bg-black p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:rounded-[36px] lg:rounded-[41px]">
                      {/* SCREEN */}
                      <div className="relative h-full w-full overflow-hidden rounded-[27px] bg-neutral-950 sm:rounded-[31px] lg:rounded-[36px]">
                        <Image
                          src={phoneSunsetAsset}
                          alt="A hand photographing a sunset with a phone"
                          fill
                          priority
                          sizes="(min-width: 1024px) 275px, (min-width: 640px) 250px, 220px"
                          className="object-cover object-center"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 via-black/20 to-black/90" />

                        {/* DYNAMIC ISLAND */}
                        <div className="absolute top-2 left-1/2 z-40 h-6 w-20 -translate-x-1/2 rounded-full bg-black shadow-inner sm:top-2.5 sm:h-7 sm:w-24 lg:top-3 lg:h-8 lg:w-28" />

                        {/* CAMERA DOT */}
                        <div className="absolute top-[15px] left-1/2 z-50 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-700 sm:top-[18px] lg:top-[20px]" />

                        {/* TOP CONTENT */}
                        <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-4 pt-10 sm:px-5 sm:pt-12 lg:px-6 lg:pt-14">
                          <span className="text-[9px] font-semibold tracking-[0.25em] text-white uppercase sm:text-[10px]">
                            SnapRoll
                          </span>

                          <span className="text-[8px] text-gray-500 sm:text-[9px]">
                            {String(phoneQuestionIndex + 1).padStart(2, "0")} /{" "}
                            {phoneQuestions.length}
                          </span>
                        </div>

                        {/* MAIN SCREEN CONTENT */}
                        <div className="flex h-full flex-col justify-end p-4 sm:p-5 lg:p-6">
                          {/* MAIN FAQ CARD */}
                          <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:mb-4 sm:p-4 lg:mb-5 lg:p-5">
                            {/* CARD HEADER */}
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] tracking-[0.2em] text-gray-500 uppercase sm:text-[9px]">
                                {activePhoneQuestion?.category || faq.frequentlyAsked}
                              </span>

                              <span className="text-[8px] text-gray-600 sm:text-[9px]">FAQ</span>
                            </div>

                            {/* QUESTION PREVIEW */}
                            {activePhoneQuestion && (
                              <div className="mt-3 border-t border-white/10 pt-3 sm:mt-4 sm:pt-4">
                                <button
                                  type="button"
                                  onClick={() => setPhoneAnswerOpen((current) => !current)}
                                  aria-expanded={phoneAnswerOpen}
                                  className="flex w-full cursor-pointer items-center justify-between gap-2 text-left sm:gap-3"
                                >
                                  <span className="min-w-0 font-serif text-sm leading-4 text-white sm:text-base sm:leading-5">
                                    {activePhoneQuestion.question}
                                  </span>

                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs text-black transition-transform duration-300 hover:scale-110 sm:h-7 sm:w-7">
                                    {phoneAnswerOpen ? "−" : "+"}
                                  </span>
                                </button>

                                <div
                                  className={`grid transition-all duration-300 ${
                                    phoneAnswerOpen
                                      ? "grid-rows-[1fr] opacity-100"
                                      : "grid-rows-[0fr] opacity-0"
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <p className="mt-2 line-clamp-4 text-[8px] leading-4 text-gray-500 sm:mt-3 sm:text-[9px]">
                                      {activePhoneQuestion.answer}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* BOTTOM BAR */}
                          <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4">
                            <span className="text-[8px] tracking-[0.2em] text-gray-500 uppercase sm:text-[9px]">
                              {faq.badge}
                            </span>

                            <button
                              type="button"
                              onClick={showNextPhoneQuestion}
                              aria-label="Show next FAQ question"
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MEMORY CARD */}
                <div className="absolute bottom-[4%] left-[2%] z-30 w-30 rotate-[-10deg] cursor-pointer rounded-2xl bg-[#101010]/95 p-2.5 shadow-[0_28px_80px_rgba(139,92,246,0.16)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] hover:rotate-[-6deg] sm:w-32 sm:p-3 md:w-34 lg:w-36">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-black">
                    <Image
                      src={questionWhiteAsset}
                      alt="White question mark"
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>

                  <div className="pt-3">
                    <p className="text-[8px] tracking-[0.2em] text-white/65 uppercase">
                      {faq.questionCount}
                    </p>
                  </div>
                </div>

                {/* FLOATING LABEL */}
                <div className="absolute right-[2%] bottom-[16%] z-30 hidden cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/10 sm:block md:px-4">
                  <span className="text-[7px] tracking-[0.25em] text-gray-400 uppercase sm:text-[8px]">
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

          {/* HERO TEXT */}

          <div className="order-1 max-w-3xl lg:order-2">
            <ScrollReveal priority delay={180} duration={1000} y={35}>
              <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase sm:mb-5">
                {faq.eyebrow}
              </p>
            </ScrollReveal>

            <ScrollReveal priority delay={300} duration={1100} y={40}>
              <h1 className="font-serif text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-5xl md:text-[3.8rem] lg:text-7xl">
                {faq.title1}
                <br />
                <span className="text-gray-500">{faq.title2}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal priority delay={420} duration={1000} y={35}>
              <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:mt-7 sm:text-lg sm:leading-8">
                {faq.heroDescription}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* FADE */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-linear-to-t from-black to-transparent sm:h-28" />
      </section>

      {/* FAQ LIST */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-12 sm:gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            {/* LEFT SIDE */}
            <ScrollReveal duration={1000} y={35}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs font-semibold tracking-[0.28em] text-gray-500 uppercase">
                  {faq.frequentlyAsked}
                </p>

                <h2 className="mt-4 max-w-xs font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl">
                  {faq.everything}
                  <br />
                  <span className="text-gray-500">{faq.inOnePlace}</span>
                </h2>

                <div className="mt-6 flex items-center gap-3 sm:mt-8">
                  <span className="h-px w-10 bg-white/20" />

                  <span className="text-[9px] tracking-[0.22em] text-gray-600 uppercase sm:text-[10px]">
                    {faq.questionCount}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT SIDE */}
            <div className="min-w-0">
              {faq.groups.map((group, groupIndex) => (
                <ScrollReveal key={group.label} delay={groupIndex * 120} duration={1000} y={35}>
                  <div className={groupIndex !== 0 ? "mt-12 sm:mt-16 lg:mt-20" : ""}>
                    {/* CATEGORY */}
                    <div className="mb-5 sm:mb-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="shrink-0 text-[9px] font-semibold tracking-[0.25em] text-gray-500 uppercase sm:text-[10px]">
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
                          .reduce((total, currentGroup) => total + currentGroup.items.length, 0);

                        const questionNumber = previousQuestions + itemIndex + 1;

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
                                onClick={() => {
                                  setPhoneQuestionIndex(questionNumber - 1);
                                  setPhoneAnswerOpen(true);
                                  toggleItem(groupIndex, itemIndex);
                                }}
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
                                      isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
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

      {/* FINAL STATEMENT */}

      <section className="border-t border-white/10">
        <ScrollReveal duration={1100} y={40}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28">
            <div className="grid gap-7 sm:gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold tracking-[0.28em] text-gray-500 uppercase">
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
