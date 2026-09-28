import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import LanguageGate from "../components/LanguageGate";
import useLanguage from "../context/useLanguage";

const MainLayout = ({ children }) => {
  const { hasChosenLanguage } = useLanguage();

  if (!hasChosenLanguage) return <LanguageGate />;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main>{children}</main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
