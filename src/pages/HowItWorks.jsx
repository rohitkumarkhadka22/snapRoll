import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  LockKeyhole,
  MousePointer2,
  Power,
  QrCode,
  RotateCcw,
  ScanLine,
  Settings,
  Share2,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
  X,
  Zap,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import useLanguage from "../context/useLanguage";

/* =========================================================
   EVENT IMAGES
========================================================= */

const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
];

/* =========================================================
   SOUND
========================================================= */

const playSound = (type = "click") => {
  if (typeof window === "undefined") return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      oscillator.frequency.setValueAtTime(520, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        760,
        ctx.currentTime + 0.12,
      );
    } else if (type === "camera") {
      oscillator.frequency.setValueAtTime(180, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        80,
        ctx.currentTime + 0.08,
      );
    } else {
      oscillator.frequency.setValueAtTime(420, ctx.currentTime);
    }

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.16);
  } catch {
    // Optional audio.
  }
};

/* =========================================================
   MAIN
========================================================= */

const HowItWorks = () => {
  const { t, selectedLanguage } = useLanguage();
  const h = t.howItWorks;

  const [openStep, setOpenStep] = useState(null);

  const [eventName, setEventName] = useState("Sarah's Birthday");
  const [eventDate, setEventDate] = useState("2026-09-14");

  const [shots, setShots] = useState(24);
  const [guests, setGuests] = useState(50);

  const [created, setCreated] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const steps = [
    {
      number: "01",
      key: "create",
      title: h.steps.create.title,
      description: h.steps.create.description,
    },
    {
      number: "02",
      key: "qr",
      title: h.steps.qr.title,
      description: h.steps.qr.description,
    },
    {
      number: "03",
      key: "join",
      title: h.steps.join.title,
      description: h.steps.join.description,
    },
    {
      number: "04",
      key: "shoot",
      title: h.steps.shoot.title,
      description: h.steps.shoot.description,
    },
    {
      number: "05",
      key: "reveal",
      title: h.steps.reveal.title,
      description: h.steps.reveal.description,
    },
  ];

  const scrollToStep = (id) => {
    const element = document.getElementById(`step-${id}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const createRoll = () => {
    if (!eventName.trim()) return;

    setCreated(true);
    playSound("success");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 md:pt-44 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-20 h-87.5 w-87.5 -translate-x-1/2 rounded-full bg-white/4.5r-[120px] sm:h-100 sm:w-100" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[10px] tracking-[0.18em] text-white/50 backdrop-blur-xl sm:text-xs">
            <Sparkles size={13} />
            {h.badge}
          </div>

          <h1 className="font-serif text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            {h.heroTitle1}
            <br />
            <span className="text-white/30">{h.heroTitle2}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            {h.heroDescription}
          </p>
        </div>

        {/* =================================================
            HERO PHONE
        ================================================= */}

        <ScrollReveal>
          <div className="group relative mx-auto mt-12 h-115 max-w-5xl sm:mt-17 sm:h-150">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/4 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 hidden h-px w-[74%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent sm:block" />

            <HeroFloat
              className="left-[1%] top-[20%] -rotate-6 opacity-0 -translate-y-3 group-hover:translate-y-0 group-hover:opacity-100"
              icon={<QrCode size={25} />}
              label={h.scan}
              delay="duration-300"
              onClick={() => scrollToStep("qr")}
            />

            <HeroFloat
              className="right-[1%] top-[16%] rotate-6 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100"
              icon={<Camera size={25} />}
              label={h.shoot}
              delay="delay-75 duration-500"
              onClick={() => scrollToStep("shoot")}
            />

            <HeroFloat
              className="bottom-[10%] left-[8%] rotate-6 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100"
              icon={<Users size={25} />}
              label={h.join}
              delay="delay-150 duration-500"
              onClick={() => scrollToStep("join")}
            />

            <HeroFloat
              className="bottom-[8%] right-[8%] -rotate-6 opacity-0 -translate-y-3 group-hover:translate-y-0 group-hover:opacity-100"
              icon={<Sparkles size={25} />}
              label={h.reveal}
              delay="delay-200 duration-500"
              onClick={() => scrollToStep("reveal")}
            />

            {/* HERO PHONE */}

            <div className="absolute left-1/2 top-1/2 h-143.75 w-75 -translate-x-1/2 -translate-y-1/2 rotate-2 rounded-[2.8rem] border border-white/15 bg-[#080808] p-2 shadow-[0_35px_100px_rgba(255,255,255,0.09)] transition-all duration-700 group-hover:rotate-0 group-hover:translate-y-[-52%]">
              <PhoneReflection />

              <div className="relative h-full overflow-hidden rounded-[2.3rem] border border-white/8 bg-[#111]">
                <div className="absolute left-1/2 top-3 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

                <img
                  src={EVENT_IMAGES[0]}
                  alt="SnapRoll event"
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/15 to-black/95" />

                <div className="relative z-10 flex h-full flex-col px-4 pb-5 pt-12">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/45">
                      SNAPROLL
                    </span>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl">
                      <Sparkles size={13} className="text-white/55" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-serif text-3xl leading-none">
                    {h.phoneTitle1}
                    <br />
                    {h.phoneTitle2}
                  </h3>

                  <p className="mt-4 max-w-40 text-[10px] leading-5 text-white/40">
                    {h.phoneDescription}
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-1.5">
                    {EVENT_IMAGES.slice(0, 4).map((image, index) => (
                      <div
                        key={image}
                        className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
                      >
                        <img
                          src={image}
                          alt={`${h.snaprollMemory} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-white/40">
                        {h.moments}
                      </span>

                      <span className="text-xs text-white/80">
                        {capturedPhotos.length || 18} / {shots}
                      </span>
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white/70 transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            ((capturedPhotos.length || 18) / shots) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HERO CURSOR */}

            <div className="pointer-events-none absolute bottom-7 right-[24%] hidden opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-100 md:block">
              <div className="relative">
                <MousePointer2
                  size={27}
                  className="fill-white text-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                />

                <span className="absolute left-5 top-5 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-2 py-1 text-[7px] uppercase tracking-[0.12em] text-white/60 backdrop-blur-xl">
                  {h.tryIt}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* =====================================================
          STEPS
      ===================================================== */}

      <section className="px-4 pb-28 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {steps.map((step, index) => {
            return (
              <div key={step.number} id={`step-${step.key}`}>
                <StepSection
                  step={step}
                  index={index}
                  h={h}
                  selectedLanguage={selectedLanguage}
                  openStep={openStep}
                  setOpenStep={setOpenStep}
                  eventName={eventName}
                  setEventName={setEventName}
                  eventDate={eventDate}
                  setEventDate={setEventDate}
                  shots={shots}
                  setShots={setShots}
                  guests={guests}
                  setGuests={setGuests}
                  created={created}
                  onCreate={createRoll}
                  capturedPhotos={capturedPhotos}
                  setCapturedPhotos={setCapturedPhotos}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden border-t border-white/8 px-6 py-24 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-87.5 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[100px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs tracking-[0.2em] text-white/30">
            {h.readyToCapture}
          </p>

          <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl md:text-6xl">
            {h.finalTitle1}
            <br />
            <span className="text-white/30">{h.finalTitle2}</span>
          </h2>

          <button
            onClick={() => playSound("success")}
            className="mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-white/90 active:scale-95"
          >
            {h.createYourRoll}
            <Sparkles size={15} />
          </button>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   STEP SECTION
========================================================= */

const StepSection = ({
  step,
  index,
  h,
  selectedLanguage,
  openStep,
  setOpenStep,
  eventName,
  setEventName,
  eventDate,
  setEventDate,
  shots,
  setShots,
  guests,
  setGuests,
  created,
  onCreate,
  capturedPhotos,
  setCapturedPhotos,
}) => {
  const isEven = index % 2 === 0;
  const isOpen = openStep === index;

  return (
    <ScrollReveal>
      <div
        className={`relative flex flex-col items-center gap-12 border-t border-white/[0.08] py-20 sm:gap-16 sm:py-24 md:gap-20 lg:py-32 ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* TEXT */}

        <div className="w-full lg:w-1/2">
          <div className="flex items-start gap-4 sm:gap-7">
            <span className="font-serif text-5xl leading-none tracking-[-0.05em] text-white/15 sm:text-7xl">
              {step.number}
            </span>

            <div className="min-w-0 flex-1">
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/30">
                {h.step} {step.number}
              </p>

              <h2 className="font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
                {step.title}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                {step.description}
              </p>

              <div className="mt-8 hidden grid-cols-2 gap-3 sm:grid">
                {h.steps[step.key].features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-white/45"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Check size={10} />
                    </span>

                    {feature}
                  </div>
                ))}
              </div>

              {/* POWER HINT */}

              <div className="mt-8 hidden items-center gap-4 sm:flex">
                <div className="h-px w-10 shrink-0 bg-white/10" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    {h.quickHint}
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
                    {isEven ? (
                      <>
                        {h.tapPower}
                        <span className="text-base text-white/25">→</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base text-white/25">←</span>
                        {h.tapPower}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* MOBILE */}

              <button
                onClick={() => {
                  setOpenStep(isOpen ? null : index);
                  playSound("click");
                }}
                className="mt-7 flex w-full cursor-pointer items-center justify-between border-t border-white/[0.08] pt-5 sm:hidden"
              >
                <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                  {h.whatHappens}
                </span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 sm:hidden ${
                  isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 pt-5">
                  {h.steps[step.key].features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/45"
                    >
                      <Check size={13} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PHONE */}

        <div className="flex w-full min-w-0 justify-center lg:w-1/2">
          <PhoneMockup
            step={index}
            h={h}
            selectedLanguage={selectedLanguage}
            eventName={eventName}
            setEventName={setEventName}
            eventDate={eventDate}
            setEventDate={setEventDate}
            shots={shots}
            setShots={setShots}
            guests={guests}
            setGuests={setGuests}
            created={created}
            onCreate={onCreate}
            capturedPhotos={capturedPhotos}
            setCapturedPhotos={setCapturedPhotos}
          />
        </div>
      </div>
    </ScrollReveal>
  );
};

/* =========================================================
   PHONE MOCKUP
========================================================= */

const PhoneMockup = ({
  step,
  h,
  selectedLanguage,
  eventName,
  setEventName,
  eventDate,
  setEventDate,
  shots,
  setShots,
  guests,
  setGuests,
  created,
  onCreate,
  capturedPhotos,
  setCapturedPhotos,
}) => {
  const [powered, setPowered] = useState(false);

  const [silent, setSilent] = useState(false);
  const [volume, setVolume] = useState(60);

  const changeVolume = (amount) => {
    setVolume((prev) => Math.min(100, Math.max(0, prev + amount)));

    playSound("click");
  };

  const togglePower = () => {
    setPowered((prev) => !prev);
    playSound("click");
  };

  return (
    <div className="relative flex w-full max-w-[430px] justify-center px-3 sm:px-5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[100px] sm:h-80 sm:w-80" />

      <div className="relative w-full max-w-[330px] sm:max-w-[340px]">
        {/* LEFT SIDE BUTTONS */}

        <button
          onClick={() => {
            setSilent((prev) => !prev);
            playSound("click");
          }}
          title={h.silent}
          className="absolute -left-[4px] top-[110px] z-30 h-8 w-[5px] -translate-x-full cursor-pointer rounded-l-md border border-white/20 bg-[#292929] transition hover:bg-[#444] active:scale-90 sm:-left-[6px] sm:h-9 sm:w-[6px]"
        />

        <button
          onClick={() => changeVolume(10)}
          title={h.volumeUp}
          className="absolute -left-[4px] top-[165px] z-30 h-12 w-[5px] -translate-x-full cursor-pointer rounded-l-md border border-white/20 bg-[#292929] transition hover:bg-[#444] active:scale-90 sm:-left-[6px] sm:h-13 sm:w-[6px]"
        />

        <button
          onClick={() => changeVolume(-10)}
          title={h.volumeDown}
          className="absolute -left-[4px] top-[220px] z-30 h-12 w-[5px] -translate-x-full cursor-pointer rounded-l-md border border-white/20 bg-[#292929] transition hover:bg-[#444] active:scale-90 sm:-left-[6px] sm:h-13 sm:w-[6px]"
        />

        {/* RIGHT POWER */}

        <button
          onClick={togglePower}
          title={powered ? h.turnPhoneOff : h.turnPhoneOn}
          className="absolute -right-[4px] top-[180px] z-40 h-18 w-[5px] translate-x-full cursor-pointer rounded-r-md border border-white/20 bg-[#292929] transition hover:bg-[#555] active:scale-90 sm:-right-[6px] sm:h-20 sm:w-[6px]"
        />

        {/* PHONE */}

        <div className="relative rounded-[43px] border border-white/[0.18] bg-[#171717] p-[6px] shadow-[0_35px_100px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:-translate-y-2 sm:rounded-[48px] sm:p-[7px]">
          <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-black sm:rounded-[40px]">
            <div className="absolute left-1/2 top-3 z-40 h-[24px] w-[90px] -translate-x-1/2 rounded-full bg-black shadow-inner sm:h-[25px] sm:w-[96px]" />

            <div className="relative h-[600px] min-h-[600px] overflow-hidden sm:h-[620px] sm:min-h-[620px]">
              {!powered ? (
                <PowerOffScreen h={h} onPower={togglePower} />
              ) : (
                <>
                  {step === 0 && (
                    <CreateRoll
                      h={h}
                      selectedLanguage={selectedLanguage}
                      eventName={eventName}
                      setEventName={setEventName}
                      eventDate={eventDate}
                      setEventDate={setEventDate}
                      shots={shots}
                      setShots={setShots}
                      guests={guests}
                      setGuests={setGuests}
                      created={created}
                      onCreate={onCreate}
                    />
                  )}

                  {step === 1 && (
                    <ShareQR
                      h={h}
                      eventName={eventName}
                      shots={shots}
                      guests={guests}
                    />
                  )}

                  {step === 2 && <GuestJoin h={h} eventName={eventName} />}

                  {step === 3 && (
                    <ShootCamera
                      h={h}
                      silent={silent}
                      volume={volume}
                      shots={shots}
                      capturedPhotos={capturedPhotos}
                      setCapturedPhotos={setCapturedPhotos}
                    />
                  )}

                  {step === 4 && (
                    <RevealRoll
                      h={h}
                      eventName={eventName}
                      capturedPhotos={capturedPhotos}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* SOUND */}

        {powered && (
          <div className="absolute -right-20 top-8 hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[9px] text-white/35 backdrop-blur-xl sm:block">
            <div className="flex items-center gap-2">
              {silent ? <VolumeX size={12} /> : <Volume2 size={12} />}

              {silent ? h.silent : `${volume}%`}
            </div>
          </div>
        )}

        {/* CURSOR */}

        <div className="pointer-events-none absolute -right-7 bottom-24 hidden animate-[bounce_2.5s_infinite] md:block">
          <div className="rounded-full border border-white/10 bg-black/80 p-2 shadow-xl backdrop-blur">
            <MousePointer2
              size={17}
              className="rotate-[-12deg] fill-white text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   STEP 01 — CREATE
========================================================= */

const CreateRoll = ({
  h,
  selectedLanguage,
  eventName,
  setEventName,
  eventDate,
  setEventDate,
  shots,
  setShots,
  guests,
  setGuests,
  created,
  onCreate,
}) => {
  const [filter, setFilter] = useState("Warm");

  if (created) {
    return (
      <div className="flex h-full min-h-[600px] flex-col items-center justify-center overflow-y-auto px-5 py-12 text-center sm:min-h-[620px] sm:px-6">
        <div className="flex h-20 w-20 shrink-0 animate-[pulse_2s_infinite] items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
          <Check size={30} />
        </div>

        <p className="mt-7 text-[10px] uppercase tracking-[0.2em] text-white/30">
          {h.rollCreated}
        </p>

        <h3 className="mt-2 max-w-[210px] font-serif text-3xl">{eventName}</h3>

        <p className="mt-3 text-xs text-white/35">
          {shots} {h.shots} · {guests} {h.guests}
        </p>

        <p className="mt-2 text-[10px] text-white/20">
          {h.ends}{" "}
          {new Date(eventDate).toLocaleDateString(selectedLanguage.code, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/50 transition hover:bg-white/[0.06]"
        >
          <RotateCcw size={13} />
          {h.editRoll}
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 pb-7 pt-14 scrollbar-thin sm:px-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
            {h.newRoll}
          </p>

          <h3 className="mt-2 font-serif text-2xl">{h.create}</h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Sparkles size={14} className="text-white/50" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {/* EVENT */}

        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={14} className="text-white/30" />

            <span className="text-[10px] text-white/30">{h.eventName}</span>
          </div>

          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full bg-transparent text-xs text-white/80 outline-none"
            placeholder={h.eventNamePlaceholder}
          />
        </div>

        {/* DATE */}

        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays size={14} className="text-white/30" />

            <span className="text-[10px] text-white/30">{h.endDate}</span>
          </div>

          <input
            type="date"
            value={eventDate}
            onChange={(e) => {
              setEventDate(e.target.value);
              playSound("click");
            }}
            className="w-full cursor-pointer bg-transparent text-xs text-white/70 outline-none [color-scheme:dark]"
          />
        </div>

        {/* FILTER */}

        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-3.5">
          <div className="mb-3 flex items-center gap-2">
            <Filter size={14} className="text-white/35" />

            <span className="text-[10px] text-white/35">{h.filters}</span>
          </div>

          <div className="flex gap-2">
            {["Warm", "Flash", "B&W"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFilter(item);
                  playSound("click");
                }}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-[9px] transition ${
                  filter === item
                    ? "border-white/20 bg-white text-black"
                    : "border-white/10 text-white/35 hover:bg-white/[0.05]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* SHOTS / GUESTS */}

        <div className="grid grid-cols-2 gap-3">
          <NumberSetting
            icon={<Camera size={13} />}
            label={h.shots}
            value={shots}
            min={6}
            max={100}
            onChange={(value) => {
              setShots(value);
              playSound("click");
            }}
          />

          <NumberSetting
            icon={<Users size={13} />}
            label={h.guests}
            value={guests}
            min={2}
            max={200}
            onChange={(value) => {
              setGuests(value);
              playSound("click");
            }}
          />
        </div>
      </div>

      <button
        onClick={onCreate}
        disabled={!eventName.trim()}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white py-3 text-xs font-semibold text-black transition hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {h.createRoll}
        <Check size={13} />
      </button>
    </div>
  );
};

/* =========================================================
   STEP 02 — QR
========================================================= */

const ShareQR = ({ h, eventName, shots, guests }) => {
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("WARM");
  const [selectedImage, setSelectedImage] = useState(EVENT_IMAGES[0]);

  const filters = [
    {
      name: "WARM",
      className: "sepia-[0.25] saturate-[1.15]",
    },
    {
      name: "FLASH",
      className: "brightness-[1.2] contrast-[1.15]",
    },
    {
      name: "B&W",
      className: "grayscale",
    },
  ];

  const copyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard
        .writeText(`https://snaproll.app/join/${encodeURIComponent(eventName)}`)
        .catch(() => {});
    }

    setCopied(true);
    playSound("success");

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <div className="relative h-full min-h-[600px] overflow-y-auto bg-[#080808] px-4 pb-7 pt-14 sm:min-h-[620px]">
      {/* HEADER */}

      <div className="text-center">
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
          {h.step} 02
        </p>

        <h3 className="mt-2 font-serif text-2xl">{h.shareRoll}</h3>
      </div>

      {/* PHOTO AREA */}

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10">
        <img
          src={selectedImage}
          alt={h.preview}
          className={`h-[220px] w-full object-cover transition-all duration-500 ${
            filters.find((item) => item.name === selectedFilter)?.className ||
            ""
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div className="absolute bottom-3 left-3">
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/40">
            {h.preview}
          </p>

          <p className="mt-1 font-serif text-xl">{eventName}</p>
        </div>
      </div>

      {/* FILTER */}

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2">
          <Filter size={12} className="text-white/40" />

          <span className="text-[9px] uppercase tracking-[0.15em] text-white/35">
            {h.chooseFilter}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {filters.map((item, index) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedFilter(item.name);
                setSelectedImage(EVENT_IMAGES[index]);
                playSound("click");
              }}
              className={`relative overflow-hidden rounded-xl border p-1 transition ${
                selectedFilter === item.name
                  ? "border-white/40 bg-white/[0.12]"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
              }`}
            >
              <img
                src={EVENT_IMAGES[index]}
                alt={item.name}
                className={`h-14 w-full rounded-lg object-cover ${item.className}`}
              />

              <span className="mt-1 block text-[8px] text-white/50">
                {item.name}
              </span>

              {selectedFilter === item.name && (
                <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
                  <Check size={9} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* QR */}

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
        <div className="rounded-xl bg-white p-2">
          <QRCodeSVG
            value={`https://snaproll.app/join/${encodeURIComponent(eventName)}`}
            size={65}
            level="H"
          />
        </div>

        <div className="min-w-0 text-left">
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/30">
            {h.scanToJoin}
          </p>

          <p className="mt-1 truncate text-xs text-white/65">{eventName}</p>

          <p className="mt-1 text-[8px] text-white/25">
            {shots} {h.shots} · {guests} {h.guests}
          </p>
        </div>
      </div>

      <button
        onClick={copyLink}
        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] py-3 text-[10px] text-white/50 transition hover:bg-white/[0.07] active:scale-95"
      >
        {copied ? (
          <>
            <Check size={12} />
            {h.linkCopied}
          </>
        ) : (
          <>
            <Share2 size={12} />
            {h.copyInviteLink}
          </>
        )}
      </button>
    </div>
  );
};

/* =========================================================
   STEP 03 — JOIN
========================================================= */

const GuestJoin = ({ h, eventName }) => {
  const [name, setName] = useState("Rohit");
  const [joined, setJoined] = useState(false);

  const [previewImage, setPreviewImage] = useState(EVENT_IMAGES[0]);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (joined) {
    return (
      <div className="relative flex h-full min-h-[600px] flex-col overflow-hidden bg-black sm:min-h-[620px]">
        {/* RIGHT PREVIEW */}

        <div className="absolute right-0 top-0 h-full w-[45%] overflow-hidden border-l border-white/10">
          <img
            src={previewImage}
            alt={h.preview}
            className="h-full w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* LEFT CONTENT */}

        <div className="relative z-10 flex h-full w-[65%] flex-col items-center justify-center bg-gradient-to-r from-black via-black/95 to-transparent px-5 text-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]">
            <Check size={25} />
          </div>

          <p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-white/30">
            {h.welcome}
          </p>

          <h3 className="mt-2 font-serif text-2xl">
            {h.hey}, {name || h.guest}.
          </h3>

          <p className="mt-3 text-[10px] leading-5 text-white/35">
            {h.nowPartOf} <span className="text-white/65">{eventName}</span>
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {EVENT_IMAGES.slice(0, 3).map((image) => (
              <button
                key={image}
                onClick={() => {
                  setPreviewImage(image);
                  playSound("click");
                }}
                className={`h-10 w-10 overflow-hidden rounded-lg border transition ${
                  previewImage === image ? "border-white/60" : "border-white/10"
                }`}
              >
                <img
                  src={image}
                  alt={h.preview}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setJoined(false);
              playSound("click");
            }}
            className="mt-7 cursor-pointer rounded-full border border-white/10 px-4 py-2 text-[9px] text-white/40 transition hover:bg-white/[0.06]"
          >
            {h.changeName}
          </button>

          <button
            onClick={() => {
              setPreviewOpen(true);
              playSound("click");
            }}
            className="mt-2 flex items-center gap-2 text-[9px] text-white/35 hover:text-white/60"
          >
            <Eye size={12} />
            {h.viewPreview}
          </button>
        </div>

        {previewOpen && (
          <PreviewModal
            h={h}
            image={previewImage}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[600px] overflow-hidden bg-black sm:min-h-[620px]">
      {/* RIGHT PHOTO */}

      <div className="absolute right-0 top-0 h-full w-[42%] overflow-hidden">
        <img
          src={previewImage}
          alt={h.preview}
          className="h-full w-full object-cover opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

        <button
          onClick={() => {
            setPreviewOpen(true);
            playSound("click");
          }}
          className="absolute bottom-20 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-xl"
        >
          <Eye size={13} />
        </button>
      </div>

      {/* LEFT */}

      <div className="relative z-10 flex w-[70%] flex-col justify-center px-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <ScanLine size={22} className="text-white/70" />
        </div>

        <p className="mt-5 text-[9px] uppercase tracking-[0.18em] text-white/30">
          {h.joinRoll}
        </p>

        <h3 className="mt-2 font-serif text-2xl">{h.invited}</h3>

        <p className="mt-3 max-w-[160px] text-[10px] leading-5 text-white/35">
          {h.join} <span className="text-white/70">{eventName}</span>
        </p>

        <div className="mt-7 rounded-2xl border border-white/[0.09] bg-black/70 p-4 backdrop-blur-xl">
          <p className="text-[9px] text-white/30">{h.displayName}</p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[10px] text-white outline-none placeholder:text-white/20 focus:border-white/20"
            placeholder={h.yourName}
          />

          <button
            onClick={() => {
              setJoined(true);
              playSound("success");
            }}
            disabled={!name.trim()}
            className="mt-3 w-full cursor-pointer rounded-xl bg-white py-2.5 text-[10px] font-semibold text-black transition hover:scale-[1.02] active:scale-95 disabled:opacity-40"
          >
            {h.joinTheRoll}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[9px] text-white/25">
          <LockKeyhole size={11} />
          {h.noAccount}
        </div>
      </div>

      {previewOpen && (
        <PreviewModal
          h={h}
          image={previewImage}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
};

/* =========================================================
   STEP 04 — CAMERA
========================================================= */

const ShootCamera = ({
  h,
  silent,
  volume,
  shots,
  capturedPhotos,
  setCapturedPhotos,
}) => {
  const [remaining, setRemaining] = useState(shots);

  const [filter, setFilter] = useState("WARM");

  const [flashEnabled, setFlashEnabled] = useState(false);

  const [captureFeedback, setCaptureFeedback] = useState(false);

  const [viewingPhotos, setViewingPhotos] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [grid, setGrid] = useState(true);
  const [timer, setTimer] = useState(false);
  const [mirror, setMirror] = useState(false);

  const takePhoto = () => {
    if (remaining <= 0) return;

    const nextPhoto = EVENT_IMAGES[capturedPhotos.length % EVENT_IMAGES.length];

    setRemaining((prev) => prev - 1);

    setCapturedPhotos((prev) => [...prev, nextPhoto]);

    setCaptureFeedback(true);

    if (!silent) {
      playSound("camera");
    }

    setTimeout(() => {
      setCaptureFeedback(false);
    }, 1000);
  };

  const nextPhoto = () => {
    if (!capturedPhotos.length) return;

    setSelectedPhoto((prev) => Math.min(capturedPhotos.length - 1, prev + 1));

    if (!silent) playSound("click");
  };

  const previousPhoto = () => {
    setSelectedPhoto((prev) => Math.max(0, prev - 1));

    if (!silent) playSound("click");
  };

  /* =======================================================
     VIEWER
  ======================================================= */

  if (viewingPhotos && capturedPhotos.length > 0) {
    return (
      <div className="relative h-full min-h-[600px] overflow-hidden bg-black sm:min-h-[620px]">
        <img
          src={capturedPhotos[selectedPhoto]}
          alt={h.capturedMemory}
          className={`absolute inset-0 h-full w-full object-cover ${
            filter === "B&W" ? "grayscale" : ""
          }`}
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 pt-14 sm:px-5">
          <button
            onClick={() => {
              setViewingPhotos(false);

              if (!silent) playSound("click");
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-xl"
          >
            <ArrowLeft size={15} />
          </button>

          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[9px] text-white/70 backdrop-blur-xl">
            {selectedPhoto + 1} / {capturedPhotos.length}
          </span>

          <button
            onClick={() => {
              setSettingsOpen(true);
              playSound("click");
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-xl"
          >
            <Settings size={14} />
          </button>
        </div>

        <div className="absolute bottom-28 right-3 z-20 flex flex-col gap-2">
          <button
            onClick={nextPhoto}
            disabled={selectedPhoto >= capturedPhotos.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 backdrop-blur-xl disabled:opacity-25"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={previousPhoto}
            disabled={selectedPhoto <= 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 backdrop-blur-xl disabled:opacity-25"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        <div className="absolute bottom-6 left-4 z-20">
          <div className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-xl">
            <p className="text-[8px] uppercase tracking-[0.15em] text-white/40">
              {h.captured}
            </p>

            <p className="mt-1 font-serif text-2xl">
              {selectedPhoto + 1}
              <span className="text-white/25"> / {capturedPhotos.length}</span>
            </p>
          </div>
        </div>

        {settingsOpen && (
          <CameraSettings
            h={h}
            grid={grid}
            setGrid={setGrid}
            timer={timer}
            setTimer={setTimer}
            mirror={mirror}
            setMirror={setMirror}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </div>
    );
  }

  /* =======================================================
     CAMERA
  ======================================================= */

  return (
    <div className="relative flex h-full min-h-[600px] flex-col justify-between overflow-hidden bg-[#151515] p-4 pt-14 sm:min-h-[620px] sm:p-5 sm:pt-14">
      {/* IMAGE */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          src={
            capturedPhotos.length > 0
              ? capturedPhotos[capturedPhotos.length - 1]
              : EVENT_IMAGES[1]
          }
          alt={h.cameraPreview}
          className={`h-full w-full object-cover opacity-45 transition-all duration-700 ${
            filter === "B&W"
              ? "grayscale"
              : filter === "FLASH"
                ? "brightness-125"
                : ""
          } ${mirror ? "scale-x-[-1]" : ""}`}
        />

        <div className="absolute inset-0 bg-black/45" />

        {filter === "WARM" && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/[0.12] via-transparent to-black" />
        )}

        {filter === "FLASH" && (
          <div className="absolute inset-0 bg-white/[0.08]" />
        )}

        {grid && (
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-1/3 top-0 h-full w-px bg-white/30" />
            <div className="absolute left-2/3 top-0 h-full w-px bg-white/30" />
            <div className="absolute left-0 top-1/3 h-px w-full bg-white/30" />
            <div className="absolute left-0 top-2/3 h-px w-full bg-white/30" />
          </div>
        )}
      </div>

      {/* CAPTURE FEEDBACK */}

      {captureFeedback && (
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-2xl border border-white/15 bg-black/75 px-6 py-4 text-center shadow-2xl backdrop-blur-xl">
            <p className="font-serif text-3xl text-white">
              {capturedPhotos.length}
            </p>

            <p className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-white/45">
              {capturedPhotos.length === 1 ? h.photoTaken : h.photosTaken}
            </p>
          </div>
        </div>
      )}

      {/* TOP */}

      <div className="relative z-10 flex items-center justify-between">
        <button
          onClick={() => !silent && playSound("click")}
          title={h.back}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur"
        >
          <ArrowLeft size={15} />
        </button>

        <button
          onClick={() => {
            setFilter((prev) =>
              prev === "WARM" ? "FLASH" : prev === "FLASH" ? "B&W" : "WARM",
            );

            if (!silent) playSound("click");
          }}
          className="cursor-pointer rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] text-white/70 backdrop-blur"
        >
          {filter}
        </button>

        {/* SETTINGS */}

        <button
          onClick={() => {
            setSettingsOpen(true);

            if (!silent) playSound("click");
          }}
          title={h.cameraSettings}
          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition ${
            settingsOpen
              ? "border-white/30 bg-white/15"
              : "border-white/10 bg-black/40"
          } backdrop-blur`}
        >
          <Settings size={14} />
        </button>
      </div>

      {/* LEFT COUNTER */}

      <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-5">
        <div className="rounded-2xl border border-white/15 bg-black/40 px-3 py-3 text-center backdrop-blur-xl">
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/40">
            {h.shots}
          </p>

          <p className="mt-1 font-serif text-2xl">{remaining}</p>

          <div className="mx-auto mt-1 text-[8px] text-white/30">{h.left}</div>
        </div>
      </div>

      {/* RIGHT PREVIEW */}

      {capturedPhotos.length > 0 && (
        <button
          onClick={() => {
            setSelectedPhoto(capturedPhotos.length - 1);
            setViewingPhotos(true);

            if (!silent) playSound("click");
          }}
          title={h.preview}
          className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 cursor-pointer flex-col items-center gap-1 rounded-2xl border border-white/15 bg-black/45 p-2 backdrop-blur-xl sm:right-4"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10">
            <img
              src={capturedPhotos[capturedPhotos.length - 1]}
              alt={h.latestCapture}
              className="h-full w-full object-cover"
            />
          </div>

          <span className="text-[7px] text-white/55">{h.preview}</span>

          <span className="text-[7px] text-white/35">
            {capturedPhotos.length}
          </span>
        </button>
      )}

      {/* CENTER */}

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="h-28 w-28 rounded-full border border-white/[0.18] bg-white/[0.025] backdrop-blur-xl sm:h-32 sm:w-32" />

        <div className="absolute h-20 w-20 rounded-full border border-white/[0.08] sm:h-24 sm:w-24" />

        <div className="absolute right-8 top-1/2 animate-[bounce_2s_infinite] sm:right-9">
          <MousePointer2
            size={20}
            className="rotate-[-12deg] fill-white text-white"
          />
        </div>
      </div>

      {/* BOTTOM */}

      <div className="relative z-10 mt-auto flex items-center justify-between px-1 pb-2 sm:px-2">
        {/* FLASH BUTTON */}

        <button
          onClick={() => {
            setFlashEnabled((prev) => !prev);

            if (!silent) playSound("click");
          }}
          title={flashEnabled ? h.flashOn : h.flashOff}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition ${
            flashEnabled
              ? "border-white/30 bg-white/20"
              : "border-white/10 bg-black/40"
          }`}
        >
          <Zap size={14} />
        </button>

        {/* SHUTTER */}

        <button
          onClick={takePhoto}
          disabled={remaining === 0}
          title={h.takePhoto}
          className="group flex h-[74px] w-[74px] cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/[0.08] transition duration-200 hover:scale-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 sm:h-[78px] sm:w-[78px]"
        >
          <span className="h-[57px] w-[57px] rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.25)] transition group-hover:scale-95 sm:h-[60px] sm:w-[60px]" />
        </button>

        {/* GALLERY */}

        <button
          onClick={() => {
            if (!capturedPhotos.length) return;

            setSelectedPhoto(capturedPhotos.length - 1);
            setViewingPhotos(true);

            if (!silent) playSound("click");
          }}
          title={h.gallery}
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/40"
        >
          <ImageIcon size={14} />

          {capturedPhotos.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[7px] font-bold text-black">
              {capturedPhotos.length}
            </span>
          )}
        </button>
      </div>

      {/* SOUND */}

      <div className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] text-white/40 backdrop-blur-xl">
          {silent ? <VolumeX size={11} /> : <Volume2 size={11} />}

          {silent ? h.silent : `${volume}%`}
        </div>
      </div>

      {/* SETTINGS */}

      {settingsOpen && (
        <CameraSettings
          h={h}
          grid={grid}
          setGrid={setGrid}
          timer={timer}
          setTimer={setTimer}
          mirror={mirror}
          setMirror={setMirror}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
};

/* =========================================================
   CAMERA SETTINGS
========================================================= */

const CameraSettings = ({
  h,
  grid,
  setGrid,
  timer,
  setTimer,
  mirror,
  setMirror,
  onClose,
}) => {
  return (
    <div className="absolute inset-x-3 bottom-3 z-[60] overflow-hidden rounded-3xl border border-white/15 bg-black/90 p-4 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">
            {h.cameraSettings}
          </p>

          <h4 className="mt-1 font-serif text-xl">{h.customizeShot}</h4>
        </div>

        <button
          onClick={onClose}
          title={h.close}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
        >
          <X size={14} />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {/* GRID */}

        <button
          onClick={() => {
            setGrid((prev) => !prev);
            playSound("click");
          }}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 transition hover:bg-white/[0.07]"
        >
          <div className="flex items-center gap-3">
            <ScanLine size={14} className="text-white/45" />

            <div className="text-left">
              <p className="text-[10px] text-white/65">{h.cameraGrid}</p>

              <p className="text-[8px] text-white/25">{h.alignFrame}</p>
            </div>
          </div>

          <Toggle active={grid} />
        </button>

        {/* TIMER */}

        <button
          onClick={() => {
            setTimer((prev) => !prev);
            playSound("click");
          }}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 transition hover:bg-white/[0.07]"
        >
          <div className="flex items-center gap-3">
            <Camera size={14} className="text-white/45" />

            <div className="text-left">
              <p className="text-[10px] text-white/65">{h.selfTimer}</p>

              <p className="text-[8px] text-white/25">
                {timer ? h.threeSecondTimer : h.instantCapture}
              </p>
            </div>
          </div>

          <Toggle active={timer} />
        </button>

        {/* MIRROR */}

        <button
          onClick={() => {
            setMirror((prev) => !prev);
            playSound("click");
          }}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 transition hover:bg-white/[0.07]"
        >
          <div className="flex items-center gap-3">
            <RotateCcw size={14} className="text-white/45" />

            <div className="text-left">
              <p className="text-[10px] text-white/65">{h.mirrorCamera}</p>

              <p className="text-[8px] text-white/25">{h.flipPreview}</p>
            </div>
          </div>

          <Toggle active={mirror} />
        </button>
      </div>

      <button
        onClick={() => {
          onClose();
          playSound("success");
        }}
        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white py-3 text-[10px] font-semibold text-black transition hover:bg-white/90 active:scale-95"
      >
        <Check size={12} />
        {h.done}
      </button>
    </div>
  );
};

/* =========================================================
   TOGGLE
========================================================= */

const Toggle = ({ active }) => {
  return (
    <span
      className={`relative h-5 w-9 rounded-full transition ${
        active ? "bg-white" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition ${
          active ? "right-1 bg-black" : "left-1 bg-white/30"
        }`}
      />
    </span>
  );
};

/* =========================================================
   STEP 05 — REVEAL
========================================================= */

const RevealRoll = ({ h, eventName, capturedPhotos }) => {
  const [reveal, setReveal] = useState(false);

  const [timing, setTiming] = useState("rightAfter");

  const memories = capturedPhotos.length > 0 ? capturedPhotos : EVENT_IMAGES;

  const timingOptions = [
    {
      key: "during",
      label: h.duringEvent,
    },
    {
      key: "rightAfter",
      label: h.rightAfter,
    },
    {
      key: "schedule",
      label: h.scheduleTime,
    },
  ];

  return (
    <div className="h-full min-h-[600px] overflow-y-auto px-5 pb-7 pt-14 sm:min-h-[620px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
            {h.rollComplete}
          </p>

          <h3 className="mt-2 max-w-[200px] font-serif text-2xl">
            {eventName}
          </h3>
        </div>

        <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Sparkles size={16} />
        </div>
      </div>

      {/* MEMORIES */}

      <div className="relative mt-7 h-48 overflow-hidden rounded-3xl border border-white/[0.1]">
        <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
          {memories.slice(0, 6).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`${h.snaprollMemory} ${index + 1}`}
                className={`h-full w-full object-cover transition-all duration-700 ${
                  reveal ? "scale-100" : "scale-110"
                }`}
              />
            </div>
          ))}
        </div>

        {!reveal && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-[10px]">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <LockKeyhole size={20} className="text-white/60" />
              </div>

              <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-white/50">
                {h.memoriesLocked}
              </p>

              <p className="mt-1 text-[8px] text-white/25">
                {h.revealToUnlock}
              </p>
            </div>
          </div>
        )}

        {reveal && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Sparkles size={11} />

                <span className="text-[8px] uppercase tracking-[0.15em] text-white/75">
                  {h.memoriesUnlocked}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TIMING */}

      <div className="mt-5 space-y-2">
        {timingOptions.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setTiming(item.key);
              playSound("click");
            }}
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-3 text-left transition ${
              timing === item.key
                ? "border-white/20 bg-white/[0.08]"
                : "border-white/[0.07] bg-white/[0.025]"
            }`}
          >
            <span className="text-[10px] text-white/50">{item.label}</span>

            {timing === item.key && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
                <Check size={9} />
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          setReveal((prev) => !prev);
          playSound("success");
        }}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-semibold text-black transition hover:scale-[1.02] active:scale-95"
      >
        {reveal ? (
          <>
            <EyeOff size={13} />
            {h.hidePhotos}
          </>
        ) : (
          <>
            <Sparkles size={13} />
            {h.revealRoll}
          </>
        )}
      </button>
    </div>
  );
};

/* =========================================================
   POWER OFF
========================================================= */

const PowerOffScreen = ({ h, onPower }) => {
  return (
    <div className="flex h-full min-h-[600px] flex-col items-center justify-center bg-black px-6 text-center sm:min-h-[620px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
        <Power size={24} className="text-white/25" />
      </div>

      <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/20">
        {h.powerOff}
      </p>

      <p className="mt-2 max-w-[180px] text-[10px] leading-5 text-white/15">
        {h.powerOffDescription}
      </p>

      <button
        onClick={onPower}
        className="mt-7 cursor-pointer rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/40 transition hover:bg-white/[0.06] active:scale-95"
      >
        {h.turnOn}
      </button>
    </div>
  );
};

/* =========================================================
   PREVIEW MODAL
========================================================= */

const PreviewModal = ({ h, image, onClose }) => {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-xl">
      <div className="relative w-full max-w-[280px] overflow-hidden rounded-3xl border border-white/15 bg-black">
        <img
          src={image}
          alt={h.photoPreview}
          className="h-[360px] w-full object-cover"
        />

        <button
          onClick={onClose}
          title={h.close}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-xl"
        >
          <X size={14} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-14">
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/40">
            {h.photoPreview}
          </p>

          <p className="mt-1 font-serif text-lg">{h.snaprollMemory}</p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   HERO FLOAT
========================================================= */

const HeroFloat = ({ className, icon, label, delay, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute z-20 flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/65 px-4 py-3 text-left backdrop-blur-xl transition-all ${delay} hover:border-white/20 hover:bg-white/[0.08] ${className}`}
    >
      <span className="text-white/70">{icon}</span>

      <span className="text-[9px] font-medium tracking-[0.2em] text-white/50">
        {label}
      </span>
    </button>
  );
};

/* =========================================================
   PHONE REFLECTION
========================================================= */

const PhoneReflection = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[2.5rem]">
      <div className="absolute -left-20 top-20 h-[380px] w-20 rotate-[20deg] bg-white/[0.025] blur-2xl" />

      <div className="absolute right-0 top-0 h-full w-px bg-white/[0.08]" />
    </div>
  );
};

/* =========================================================
   NUMBER SETTING
========================================================= */

const NumberSetting = ({ icon, label, value, min, max, onChange }) => {
  return (
    <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-3">
      <div className="flex items-center gap-2 text-white/30">
        {icon}

        <span className="text-[9px]">{label}</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:bg-white/10"
        >
          −
        </button>

        <p className="text-sm text-white/75">{value}</p>

        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:bg-white/10"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
