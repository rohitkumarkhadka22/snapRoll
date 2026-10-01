"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import LanguageGate from "../components/LanguageGate";
import useLanguage from "../context/useLanguage";

const MainLayout = ({ children }) => {
  const { hasChosenLanguage, isLanguageReady } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const hiddenSite = prefersReducedMotion
    ? { opacity: 0, visibility: "hidden" }
    : { opacity: 0, y: 8, visibility: "hidden" };
  const visibleSite = {
    opacity: 1,
    y: 0,
    visibility: "visible",
  };

  if (!isLanguageReady) {
    return <div className="min-h-screen bg-black" aria-hidden="true" />;
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence>
        {!hasChosenLanguage && <LanguageGate key="language-gate" />}
      </AnimatePresence>
      <motion.div
        initial={hasChosenLanguage ? hiddenSite : false}
        animate={hasChosenLanguage ? visibleSite : hiddenSite}
        aria-hidden={!hasChosenLanguage}
        className={hasChosenLanguage ? "" : "pointer-events-none"}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.65,
          delay: prefersReducedMotion ? 0 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Navbar />

        <div>{children}</div>

        <Footer />
        <Chatbot />
      </motion.div>
    </div>
  );
};

export default MainLayout;
