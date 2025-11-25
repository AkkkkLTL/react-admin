
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setSettings } from "@/store/modules/settingsSlice";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import { typographyTokens } from "../tokens/typography";
import { ThemeMode } from "@/types/enum";
import { themeVars } from "../theme.css";

export function useTheme() {
  const settings = useSelector((state:RootState) => state.settings);
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
      dispatch(setSettings({
        ...settings,
        themeMode: mode,
      }));
    },
    themeVars,
    themeTokens: {
      base: baseThemeTokens,
      color: colorTokens,
      shadow: settings.themeMode === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens,
      typography: typographyTokens,
    }
  }
}