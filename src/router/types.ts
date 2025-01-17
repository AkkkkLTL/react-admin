import { RouteObject } from "react-router-dom";

/**
 * order:1    --模块的顺序
 * meta
 */
export type AppRouteObject = Omit<RouteObject, 'children'> & {
	order?:number,
  meta?: RouteMeta,
  children?: AppRouteObject[]
};

interface RouteMeta {
  /**
	* menu 的 selectedKeys，用路由的全路径
	* 
	* @example "/dashboard/analysis"
	*/
	key: string;
	/**
	* 当前路由对应国际化标签
	* 
	* @example "sys.menu.analysis"
	*/
	label: string;
	/**
	* menu 前置的图标
	*/
	icon?: string;
	/**
	* 设置为 true 时，在 menu 中隐藏
	*/
	hideMenu?: boolean;
	/**
	*设置该路由设置的权限
	*/
	roles?: string[];
}