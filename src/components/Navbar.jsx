import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [languageOpen, setLanguageOpen] = useState(false);

  // SAVED LANGUAGE
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("snaproll-language");

    if (savedLanguage) {
      try {
        return JSON.parse(savedLanguage);
      } catch {
        return {
          flag: "🇬🇧",
          name: "English",
        };
      }
    }

    return {
      flag: "🇬🇧",
      name: "English",
    };
  });

  const lastScrollY = useRef(0);

  const handleLiquidMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );

    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  // LANGUAGES
  const languages = [
    { flag: "🇬🇧", name: "English" },
    { flag: "🇪🇸", name: "Spanish" },
    { flag: "🇫🇷", name: "French" },
    { flag: "🇵🇹", name: "Portuguese" },
  ];

  // CLOSE MENU
  const closeMenu = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
  };

  // CHANGE LANGUAGE
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);

    localStorage.setItem("snaproll-language", JSON.stringify(language));

    setLanguageOpen(false);
  };

  // NAVBAR SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top
      if (currentScrollY <= 20) {
        setShowNavbar(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide while scrolling down
      if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
        setMenuOpen(false);
        setLanguageOpen(false);
      }

      // Show while scrolling up
      else if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-3 pt-0 transition-transform duration-500 ease-in-out sm:px-5 sm:pt-0 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* LIQUID GLASS NAVBAR */}
      <nav
        className="
          relative mx-auto flex h-18 max-w-7xl items-center
          rounded-[26px]
          border border-white/18
         bg-black/70
          px-4
          shadow-[0_8px_40px_rgba(0,0,0,0.28)]
          backdrop-blur-2xl
          backdrop-saturate-150
          sm:h-20 sm:px-6
          lg:px-7
        "
      >
        {/* LIQUID GLASS HIGHLIGHT */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
          <div
            className="
              absolute -left-20 -top-16
              h-32 w-72
              -rotate-12
              rounded-full
              bg-white/10
              blur-2xl
            "
          />

          <div className="absolute inset-x-10 top-0 h-px bg-white/18" />

          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-white/[0.07]" />
        </div>

        {/* MOBILE LEFT SIDE: HAMBURGER + LOGO */}
        <div className="relative z-10 flex items-center gap-1.5 md:hidden">
          {/* HAMBURGER */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setLanguageOpen(false);
            }}
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-white/15
              bg-white/10
              text-white
              shadow-inner shadow-white/4
              backdrop-blur-xl
              transition-all duration-300
              hover:border-white/25
              hover:bg-white/13
            "
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="relative text-xl leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>

          {/* MOBILE LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center"
          >
            <img
              src={logo}
              alt="SnapRoll"
              className="
                h-12 w-12
                object-contain
                transition duration-300
                hover:scale-105
              "
            />
          </Link>
        </div>

        {/* DESKTOP LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="
            group relative z-10 hidden
            shrink-0 items-center
            md:flex
          "
        >
          <img
            src={logo}
            alt="SnapRoll"
            className="
              h-14 w-14
              object-contain
              transition duration-300
              group-hover:scale-105
              sm:h-16 sm:w-16
            "
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="relative z-10 hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-2 lg:gap-3 xl:-translate-x-4">
            {/* HOME */}
            <Link
              to="/"
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/12 bg-white/4.5
                px-4 py-2.5
                text-sm font-medium text-white/80
                backdrop-blur-xl backdrop-saturate-150
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-0.5 hover:scale-[1.035]
                hover:border-white/30 hover:bg-white/16
                hover:text-white
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.30)]
              "
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(180px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.48),rgba(255,255,255,0.18)_35%,rgba(255,255,255,0.05)_58%,transparent_78%)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">Home</span>
            </Link>

            {/* HOW IT WORKS */}
            <Link
              to="/how-it-works"
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/12 bg-white/4.5
                px-4 py-2.5
                text-sm font-medium text-white/80
                backdrop-blur-xl backdrop-saturate-150
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-0.5 hover:scale-[1.035]
                hover:border-white/30 hover:bg-white/16
                hover:text-white
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.30)]
              "
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(180px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.48),rgba(255,255,255,0.18)_35%,rgba(255,255,255,0.05)_58%,transparent_78%)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">How It Works</span>
            </Link>

            {/* PRICING */}
            <Link
              to="/pricing"
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/12 bg-white/4.5
                px-4 py-2.5
                text-sm font-medium text-white/80
                backdrop-blur-xl backdrop-saturate-150
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-0.5 hover:scale-[1.035]
                hover:border-white/30 hover:bg-white/16
                hover:text-white
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.30)]
              "
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(180px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.48),rgba(255,255,255,0.18)_35%,rgba(255,255,255,0.05)_58%,transparent_78%)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">Pricing</span>
            </Link>

            {/* FAQ */}
            <Link
              to="/faq"
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/12 bg-white/4.5
                px-4 py-2.5
                text-sm font-medium text-white/80
                backdrop-blur-xl backdrop-saturate-150
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-0.5 hover:scale-[1.035]
                hover:border-white/30 hover:bg-white/16
                hover:text-white
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.30)]
              "
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(180px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.48),rgba(255,255,255,0.18)_35%,rgba(255,255,255,0.05)_58%,transparent_78%)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">FAQ</span>
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/12
                bg-white/4.5
                px-4 py-2.5
                text-sm font-medium text-white/80
                backdrop-blur-xl backdrop-saturate-150
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-0.5 hover:scale-[1.035]
                hover:border-white/30 hover:bg-white/16
                hover:text-white
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.30)]
              "
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(180px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.48),rgba(255,255,255,0.18)_35%,rgba(255,255,255,0.05)_58%,transparent_78%)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">Contact</span>
            </Link>
          </div>
        </div>

        {/* DESKTOP RIGHT SIDE */}
        <div className="relative z-10 hidden shrink-0 items-center gap-2.5 md:flex">
          {/* BUILD YOUR EVENT */}
          <Link
            to="/events"
            onMouseMove={handleLiquidMouseMove}
            className="
              group relative overflow-hidden rounded-full
              border border-white/20
              bg-white/92
              px-5 py-2.5
              text-sm font-semibold text-black
              shadow-[0_2px_12px_rgba(255,255,255,0.08)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-[0_5px_20px_rgba(255,255,255,0.12)]
            "
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(110px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.38),rgba(255,255,255,0.10)_38%,transparent_72%)] opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-x-0 top-0 h-px bg-white" />

            <span className="relative flex items-center gap-2">
              Build Your Event
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          {/* LANGUAGE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((prev) => !prev)}
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative flex items-center gap-2
                rounded-full
                border border-white/13
                bg-white/6
                px-3.5 py-2.5
                text-white
                cursor-pointer
                shadow-inner shadow-white/3
                backdrop-blur-xl
                transition-all duration-300
                hover:border-white/20
                hover:bg-white/10
              "
              aria-label="Select language"
              aria-expanded={languageOpen}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(100px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.25),rgba(255,255,255,0.08)_40%,transparent_72%)] opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

              <span className="relative text-base">
                {selectedLanguage.flag}
              </span>

              <span className="relative text-xs font-medium text-gray-300">
                {selectedLanguage.name}
              </span>

              <span
                className={`text-[10px] text-gray-500 transition-transform duration-300 ${
                  languageOpen ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            {/* LANGUAGE DROPDOWN */}
            {languageOpen && (
              <div
                className="
                  absolute right-0 top-[calc(100%+10px)]
                  w-44 overflow-hidden
                  rounded-2xl
                  border border-white/18
                  bg-black/60
                  p-2
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  backdrop-blur-2xl
                  backdrop-saturate-150
                "
              >
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/20" />

                {languages.map((language) => (
                  <button
                    key={language.name}
                    type="button"
                    onClick={() => handleLanguageSelect(language)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                      selectedLanguage.name === language.name
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>

                    <span className="text-sm">{language.name}</span>

                    {selectedLanguage.name === language.name && (
                      <span className="ml-auto text-xs text-white">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            relative mx-0 mt-2 overflow-hidden
            rounded-[26px]
            border border-white/18
            bg-black/58
            shadow-[0_20px_70px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
            backdrop-saturate-150
            md:hidden
          "
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20" />

          <div className="relative flex flex-col p-5">
            {/* HOME */}
            <Link
              to="/"
              onClick={closeMenu}
              className="
                border-b border-white/8
                py-4 text-sm text-gray-300
                transition-colors hover:text-white
              "
            >
              Home
            </Link>

            {/* HOW IT WORKS */}
            <Link
              to="/how-it-works"
              onClick={closeMenu}
              className="
                border-b border-white/8
                py-4 text-sm text-gray-300
                transition-colors hover:text-white
              "
            >
              How It Works
            </Link>

            {/* PRICING */}
            <Link
              to="/pricing"
              onClick={closeMenu}
              className="
                border-b border-white/8
                py-4 text-sm text-gray-300
                transition-colors hover:text-white
              "
            >
              Pricing
            </Link>

            {/* FAQ */}
            <Link
              to="/faq"
              onClick={closeMenu}
              className="
                border-b border-white/8
                py-4 text-sm text-gray-300
                transition-colors hover:text-white
              "
            >
              FAQ
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="
                border-b border-white/8
                py-4 text-sm text-gray-300
                transition-colors hover:text-white
              "
            >
              Contact
            </Link>

            {/* MOBILE LANGUAGE */}
            <div className="mt-5">
              <p
                className="
                  mb-3
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-gray-600
                "
              >
                Language
              </p>

              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <button
                    key={language.name}
                    type="button"
                    onClick={() => handleLanguageSelect(language)}
                    onMouseMove={handleLiquidMouseMove}
                    className={`group relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                      selectedLanguage.name === language.name
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/10 text-gray-400 hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(90px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.25),rgba(255,255,255,0.07)_42%,transparent_72%)] opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="relative">{language.flag}</span>

                    <span className="text-xs">{language.name}</span>

                    {selectedLanguage.name === language.name && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* MOBILE BUILD YOUR EVENT */}
            <Link
              to="/events"
              onClick={closeMenu}
              onMouseMove={handleLiquidMouseMove}
              className="
                group relative mt-5
                overflow-hidden
                rounded-full
                border border-white/20
                bg-white/92
                px-6 py-3
                text-center
                text-sm font-semibold
                text-black
                shadow-lg shadow-black/20
                transition-all duration-300
                hover:bg-white
              "
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(110px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.38),rgba(255,255,255,0.10)_38%,transparent_72%)] opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

              <span className="absolute inset-x-0 top-0 h-px bg-white" />

              <span className="relative flex items-center justify-center gap-2">
                Build Your Event
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
