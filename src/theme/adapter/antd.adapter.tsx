import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider, type ThemeConfig, theme } from "antd";
import useLocale from "@/locales/useLocale";
import { useSettings } from "@/store/modules/settingsSlice";
import { ThemeMode } from "@/types/enum";
import { removePx } from "@/utils/theme";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import type { UILibraryAdapter } from "../type";

/**
 * Antd适配器
 * @param props
 * @returns
 */
export const AntdAdapter: UILibraryAdapter = ({ mode, children }) => {
	const { language } = useLocale();
	const { themeColorPresets, fontFamily, fontSize } = useSettings();

	const algorithm = mode === ThemeMode.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm;
	const colorTokens = mode === ThemeMode.LIGHT ? lightColorTokens : darkColorTokens;
	const primaryColorToken = presetsColors[themeColorPresets];

	/** 主题 token 配置项 */
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
	};

	/** 组件组件配置项 */
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
	};

	return (
		<ConfigProvider
			locale={language.antdLocal}
			theme={{ algorithm, token, components }}
			tag={{
				style: {
					borderRadius: removePx(baseThemeTokens.borderRadius.md),
					fontWeight: 700,
					padding: `0 ${baseThemeTokens.spacing[1]}`,
					margin: `0 ${baseThemeTokens.spacing[1]}`,
					borderWidth: 0,
				},
			}}
		>
			<StyleProvider hashPriority="high">
				<App>{children}</App>
			</StyleProvider>
		</ConfigProvider>
	);
};
