import type { NavItemDataProps } from "@/components/nav/types";
import type { BasicStatus, PermissionType } from "@/types/enum";

export interface UserToken {
	/** 过期时间 */
	expire?: number;
	/** 访问令牌 */
	token?: string;
	/** 刷新令牌 */
	refreshToken?: string;
}

/**
 * 通用选项
 * @interface CommonOption
 */
export interface CommonOption {
	/** 状态 */
	status?: BasicStatus;
	/** 描述 */
	desc?: string;
	/** 创建时间 */
	createdAt?: string;
	/** 更新时间 */
	updatedAt?: string;
}

/**
 * 用户
 * @interface User
 */
export interface User extends CommonOption {
	/** 用户id */
	id: string; // uuid
	/** 用户名称 */
	username: string;
	/** 用户密码 */
	password: string;
	/** 用户邮箱 */
	email: string;
	/** 用户头像 */
	avatar?: string;
	/** 用户电话 */
	phone?: string;
}

/**
 * 角色
 * @interface Role
 */
export interface Role extends CommonOption {
	/** 角色id */
	id: string; // uuid
	/** 角色名称 */
	name: string;
	/** 角色权限 */
	code: string;
	/** 角色权限 */
	permissions?: Permission[];
}

/**
 * 权限
 * @interface Permission
 */
export interface Permission extends CommonOption {
	/** 权限 id */
	id: string; // uuid
	/** 权限名称 */
	name: string;
	/** 权限 */
	code: string;
}

/**
 * 菜单元信息
 * @interface MenuMetaInfo
 */
export type MenuMetaInfo = Partial<
	Pick<NavItemDataProps, "path" | "icon" | "caption" | "info" | "disabled" | "auth" | "hidden">
> & {
	/** 外链 */
	externalLink?: URL;
	/** 组件 */
	component?: string;
};

/**
 * 菜单
 * @interface Menu
 */
export interface Menu extends CommonOption, MenuMetaInfo {
	/** 菜单 id */
	id: string; // uuid
	/** 父级菜单 id */
	parentId: string | null;
	/** 菜单名称 */
	name: string;
	code: string;
	/** 菜单排序 */
	order?: number;
	/** 菜单类型 */
	type: PermissionType;
}

/**
 * 菜单树
 * @interface MenuTree
 */
export interface MenuTree extends Menu {
	/** 子菜单 */
	children?: MenuTree[];
}

/**
 * 用户信息
 */
export interface UserInfo {
	/** 用户ID */
	userId: number;
	/** 用户名 */
	username: string;
	/** 邮箱 */
	email: string;
	/** 手机号 */
	mobile: string;
	/** 头像 */
	avatar?: string;
	/** 状态 */
	status?: BasicStatus;
	/** 角色 ID 列表 */
	roleIdList?: RoleInfo["roleId"][];
	/** 创建用户 ID */
	createUserId: number;
	/** 创建时间 */
	createTime: Date;
}

/**
 * 角色信息
 */
export interface RoleInfo {
	roleId: number | string;
	roleName: string;
	remark: string;
	createUserId: number;
	menuIdList: number[];
	createTime: Date;
}

/**
 * 菜单信息
 */
export interface MenuInfo {
	/** 菜单 ID */
	id: number | string;
	/** 父菜单 ID */
	parentId: number | string | null;
	/** 父菜单名称 */
	parentName?: string;
	/** 菜单名称 */
	name: string;
	/** 菜单 URL */
	path?: string;
	/** 菜单权限 */
	perms?: string;
	/** 菜单类型 */
	type: PermissionType;
	/** 菜单图标 */
	icon?: string;
	/** 菜单排序 */
	orderNum?: number;
	/** 菜单说明 */
	caption?: string;
	/** 菜单是否打开 */
	open?: number;
	/** 子菜单列表 */
	children?: MenuInfo[];
	/** 组件路径 */
	component?: string;
	/** 外部链接 */
	externalLink?: string;
}
