"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";

import ErrorBoundary from "../src/components/ErrorBoundary";
import ScrollToTop from "../src/components/ScrollToTop";
import LanguageProvider from "../src/context/LanguageContext";
import MainLayout from "../src/layouts/MainLayout";

export default function Providers({ children, initialLanguage, initialLanguageConfirmed }) {
  useEffect(() => {
    let lenis;
    let active = true;

    // Smooth scrolling is progressive enhancement; loading it after hydration
    // keeps it out of the critical navigation bundle.
    import("lenis").then(({ default: Lenis }) => {
      if (!active) return;

      lenis = new Lenis({
        lerp: 0.14,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.95,
        autoRaf: true,
        respectReducedMotion: true,
      });

      window.__lenis = lenis;
    });

    return () => {
      active = false;
      if (window.__lenis === lenis) delete window.__lenis;
      lenis?.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <LanguageProvider
          initialLanguage={initialLanguage}
          initialLanguageConfirmed={initialLanguageConfirmed}
        >
          <MainLayout>
            <ScrollToTop />
            {children}
          </MainLayout>
        </LanguageProvider>
      </ErrorBoundary>
    </MotionConfig>
  );
}
