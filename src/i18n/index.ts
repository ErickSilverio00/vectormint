import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationPTBR from "./locales/pt-br/translation.json";
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";

const resources = {
  "pt-BR": { translation: translationPTBR },
  en: { translation: translationEN },
  es: { translation: translationES },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
