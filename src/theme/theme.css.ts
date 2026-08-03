import { assignVars, createGlobalTheme, createThemeContract, globalStyle } from "@vanilla-extract/css";
import { HtmlDataAttribute, ThemeColorPresets, ThemeMode } from "@/types/enum";
import { addColorChannels } from "@/utils/theme";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { type ThemeTokens, themeTokens } from "./type";

/**
 * 获取主题令牌
 * @param theme 主题模式
 * @returns 主题令牌
 */
function getThemeTokens(theme: ThemeMode) {
	const themeTokens: Exclude<ThemeTokens["colors"], undefined> =
		theme === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens;
	return {
		colors: addColorChannels<Exclude<ThemeTokens["colors"], undefined>>(themeTokens),
		typography: typographyTokens,
		shadows: theme === ThemeMode.LIGHT ? lightShadowTokens : darkShadowTokens,
		...baseThemeTokens,
	};
}

/**
 * 定义主题变量结构，生成类型安全的 CSS 变量集合，不产生实际 CSS 代码
 */
export const themeVars = createThemeContract({
	...themeTokens,
	colors: addColorChannels(themeTokens.colors),
});

/**
 * 创建全局主题，为每个主题模式创建一个全局主题
 */
for (const themeMode of Object.values(ThemeMode)) {
	createGlobalTheme(`:root[${HtmlDataAttribute.THEMEMODE}=${themeMode}]`, themeVars, getThemeTokens(themeMode) as any);
}

for (const preset of Object.values(ThemeColorPresets)) {
	globalStyle(`:root[${HtmlDataAttribute.COLORPALETTE}=${preset}]`, {
		vars: assignVars(themeVars.colors.palette.primary, {
			...addColorChannels(presetsColors[preset]),
		}),
	});
}
