"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

import ErrorBoundary from "../src/components/ErrorBoundary";
import ScrollToTop from "../src/components/ScrollToTop";
import LanguageProvider from "../src/context/LanguageContext";
import MainLayout from "../src/layouts/MainLayout";

export default function Providers({ children, initialLanguageCode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      smoothWheel: true,
      // Native touch scrolling is more reliable on phones and avoids swallowing taps.
      smoothTouch: false,
      autoRaf: true,
    });

    window.__lenis = lenis;

    return () => {
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <LanguageProvider initialLanguageCode={initialLanguageCode}>
          <MainLayout>
            <ScrollToTop />
            {children}
          </MainLayout>
        </LanguageProvider>
      </ErrorBoundary>
    </MotionConfig>
  );
}
