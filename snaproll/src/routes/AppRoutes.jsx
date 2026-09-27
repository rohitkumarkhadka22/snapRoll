import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const HowItWorks = lazy(() => import("../pages/HowItWorks"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Events = lazy(() => import("../pages/Events"));
const CreateEvent = lazy(() => import("../pages/CreateEvent"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-sm text-white/50">
          Loading…
        </main>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/how-it-works" element={<HowItWorks />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/events" element={<Events />} />

        {/* Create Event */}
        <Route path="/events/create" element={<CreateEvent />} />

        {/* Optional: support old URL */}
        <Route path="/event/create" element={<CreateEvent />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
