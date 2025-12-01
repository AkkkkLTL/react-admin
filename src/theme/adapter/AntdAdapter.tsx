import { App, ConfigProvider, type ThemeConfig, theme } from "antd";
import { useSelector } from "react-redux";

import useLocale from "@/locales/useLocale";
import { RootState } from "@/store";
import { ThemeMode } from "@/types/enum";
import { UILibraryAdapter } from "../type";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import { darkShadowTokens, lightShadowTokens } from "../tokens/shadow";
import { removePx } from "@/utils/theme";
import { baseThemeTokens } from "../tokens/base";

const AntdAdapter:UILibraryAdapter = (props) => {
  const { mode, children } = props;
  const { language } = useLocale();
  const { themeColorPresets, fontFamily, fontSize } = useSelector((state:RootState) => state.settings);

  const algorithm = mode === ThemeMode.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const colorTokens = mode === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens;
  const shadowTokens = mode === ThemeMode.LIGHT ? lightShadowTokens : darkShadowTokens;

  const primaryColorToken = presetsColors[themeColorPresets];

  const token: ThemeConfig["token"] = {
    colorPrimary: primaryColorToken.default, // Primary color
    colorSuccess: colorTokens.palette.success.default,
    colorWarning: colorTokens.palette.warning.default,
    colorError: colorTokens.palette.error.default,
    colorInfo: colorTokens.palette.info.default,

    colorBgLayout: colorTokens.background.default,
    colorBgContainer: colorTokens.background.paper,
    colorBgElevated: colorTokens.background.default,

    wireframe: false,
    fontFamily: fontFamily,
    fontSize: fontSize,

    borderRadius: removePx(baseThemeTokens.borderRadius.default),
    borderRadiusSM: removePx(baseThemeTokens.borderRadius.sm),
    borderRadiusLG: removePx(baseThemeTokens.borderRadius.lg),
  }

  const components: ThemeConfig["components"] = {
    Breadcrumb: {
      separatorMargin: removePx(baseThemeTokens.spacing[1]),
    },
    Menu: {
      colorFillAlter: "transparent",
      itemColor: colorTokens.text.secondary,
      motionDurationMid: "0.125s",
      motionDurationSlow: "0.125s",
      darkItemBg: darkColorTokens.background.default,
    },
    Layout: {
      siderBg: darkColorTokens.background.default,
    },
    Card: {
      boxShadow: shadowTokens.card,
    }
  }

  return (
    <ConfigProvider
      locale={language.antdLocale}
      theme={{ algorithm, token, components }}
    >
      <App>{children}</App>
    </ConfigProvider>
  )
}
export default AntdAdapter;