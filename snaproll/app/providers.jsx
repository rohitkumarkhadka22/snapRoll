"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

import ErrorBoundary from "../src/components/ErrorBoundary";
import ScrollToTop from "../src/components/ScrollToTop";
import LanguageProvider from "../src/context/LanguageContext";
import MainLayout from "../src/layouts/MainLayout";

export default function Providers({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Keep wheel input responsive. A long duration makes the page feel like
      // it is dragging behind the user's mouse or trackpad.
      lerp: 0.14,
      smoothWheel: true,
      // Native touch scrolling is more reliable on phones and avoids swallowing taps.
      syncTouch: false,
      wheelMultiplier: 0.95,
      autoRaf: true,
      respectReducedMotion: true,
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
        <LanguageProvider>
          <MainLayout>
            <ScrollToTop />
            {children}
          </MainLayout>
        </LanguageProvider>
      </ErrorBoundary>
    </MotionConfig>
  );
}
