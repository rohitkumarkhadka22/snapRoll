import { createContext, useMemo } from "react";
import translations from "../translations";
import {
  getLanguageByCode,
  LANGUAGE_CONFIRMATION_COOKIE,
  LANGUAGE_COOKIE,
  languages,
} from "./languageConfig";

export const LanguageContext = createContext(null);

export { languages };

const LanguageProvider = ({
  children,
  initialLanguage = "en",
  initialLanguageConfirmed = false,
}) => {
  const selectedLanguage = getLanguageByCode(initialLanguage);
  const hasChosenLanguage = initialLanguageConfirmed;

  const changeLanguage = (language) => {
    const selected = languages.find((item) => item.code === language.code) || languages[0];

    try {
      localStorage.setItem(LANGUAGE_COOKIE, JSON.stringify(selected));
      localStorage.setItem(LANGUAGE_CONFIRMATION_COOKIE, "true");
    } catch {
      // The language still changes for the current session when storage is unavailable.
    }

    try {
      document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(selected.code)}; Max-Age=31536000; Path=/; SameSite=Lax`;
      document.cookie = `${LANGUAGE_CONFIRMATION_COOKIE}=true; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {
      // Reload anyway; environments that reject cookies will show the language gate again.
    }

    // A hard reload lets the server render the next document entirely in the
    // selected language, avoiding an in-place text swap or mixed-language frame.
    window.location.reload();
  };

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
