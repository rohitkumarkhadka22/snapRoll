import { useEffect, useRef, useState } from "react";
import { CalendarDays, Users, Camera, Sparkles, Check, Copy, ArrowLeft } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { QRCodeSVG } from "qrcode.react";
import useLanguage from "../context/useLanguage";

const CreateEvent = () => {
  const { t } = useLanguage();
  const page = t.createEventPage;

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("25");
  const [photos, setPhotos] = useState("50");
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);

  // CUSTOM VALIDATION
  const [formError, setFormError] = useState("");

  // FIELD REFS
  const eventNameRef = useRef(null);
  const eventDateRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    if (!eventName.trim()) {
      setFormError(page.validationEventName);

      setTimeout(() => {
        const element = eventNameRef.current;

        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 180;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });

          setTimeout(() => {
            element.focus();
          }, 500);
        }
      }, 100);

      return;
    }

    if (!eventDate) {
      setFormError(page.validationEventDate);

      setTimeout(() => {
        const element = eventDateRef.current;

        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 180;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });

          setTimeout(() => {
            element.focus();
          }, 500);
        }
      }, 100);

      return;
    }

    setCreated(true);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy event link:", error);
    }
  };

  const handleBack = () => {
    setCreated(false);
    setFormError("");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const eventSlug = eventName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const eventUrl = `https://snaproll.app/event/${eventSlug || "demo"}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black px-5 pt-28 pb-24 text-white sm:px-8 sm:pt-32">
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        <div className="absolute top-[45%] -left-40 h-80 w-80 rounded-full bg-white/[0.015] blur-3xl" />

        <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-white/[0.015] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {!created ? (
          <>
            {/* HEADER */}

            <ScrollReveal direction="up">
              <section className="mx-auto max-w-2xl text-center">
                {/* BADGE */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] tracking-[0.2em] text-white/55 uppercase backdrop-blur-xl sm:text-xs">
                  <Sparkles size={13} strokeWidth={1.5} />

                  {page.badge}
                </div>

                {/* TITLE */}
                <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-7xl">
                  {page.title}
                </h1>

                {/* DESCRIPTION */}
                <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                  {page.description}
                </p>
              </section>
            </ScrollReveal>

            {/* FORM */}

            <ScrollReveal direction="up" delay={100}>
              <section className="mx-auto mt-12 max-w-3xl sm:mt-16">
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:rounded-[38px] sm:p-8 md:p-10"
                >
                  {/* TOP LINE */}
                  <div className="pointer-events-none absolute top-0 right-10 left-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* FORM HEADER */}

                  <div className="mb-8 flex items-center justify-between border-b border-white/[0.07] pb-6">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
                        SnapRoll
                      </p>

                      <h2 className="mt-1 font-serif text-2xl text-white/90 sm:text-3xl">
                        {page.title}
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <Camera size={18} strokeWidth={1.4} className="text-white/55" />
                    </div>
                  </div>

                  {/* EVENT NAME */}

                  <div>
                    <label className="mb-3 block text-xs tracking-[0.15em] text-white/40 uppercase">
                      {page.eventName}
                    </label>

                    <input
                      ref={eventNameRef}
                      type="text"
                      value={eventName}
                      onChange={(e) => {
                        setEventName(e.target.value);

                        if (e.target.value.trim()) {
                          setFormError("");
                        }
                      }}
                      placeholder={page.eventNamePlaceholder}
                      className={`h-14 w-full rounded-2xl border bg-white/[0.035] px-5 text-sm text-white transition duration-300 outline-none placeholder:text-white/20 hover:border-white/[0.15] focus:bg-white/[0.055] ${
                        formError && !eventName.trim()
                          ? "border-white/30 focus:border-white/40"
                          : "border-white/[0.09] focus:border-white/25"
                      }`}
                    />
                  </div>

                  {/* DATE */}

                  <div className="mt-6">
                    <label className="mb-3 block text-xs tracking-[0.15em] text-white/40 uppercase">
                      {page.eventDate}
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={18}
                        strokeWidth={1.5}
                        className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-white/30"
                      />

                      <input
                        ref={eventDateRef}
                        type="date"
                        value={eventDate}
                        onChange={(e) => {
                          setEventDate(e.target.value);

                          if (e.target.value) {
                            setFormError("");
                          }
                        }}
                        className={`h-14 w-full rounded-2xl border bg-white/[0.035] px-5 pl-13 text-sm text-white transition duration-300 outline-none hover:border-white/[0.15] focus:bg-white/[0.055] ${
                          formError && !eventDate
                            ? "border-white/30 focus:border-white/40"
                            : "border-white/[0.09] focus:border-white/25"
                        }`}
                      />
                    </div>
                  </div>

                  {/* GUESTS + PHOTOS */}

                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* GUEST LIMIT */}
                    <div>
                      <label className="mb-3 flex h-4 items-center text-xs tracking-[0.15em] text-white/40 uppercase">
                        {page.guestLimit}
                      </label>

                      <div className="flex h-14 items-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] transition duration-300 focus-within:border-white/25 hover:border-white/[0.15]">
                        <div className="flex h-14 w-12 shrink-0 items-center justify-center">
                          <Users size={18} strokeWidth={1.5} className="text-white/35" />
                        </div>

                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="h-14 flex-1 cursor-pointer appearance-none border-0 bg-transparent px-1 text-sm leading-none text-white outline-none"
                        >
                          <option value="10" className="bg-black">
                            10 {page.guests}
                          </option>

                          <option value="15" className="bg-black">
                            15 {page.guests}
                          </option>

                          <option value="20" className="bg-black">
                            20 {page.guests}
                          </option>

                          <option value="25" className="bg-black">
                            25 {page.guests}
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* PHOTO LIMIT */}
                    <div>
                      <label className="mb-3 flex h-4 items-center text-xs tracking-[0.15em] text-white/40 uppercase">
                        {page.photoLimit}
                      </label>

                      <div className="flex h-14 items-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] transition duration-300 focus-within:border-white/25 hover:border-white/[0.15]">
                        <div className="flex h-14 w-12 shrink-0 items-center justify-center">
                          <Camera size={18} strokeWidth={1.5} className="text-white/35" />
                        </div>

                        <select
                          value={photos}
                          onChange={(e) => setPhotos(e.target.value)}
                          className="h-14 flex-1 cursor-pointer appearance-none border-0 bg-transparent px-1 text-sm leading-none text-white outline-none"
                        >
                          <option value="25" className="bg-black">
                            25 {page.photos}
                          </option>

                          <option value="50" className="bg-black">
                            50 {page.photos}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* FREE EVENT INFO */}

                  <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Sparkles size={13} strokeWidth={1.4} />
                    </div>

                    <div>
                      <p className="text-sm text-white/70">{page.freeEvent}</p>

                      <p className="mt-1 text-xs leading-5 text-white/30">{page.freePlanInfo}</p>
                    </div>
                  </div>

                  {/* CUSTOM FORM ERROR */}

                  {formError && (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                          <span className="text-xs text-white/60">!</span>
                        </div>

                        <p className="text-xs leading-5 text-white/45">{formError}</p>
                      </div>
                    </div>
                  )}

                  {/* CREATE BUTTON */}

                  <button
                    type="submit"
                    className="mt-7 flex h-14 w-full cursor-pointer items-center justify-center rounded-full bg-white text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_15px_45px_rgba(255,255,255,0.08)] active:scale-[0.99]"
                  >
                    {page.createEvent}
                  </button>

                  {/* NO ACCOUNT */}
                  {page.noAccount && (
                    <p className="mt-4 text-center text-[11px] text-white/25">{page.noAccount}</p>
                  )}
                </form>
              </section>
            </ScrollReveal>
          </>
        ) : (
          //  SUCCESS / QR SECTION

          <ScrollReveal direction="up">
            <section className="mx-auto max-w-3xl text-center">
              {/* SUCCESS BADGE */}

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] tracking-[0.2em] text-white/55 uppercase backdrop-blur-xl sm:text-xs">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
                  <Check size={10} strokeWidth={2.5} />
                </span>

                {page.eventCreated}
              </div>

              {/* TITLE */}

              <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl">
                {page.eventReady}
              </h1>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                {page.shareEvent}
              </p>

              {/* QR CARD */}

              <div className="relative mx-auto mt-12 max-w-xl overflow-hidden rounded-[32px] border border-white/[0.09] bg-white/[0.035] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[40px] sm:p-9">
                {/* CARD GLOW */}
                <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />

                {/* EVENT INFO */}

                <div className="relative">
                  <p className="text-[10px] tracking-[0.22em] text-white/25 uppercase">
                    {page.shareEvent}
                  </p>

                  <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] break-words text-white sm:text-4xl">
                    {eventName}
                  </h2>
                </div>

                {/* QR CODE */}

                <div className="relative mx-auto mt-9 flex h-56 w-56 items-center justify-center rounded-[30px] bg-white p-4 shadow-[0_25px_70px_rgba(0,0,0,0.4)] sm:h-60 sm:w-60">
                  <QRCodeSVG
                    value={eventUrl}
                    size={192}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={false}
                  />
                </div>

                {/* SCAN TEXT */}

                <div className="mt-7 flex items-center justify-center gap-3 text-xs text-white/35">
                  <span className="h-px w-8 bg-white/10" />

                  <span>{page.scanToJoin}</span>

                  <span className="h-px w-8 bg-white/10" />
                </div>

                {/* EVENT LINK */}

                <div className="mt-7 rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-4 text-left">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] tracking-[0.2em] text-white/25 uppercase">
                      {page.copyInviteLink}
                    </p>

                    <Copy size={13} strokeWidth={1.4} className="shrink-0 text-white/20" />
                  </div>

                  <p className="mt-2 font-mono text-xs leading-5 break-all text-white/55">
                    {eventUrl}
                  </p>
                </div>

                {/* COPY BUTTON */}

                <button
                  type="button"
                  onClick={handleCopy}
                  className={`mt-4 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-[0.99] ${
                    copied
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/[0.05] text-white hover:border-white/20 hover:bg-white/[0.09]"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={15} strokeWidth={2} />
                      {page.linkCopied}
                    </>
                  ) : (
                    <>
                      <Copy size={15} strokeWidth={1.6} />
                      {page.copyInviteLink}
                    </>
                  )}
                </button>

                {/* SMALL NOTE */}

                <p className="mt-5 text-[10px] leading-5 text-white/20">{page.scanToJoin}</p>
              </div>

              {/* BACK BUTTON */}

              <button
                type="button"
                onClick={handleBack}
                className="mx-auto mt-8 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs text-white/45 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/70"
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
                {page.back}
              </button>
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
};

export default CreateEvent;
