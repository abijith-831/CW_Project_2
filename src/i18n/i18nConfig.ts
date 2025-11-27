import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import eng from "../i18n/locales/eng/dashboard.json";
import arb from "../i18n/locales/arb/dashboard.json";

import profile_eng from "../i18n/locales/eng/profile.json";
import profile_arb from "../i18n/locales/arb/profile.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      eng: {
        translation: eng,
        profile: profile_eng
      },
      arb: {
        translation: arb,
        profile: profile_arb
      }
    },
    fallbackLng: "eng",
    interpolation: { escapeValue: false }
  });

export default i18n;
