/* eslint-disable react-refresh/only-export-components */

import { createContext, useMemo, useState } from "react";
import translations from "../translations";

export const LanguageContext = createContext(null);

export const languages = [
  {
    flag: "🇬🇧",
    name: "English",
    code: "en",
  },
  {
    flag: "🇪🇸",
    name: "Spanish",
    code: "es",
  },
  {
    flag: "🇫🇷",
    name: "French",
    code: "fr",
  },
  {
    flag: "🇵🇹",
    name: "Portuguese",
    code: "pt",
  },
];

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("snaproll-language");

    if (savedLanguage) {
      try {
        const parsed = JSON.parse(savedLanguage);

        return (
          languages.find((language) => language.name === parsed.name) ||
          languages[0]
        );
      } catch {
        return languages[0];
      }
    }

    return languages[0];
  });

  const changeLanguage = (language) => {
    const selected =
      languages.find((item) => item.name === language.name) || languages[0];

    setSelectedLanguage(selected);

    localStorage.setItem("snaproll-language", JSON.stringify(selected));
  };

  const t = translations[selectedLanguage.code] || translations.en;

  const value = useMemo(
    () => ({
      selectedLanguage,
      languages,
      changeLanguage,
      t,
    }),
    [selectedLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
