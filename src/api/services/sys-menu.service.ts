import type { MenuInfo } from "@/types/entity";
import apiClient from "../apiClient";

export interface SysMenuNavRes {
	menuList: MenuInfo[];
	permissions: string[];
}

export interface SysMenuListRes {
	menuList: MenuInfo[];
}

export interface SysMenuSelectRes {
	menuList: MenuInfo[];
}

export interface SysMenuInfoRes {
	menu: MenuInfo;
}
/**
 * * @description 菜单服务
 */
export enum MenuApi {
	Menu = "/menu",
}

export enum SysMenuApi {
	/** 获取导航菜单列表 / 权限 */
	Nav = "/sys/menu/nav",
	/** 获取菜单列表 */
	List = "/sys/menu/list",
	/** 获取上级菜单 */
	Select = "/sys/menu/select",
	/** 获取菜单信息 */
	Info = "/sys/menu/info",
	/** 新增菜单 */
	ADD = "/sys/menu/save",
	/** 修改菜单 */
	Update = "/sys/menu/update",
	/** 删除菜单 */
	Del = "/sys/menu/delete",
}

/** 获取导航菜单列表 / 权限 */
const apiSysMenuNav = () =>
	apiClient.get<SysMenuNavRes>({
		url: SysMenuApi.Nav,
	});

/** 获取菜单列表 */
const apiSysMenuList = () =>
	apiClient.get<SysMenuListRes>({
		url: SysMenuApi.List,
	});

const apiSysMenuSelect = () =>
	apiClient.get<SysMenuNavRes>({
		url: SysMenuApi.Select,
	});

const apiSysMenu = () =>
	apiClient.get<SysMenuInfoRes>({
		url: SysMenuApi.Info,
	});

const apiSysMenuAdd = () =>
	apiClient.post({
		url: SysMenuApi.ADD,
	});

const apiSysMenuUpdate = () =>
	apiClient.post({
		url: SysMenuApi.Update,
	});

const apiSysMenuDel = () =>
	apiClient.post({
		url: SysMenuApi.Del,
	});

export { apiSysMenuNav, apiSysMenuList, apiSysMenuSelect, apiSysMenu, apiSysMenuAdd, apiSysMenuUpdate, apiSysMenuDel };
