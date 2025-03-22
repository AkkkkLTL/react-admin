const settings = {
  title: "React Admin Template",

  // description wheter fix the header
  fixedHeader: false,

  // description wheter show the logo in sidebar
  sidebarLogo: false,

  showSettings: true,
}

declare enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1,
}

declare enum StorageEnum {
  USERINFO = "userInfo",
  USERTOKEN = "userToken",
  SETTINGS = "settings",
  I18N = "i18nextlang",
}

declare enum ThemeMode {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

declare enum ThemeLayout {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

declare enum ThemeColorPresets {
  Default = "default",
  Cyan = "cyan",
  Purple = "purple",
  Blue = "blue",
  Orange = "orange",
  Red = "red",
}

declare enum localEnum {
  EN_US = "en_US",
  ZH_CN = "zh_CN",
}

declare enum PermissionType {
  CATALOGUE = 0,
  MENU = 1,
  BUTTON = 2,
}