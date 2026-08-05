import type { FC, ReactNode } from "react";
import type { ThemeMode } from "@/types/enum";

/**
 * 主题 token 默认值
 */
export const themeTokens = {
	/** 主题颜色 */
	colors: {
		/** 主题颜色调色板 */
		palette: {
			/** 主色 */
			primary: {
				/** 主色-浅色 */
				lighter: null,
				/** 主色-中色 */
				light: null,
				/** 主色-默认色 */
				default: null,
				/** 主色-深色 */
				dark: null,
				/** 主色-更深色 */
				darker: null,
			},
			/** 成功色 */
			success: {
				/** 成功色-浅色 */
				lighter: null,
				/** 成功色-中色 */
				light: null,
				/** 成功色-默认色 */
				default: null,
				/** 成功色-深色 */
				dark: null,
				/** 成功色-更深色 */
				darker: null,
			},
			/** 警告色 */
			warning: {
				/** 警告色-浅色 */
				lighter: null,
				/** 警告色-中色 */
				light: null,
				/** 警告色-默认色 */
				default: null,
				/** 警告色-深色 */
				dark: null,
				/** 警告色-更深色 */
				darker: null,
			},
			/** 错误色 */
			error: {
				/** 错误色-浅色 */
				lighter: null,
				/** 错误色-中色 */
				light: null,
				/** 错误色-默认色 */
				default: null,
				/** 错误色-深色 */
				dark: null,
				/** 错误色-更深色 */
				darker: null,
			},
			/** 信息色 */
			info: {
				/** 信息色-浅色 */
				lighter: null,
				/** 信息色-中色 */
				light: null,
				/** 信息色-默认色 */
				default: null,
				/** 信息色-深色 */
				dark: null,
				/** 信息色-更深色 */
				darker: null,
			},
			/** 灰色 */
			gray: {
				/** 灰色-100 */
				"100": null,
				/** 灰色-200 */
				"200": null,
				/** 灰色-300 */
				"300": null,
				/** 灰色-400 */
				"400": null,
				/** 灰色-500 */
				"500": null,
				/** 灰色-600 */
				"600": null,
				/** 灰色-700 */
				"700": null,
				/** 灰色-800 */
				"800": null,
				/** 灰色-900 */
				"900": null,
			},
		},
		/** 主题颜色通用 */
		common: {
			/** 白色 */
			white: null,
			/** 黑色 */
			black: null,
		},
		/** 主题颜色操作 */
		action: {
			/** 操作-悬停 */
			hover: null,
			/** 操作-选中 */
			selected: null,
			/** 操作-聚焦 */
			focus: null,
			/** 操作-禁用 */
			disabled: null,
			/** 操作-激活 */
			active: null,
		},
		/** 主题颜色文本 */
		text: {
			/** 主本-主色 */
			primary: null,
			/** 主本-次色 */
			secondary: null,
			/** 主本-禁用 */
			disabled: null,
		},
		/** 主题颜色背景 */
		background: {
			/** 背景-默认色 */
			default: null,
			/** 背景-纸色 */
			paper: null,
			/** 背景-中性色 */
			neutral: null,
		},
	},
	typography: {
		fontFamily: {
			/**
			 * @desc 字体-Open Sans
			 * cssVar:--typography-fontFamily-openSans
			 * themeVar:typography.fontFamily.openSans
			 */
			openSans: null,
			/**
			 * @desc 字体-Inter
			 * cssVar:--typography-fontFamily-inter
			 * themeVar:typography.fontFamily.inter
			 */
			inter: null,
		},
		fontSize: {
			/**
			 * @desc 字体大小-小
			 * cssVar:--typography-fontSize-xs
			 * themeVar:typography.fontSize.xs
			 */
			xs: null,
			/**
			 * @desc 字体大小-中
			 * cssVar:--typography-fontSize-sm
			 * themeVar:typography.fontSize.sm
			 */
			sm: null,
			/**
			 * @desc 字体大小-默认
			 * cssVar:--typography-fontSize-default
			 * themeVar:typography.fontSize.default
			 */
			default: null,
			/**
			 * @desc 字体大小-大
			 * cssVar:--typography-fontSize-lg
			 * themeVar:typography.fontSize.lg
			 */
			lg: null,
			/**
			 * @desc 字体大小-超大
			 * cssVar:--typography-fontSize-xl
			 * themeVar:typography.fontSize.xl
			 */
			xl: null,
		},
		fontWeight: {
			light: null,
			normal: null,
			medium: null,
			semibold: null,
			bold: null,
		},
		lineHeight: {
			none: null,
			tight: null,
			normal: null,
			relaxed: null,
		},
	},
	spacing: {
		0: null,
		1: null,
		2: null,
		3: null,
		4: null,
		5: null,
		6: null,
		7: null,
		8: null,
		10: null,
		12: null,
		16: null,
		20: null,
		24: null,
		32: null,
	},
	/**
	 * @name 圆角半径
	 * @desc 圆角半径值
	 */
	borderRadius: {
		none: null,
		sm: null,
		default: null,
		md: null,
		lg: null,
		xl: null,
		full: null,
	},
	shadows: {
		none: null,
		sm: null,
		default: null,
		md: null,
		lg: null,
		xl: null,
		"2xl": null,
		"3xl": null,
		inner: null,
		dialog: null,
		card: null,
		dropdown: null,
		primary: null,
		info: null,
		success: null,
		warning: null,
		error: null,
	},
	/**
	 * 屏幕尺寸
	 */
	screens: {
		xs: null,
		sm: null,
		md: null,
		/**
		 * 建议使用 lg 作为默认值，因为它是大多数设备的默认值
		 * @media (min-width: 1024px) { ... }
		 */
		lg: null,
		xl: null,
		"2xl": null,
	},
	opacity: {
		0: null,
		5: null,
		10: null,
		20: null,
		25: null,
		30: null,
		35: null,
		40: null,
		45: null,
		50: null,
		55: null,
		60: null,
		65: null,
		70: null,
		75: null,
		80: null,
		85: null,
		90: null,
		95: null,
		100: null,
		border: null,
		hover: null,
		selected: null,
		focus: null,
		disabled: null,
		disabledBackground: null,
	},
	zIndex: {
		appBar: null,
		drawer: null,
		nav: null,
		modal: null,
		snackbar: null,
		tooltip: null,
		scrollbar: null,
	},
};
/**
 * 主题 token 类型
 */
export type ThemeTokens = TransNulltoString<typeof themeTokens>;

/**
 * 组件库适配器属性
 */
export type UILibraryAdapterProps = {
	mode: ThemeMode;
	children: ReactNode;
};
/**
 * 组件库适配器类型
 */
export type UILibraryAdapter = FC<UILibraryAdapterProps>;

export type IsLeafObject<T> = T extends object ? (T[keyof T] extends null | string ? true : false) : false;
export type AddChannelToLeaf<T> = T extends object
	? IsLeafObject<T> extends true
		? T & { [K in keyof T as `${string & K}Channel`]: string }
		: { [K in keyof T]: AddChannelToLeaf<T[K]> }
	: T;

/**
 * 将 themeTokens 中的 null 值转换为字符串
 */
type TransNulltoString<T> = T extends object
	? IsLeafObject<T> extends true
		? { [K in keyof T]: string }
		: { [K in keyof T]: TransNulltoString<T[K]> }
	: T;
