import { useEffect, useRef } from "react";
import useLanguage from "../context/useLanguage";

const INTRODUCTIONS = {
  en: "Choose your language",
  es: "Elige tu idioma",
  fr: "Choisissez votre langue",
  pt: "Escolha o seu idioma",
};

const LanguageGate = () => {
  const { changeLanguage, hasChosenLanguage, languages } = useLanguage();
  const firstOptionRef = useRef(null);

  useEffect(() => {
    if (hasChosenLanguage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => firstOptionRef.current?.focus(), 100);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [hasChosenLanguage]);

  if (hasChosenLanguage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-gate-title"
      data-lenis-prevent
      className="fixed inset-0 z-[1000000] flex min-h-dvh items-center justify-center overflow-y-auto bg-black/95 px-4 py-8 text-white backdrop-blur-2xl sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px]" />
        <div className="absolute right-[-12rem] bottom-[-10rem] h-96 w-96 rounded-full bg-white/[0.035] blur-[120px]" />
      </div>

      <section className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#080808] p-6 shadow-[0_35px_120px_rgba(0,0,0,0.8)] sm:p-10">
        <div className="absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

        <div className="text-center">
          <p className="text-[10px] tracking-[0.32em] text-white/35 uppercase">SnapRoll</p>
          <h1
            id="language-gate-title"
            className="mt-4 font-serif text-3xl tracking-[-0.035em] sm:text-5xl"
          >
            Welcome · Bienvenido
          </h1>
          <p className="mt-3 text-sm text-white/45 sm:text-base">
            Bienvenue · Bem-vindo
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
          {languages.map((language, index) => (
            <button
              key={language.code}
              ref={index === 0 ? firstOptionRef : null}
              type="button"
              onClick={() => changeLanguage(language)}
              aria-label={`${INTRODUCTIONS[language.code]}: ${language.nativeName}`}
              className="group flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08] focus-visible:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:p-5"
            >
              <span className="text-3xl" aria-hidden="true">
                {language.flag}
              </span>

              <span className="min-w-0">
                <span className="block text-base font-medium text-white sm:text-lg">
                  {language.nativeName}
                </span>
                <span className="mt-1 block text-[11px] text-white/35">
                  {INTRODUCTIONS[language.code]}
                </span>
              </span>

              <span className="ml-auto text-white/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/70">
                →
              </span>
            </button>
          ))}
        </div>

        <p className="mt-7 text-center text-[11px] leading-5 text-white/25">
          You can change your language anytime from the menu.
        </p>
      </section>
    </div>
  );
};

export default LanguageGate;
