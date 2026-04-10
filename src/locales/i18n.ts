import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { LocalEnum, StorageEnum } from "@/types/enum";
import { getStringItem } from "@/utils/storage";
import en_us from "./lang/en_us";
import zh_cn from "./lang/zh_cn";

const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.zh_cn as string);

i18n
	.use(LanguageDetector) // 检测用户语言
	.use(initReactI18next) // 初始化react-i18next
	.init({
		debug: true,
		lng: defaultLng,
		fallbackLng: LocalEnum.zh_cn,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			zh_cn: { translation: zh_cn },
			en_us: { translation: en_us },
		},
	});

export default i18n;
export const { t } = i18n;
