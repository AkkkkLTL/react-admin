import { globalStyle, style } from "@vanilla-extract/css";

import { themeVars } from "@/theme/theme.css";

export const chartWrapper = style({}, "apexcharts-wrapper");

globalStyle(`${chartWrapper} .apexcharts-tooltip`, {
  color: themeVars.colors.text.primary,
  borderRadius: themeVars.borderRadius.lg,
  backdropFilter: "blur(6px)",
  boxShadow: themeVars.shadows.card,
});