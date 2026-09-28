/* eslint-disable react-refresh/only-export-components */

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

const getSavedLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem("snaproll-language");
    if (!savedLanguage) return null;

    const parsed = JSON.parse(savedLanguage);
    return languages.find((language) => language.code === parsed.code) || null;
  } catch {
    return null;
  }
};

const LanguageProvider = ({ children }) => {
  const [initialLanguage] = useState(getSavedLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage || languages[0]);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(Boolean(initialLanguage));

  const changeLanguage = (language) => {
    const selected = languages.find((item) => item.code === language.code) || languages[0];

    setSelectedLanguage(selected);
    setHasChosenLanguage(true);

    try {
      localStorage.setItem("snaproll-language", JSON.stringify(selected));
    } catch {
      // The language still changes for the current session when storage is unavailable.
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
