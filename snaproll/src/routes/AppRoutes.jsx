import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import HowItWorks from "../pages/HowItWorks";
import Pricing from "../pages/Pricing";
import Events from "../pages/Events";
import CreateEvent from "../pages/CreateEvent";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
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
    </Routes>
  );
};

export default AppRoutes;
