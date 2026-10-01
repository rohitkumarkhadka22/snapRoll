import { createContext, useEffect, useMemo, useState } from "react";
import translations from "../translations";

export const LanguageContext = createContext(null);

export const languages = [
  {
    flag: "🇬🇧",
    name: "English",
    nativeName: "English",
    code: "en",
  },
  {
    flag: "🇪🇸",
    name: "Spanish",
    nativeName: "Español",
    code: "es",
  },
  {
    flag: "🇫🇷",
    name: "French",
    nativeName: "Français",
    code: "fr",
  },
  {
    flag: "🇵🇹",
    name: "Portuguese",
    nativeName: "Português",
    code: "pt",
  },
];

const LANGUAGE_CONFIRMATION_KEY = "snaproll-language-confirmed-v2";

const getSavedLanguage = () => {
  const hasConfirmationCookie = document.cookie
    .split("; ")
    .some((cookie) => cookie === `${LANGUAGE_CONFIRMATION_KEY}=true`);
  let hasConfirmedLanguage = hasConfirmationCookie;

  try {
    hasConfirmedLanguage ||= localStorage.getItem(LANGUAGE_CONFIRMATION_KEY) === "true";
  } catch {
    // A confirmation cookie is enough when local storage is unavailable.
  }

  if (!hasConfirmedLanguage) return undefined;

  try {
    const savedLanguage = JSON.parse(localStorage.getItem("snaproll-language"));
    const selected = languages.find((language) => language.code === savedLanguage?.code);
    if (selected) return selected;
  } catch {
    // Fall back to the cookie when local storage is unavailable or malformed.
  }

  const cookieCode = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("snaproll-language="))
    ?.split("=")[1];

  try {
    return languages.find((language) => language.code === decodeURIComponent(cookieCode || ""));
  } catch {
    return undefined;
  }
};

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  const changeLanguage = (language) => {
    const selected = languages.find((item) => item.code === language.code) || languages[0];

    setSelectedLanguage(selected);
    setHasChosenLanguage(true);

    try {
      localStorage.setItem("snaproll-language", JSON.stringify(selected));
      localStorage.setItem(LANGUAGE_CONFIRMATION_KEY, "true");
    } catch {
      // The language still changes for the current session when storage is unavailable.
    }

    try {
      document.cookie = `snaproll-language=${encodeURIComponent(selected.code)}; Max-Age=31536000; Path=/; SameSite=Lax`;
      document.cookie = `${LANGUAGE_CONFIRMATION_KEY}=true; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {
      // The server selection request remains the source of truth when cookies are restricted.
    }
  };

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    const readyFrame = requestAnimationFrame(() => {
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        setHasChosenLanguage(true);
      }

      setIsLanguageReady(true);
    });

    return () => cancelAnimationFrame(readyFrame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.code;
  }, [selectedLanguage.code]);

  const t = translations[selectedLanguage.code] || translations.en;

  const value = useMemo(
    () => ({
      selectedLanguage,
      hasChosenLanguage,
      isLanguageReady,
      languages,
      changeLanguage,
      t,
    }),
    [hasChosenLanguage, isLanguageReady, selectedLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
