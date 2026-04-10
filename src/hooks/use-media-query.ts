import { useEffect, useMemo, useState } from "react";
import { breakpointsTokens } from "@/theme/tokens/breakpoints";
import { removePx } from "@/utils/theme";

interface MediaQueryConfig {
	minWidth?: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	orientation?: "portrait" | "landscape";
	prefersColorScheme?: "light" | "dark";
	prefersReducedMotion?: boolean;
	devicePixelRatio?: number;
	pointerType?: "coarse" | "fine";
}

const buildMediaQuery = (config: MediaQueryConfig | string): string => {
	if (typeof config === "string") return config;

	const conditions: string[] = [];

	if (config.minWidth) conditions.push(`(min-width: ${config.minWidth}px)`);
	if (config.maxWidth) conditions.push(`(max-width: ${config.maxWidth}px)`);
	if (config.minHeight) conditions.push(`(min-height: ${config.minHeight}px)`);
	if (config.maxHeight) conditions.push(`(max-height: ${config.maxHeight}px)`);
	if (config.orientation) conditions.push(`(orientation: ${config.orientation})`);
	if (config.prefersColorScheme) conditions.push(`(prefers-color-scheme: ${config.prefersColorScheme})`);
	if (config.prefersReducedMotion) conditions.push(`(prefers-reduced-motion: ${config.prefersReducedMotion})`);
	if (config.devicePixelRatio) conditions.push(`(device-pixel-ratio: ${config.devicePixelRatio})`);
	if (config.pointerType) conditions.push(`(pointer: ${config.pointerType})`);

	return conditions.join(" and ");
};

/**
 * 自定义 Hook，用于监听媒体查询变化
 * @param config 媒体查询配置
 * @returns 是否匹配当前媒体查询
 */
export const useMediaQuery = (config: MediaQueryConfig | string) => {
	// 服务器端渲染时默认为 false
	const [matches, setMatches] = useState(false);

	const mediaQueryString = useMemo(() => buildMediaQuery(config), [config]);

	useEffect(() => {
		// 客户端渲染时立即检查当前状态
		const mediaQuery = window.matchMedia(mediaQueryString);

		// 监听变化
		const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handler);
		} else {
			// 兼容旧浏览器
			mediaQuery.addListener(handler);
		}

		// 清理函数
		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", handler);
			} else {
				// 兼容旧浏览器
				mediaQuery.removeListener(handler);
			}
		};
	}, [mediaQueryString]);

	return matches;
};

type Breakpoints = typeof breakpointsTokens;
type BreakpointsKeys = keyof Breakpoints;

export const down = (key: BreakpointsKeys) => ({
	maxWidth: removePx(breakpointsTokens[key]) - 0.05, // 减去0.05px避免断点重叠
});
