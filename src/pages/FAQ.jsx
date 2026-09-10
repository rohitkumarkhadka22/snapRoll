import { useState } from "react";
import useLanguage from "../context/useLanguage";

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
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          
          {/* =====================================================
              PHONE — HOME STYLE
          ====================================================== */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-8 self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                {faq.badge}
              </p>
            </div>

            {/* PHONE VISUAL */}
            <div className="relative h-135 w-full max-w-150 sm:h-155">
              
              {/* PHONE */}
              <div className="absolute left-1/2 top-1/2 z-20 h-117.5 w-58.75 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] transition-transform duration-700 hover:-rotate-1 sm:h-137.5 sm:w-68.75">
                
                {/* LEFT SIDE BUTTONS */}
                <div className="pointer-events-none absolute -left-4 top-[19%] z-50 flex flex-col gap-5 sm:-left-5">
                  <span className="block h-6 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-7" />

                  <span className="block h-9 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-10" />

                  <span className="block h-9 w-1 rounded-l-full rounded-r-sm border border-white/20 bg-gray-400 shadow-[0_1px_4px_rgba(255,255,255,0.45)] sm:h-10" />
                </div>

                {/* RIGHT POWER BUTTON */}
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
                          FAQ
                        </span>
                      </div>

                      {/* MAIN SCREEN CONTENT */}
                      <div className="flex h-full flex-col justify-end p-5 sm:p-6">
                        
                        {/* MAIN FAQ CARD */}
                        <div className="mb-4 rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-sm sm:mb-5 sm:p-5">
                          
                          {/* CARD HEADER */}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                              {faq.frequentlyAsked}
                            </span>

                            <span className="text-[9px] text-gray-600">
                              FAQ
                            </span>
                          </div>

                          {/* CARD TITLE */}
                          <p className="mt-4 font-serif text-2xl leading-tight text-white sm:text-3xl">
                            {faq.everything}
                            <br />
                            <span className="text-gray-500">
                              {faq.inOnePlace}
                            </span>
                          </p>

                          {/* QUESTION PREVIEW */}
                          {faq.groups?.[0]?.items?.[0] && (
                            <div className="mt-5 border-t border-white/10 pt-4">
                              
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] leading-4 text-gray-300">
                                  {faq.groups[0].items[0].question}
                                </span>

                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black">
                                  −
                                </span>
                              </div>

                              <p className="mt-3 line-clamp-3 text-[9px] leading-4 text-gray-500">
                                {faq.groups[0].items[0].answer}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* BOTTOM BAR */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                            {faq.badge}
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

              {/* =================================================
                  MEMORY CARD
              ================================================== */}
              <div className="absolute bottom-[4%] left-[2%] z-30 hidden w-36 rotate-[-10deg] rounded-2xl bg-white p-3 shadow-2xl shadow-white/10 transition-transform duration-700 hover:rotate-[-6deg] sm:block">
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
              <div className="absolute bottom-[16%] right-[2%] z-30 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md sm:block">
                <span className="text-[8px] uppercase tracking-[0.25em] text-gray-400">
                  {faq.phoneStory}
                </span>
              </div>
            </div>

            {/* PHONE DESCRIPTION */}
            <p className="mt-8 max-w-xs text-center text-sm leading-6 text-gray-600 lg:text-left">
              {faq.phoneDescription}
            </p>
          </div>

          {/* =====================================================
              HERO TEXT
          ====================================================== */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">
              {faq.eyebrow}
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
              {faq.title1}
              <br />
              <span className="text-gray-500">{faq.title2}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              {faq.heroDescription}
            </p>
          </div>
        </div>

        {/* FADE */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-linear-to-t from-black to-transparent" />
      </section>

      {/* =========================================================
          FAQ LIST
      ========================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            
            {/* LEFT SIDE */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                {faq.frequentlyAsked}
              </p>

              <h2 className="mt-5 max-w-xs font-serif text-3xl leading-tight sm:text-4xl">
                {faq.everything}
                <br />
                <span className="text-gray-500">
                  {faq.inOnePlace}
                </span>
              </h2>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-white/20" />

                <span className="text-[10px] uppercase tracking-[0.22em] text-gray-600">
                  {faq.questionCount}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {faq.groups.map((group, groupIndex) => (
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
                        <div
                          key={faqItem.question}
                          className="border-b border-white/10"
                        >
                          {/* QUESTION BUTTON */}
                          <button
                            type="button"
                            onClick={() =>
                              toggleItem(groupIndex, itemIndex)
                            }
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
                                {faqItem.question}
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
                                  {faqItem.answer}
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

      {/* =========================================================
          FINAL STATEMENT
      ========================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                {faq.finalLabel}
              </p>
            </div>

            <div>
              <p className="max-w-3xl font-serif text-2xl leading-tight tracking-[-0.02em] sm:text-3xl md:text-4xl">
                {faq.finalTitle1}
                <br />
                <span className="text-gray-500">
                  {faq.finalTitle2}
                </span>
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;