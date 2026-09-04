import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const hiddenStyles = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "",
  };

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
      className={`
        transition-[transform,opacity]
        duration-500
        ease-out
        ${
          isVisible
            ? "translate-x-0 translate-y-0 opacity-100"
            : `${hiddenStyles[direction]} opacity-0`
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
