import { useTranslation } from "react-i18next"
import en_US from "antd/locale/en_US";
import zh_C from "antd/locale/zh_CN";
import type { Locale as AntdLocale } from "antd/es/locale";

import { LocalEnum } from "@/types/enum";

type Locale = keyof typeof LocalEnum;
type Language = {
  locale: keyof typeof LocalEnum;
  icon: string;
  label: string;
  antdLocale: AntdLocale
}

const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocalEnum.ZH_CN]: {
    locale: LocalEnum.ZH_CN,
    icon: "🇨🇳",
    label: "简体中文",
    antdLocale: zh_C,
  },
  [LocalEnum.EN_US]: {
    locale: LocalEnum.EN_US,
    icon: "🇺🇸",
    label: "English",
    antdLocale: en_US, 
  }
}

const useLocale = () => {
  const { i18n } = useTranslation();

  const locale = (i18n.resolvedLanguage || LocalEnum.ZH_CN) as Locale;
  const language = LANGUAGE_MAP[locale];

  // 切换语言
  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  };

  return {
    locale,
    language,
    setLocale,
  }
}
export default useLocale;