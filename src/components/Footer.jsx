import { Link } from "react-router-dom";

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* FOOTER CONTENT */}

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-16">
          {/* SNAPROLL */}

          <div>
            <Link
              to="/"
              className="font-serif text-3xl tracking-[-0.04em] transition-opacity duration-300 hover:opacity-70"
            >
              SNAPROLL
            </Link>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                What it does
              </Link>

              <Link
                to="/how-it-works"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                How it works
              </Link>

              <Link
                to="/faq"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* GET THE APP */}

          <div>
            <p className="font-serif text-xl tracking-[-0.02em] text-white">
              GET THE APP
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {/* APP STORE  */}
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Snaproll on the App Store"
                className="group flex h-14 w-47.5 items-center gap-3 rounded-xl border border-white/15 bg-white/4 px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8"
              >
                {/* REAL APPLE LOGO */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0 fill-white"
                  aria-hidden="true"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25C11.88 5.02 13.69 3.18 15.78 3c.29 2.58-2.34 4.5-3.75 4.25z" />
                </svg>

                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-medium leading-none text-gray-500">
                    Download on the
                  </span>

                  <span className="mt-1.5 text-[17px] font-medium leading-none text-white">
                    App Store
                  </span>
                </div>
              </a>

              {/* GOOGLE PLAY  */}
              <a
                href="https://play.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Snaproll on Google Play"
                className="group flex h-14 w-47.5 items-center gap-3 rounded-xl border border-white/15 bg-white/4 px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8"
              >
                {/* REAL GOOGLE PLAY LOGO */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fill="#34A853"
                    d="M3.27 2.96c-.17.18-.27.46-.27.81v16.46c0 .35.1.63.27.81L12.48 12 3.27 2.96z"
                  />

                  <path
                    fill="#FBBC04"
                    d="m15.55 15.07-3.07-3.07L3.27 21.04c.3.32.8.36 1.37.04l10.91-6.01z"
                  />

                  <path
                    fill="#EA4335"
                    d="m18.99 10.77-3.44-1.9L12.48 12l3.07 3.07 3.45-1.9c.98-.54.98-1.86-.01-2.4z"
                  />

                  <path
                    fill="#4285F4"
                    d="M4.64 2.92c-.57-.32-.1.28-1.37.04L12.48 12l3.07-3.07L4.64 2.92z"
                  />
                </svg>

                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-medium uppercase leading-none tracking-wide text-gray-500">
                    Get it on
                  </span>

                  <span className="mt-1.5 text-[17px] font-medium leading-none text-white">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* LEGAL */}

          <div>
            <p className="font-serif text-xl tracking-[-0.02em] text-white">
              LEGAL
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/privacy"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Privacy policy
              </Link>

              <Link
                to="/terms"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Terms of service
              </Link>

              <Link
                to="/contact"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Contact
              </Link>

              <Link
                to="/contact"
                className="w-fit text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}

        <div className="mt-16 border-t border-white/10 pt-6 sm:mt-20">
          <div className="flex flex-col gap-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            {/* COPYRIGHT */}
            <p>© Snaproll. All rights reserved.</p>

            {/* GUEST NOTE + BACK TO TOP */}
            <div className="flex items-center gap-4">
              <p>No account required for guests.</p>

              <button
                type="button"
                onClick={handleBackToTop}
                aria-label="Back to top"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white hover:text-black"
              >
                <span className="text-base transition-transform duration-300 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
