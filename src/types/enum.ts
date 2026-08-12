/**
 * 基础状态枚举
 */
export enum BasicStatus {
	/** 不可用 */
	DISABLE = 0,
	/** 可用 */
	ENABLE = 1,
}

/**
 * 结果枚举
 */
export enum ResultEnum {
	/** 成功 */
	SUCCESS = 200,
	/** 失败 */
	ERROR = -1,
	/** 超时 */
	TIMEOUT = 401,
}

/**
 * 存储枚举
 */
export enum StorageEnum {
	/** 用户信息字段 */
	USERINFO = "userInfo",
	/** 用户token字段 */
	USERTOKEN = "userToken",
	/** 用户权限字段 */
	PERMISSIONS = "permissions",
	/** 菜单列表字段 */
	MENU_LIST = "menuList",
	/** 主题设置字段 */
	SETTINGS = "settings",
	/** 国际化字段 */
	I18N = "i18nextLng",
}

/**
 * 主题模式枚举
 */
export enum ThemeMode {
	/** 明亮模式 */
	LIGHT = "light",
	/** 暗黑模式 */
	DARK = "dark",
	/** 跟随系统 */
	AUTO = "system",
}

/**
 * 主题布局枚举
 */
export enum ThemeLayout {
	/** 横向布局 */
	HORIZONTAL = "horizontal",
	/** 竖向布局 */
	VERTICAL = "vertical",
	/** 缩放布局 */
	MINI = "mini",
}

/**
 * 主题颜色预设枚举
 */
export enum ThemeColorPresets {
	/** 默认主题 */
	DEFAULT = "default",
	/** 酱紫 */
	CYAN = "cyan",
	/** 薰衣草 */
	PURPLE = "purple",
	/** 天空蓝 */
	BLUE = "blue",
	/** 金钱橘 */
	ORANGE = "orange",
	/** 夕阳红 */
	RED = "red",
}

/**
 * 多语言枚举
 */
export enum LocalEnum {
	/** 英文 */
	en_us = "en_us",
	/** 中文简体 */
	zh_cn = "zh_cn",
}

/**
 * 多标签页操作枚举
 */
export enum MultiTabOperation {
	/** 全屏 */
	FULLSCREEN = "fullscreen",
	/** 刷新 */
	REFRESH = "refresh",
	/** 关闭 */
	CLOSE = "close",
	/** 关闭其他 */
	CLOSE_OTHERS = "closeOthers",
	/** 关闭全部 */
	CLOSE_ALL = "closeAll",
	/** 关闭左侧标签 */
	CLOSE_LEFT = "closeLeft",
	/** 关闭右侧标签 */
	CLOSE_RIGHT = "closeRight",
}

/**
 * 权限类型枚举
 */
export enum PermissionType {
	/** 分组 */
	GROUP = 0,
	/** 目录 */
	CATALOGUE = 1,
	/** 菜单 */
	MENU = 2,
	/** 按钮/功能 */
	COMPONENT = 3,
}

/**
 * HTML 数据属性枚举
 */
export enum HtmlDataAttribute {
	/** 颜色预设 */
	COLORPALETTE = "data-color-palette",
	/** 主题布局 */
	THEMEMODE = "data-theme-mode",
}

/**
 * 图书状态枚举
 */
export enum ReadStatus {
	WANTTOREAD = 0,
	UNREAD = 1,
	STOPREAD = 2,
	READING = 3,
	GIVEUPREAD = 4,
	READED = 5,
}
