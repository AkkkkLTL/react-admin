import type { FC, ReactNode } from "react";
import type { ThemeMode } from "@/types/enum";

/**
 * 主题 token 默认值
 */
export const themeTokens = {
	colors: {
		palette: {
			primary: {
				lighter: null,
				light: null,
				default: null,
				dark: null,
				darker: null,
			},
			success: {
				lighter: null,
				light: null,
				default: null,
				dark: null,
				darker: null,
			},
			warning: {
				lighter: null,
				light: null,
				default: null,
				dark: null,
				darker: null,
			},
			error: {
				lighter: null,
				light: null,
				default: null,
				dark: null,
				darker: null,
			},
			info: {
				lighter: null,
				light: null,
				default: null,
				dark: null,
				darker: null,
			},
			gray: {
				"100": null,
				"200": null,
				"300": null,
				"400": null,
				"500": null,
				"600": null,
				"700": null,
				"800": null,
				"900": null,
			},
		},
		common: {
			white: null,
			black: null,
		},
		action: {
			hover: null,
			selected: null,
			focus: null,
			disabled: null,
			active: null,
		},
		text: {
			primary: null,
			secondary: null,
			disabled: null,
		},
		background: {
			default: null,
			paper: null,
			neutral: null,
		},
	},
	typography: {
		fontFamily: {
			openSans: null,
			inter: null,
		},
		fontSize: {
			xs: null,
			sm: null,
			default: null,
			lg: null,
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
export type TransNulltoString<T> = T extends object
	? IsLeafObject<T> extends true
		? { [K in keyof T]: string }
		: { [K in keyof T]: TransNulltoString<T[K]> }
	: T;
