import "dayjs/locale/zh-cn";
import type { Locale as AntdLocal } from "antd/es/locale";
import en_us from "antd/es/locale/en_US";
import zh_cn from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { LocalEnum } from "@/types/enum";

/**
 * @name 语言选项类型
 * @desc 语言选项类型定义
 */
type Locale = keyof typeof LocalEnum;

/**
 * @name 语言
 * @desc 语言配置
 */
export type Language = {
	locale: keyof typeof LocalEnum;
	icon: string;
	label: string;
	antdLocal: AntdLocal;
};

/**
 * @name 语言映射
 * @desc 语言映射配置
 */
export const LANGUAGE_MAP: Record<Locale, Language> = {
	[LocalEnum.zh_cn]: {
		locale: LocalEnum.zh_cn,
		icon: "flag-cn",
		label: "Chinese",
		antdLocal: zh_cn,
	},
	[LocalEnum.en_us]: {
		locale: LocalEnum.en_us,
		icon: "flag-us",
		label: "English",
		antdLocal: en_us,
	},
};

/**
 * 语言 hooks
 * @returns
 */
export default function useLocale() {
	const { t, i18n } = useTranslation();

	const locale = (i18n.resolvedLanguage || LocalEnum.en_us) as Locale;
	const language = LANGUAGE_MAP[locale];

	/* 切换语言 */
	const setLocale = (locale: Locale) => {
		i18n.changeLanguage(locale);
		document.documentElement.lang = locale;
		dayjs.locale(locale);
	};

	return {
		t,
		locale,
		language,
		setLocale,
	};
}
