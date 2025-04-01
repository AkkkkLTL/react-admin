import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { ThemeColorPresets, ThemeLayout, ThemeMode } from "@/utils/setting-enum";

type SettingsState = {
  showSettings: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  multiTab: boolean;
  darkSidebar: boolean;
  fontFamily: string;
  fontSize: number;
  direction: "ltr" | "rtl";
}

const initialState:SettingsState = {
  showSettings: false,
  fixedHeader: false,
  sidebarLogo: true,
  themeColorPresets: ThemeColorPresets.Default,
  themeMode: ThemeMode.Light,
  themeLayout: ThemeLayout.Vertical,
  themeStretch: false,
  breadCrumb: true,
  multiTab: true,
  darkSidebar: false,
  fontFamily: "Inter",
  fontSize: 14,
  direction: "ltr",
}

const settingsSlice = createSlice({
  name:"settings",
  initialState,
  reducers: {
    changeSetting: (state, action: PayloadAction<SettingsState>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
});

export const {
  changeSetting,
} = settingsSlice.actions;

export default settingsSlice.reducer as Reducer<SettingsState>;