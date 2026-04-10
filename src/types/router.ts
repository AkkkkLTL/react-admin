/**
 * 路由元数据接口
 * 用于定义路由的元数据，如标题、图标等
 */
export interface RouteMeta {
	/** 唯一标识 */
	key: string;
	/** 路由标题 */
	title?: string;
	/** 路由图标 */
	icon?: string;
}
