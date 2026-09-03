import { useEffect } from "react";
import Lenis from "lenis";

import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
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
