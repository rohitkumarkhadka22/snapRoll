"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import useLanguage from "../context/useLanguage";

const EASE_OUT = [0.22, 1, 0.36, 1];

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 900,
  y = 35,
  direction = "up",
  once = true,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: 0.12,
    margin: "0px 0px -40px 0px",
  });
  const prefersReducedMotion = useReducedMotion();
  const { hasChosenLanguage } = useLanguage();

  const offset = {
    up: { x: 0, y },
    down: { x: 0, y: -y },
    left: { x: -y, y: 0 },
    right: { x: y, y: 0 },
  }[direction] || { x: 0, y };

  const shouldReveal = hasChosenLanguage && isInView;
  const hidden = prefersReducedMotion
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : { opacity: 0, x: offset.x, y: offset.y, scale: 0.992 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={shouldReveal ? { opacity: 1, x: 0, y: 0, scale: 1 } : hidden}
      transition={{
        duration: prefersReducedMotion ? 0 : duration / 1000,
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ease: EASE_OUT,
      }}
      style={{ willChange: prefersReducedMotion ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
