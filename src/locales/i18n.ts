import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { LocalEnum, StorageEnum } from "@/types/enum";
import { getStringItem } from "@/utils/storage";

import ZH_CN from "./lang/ZH_CN";
import EN_US from "./lang/EN_US";

const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.ZH_CN as string);

i18n
  .use(LanguageDetector)  // 检测用户语言
  .use(initReactI18next)  // 初始化react-i18next
  .init({
    debug: true,
    lng: defaultLng,
    fallbackLng: LocalEnum.ZH_CN,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ZH_CN: { translation: ZH_CN },
      EN_US: { translation: EN_US }
    }
  });

export default i18n;
export const { t } = i18n;