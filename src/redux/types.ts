import type { PayloadAction, ThunkAction, Action as ReduxAction } from "@reduxjs/toolkit";
import store from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type Action<T> = PayloadAction<T>;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  ReduxAction
>;

export interface appState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: string;
}

export interface settingsState {
  showSettings?: boolean;
  fixedHeader?: boolean;
  sidebarLogo?: boolean;
}

export interface userState {
  token?: string;
  name: string;
  avatar: string;
}