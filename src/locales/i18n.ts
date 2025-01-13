import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { LOCALENUM, STORAGEENUM } from "@/settings";
import { getStringItem } from "@/utils/storage";

import zh_CN from "./lang/zh_CN";

const defaultLng = getStringItem(STORAGEENUM.I18N) || (LOCALENUM.ZH_CN as string);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: defaultLng,
    fallbackLng: LOCALENUM.ZH_CN,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      zh_CN: { translation: zh_CN },
    }
  });

export default i18n;
export const { t } = i18n;