import { ArrowRight, Camera, Heart, Sparkles, Star } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

import birthdayImage from "../assets/images/events/birthday.jpg";
import weddingImage from "../assets/images/events/wedding.jpg";
import anniversaryImage from "../assets/images/events/anniversary.jpg";
import graduationImage from "../assets/images/events/graduate.jpg";
import partyImage from "../assets/images/events/party.jpg";

import babyFirstBirthdayImage from "../assets/images/events/baby-first-birthday.jpg";
import babyShowerImage from "../assets/images/events/baby-shower.jpg";
import collegeEventImage from "../assets/images/events/college-event.jpg";
import reunionImage from "../assets/images/events/reunion.jpg";
import newYearImage from "../assets/images/events/new-year.jpg";

const events = [
  {
    title: "Birthday",
    description: "Every smile. Every surprise.",
    emoji: "🎂",
    image: birthdayImage,
    moments: "124 moments",
  },
  {
    title: "Wedding",
    description: "Moments worth forever.",
    emoji: "💍",
    image: weddingImage,
    moments: "110 moments",
  },
  {
    title: "Anniversary",
    description: "Celebrate your story.",
    emoji: "🥂",
    image: anniversaryImage,
    moments: "115 moments",
  },
  {
    title: "Graduation",
    description: "A milestone to remember.",
    emoji: "🎓",
    image: graduationImage,
    moments: "98 moments",
  },
  {
    title: "Private Party",
    description: "Your people. Your moments.",
    emoji: "🎉",
    image: partyImage,
    moments: "132 moments",
  },
  {
    title: "First Birthday",
    description: "A little one. A big celebration.",
    emoji: "🧸",
    image: babyFirstBirthdayImage,
    moments: "106 moments",
  },
  {
    title: "Baby Shower",
    description: "Celebrating a beautiful beginning.",
    emoji: "🍼",
    image: babyShowerImage,
    moments: "118 moments",
  },
  {
    title: "College Event",
    description: "Friends, memories and good times.",
    emoji: "🎓",
    image: collegeEventImage,
    moments: "143 moments",
  },
  {
    title: "Reunion",
    description: "Old friends. New memories.",
    emoji: "🤝",
    image: reunionImage,
    moments: "92 moments",
  },
  {
    title: "New Year",
    description: "New year. New memories.",
    emoji: "🎆",
    image: newYearImage,
    moments: "156 moments",
  },
];

