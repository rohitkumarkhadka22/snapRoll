import { useEffect } from "react";
import Lenis from "lenis";

import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      smoothWheel: true,
      smoothTouch: true,
      autoRaf: true,
    });

    window.__lenis = lenis;

    return () => {
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <MainLayout>
      <ScrollToTop />
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
