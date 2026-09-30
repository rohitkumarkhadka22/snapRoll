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

const LanguageProvider = ({ children, initialLanguageCode }) => {
  const serverLanguage = languages.find((language) => language.code === initialLanguageCode);
  const [selectedLanguage, setSelectedLanguage] = useState(serverLanguage || languages[0]);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(Boolean(serverLanguage));

  const changeLanguage = (language) => {
    const selected = languages.find((item) => item.code === language.code) || languages[0];

    setSelectedLanguage(selected);
    setHasChosenLanguage(true);

    try {
      localStorage.setItem("snaproll-language", JSON.stringify(selected));
    } catch {
      // The language still changes for the current session when storage is unavailable.
    }

    try {
      document.cookie = `snaproll-language=${encodeURIComponent(selected.code)}; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {
      // The server selection request remains the source of truth when cookies are restricted.
    }
  };

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.code;
  }, [selectedLanguage.code]);

  const t = translations[selectedLanguage.code] || translations.en;

  const value = useMemo(
    () => ({
      selectedLanguage,
      hasChosenLanguage,
      languages,
      changeLanguage,
      t,
    }),
    [hasChosenLanguage, selectedLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
