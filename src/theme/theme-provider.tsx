import { type ReactNode, useEffect } from "react";
import { useSettings } from "@/store/modules/settingsSlice";
import { HtmlDataAttribute } from "@/types/enum";
import type { UILibraryAdapter } from "./type";

interface ThemeProviderProps {
	children: ReactNode;
	adapters?: UILibraryAdapter[];
}

/**
 * 主题提供器
 * @param children 子组件
 * @param adapters 适配器列表
 * @returns 包装后的子组件
 */
export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
	const { themeMode, themeColorPresets, fontFamily, fontSize } = useSettings();

	// 更新 html 的 data-theme-mode 属性，支持 Tailwind dark 模式
	useEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute(HtmlDataAttribute.THEMEMODE, themeMode);
	}, [themeMode]);

	// 动态更新与主题色相关的 css 变量
	useEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute(HtmlDataAttribute.COLORPALETTE, themeColorPresets);
	}, [themeColorPresets]);

	// 动态更新字体
	useEffect(() => {
		const root = window.document.documentElement;
		root.style.fontSize = `${fontSize}px`;

		const body = window.document.body;
		body.style.fontFamily = fontFamily;
	}, [fontSize, fontFamily]);

	const wrappedWithAdapters = adapters.reduce(
		(children, Adapter) => (
			<Adapter key={Adapter.name} mode={themeMode}>
				{children}
			</Adapter>
		),
		children,
	);
	return wrappedWithAdapters;
}
