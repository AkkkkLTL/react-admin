import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LocalEnum, StorageEnum } from "@/types/enum";
import { getStringItem } from "@/utils/storage";
import en_US from "./lang/en_US";
import zh_CN from "./lang/zh_CN";

const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.zh_CN as string);
document.documentElement.lang = defaultLng;

i18n
	.use(LanguageDetector) // 检测用户语言
	.use(initReactI18next) // 初始化react-i18next
	.init({
		debug: true,
		lng: defaultLng,
		fallbackLng: LocalEnum.zh_CN,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			zh_CN: { translation: zh_CN },
			en_US: { translation: en_US },
		},
	});

export default i18n;
export const { t } = i18n;
