import { PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { ThemeColorPresets, ThemeLayout, ThemeMode } from "@/types/enum";

type SettingsState = {
  showSettings: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  accordion: boolean;
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
  themeColorPresets: ThemeColorPresets.DEFAULT,
  themeMode: ThemeMode.LIGHT,
  themeLayout: ThemeLayout.VERTICAL,
  themeStretch: false,
  breadCrumb: true,
  accordion: false,
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
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      state = {
        ...state,
        ...action.payload,
      }
    },
    clearSettings: (state) => {
      state = { ...initialState };
    },
  }
});

export const {
  setSettings,
  clearSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer as Reducer<SettingsState>;