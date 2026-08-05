import type { ReactNode } from "react";
import type { Params, RouteObject } from "react-router-dom";

/**
 * 路由结构
 */
export type AppRouteObject = Omit<RouteObject, "children"> & {
	/**
	 * 菜单排序
	 * @example 1
	 */
	order?: number;
	/**
	 * 菜单信息
	 */
	meta?: RouteMeta;
	/**
	 * 子路由
	 */
	children?: AppRouteObject[];
};

export interface RouteMeta {
	/**
	 * menu 的 selectedKeys，用路由的全路径
	 * @example "/dashboard/analysis"
	 */
	key: string;
	/**
	 * 当前路由对应国际化标签
	 * @example "sys.menu.analysis"
	 */
	label: string;
	/**
	 * menu 前置的图标
	 */
	icon?: string;
	/**
	 * 菜单后缀图标
	 */
	info?: ReactNode;
	/**
	 * 设置为 true 时，在 menu 中隐藏
	 */
	hideMenu?: boolean;
	/**
	 * 设置为 true 时，在 tab 中隐藏
	 */
	hideTab?: boolean;
	/**
	 * 设置为 true 时，在禁用该路由
	 */
	disabled?: boolean;
	/**
	 * 子路由
	 */
	outlet?: ReactNode;
	/**
	 * 时间戳, 用于刷新 tab
	 */
	timeStamp?: string;
	/**
	 * 外部链接 或 iframe 源地址
	 */
	frameSrc?: URL;
	/**
	 * 动态路由参数
	 * @example /user/:id
	 */
	params?: Params<string>;
	/**
	 *设置该路由设置的权限
	 */
	roles?: string[];
}
