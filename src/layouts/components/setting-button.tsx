import { type CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import screenfull from "screenfull";
import { Icon } from "@/components/icon";
import useLocale from "@/locales/useLocale";
import { type SettingsState, setSettings, useSettings } from "@/store/modules/settingsSlice";
import { themeVars } from "@/theme/theme.css";
import { ThemeColorPresets, ThemeLayout, ThemeMode } from "@/types/enum";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Text } from "@/ui/typography";

export default function SettingButton() {
	const { t } = useLocale();
	const settings = useSettings();
	const { themeMode, themeLayout, themeColorPresets, themeStretch, breadCrumb, fontSize, fontFamily } = settings;
	const dispatch = useDispatch();

	const updateSettings = (partialSettings: Partial<SettingsState>) => {
		dispatch(
			setSettings({
				...settings,
				...partialSettings,
			}),
		);
	};

	const sheetContentBgStyle: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50%, 50%",
	};

	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button variant={"ghost"} size={"icon"} className="rounded-full animate-slow-spin">
					<Icon icon="local:ic-setting" size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent style={sheetContentBgStyle} className="gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 shrink-0">
					<SheetTitle>{t("sys.settings.title")}</SheetTitle>
					<SheetDescription />
				</SheetHeader>
				<ScrollArea>
					<div className="flex flex-col gap-2">
						<Text variant={"subTitle1"}>{t("sys.settings.mode")}</Text>
						<div className="flex flex-row gap-4">
							<Card
								onClick={() => updateSettings({ themeMode: ThemeMode.LIGHT })}
								className="flex flex-1 h-20 cursor-pointer items-center justify-center"
							>
								<Icon
									icon="local:ic-settings-mode-sun"
									size={24}
									color={themeMode === ThemeMode.LIGHT ? themeVars.colors.palette.primary.default : ""}
								/>
							</Card>
							<Card
								onClick={() => updateSettings({ themeMode: ThemeMode.DARK })}
								className="flex flex-1 h-20 cursor-pointer items-center justify-center"
							>
								<Icon
									icon="local:ic-settings-mode-moon"
									size={24}
									color={themeMode === ThemeMode.DARK ? themeVars.colors.palette.primary.default : ""}
								/>
							</Card>
						</div>
					</div>

					{/* 主题布局 */}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
