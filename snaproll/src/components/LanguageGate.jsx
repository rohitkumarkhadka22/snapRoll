import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import useLanguage from "../context/useLanguage";

const EASE_OUT = [0.22, 1, 0.36, 1];

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.975, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: EASE_OUT,
      delayChildren: 0.08,
      staggerChildren: 0.065,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.015,
    filter: "blur(5px)",
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 13 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const optionsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075 } },
  exit: {},
};

const INTRODUCTIONS = {
  en: "Choose your language",
  es: "Elige tu idioma",
  fr: "Choisissez votre langue",
  pt: "Escolha o seu idioma",
};

const LanguageGate = () => {
  const { changeLanguage, hasChosenLanguage, languages } = useLanguage();
  const firstOptionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedCode, setSelectedCode] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageSelection = (event, language) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSelectedCode(language.code);
    setIsSubmitting(true);
    changeLanguage(language);
  };

  useEffect(() => {
    if (hasChosenLanguage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => {
      if (window.matchMedia("(pointer: fine)").matches) {
        firstOptionRef.current?.focus();
      }
    }, 100);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [hasChosenLanguage]);

  if (hasChosenLanguage) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-gate-title"
      data-lenis-prevent
      data-lenis-prevent-touch
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.01 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[1000000] flex min-h-dvh items-center justify-center overflow-y-auto overscroll-contain bg-black/95 px-4 py-8 text-white backdrop-blur-2xl sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px]" />
        <div className="absolute right-[-12rem] bottom-[-10rem] h-96 w-96 rounded-full bg-white/[0.035] blur-[120px]" />
      </div>

      <motion.section
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="pointer-events-auto relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#080808] p-6 shadow-[0_35px_120px_rgba(0,0,0,0.8)] sm:p-10"
      >
        <div className="absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

        <div className="text-center">
          <motion.p
            variants={contentVariants}
            className="text-[10px] tracking-[0.32em] text-white/35 uppercase"
          >
            SnapRoll
          </motion.p>
          <motion.h2
            variants={contentVariants}
            id="language-gate-title"
            className="mt-4 font-serif text-3xl tracking-[-0.035em] sm:text-5xl"
          >
            Welcome · Bienvenido
          </motion.h2>
          <motion.p variants={contentVariants} className="mt-3 text-sm text-white/45 sm:text-base">
            Bienvenue · Bem-vindo
          </motion.p>
        </div>

        <motion.div variants={optionsVariants} className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
          {languages.map((language) => (
            <motion.form
              key={language.code}
              action="/language"
              method="post"
              onSubmit={(event) => handleLanguageSelection(event, language)}
              variants={contentVariants}
            >
              <input type="hidden" name="code" value={language.code} />
              <motion.button
                ref={language.code === "en" ? firstOptionRef : null}
                type="submit"
                disabled={isSubmitting}
                aria-label={`${INTRODUCTIONS[language.code]}: ${language.nativeName}`}
                aria-pressed={selectedCode === language.code}
                whileHover={prefersReducedMotion || isSubmitting ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.97 }}
                animate={
                  selectedCode === language.code
                    ? { scale: 0.975, borderColor: "rgba(255,255,255,0.55)" }
                    : { scale: 1, borderColor: "rgba(255,255,255,0.10)" }
                }
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className={`group flex min-h-24 w-full cursor-pointer touch-manipulation items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none disabled:cursor-wait sm:p-5 ${
                  selectedCode === language.code
                    ? "bg-white/[0.14] shadow-[0_0_35px_rgba(255,255,255,0.08)]"
                    : "bg-white/[0.035] hover:bg-white/[0.08] focus-visible:border-white/50"
                } ${isSubmitting && selectedCode !== language.code ? "opacity-40" : "opacity-100"}`}
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

                <span className="ml-auto text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70">
                  {selectedCode === language.code ? "✓" : "→"}
                </span>
              </motion.button>
            </motion.form>
          ))}
        </motion.div>

        <motion.p
          variants={contentVariants}
          className="mt-7 text-center text-[11px] leading-5 text-white/25"
        >
          You can change your language anytime from the menu.
        </motion.p>
        <p className="sr-only" role="status" aria-live="polite">
          {selectedCode ? "Saving your language preference" : ""}
        </p>
      </motion.section>
    </motion.div>
  );
};

export default LanguageGate;
