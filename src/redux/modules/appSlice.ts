import { createSlice } from "@reduxjs/toolkit";
import { Action, appState } from "../types";
import Cookies from "js-cookie";

const appSlice = createSlice({
  name: "app",
  initialState: <appState>{
    sidebar: {
      opened: Cookies.get("sidebarStatus") ? Boolean(Cookies.get("sidebarStatus")) : true,
      withoutAnimation: false
    },
    device: "desktop"
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", '1');
      } else {
        Cookies.set("sidebarStatus", '0');
      }
    },
    closeSidebar: (state, action:Action<boolean>) => {
      Cookies.set("sidebarStatus", '0');
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = action.payload;
    },
    toggleDevice: (state, action:Action<string>) => {
      state.device = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  closeSidebar,
  toggleDevice,
} = appSlice.actions;

export default appSlice.reducer;