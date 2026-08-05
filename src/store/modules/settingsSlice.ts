import { createSlice, type PayloadAction, type Reducer } from "@reduxjs/toolkit";
import { produce } from "immer";
import { useSelector } from "react-redux";
import { FontFamilyPreset, typographyTokens } from "@/theme/tokens/typography";
import { ThemeColorPresets, ThemeLayout, ThemeMode } from "@/types/enum";
import type { RootState } from "..";

// 定义设置状态类型
export type SettingsState = {
	// 主题颜色预设
	themeColorPresets: ThemeColorPresets;
	// 主题模式
	themeMode: ThemeMode;
	// 主题布局
	themeLayout: ThemeLayout;
	// 主题拉伸
	themeStretch: boolean;
	// 面包屑
	breadCrumb: boolean;
	// 手风琴
	accordion: boolean;
	// 多标签
	multiTab: boolean;
	// 侧边栏
	darkSidebar: boolean;
	// 字体
	fontFamily: string;
	// 字体大小
	fontSize: number;
	// 方向
	direction: "ltr" | "rtl";
};

// 定义初始状态
const initialState: SettingsState = {
	themeColorPresets: ThemeColorPresets.DEFAULT,
	themeMode: ThemeMode.LIGHT,
	themeLayout: ThemeLayout.VERTICAL,
	themeStretch: false,
	breadCrumb: true,
	accordion: false,
	multiTab: true,
	darkSidebar: false,
	fontFamily: FontFamilyPreset.openSans,
	fontSize: Number(typographyTokens.fontSize.sm),
	direction: "ltr",
};

// 定义设置状态切片
const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<SettingsState>) => {
			return produce(state, (draft) => {
				Object.assign(draft, action.payload);
			});
		},
		clearSettings: (state) => {
			return produce(state, (draft) => {
				Object.assign(draft, initialState);
			});
		},
	},
});

export const { setSettings, clearSettings } = settingsSlice.actions;

export const useSettings = () => useSelector((state: RootState) => state.settings);

export default settingsSlice.reducer as Reducer<SettingsState>;
