import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Users,
  Camera,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("25");
  const [photos, setPhotos] = useState("50");
  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !eventDate) return;

    setCreated(true);
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-36 text-white sm:px-8 md:pt-44">
      <div className="mx-auto max-w-3xl">
        {!created ? (
          <>
            {/* Header */}
            <ScrollReveal>
              <div className="text-center">
                <div className="mb-6 inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.18em] text-white/60 backdrop-blur-xl">
                  <Sparkles size={13} strokeWidth={1.5} />
                  FREE EVENT
                </div>

                <h1 className="font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
                  Create your event.
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/45 sm:text-lg">
                  Set up your shared roll and invite everyone to capture the
                  moment together.
                </p>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal>
              <form
                onSubmit={handleSubmit}
                className="mt-14 rounded-[30px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
              >
                {/* Event Name */}
                <div>
                  <label className="mb-3 block text-sm text-white/60">
                    Event name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="Sarah's Birthday"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="mt-6">
                  <label className="mb-3 block text-sm text-white/60">
                    Event date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/35"
                    />

                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-5 pl-13 text-sm text-white outline-none transition-all focus:border-white/25 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>

                {/* Guests + Photos */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm text-white/60">
                      Guest limit
                    </label>

                    <div className="relative">
                      <Users
                        size={18}
                        strokeWidth={1.5}
                        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/35"
                      />

                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 bg-white/[0.045] px-5 pl-13 text-sm text-white outline-none transition-all focus:border-white/25 focus:bg-white/[0.07]"
                      >
                        <option value="10" className="bg-black">
                          10 guests
                        </option>
                        <option value="15" className="bg-black">
                          15 guests
                        </option>
                        <option value="20" className="bg-black">
                          20 guests
                        </option>
                        <option value="25" className="bg-black">
                          25 guests
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm text-white/60">
                      Photo limit
                    </label>

                    <div className="relative">
                      <Camera
                        size={18}
                        strokeWidth={1.5}
                        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/35"
                      />

                      <select
                        value={photos}
                        onChange={(e) => setPhotos(e.target.value)}
                        className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 bg-white/[0.045] px-5 pl-13 text-sm text-white outline-none transition-all focus:border-white/25 focus:bg-white/[0.07]"
                      >
                        <option value="25" className="bg-black">
                          25 photos
                        </option>
                        <option value="50" className="bg-black">
                          50 photos
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Free plan info */}
                <div className="mt-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Sparkles size={10} />
                    </span>

                    <div>
                      <p className="text-sm text-white/70">Free event</p>

                      <p className="mt-1 text-xs leading-5 text-white/35">
                        1 event · Up to 25 guests · Up to 50 photos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group mt-7 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white bg-white text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                >
                  Create my event
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>

                <p className="mt-4 text-center text-xs text-white/25">
                  No account required.
                </p>
              </form>
            </ScrollReveal>
          </>
        ) : (
          /* Success */
          <ScrollReveal>
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.18em] text-white/60 backdrop-blur-xl">
                <Sparkles size={13} strokeWidth={1.5} />
                EVENT CREATED
              </div>

              <h1 className="font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">
                You're ready.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/45">
                Your event has been created. Share the event code with your
                guests and start capturing memories.
              </p>

              <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Your event
                </p>

                <h2 className="mt-4 font-serif text-3xl">{eventName}</h2>

                <div className="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-3xl border border-white/10 bg-white text-black">
                  <div className="text-center">
                    <div className="mx-auto grid w-24 grid-cols-5 gap-1">
                      {Array.from({ length: 25 }).map((_, index) => (
                        <span
                          key={index}
                          className={`h-3 w-3 ${
                            (index * 7) % 5 < 2 ||
                            index % 4 === 0 ||
                            index === 12
                              ? "bg-black"
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="mt-3 text-[8px] font-medium tracking-widest">
                      SNAPROLL
                    </p>
                  </div>
                </div>

                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/30">
                  Event code
                </p>

                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <p className="font-mono text-2xl tracking-[0.25em]">SNAP25</p>
                </div>

                <button
                  type="button"
                  className="mt-5 h-12 w-full cursor-pointer rounded-full border border-white/10 bg-white/[0.06] text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.1]"
                  onClick={() => navigator.clipboard?.writeText("SNAP25")}
                >
                  Copy event code
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
};

export default CreateEvent;
