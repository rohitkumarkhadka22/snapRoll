import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const MainLayout = ({ children }) => {
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
