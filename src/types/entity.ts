import { NavItemDataProps } from "@/components/nav/types";
import { BasicStatus, PermissionType } from "@/types/enum";

/**
 * 用户令牌
 * @interface UserToken
 */
export interface UserToken {
  /** 入口令牌 */
  accessToken?: string;
  /** 刷新令牌 */
  refreshToken?: string;
}

/**
 * 用户信息
 * @interface UserInfo
 */
export interface UserInfo {
  /** 用户信息 id */
  id: string;
  /** 用户邮箱 */
  email: string;
  /** 用户名称 */
  username: string;
  /** 用户密码 */
  password?: string;
  /** 用户头像 */
  avatar?: string;
  /** 用户角色 */
  roles: Role[];
  /** 用户状态 */
  status?: BasicStatus;
  /** 用户权限 */
  permissions?: Permission[];
  /** 用户菜单 */
  menu?: MenuTree[];
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
  id: string;  // uuid
  /** 用户名称 */
  username: string;
  /** 用户密码 */
  password:string;
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
  id: string;  // uuid
  /** 角色名称 */
  name: string;
  /** 角色权限 */
  code: string;
}

/**
 * 权限
 * @interface Permission
 */
export interface Permission extends CommonOption {
  /** 权限 id */
  id: string;  // uuid
  /** 权限名称 */
  name: string;
  /** 权限 */
  code: string;
}

/**
 * 菜单元信息
 * @interface MenuMetaInfo
 */
export type MenuMetaInfo = Partial<Pick<NavItemDataProps, "path" | "icon" | "caption" | "info" | "disabled" | "auth" | "hidden">> & {
  /** 外链 */
  externalLink?: URL;
  /** 组件 */
  component?: string;
}

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