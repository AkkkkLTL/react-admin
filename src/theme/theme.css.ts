import { HtmlDataAttribute, ThemeColorPresets, ThemeMode } from "@/types/enum";
import { darkColorTokens, lightColorTokens, presetsColors } from "./tokens/color";
import { typographyTokens } from "./tokens/typography";
import { baseThemeTokens } from "./tokens/base";
import { assignVars, createGlobalTheme, createThemeContract, globalStyle } from "@vanilla-extract/css";
import { AddChannelToLeaf, ThemeTokens, themeTokens } from "./type";
import { addColorChannels } from "@/utils/theme";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";

const getThemeTokens =(theme:ThemeMode):(ThemeTokens & { colors: ThemeTokens["colors"] & AddChannelToLeaf<ThemeTokens["colors"]> }) => {
  const themeTokens = theme === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens;
  return {
    colors: addColorChannels(themeTokens),
    typography: typographyTokens,
    shadows: theme === ThemeMode.LIGHT ? lightShadowTokens : darkShadowTokens,
    ...baseThemeTokens,
  }
};

export const themeVars = createThemeContract({
  ...themeTokens,
  colors: addColorChannels(themeTokens.colors),
})

for (const themeMode of Object.values(ThemeMode)) {
  createGlobalTheme(`:root[${HtmlDataAttribute.THEMEMODE}=${themeMode}]`, themeVars, getThemeTokens(themeMode));
}

for (const preset of Object.values(ThemeColorPresets)) {
  globalStyle(`:root[${HtmlDataAttribute.COLORPALETTE}=${preset}]`, {
    vars: assignVars(themeVars.colors.palette.primary, {
      ...addColorChannels(presetsColors[preset]),
    }),
  });
}