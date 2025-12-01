import { AppRouteObject } from "@/router/types";

export interface appState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: string;
  size: string;
}

export interface errorLogState {
  logs: string[]
}

export interface permissionState {
  routes: AppRouteObject[],
  addRoutes: AppRouteObject[]
}