const PhoneCard = ({ event, className = "" }) => {
  return (
    <div
      className={`
        group relative shrink-0 cursor-pointer
        transition-transform duration-300 ease-out
        hover:z-50 hover:-translate-y-2 hover:will-change-transform
        ${className}
      `}
    >
      {/* PHONE SHADOW */}
      <div
        className="
          pointer-events-none absolute
          -bottom-6 left-1/2
          h-12 w-[68%]
          -translate-x-1/2
          rounded-full
          bg-black/50
          blur-lg
        "
      />

      {/* PHONE */}
      <div
        className="
          relative
          h-125 w-59.5
          overflow-hidden
          rounded-[38px]
          border-[6px] border-neutral-800
          bg-black
          shadow-[0_24px_60px_rgba(0,0,0,0.65)]
        "
      >
        {/* PHONE REFLECTION */}
        <div className="pointer-events-none absolute inset-y-10 left-0 z-40 w-px bg-white/15" />
        <div className="pointer-events-none absolute inset-y-10 right-0 z-40 w-px bg-white/10" />

        {/* DYNAMIC ISLAND */}
        <div
          className="
            absolute left-1/2 top-2 z-50
            h-6 w-23
            -translate-x-1/2
            rounded-full
            bg-black
          "
        />

        {/* SCREEN */}
        <div className="relative flex h-full flex-col overflow-hidden bg-[#080808]">
          {/* IMAGE */}
          <div className="relative h-[57%] shrink-0 overflow-hidden">
            <img
              src={event.image}
              alt={`${event.title} event`}
              draggable="false"
              loading="lazy"
              decoding="async"
              className="
                absolute inset-0
                h-full w-full
                object-cover object-center
              "
            />

            {/* PHOTO GRADIENT */}
            <div
              className="
                pointer-events-none absolute inset-0
                bg-linear-to-b
                from-black/15
                via-transparent
                to-black
              "
            />

            {/* TOP GRADIENT */}
            <div
              className="
                pointer-events-none absolute inset-x-0 top-0
                h-20
                bg-linear-to-b
                from-black/35
                to-transparent
              "
            />

            {/* CAMERA — solid bg instead of backdrop-blur */}
            <div
              className="
                absolute left-4 top-12
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-white/20
                bg-black/45
                text-white
              "
            >
              <Camera size={14} />
            </div>

            {/* LIVE MEMORIES — solid bg instead of backdrop-blur */}
            <div
              className="
                absolute right-4 top-12
                rounded-full
                border border-white/15
                bg-black/45
                px-2.5 py-1
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-white/80
              "
            >
              Live memories
            </div>

            {/* EVENT TITLE */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/55">
                    SnapRoll Event
                  </p>

                  <h3 className="mt-1 text-lg font-medium text-white">
                    {event.title}
                  </h3>
                </div>

                <button
                  type="button"
                  className="
                    flex h-9 w-9
                    cursor-pointer
                    items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-black/45
                    text-white
                    transition-transform duration-200
                    hover:scale-105
                  "
                  aria-label={`Like ${event.title}`}
                >
                  <Heart size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* PHONE CONTENT */}
          <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
            {/* TITLE */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                  Memories
                </p>

                <h3 className="mt-1 text-xl font-medium tracking-[-0.04em]">
                  {event.title}
                </h3>
              </div>

              <span className="text-xl">{event.emoji}</span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-2 text-[10px] leading-5 text-white/35">
              {event.description}
            </p>

            {/* BOTTOM */}
            <div className="mt-auto flex items-center justify-between">
              {/* GUEST AVATARS */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-full
                      border-2 border-[#080808]
                      bg-white/10
                      text-[7px]
                      text-white/50
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* MOMENTS */}
              <span className="text-[9px] text-white/30">{event.moments}</span>
            </div>
          </div>

          {/* HOME INDICATOR */}
          <div
            className="
              absolute bottom-2 left-1/2
              h-1 w-20
              -translate-x-1/2
              rounded-full
              bg-white/30
            "
          />
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const handleCreateEvent = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* =========================================================
          BACKGROUND
          Reduced from 5 blurred glows to 2, and cut blur radius from
          100px to 70px. Large-area `blur()` filters are one of the
          most expensive things a browser can paint, and having 5 of
          them stacked (each bigger than the viewport) forced a full
          repaint pass on many scroll/composite frames. Two glows,
          smaller blur, is visually almost the same and much cheaper.
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* TOP GLOW */}
        <div
          className="
            absolute left-1/2 -top-64
            h-150 w-225
            -translate-x-1/2
            rounded-full
            bg-white/5
            blur-[70px]
          "
        />

        {/* BOTTOM GLOW */}
        <div
          className="
            absolute left-1/2 top-[72%]
            h-100 w-200
            -translate-x-1/2
            rounded-full
            bg-white/2
            blur-[70px]
          "
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative px-5 pb-10 pt-32 sm:px-8 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* BADGE */}
            <ScrollReveal delay={0}>
              <div
                className="
                  mx-auto mb-6
                  inline-flex items-center gap-2
                  rounded-full
                  border border-white/10
                  bg-white/5
                  px-4 py-2
                  text-xs text-white/55
                "
              >
                <Camera size={13} />
                SnapRoll Events
              </div>
            </ScrollReveal>

            {/* HEADING */}
            <ScrollReveal delay={60}>
              <h1
                className="
                  text-5xl
                  font-medium
                  tracking-[-0.055em]
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                Every event has
                <br />
                <span className="text-white/30">a story to capture.</span>
              </h1>
            </ScrollReveal>

            {/* DESCRIPTION */}
            <ScrollReveal delay={100}>
              <p
                className="
                  mx-auto mt-7
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/40
                  sm:text-base
                "
              >
                Birthdays, weddings, anniversaries and everything in between.
                Bring everyone's moments together with SnapRoll.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          PHONE SHOWCASE
      ========================================================= */}
      <section className="relative px-4 pb-28 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* =====================================================
              DESKTOP
          ===================================================== */}
          <div
            className="
              relative hidden
              min-h-190
              items-center
              justify-center
              lg:flex
            "
          >
            {/* CENTER LIGHT — removed; the two page-level glows above
                already cover this area, so this extra oversized blurred
                layer was pure redundant paint cost. */}

            {/* PHONE 1 — Birthday */}
            <div className="absolute left-[1%] top-42.5 z-10">
              <ScrollReveal delay={0}>
                <PhoneCard event={events[0]} className="-rotate-12" />
              </ScrollReveal>
            </div>

            {/* PHONE 2 — Wedding */}
            <div className="absolute left-[18%] top-17.5 z-20">
              <ScrollReveal delay={200}>
                <PhoneCard event={events[1]} className="-rotate-6" />
              </ScrollReveal>
            </div>

            {/* CENTER PHONE — Anniversary */}
            <div className="relative z-40">
              <ScrollReveal delay={400}>
                <PhoneCard event={events[2]} />
              </ScrollReveal>
            </div>

            {/* PHONE 4 — Graduation */}
            <div className="absolute right-[18%] top-13.75 z-20">
              <ScrollReveal delay={600}>
                <PhoneCard event={events[3]} className="rotate-6" />
              </ScrollReveal>
            </div>

            {/* PHONE 5 — Private Party */}
            <div className="absolute right-[1%] top-45 z-10">
              <ScrollReveal delay={800}>
                <PhoneCard event={events[4]} className="rotate-12" />
              </ScrollReveal>
            </div>
          </div>

          {/* =====================================================
              TABLET
          ===================================================== */}
          <div
            className="
              hidden
              grid-cols-3
              justify-items-center
              gap-x-4
              gap-y-8
              md:grid
              lg:hidden
            "
          >
            {events.map((event, index) => (
              <ScrollReveal
                key={event.title}
                delay={index * 40}
                direction="up"
                className={index === 4 ? "col-start-2 -translate-y-3" : ""}
              >
                <PhoneCard event={event} />
              </ScrollReveal>
            ))}
          </div>

          {/* =====================================================
              MOBILE
          ===================================================== */}
          <div
            className="
              relative mx-auto
              flex max-w-md
              flex-col
              items-center
            "
          >
            {/* TOP TWO */}
            <div className="flex w-full items-start justify-between px-1">
              {/* FIRST BIRTHDAY */}
              <ScrollReveal delay={0} className="origin-left">
                <PhoneCard event={events[5]} className="-rotate-6" />
              </ScrollReveal>

              {/* BABY SHOWER — THIS IS KEPT */}
              <ScrollReveal
                delay={180}
                direction="up"
                className="
                  origin-right
                  -ml-16
                  translate-y-12
                "
              >
                <PhoneCard event={events[6]} className="rotate-6" />
              </ScrollReveal>
            </div>

            {/* CENTER */}
            <ScrollReveal delay={360} className="relative z-20 -mt-20">
              <PhoneCard event={events[7]} />
            </ScrollReveal>

            {/* BOTTOM TWO */}
            <div className="-mt-16 flex w-full items-start justify-between px-1">
              {/* REUNION */}
              <ScrollReveal delay={540} className="origin-left">
                <PhoneCard event={events[8]} className="-rotate-6" />
              </ScrollReveal>

              {/* NEW YEAR */}
              <ScrollReveal
                delay={720}
                direction="up"
                className="
                  origin-right
                  -ml-14
                  translate-y-10
                "
              >
                <PhoneCard event={events[9]} className="rotate-6" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EVENT TYPES
      ========================================================= */}
      <section
        className="
          relative
          border-t border-white/7
          px-5 py-24
          sm:px-8
          lg:px-12
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT */}
            <ScrollReveal direction="left" delay={0}>
              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Made for every occasion
                </p>

                <h2
                  className="
                    mt-4
                    text-3xl
                    font-medium
                    tracking-[-0.04em]
                    sm:text-4xl
                  "
                >
                  Whatever you're
                  <br />
                  <span className="text-white/30">celebrating.</span>
                </h2>
              </div>
            </ScrollReveal>

            {/* RIGHT */}
            <ScrollReveal direction="right" delay={50}>
              <p
                className="
                  max-w-xl
                  text-sm
                  leading-7
                  text-white/40
                "
              >
                SnapRoll gives every guest a simple way to capture, share and
                relive the moments that made your event special.
              </p>
            </ScrollReveal>
          </div>

          {/* EVENT PILLS */}
          <div className="mt-12 flex flex-wrap gap-3">
            {events.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 25}>
                <div
                  className="
                    group
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-full
                    border border-white/10
                    bg-white/[0.035]
                    px-5 py-3
                    text-sm
                    text-white/55
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/7
                    hover:text-white
                  "
                >
                  <span>{event.emoji}</span>

                  <span>{event.title}</span>

                  <ArrowRight
                    size={13}
                    className="
                      text-white/20
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                      group-hover:text-white/60
                    "
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SIMPLE PROCESS
      ========================================================= */}
      <section className="relative px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div
              className="
                overflow-hidden
                rounded-4xl
                border border-white/8
                bg-white/[0.035]
                p-7
                sm:p-10
                lg:p-12
              "
            >
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                {/* TEXT */}
                <div>
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-2xl
                      bg-white
                      text-black
                    "
                  >
                    <Sparkles size={18} />
                  </div>

                  <h2
                    className="
                      mt-6
                      text-3xl
                      font-medium
                      tracking-[-0.04em]
                      sm:text-4xl
                    "
                  >
                    Simple for you.
                    <br />
                    <span className="text-white/30">
                      Beautiful for everyone.
                    </span>
                  </h2>

                  <p
                    className="
                      mt-5
                      max-w-md
                      text-sm
                      leading-7
                      text-white/40
                    "
                  >
                    Create your event, invite your guests and let SnapRoll
                    collect all those little moments in one place.
                  </p>
                </div>

                {/* STEPS */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Create", "Set up your event."],
                    ["02", "Invite", "Share it with guests."],
                    ["03", "Capture", "Collect every moment."],
                  ].map(([number, title, description], index) => (
                    <ScrollReveal key={number} delay={index * 50}>
                      <div
                        className="
                          rounded-[22px]
                          border border-white/8
                          bg-black/20
                          p-5
                          transition-all
                          duration-200
                          hover:-translate-y-1
                          hover:bg-white/4
                        "
                      >
                        <span className="text-[10px] text-white/25">
                          {number}
                        </span>

                        <h3 className="mt-8 text-lg font-medium">{title}</h3>

                        <p
                          className="
                            mt-2
                            text-xs
                            leading-5
                            text-white/35
                          "
                        >
                          {description}
                        </p>

                        <div
                          className="
                            mt-6
                            flex h-6 w-6
                            items-center justify-center
                            rounded-full
                            bg-white
                            text-black
                          "
                        >
                          <Star size={11} fill="currentColor" />
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative px-5 pb-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              Your memories start here
            </p>
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <h2 className="mt-5 text-4xl font-medium tracking-tighter sm:text-5xl">
              Ready to build your event?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
              Choose your occasion and create a SnapRoll experience your guests
              will love.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <button
              type="button"
              onClick={handleCreateEvent}
              className="
                group mt-8
                inline-flex
                cursor-pointer
                items-center
                gap-3
                rounded-full
                bg-white
                px-6 py-3
                text-sm
                font-medium
                text-black
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
            >
              Create Event
              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Events;
