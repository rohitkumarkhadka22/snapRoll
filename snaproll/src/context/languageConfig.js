export const LANGUAGE_COOKIE = "snaproll-language";
export const LANGUAGE_CONFIRMATION_COOKIE = "snaproll-language-confirmed-v2";

export const languages = [
  { flag: "🇬🇧", name: "English", nativeName: "English", code: "en" },
  { flag: "🇪🇸", name: "Spanish", nativeName: "Español", code: "es" },
  { flag: "🇫🇷", name: "French", nativeName: "Français", code: "fr" },
  { flag: "🇵🇹", name: "Portuguese", nativeName: "Português", code: "pt" },
];

export const getLanguageByCode = (code) =>
  languages.find((language) => language.code === code) || languages[0];
