const settings = {
  title: "React Admin Template",

  // description wheter fix the header
  fixedHeader: false,

  // description wheter show the logo in sidebar
  sidebarLogo: false,

  showSettings: true,
}

export enum STORAGEENUM {
  USERINFO = "userInfo",
  USERTOKEN = "userToken",
  SETTINGS = "settings",
  I18N = "i18nextlang",
}

export enum LOCALENUM {
  EN_US = "en_US",
  ZH_CN = "zh_CN",
}

export default settings;