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
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: "",
  };

  useEffect(() => {
    const element = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${hiddenStyles[direction]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
