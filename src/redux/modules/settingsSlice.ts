import { createSlice } from "@reduxjs/toolkit";
import { Action, settingsState } from "../types";
import settings from "@/settings";

const { showSettings, fixedHeader, sidebarLogo } = settings;

const settingsSlice = createSlice({
  name:"settings",
  initialState: <settingsState>{
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  },
  reducers: {
    changeSetting: (state, action: Action<settingsState>) => {
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

export default settingsSlice.reducer;