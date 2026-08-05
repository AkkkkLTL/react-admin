import { useDispatch } from "react-redux";

import { setSettings, useSettings } from "@/store/modules/settingsSlice";
import { ThemeMode } from "@/types/enum";
import { themeVars } from "../theme.css";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import { typographyTokens } from "../tokens/typography";

export function useTheme() {
	const settings = useSettings();
	const dispatch = useDispatch();

	let colorTokens = settings.themeMode === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens;

	colorTokens = {
		...colorTokens,
		palette: {
			...colorTokens.palette,
			primary: presetsColors[settings.themeColorPresets],
		},
	};

	return {
		mode: settings.themeMode,
		setMode: (mode: ThemeMode) => {
			dispatch(
				setSettings({
					...settings,
					themeMode: mode,
				}),
			);
		},
		themeVars,
		themeTokens: {
			base: baseThemeTokens,
			color: colorTokens,
			shadow: settings.themeMode === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens,
			typography: typographyTokens,
		},
	};
}
