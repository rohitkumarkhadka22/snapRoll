import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Users,
  Camera,
  Sparkles,
  Check,
  Copy,
  ArrowLeft,
  Share2,
  Download,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import useLanguage from "../context/useLanguage";
import { buildEventUrl, getLocalDateInputValue } from "../utils/eventLinks";

const CreateEvent = () => {
  const { t, selectedLanguage } = useLanguage();
  const page = t.createEventPage;

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("25");
  const [photos, setPhotos] = useState("50");
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copyError, setCopyError] = useState("");
  const today = getLocalDateInputValue();

  // CUSTOM VALIDATION
  const [formError, setFormError] = useState("");

  // FIELD REFS
  const eventNameRef = useRef(null);
  const eventDateRef = useRef(null);
  const qrCodeRef = useRef(null);

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

    if (!eventDate || eventDate < today) {
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
      setCopyError("");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
      setCopyError(page.copyFailed);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: eventName.trim(),
          text: page.shareEvent,
          url: eventUrl,
        });
      } else {
        await navigator.clipboard.writeText(eventUrl);
      }

      setCopyError("");
      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 2000);
    } catch (error) {
      if (error?.name === "AbortError") return;

      setShared(false);
      setCopyError(page.shareFailed);
    }
  };

  const handleDownloadQr = () => {
    const qrCode = qrCodeRef.current;
    if (!qrCode) return;

    const serializedQr = new XMLSerializer().serializeToString(qrCode);
    const qrBlob = new Blob([serializedQr], { type: "image/svg+xml;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(qrBlob);
    const downloadLink = document.createElement("a");
    const safeEventName =
      eventName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "snaproll-event";

    downloadLink.href = downloadUrl;
    downloadLink.download = `${safeEventName}-qr.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);

    setDownloaded(true);

    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };

  const handleBack = () => {
    setCreated(false);
    setFormError("");
    setCopied(false);
    setShared(false);
    setDownloaded(false);
    setCopyError("");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const publicAppUrl = (import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin).replace(
    /\/$/,
    "",
  );
  const eventUrl = buildEventUrl(eventName, publicAppUrl);
  const validName = Boolean(eventName.trim());
  const validDate = Boolean(eventDate && eventDate >= today);
  const completedDetails = Number(validName) + Number(validDate);
  const setupProgress = completedDetails * 50;
  const formattedEventDate = validDate
    ? new Intl.DateTimeFormat(selectedLanguage.code, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${eventDate}T12:00:00`))
    : page.chooseDate;

  return (
    <main className="create-event-page relative isolate min-h-screen overflow-x-hidden bg-black px-5 pt-28 pb-24 text-white sm:px-8 sm:pt-32">
      {/* BACKGROUND GLOW */}

      <div className="create-event-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="create-event-orb create-event-orb-primary absolute top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />

        <div className="create-event-orb create-event-orb-left absolute top-[45%] -left-40 h-80 w-80 rounded-full bg-amber-300/[0.025] blur-3xl" />

        <div className="create-event-orb create-event-orb-right absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-rose-300/[0.025] blur-3xl" />
      </div>

      <div className="create-event-sweep pointer-events-none absolute top-24 left-1/2 z-0 h-px w-[min(720px,82vw)] -translate-x-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {!created ? (
          <>
            {/* HEADER */}

            <div className="create-event-header">
              <section className="mx-auto max-w-2xl text-center">
                {/* BADGE */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] tracking-[0.2em] text-white/55 uppercase backdrop-blur-xl sm:text-xs">
                  <Sparkles size={13} strokeWidth={1.5} />

                  {page.badge}
                </div>

                {/* TITLE */}
                <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-7xl">
                  {page.title1}
                  <br />
                  <span className="text-white/30">{page.title2}</span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                  {page.description}
                </p>
              </section>
            </div>

            {/* FORM */}

            <div className="create-event-card">
              <section className="mx-auto mt-12 max-w-6xl sm:mt-16">
                <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:gap-6">
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[38px] sm:p-8 md:p-10"
                  >
                    {/* TOP LINE */}
                    <div className="pointer-events-none absolute top-0 right-10 left-10 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
                    <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-amber-300/[0.035] blur-3xl" />

                    {/* FORM HEADER */}

                    <div className="mb-8 flex items-center justify-between border-b border-white/[0.07] pb-6">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
                          SnapRoll
                        </p>

                        <h2 className="mt-1 font-serif text-2xl text-white/90 sm:text-3xl">
                          {page.eventDetails}
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
                        maxLength={100}
                        value={eventName}
                        onChange={(e) => {
                          setEventName(e.target.value);

                          if (e.target.value.trim()) {
                            setFormError("");
                          }
                        }}
                        placeholder={page.eventNamePlaceholder}
                        aria-invalid={Boolean(formError && !validName)}
                        aria-describedby={formError ? "create-event-error" : undefined}
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
                          min={today}
                          value={eventDate}
                          aria-invalid={Boolean(formError && !validDate)}
                          aria-describedby={formError ? "create-event-error" : undefined}
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
                          {page.shotLimit}
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
                              25 {page.shots}
                            </option>

                            <option value="50" className="bg-black">
                              50 {page.shots}
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
                      <div
                        id="create-event-error"
                        role="alert"
                        className="mt-5 overflow-hidden rounded-2xl border border-rose-300/15 bg-rose-300/[0.04]"
                      >
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
                      className="group relative mt-7 flex h-14 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-white via-amber-50 to-white text-sm font-medium text-black shadow-[0_12px_40px_rgba(245,158,11,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(245,158,11,0.16)] active:translate-y-0 active:scale-[0.99]"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-amber-200/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <Sparkles size={15} className="relative" />
                      <span className="relative">{page.createEvent}</span>
                    </button>

                    {/* NO ACCOUNT */}
                    {page.noAccount && (
                      <p className="mt-4 text-center text-[11px] text-white/25">{page.noAccount}</p>
                    )}
                  </form>

                  {/* LIVE EVENT PREVIEW */}
                  <aside
                    aria-live="polite"
                    className="create-event-preview relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]/90 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5 lg:sticky lg:top-28"
                  >
                    <div className="mb-4 flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.75)]" />
                        <span className="text-[10px] tracking-[0.2em] text-white/55 uppercase">
                          {page.livePreview}
                        </span>
                      </div>

                      <span className="text-[9px] tracking-[0.16em] text-white/25">01 / 24</span>
                    </div>

                    <div className="group relative flex min-h-72 flex-col overflow-hidden rounded-[25px] border border-white/10 bg-linear-to-br from-[#2a2119] via-[#15100d] to-black p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-80 sm:p-6">
                      <div className="pointer-events-none absolute -top-16 -right-12 h-48 w-48 rounded-full bg-amber-300/10 blur-[55px] transition-transform duration-700 group-hover:scale-125" />
                      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-rose-400/[0.07] blur-[65px]" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.08),transparent_28%)]" />

                      <div className="relative flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[8px] tracking-[0.2em] text-white/55 uppercase backdrop-blur-sm">
                          SnapRoll
                        </span>

                        <Camera size={15} strokeWidth={1.4} className="text-white/40" />
                      </div>

                      <div className="relative mt-auto">
                        <p className="text-[9px] tracking-[0.2em] text-amber-100/45 uppercase">
                          {page.eventDate}
                        </p>

                        <h3 className="mt-3 font-serif text-3xl leading-[0.98] break-words text-white transition-all duration-300 sm:text-4xl">
                          {validName ? eventName.trim() : page.eventNamePlaceholder}
                        </h3>

                        <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
                          <CalendarDays size={13} />
                          <span>{formattedEventDate}</span>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                          <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-3">
                            <Users size={14} className="text-white/35" />
                            <p className="mt-2 text-lg text-white">{guests}</p>
                            <p className="text-[9px] text-white/30 uppercase">{page.guests}</p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-3">
                            <Camera size={14} className="text-white/35" />
                            <p className="mt-2 text-lg text-white">{photos}</p>
                            <p className="text-[9px] text-white/30 uppercase">{page.shots}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-1 pt-5 pb-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] tracking-[0.12em] text-white/40 uppercase">
                          {page.setupProgress}
                        </span>

                        <span className="text-[10px] text-white/35">
                          {completedDetails}/2 {page.detailsComplete}
                        </span>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-amber-300 via-orange-300 to-rose-300 shadow-[0_0_16px_rgba(252,211,77,0.45)] transition-[width] duration-500 ease-out"
                          style={{ width: `${setupProgress}%` }}
                        />
                      </div>
                    </div>
                  </aside>
                </div>
              </section>
            </div>
          </>
        ) : (
          //  SUCCESS / QR SECTION

          <section className="mx-auto max-w-5xl text-center">
            {/* SUCCESS HERO */}
            <div className="create-success-header relative">
              <span className="create-success-spark create-success-spark-one" />
              <span className="create-success-spark create-success-spark-two" />
              <span className="create-success-spark create-success-spark-three" />

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-200/[0.06] px-4 py-2 text-[10px] tracking-[0.2em] text-amber-100/70 uppercase backdrop-blur-xl sm:text-xs">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-200 text-black shadow-[0_0_18px_rgba(253,230,138,0.4)]">
                  <Check size={10} strokeWidth={2.5} />
                </span>

                {page.eventCreated}
              </div>

              <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl">
                {page.eventReady}
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                {page.shareEvent}
              </p>
            </div>

            {/* EVENT LAUNCH CARD */}
            <div className="create-success-card relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]/92 text-left shadow-[0_35px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:mt-12 sm:rounded-[40px]">
              <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-amber-300/[0.07] blur-[85px]" />
              <div className="pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-rose-400/[0.05] blur-[95px]" />

              <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
                {/* EVENT OVERVIEW */}
                <div className="flex flex-col border-b border-white/8 p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] tracking-[0.24em] text-white/35 uppercase">
                      {page.eventOverview}
                    </p>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[8px] tracking-[0.18em] text-white/40 uppercase">
                      SnapRoll
                    </span>
                  </div>

                  <div className="my-auto py-10 lg:py-14">
                    <h2 className="font-serif text-4xl leading-[0.96] tracking-[-0.035em] break-words text-white sm:text-5xl">
                      {eventName.trim()}
                    </h2>

                    <div className="mt-5 flex items-center gap-2 text-sm text-white/45">
                      <CalendarDays size={15} className="text-amber-200/55" />
                      <span>{formattedEventDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                      <Users size={15} className="text-white/35" />
                      <p className="mt-3 text-2xl text-white">{guests}</p>
                      <p className="mt-1 text-[9px] tracking-[0.16em] text-white/30 uppercase">
                        {page.guests}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                      <Camera size={15} className="text-white/35" />
                      <p className="mt-3 text-2xl text-white">{photos}</p>
                      <p className="mt-1 text-[9px] tracking-[0.16em] text-white/30 uppercase">
                        {page.shots}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR + ACTIONS */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="create-success-qr relative mx-auto flex h-56 w-56 items-center justify-center rounded-[30px] bg-white p-4 shadow-[0_25px_80px_rgba(253,230,138,0.12)] sm:h-60 sm:w-60">
                    <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[38px] border border-amber-200/10" />
                    <QRCodeSVG
                      ref={qrCodeRef}
                      value={eventUrl}
                      size={192}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={false}
                      title={`${eventName.trim()} ${page.scanToJoin}`}
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3 text-xs text-white/35">
                    <span className="h-px w-8 bg-white/10" />
                    <span>{page.scanToJoin}</span>
                    <span className="h-px w-8 bg-white/10" />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-4">
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

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full text-xs font-medium transition-all duration-300 active:scale-[0.98] ${
                        copied
                          ? "bg-amber-200 text-black"
                          : "bg-white text-black hover:-translate-y-0.5 hover:bg-amber-50"
                      }`}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? page.linkCopied : page.copyInviteLink}
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border text-xs font-medium transition-all duration-300 active:scale-[0.98] ${
                        shared
                          ? "border-amber-200/30 bg-amber-200/10 text-amber-100"
                          : "border-white/10 bg-white/[0.045] text-white hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                      }`}
                    >
                      {shared ? <Check size={14} /> : <Share2 size={14} />}
                      {shared ? page.eventShared : page.shareEventAction}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent text-xs font-medium text-white/60 transition-all duration-300 hover:border-amber-200/20 hover:bg-amber-200/[0.05] hover:text-white active:scale-[0.99]"
                  >
                    {downloaded ? <Check size={14} /> : <Download size={14} />}
                    {downloaded ? page.qrDownloaded : page.downloadQr}
                  </button>

                  {copyError && (
                    <p role="alert" className="mt-3 text-center text-xs leading-5 text-rose-300">
                      {copyError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBack}
              className="mx-auto mt-8 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs text-white/45 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/70"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              {page.back}
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default CreateEvent;
