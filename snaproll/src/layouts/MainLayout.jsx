"use client";

import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageGate from "../components/LanguageGate";
import useLanguage from "../context/useLanguage";

const Chatbot = dynamic(() => import("../components/Chatbot"), { ssr: false });

const MainLayout = ({ children }) => {
  const { hasChosenLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence>
        {!hasChosenLanguage && <LanguageGate key="language-gate" />}
      </AnimatePresence>
      <div
        aria-hidden={!hasChosenLanguage}
        className={hasChosenLanguage ? "" : "pointer-events-none invisible"}
      >
        <Navbar />

        <div>{children}</div>

        <Footer />
        <Chatbot />
      </div>
    </div>
  );
};

export default MainLayout;
