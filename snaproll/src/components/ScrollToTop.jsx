import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Browser scroll immediately reset
    window.scrollTo(0, 0);

    // Lenis scroll position reset
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });
    }

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      if (window.__lenis) {
        window.__lenis.scrollTo(0, {
          immediate: true,
          force: true,
        });
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
