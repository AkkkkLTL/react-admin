const settings = {
  title: "React Admin Template",

  // description wheter fix the header
  fixedHeader: false,

  // description wheter show the logo in sidebar
  sidebarLogo: false,

  showSettings: true,
}

export enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1,
}

export enum StorageEnum {
  USERINFO = "userInfo",
  USERTOKEN = "userToken",
  SETTINGS = "settings",
  I18N = "i18nextlang",
}

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

export enum ThemeLayout {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export enum ThemeColorPresets {
  Default = "default",
  Cyan = "cyan",
  Purple = "purple",
  Blue = "blue",
  Orange = "orange",
  Red = "red",
}

export enum localEnum {
  EN_US = "en_US",
  ZH_CN = "zh_CN",
}

export enum PermissionType {
  CATALOGUE = 0,
  MENU = 1,
  BUTTON = 2,
}