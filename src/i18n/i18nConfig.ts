import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import eng from "../i18n/locales/eng/dashboard.json";
import arb from "../i18n/locales/arb/dashboard.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      eng: { translation: eng },
      arb: { translation: arb }
    },
    fallbackLng: "eng",
    interpolation: { escapeValue: false }
  });

export default i18n;
