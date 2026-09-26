import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Camera, Check, Heart, Sparkles, Star } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";

import birthdayImage from "../assets/images/events/birthday.jpg";
import weddingImage from "../assets/images/events/wedding.jpg";
import anniversaryImage from "../assets/images/events/anniversary.jpg";
import graduationImage from "../assets/images/events/graduate.jpg";
import partyImage from "../assets/images/events/party.jpg";

const events = [
  {
    key: "birthday",
    emoji: "🎂",
    image: birthdayImage,
    moments: "124",
  },
  {
    key: "wedding",
    emoji: "💍",
    image: weddingImage,
    moments: "110",
  },
  {
    key: "anniversary",
    emoji: "🥂",
    image: anniversaryImage,
    moments: "115",
  },
  {
    key: "graduation",
    emoji: "🎓",
    image: graduationImage,
    moments: "98",
  },
  {
    key: "party",
    emoji: "🎉",
    image: partyImage,
    moments: "132",
  },
];

//  EVENT CARD

const EventCard = ({ event, t, featured = false }) => {
  const eventTranslation = t.events.eventTypes[event.key];

  return (
    <article
      className={`group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#101010] transition-transform duration-300 ease-out hover:-translate-y-1 ${featured ? "min-h-130 sm:min-h-145 lg:min-h-160" : "min-h-115 sm:min-h-125"} `}
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <img
          src={event.image}
          alt={`${eventTranslation.title} event`}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/5" />

        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/45 to-transparent" />
      </div>

      {/* TOP */}
      <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between sm:top-5 sm:right-5 sm:left-5">
        {/* CAMERA */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-sm">
          <Camera size={14} />
        </div>

        {/* LIVE MEMORIES */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 text-[8px] tracking-[0.14em] text-white/75 uppercase backdrop-blur-sm sm:px-3 sm:text-[9px]">
          <Star size={10} strokeWidth={1.8} className="fill-white text-white" />

          <span>{t.events.liveMemories}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[8px] tracking-[0.22em] text-white/45 uppercase sm:text-[9px]">
              {t.events.snaprollEvent}
            </p>

            <h3
              className={`mt-2 font-medium tracking-[-0.04em] text-white ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"} `}
            >
              {eventTranslation.title}
            </h3>
          </div>

          <span className="shrink-0 text-xl sm:text-2xl">{event.emoji}</span>
        </div>

        <p className="mt-3 max-w-md text-[11px] leading-5 text-white/55 sm:text-sm">
          {eventTranslation.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-5">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#151515] bg-white/10 text-[8px] text-white/55"
                >
                  {item}
                </div>
              ))}
            </div>

            <span className="truncate text-[9px] text-white/40 sm:text-[10px]">
              {event.moments} {t.events.moments}
            </span>
          </div>

          <button
            type="button"
            aria-label={`Like ${eventTranslation.title}`}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/70 transition-all duration-200 hover:bg-white hover:text-black"
          >
            <Heart size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

//  EVENT TYPE

const EventType = ({ event, t }) => {
  const eventTranslation = t.events.eventTypes[event.key];

  return (
    <button
      type="button"
      className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-xs text-white/55 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
    >
      <span className="text-sm sm:text-base">{event.emoji}</span>

      <span>{eventTranslation.title}</span>

      <ArrowRight
        size={13}
        className="text-white/25 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white/70"
      />
    </button>
  );
};

//  EVENTS PAGE

const Events = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate("/event/create");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-white/[0.025] blur-[90px] sm:h-175 sm:w-175 sm:blur-[100px]" />

        <div className="absolute top-[45%] -right-40 h-100 w-100 rounded-full bg-white/[0.015] blur-[80px] sm:-right-48 sm:h-125 sm:w-125 sm:blur-[90px]" />
      </div>

      {/* HERO */}
      <section className="relative px-5 pt-32 pb-12 sm:px-8 sm:pt-40 sm:pb-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[10px] text-white/55 sm:mb-7 sm:text-xs">
                <Camera size={13} />
                {t.events.badge}
              </div>

              <h1 className="max-w-5xl text-4xl leading-[0.95] font-medium tracking-[-0.065em] sm:text-6xl lg:text-8xl">
                {t.events.heroTitle1}
                <br />

                <span className="text-white/25">{t.events.heroTitle2}</span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <div className="mb-5 h-px w-12 bg-white/30" />

              <p className="max-w-md text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
                {t.events.heroDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="relative px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <EventCard event={events[0]} t={t} featured />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <EventCard event={events[1]} t={t} />
              <EventCard event={events[2]} t={t} />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <EventCard event={events[3]} t={t} />
            <EventCard event={events[4]} t={t} />
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="relative border-t border-white/8 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-white/30 uppercase sm:text-[10px]">
                {t.events.madeFor}
              </p>

              <h2 className="mt-4 max-w-md text-3xl leading-[1] font-medium tracking-[-0.055em] sm:text-5xl">
                {t.events.celebrating1}
                <br />

                <span className="text-white/25">{t.events.celebrating2}</span>
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                {t.events.occasionDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
                {events.map((event) => (
                  <EventType key={event.key} event={event} t={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              {/* LEFT */}
              <div className="p-5 sm:p-8 lg:p-9">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                  <Sparkles size={16} />
                </div>

                <h2 className="mt-4 text-2xl leading-tight font-medium tracking-[-0.045em] sm:text-3xl">
                  {t.events.simpleTitle1}
                  <br />

                  <span className="text-white/25">{t.events.simpleTitle2}</span>
                </h2>

                <p className="mt-3 max-w-md text-xs leading-5 text-white/40 sm:text-sm">
                  {t.events.simpleDescription}
                </p>
              </div>

              {/* RIGHT */}
              <div className="grid border-t border-white/8 sm:grid-cols-3 lg:border-t-0 lg:border-l">
                {[
                  ["01", t.events.steps.create, t.events.steps.createDescription],
                  ["02", t.events.steps.invite, t.events.steps.inviteDescription],
                  ["03", t.events.steps.capture, t.events.steps.captureDescription],
                ].map(([number, title, description], index) => (
                  <div
                    key={number}
                    className="group flex min-h-32 animate-[fadeUp_0.6s_ease-out_forwards] cursor-pointer flex-col border-b border-white/8 p-4 opacity-0 transition-all duration-200 last:border-b-0 hover:bg-white/[0.025] sm:min-h-36 sm:border-r sm:border-b-0 sm:last:border-r-0 lg:min-h-40"
                    style={{
                      animationDelay: `${index * 120}ms`,
                    }}
                  >
                    <span className="text-[9px] tracking-[0.2em] text-white/25">{number}</span>

                    <h3 className="mt-4 text-sm font-medium sm:text-base">{title}</h3>

                    <p className="mt-1.5 text-[10px] leading-4 text-white/35 sm:text-[11px] sm:leading-4.5">
                      {description}
                    </p>

                    <div className="mt-auto flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white text-black transition-transform duration-200 group-hover:scale-105">
                      <Check size={10} strokeWidth={2.5} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[9px] tracking-[0.25em] text-white/25 uppercase sm:text-[10px]">
            {t.events.ctaLabel}
          </p>

          <h2 className="mt-5 text-3xl font-medium tracking-[-0.055em] sm:text-5xl md:text-6xl">
            {t.events.ctaTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/40 sm:leading-7">
            {t.events.ctaDescription}
          </p>

          <button
            type="button"
            onClick={handleCreateEvent}
            className="group mt-7 inline-flex cursor-pointer items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5 sm:mt-8"
          >
            {t.events.createEvent}

            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Events;
