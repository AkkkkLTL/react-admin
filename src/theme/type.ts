import { ThemeMode } from "@/types/enum"
import { FC, ReactNode } from "react";

/**
 * 主题 token 默认值
 */
export const themeTokens = {
  colors: {
    palette: {
      primary: {
        lighter: (null as unknown as string),
        light: (null as unknown as string),
        default: (null as unknown as string),
        dark: (null as unknown as string),
        darker: (null as unknown as string),
      },
      success: {
        lighter: (null as unknown as string),
        light: (null as unknown as string),
        default: (null as unknown as string),
        dark: (null as unknown as string),
        darker: (null as unknown as string),
      },
      warning: {
        lighter: (null as unknown as string),
        light: (null as unknown as string),
        default: (null as unknown as string),
        dark: (null as unknown as string),
        darker: (null as unknown as string),
      },
      error: {
        lighter: (null as unknown as string),
        light: (null as unknown as string),
        default: (null as unknown as string),
        dark: (null as unknown as string),
        darker: (null as unknown as string),
      },
      info: {
        lighter: (null as unknown as string),
        light: (null as unknown as string),
        default: (null as unknown as string),
        dark: (null as unknown as string),
        darker: (null as unknown as string),
      },
      gray: {
        "100": (null as unknown as string),
        "200": (null as unknown as string),
        "300": (null as unknown as string),
        "400": (null as unknown as string),
        "500": (null as unknown as string),
        "600": (null as unknown as string),
        "700": (null as unknown as string),
        "800": (null as unknown as string),
        "900": (null as unknown as string),
      },
    },
    common: {
      white: (null as unknown as string),
      black: (null as unknown as string),
    },
    action: {
      hover: (null as unknown as string),
      selected: (null as unknown as string),
      focus: (null as unknown as string),
      disabled: (null as unknown as string),
      active: (null as unknown as string),
    },
    text: {
      primary: (null as unknown as string),
      secondary: (null as unknown as string),
      disabled: (null as unknown as string),
    },
    background: {
      default: (null as unknown as string),
      paper: (null as unknown as string),
      neutral: (null as unknown as string),
    },
  },
  typography: {
    fontFamily: {
      primary: (null as unknown as string),
      secondary: (null as unknown as string),
    },
    fontSize: {
      xs: (null as unknown as string),
      sm: (null as unknown as string),
      default: (null as unknown as string),
      lg: (null as unknown as string),
      xl: (null as unknown as string),
    },
    fontWeight: {
      light: (null as unknown as string),
      normal: (null as unknown as string),
      medium: (null as unknown as string),
      semibold: (null as unknown as string),
      bold: (null as unknown as string),
    },
    lineHeight: {
      none: (null as unknown as string),
      tight: (null as unknown as string),
      normal: (null as unknown as string),
      relaxed: (null as unknown as string),
    },
  },
  spacing: {
    0: (null as unknown as string),
    1: (null as unknown as string),
    2: (null as unknown as string),
    3: (null as unknown as string),
    4: (null as unknown as string),
    5: (null as unknown as string),
    6: (null as unknown as string),
    7: (null as unknown as string),
    8: (null as unknown as string),
    10: (null as unknown as string),
    12: (null as unknown as string),
    16: (null as unknown as string),
    20: (null as unknown as string),
    24: (null as unknown as string),
    32: (null as unknown as string),
  },
  borderRadius: {
    none: (null as unknown as string),
    sm: (null as unknown as string),
    default: (null as unknown as string),
    md: (null as unknown as string),
    lg: (null as unknown as string),
    xl: (null as unknown as string),
    full: (null as unknown as string),
  },
  shadows: {
    none: (null as unknown as string),
    sm: (null as unknown as string),
    default: (null as unknown as string),
    md: (null as unknown as string),
    lg: (null as unknown as string),
    xl: (null as unknown as string),
    "2xl": (null as unknown as string),
    "3xl": (null as unknown as string),
    inner: (null as unknown as string),
    dialog: (null as unknown as string),
    card: (null as unknown as string),
    dropdown: (null as unknown as string),
    primary: (null as unknown as string),
    info: (null as unknown as string),
    success: (null as unknown as string),
    warning: (null as unknown as string),
    error: (null as unknown as string),
  },
  /**
   * 屏幕尺寸
   */
  screens: {
    xs: (null as unknown as string),
		sm: (null as unknown as string),
		md: (null as unknown as string),
    /**
     * 建议使用 lg 作为默认值，因为它是大多数设备的默认值
     * @media (min-width: 1024px) { ... }
     */
		lg: (null as unknown as string),
		xl: (null as unknown as string),
		"2xl": (null as unknown as string),
  },
  opacity: {
    0: (null as unknown as string),
		5: (null as unknown as string),
		10: (null as unknown as string),
		20: (null as unknown as string),
		25: (null as unknown as string),
		30: (null as unknown as string),
		35: (null as unknown as string),
		40: (null as unknown as string),
		45: (null as unknown as string),
		50: (null as unknown as string),
		55: (null as unknown as string),
		60: (null as unknown as string),
		65: (null as unknown as string),
		70: (null as unknown as string),
		75: (null as unknown as string),
		80: (null as unknown as string),
		85: (null as unknown as string),
		90: (null as unknown as string),
		95: (null as unknown as string),
		100: (null as unknown as string),
		border: (null as unknown as string),
		hover: (null as unknown as string),
		selected: (null as unknown as string),
		focus: (null as unknown as string),
		disabled: (null as unknown as string),
		disabledBackground: (null as unknown as string),
  },
  zIndex: {
    appBar: (null as unknown as string),
		drawer: (null as unknown as string),
		modal: (null as unknown as string),
		snackbar: (null as unknown as string),
		tooltip: (null as unknown as string),
  }
};
/**
 * 主题 token 类型
 */
export type ThemeTokens = typeof themeTokens;

export type UILibraryAdapterProps = {
  mode: ThemeMode;
  children: ReactNode;
}
export type UILibraryAdapter = FC<UILibraryAdapterProps>;

export type IsLeafObject<T> = T extends object ? (T[keyof T] extends null | string ? true : false) : false;
export type AddChannelToLeaf<T> = T extends object
  ? IsLeafObject<T> extends true
   ? T & { [K in keyof T as `${string & K}Channel`]: string }
   : { [K in keyof T]: AddChannelToLeaf<T[K]> }
  : T;