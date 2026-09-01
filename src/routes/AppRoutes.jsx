import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import HowItWorks from "../pages/HowItWorks";
import Pricing from "../pages/Pricing";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Events from "../pages/Events";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
};

export default AppRoutes;
