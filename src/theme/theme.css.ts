import { assignVars, createGlobalTheme, createThemeContract, globalStyle } from "@vanilla-extract/css";
import { HtmlDataAttribute, ThemeColorPresets, ThemeMode } from "@/types/enum";
import { addColorChannels } from "@/utils/theme";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { type ThemeTokens, themeTokens } from "./type";

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
 * 主题变量
 */
export const themeVars = createThemeContract({
	...themeTokens,
	colors: addColorChannels(themeTokens.colors),
});

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
