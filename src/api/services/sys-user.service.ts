import type { RoleInfo, UserInfo } from "@/types/entity";
import apiClient from "../apiClient";

/**
 * 响应:用户列表
 */
export interface SysUserListRes {
	page: {
		/** 总记录数 */
		totalCount: number;
		/** 页面数量 */
		pageSize: number;
		/** 总页数 */
		totalPage: number;
		/** 当前页码 */
		currPage: number;
		/** 用户列表 */
		list: (Omit<UserInfo, "roleIdList"> & { roleList: Pick<RoleInfo, "roleId" | "roleName">[] })[];
	};
}

/**
 * 响应:用户信息
 */
export interface SysUserInfoRes {
	/** 用户信息 */
	user: UserInfo;
}

export enum SysUserApi {
	/** 获取用户列表 */
	LIST = "/sys/user/list",
	/** 获取用户信息 */
	INFO = "/sys/user/info",
	/** 修改密码 */
	UPDATE_PASSWORD = "/sys/user/password",
	/** 新增用户 */
	ADD = "/sys/user/save",
	/** 修改用户 */
	UPDATE = "/sys/user/update",
	/** 删除用户 */
	DEL = "/sys/user/delete",
}

const apiSysUserList = () =>
	apiClient.get<SysUserListRes>({
		url: SysUserApi.LIST,
	});

const apiSysUserInfo = () =>
	apiClient.get<SysUserInfoRes>({
		url: SysUserApi.INFO,
	});

const apiSysUserUpdatePassword = () =>
	apiClient.post({
		url: SysUserApi.UPDATE_PASSWORD,
	});

const apiSysUserAdd = () =>
	apiClient.post({
		url: SysUserApi.ADD,
	});

const apiSysUserUpdate = () =>
	apiClient.post({
		url: SysUserApi.UPDATE,
	});

const apiSysUserDel = () =>
	apiClient.post({
		url: SysUserApi.DEL,
	});

export { apiSysUserList, apiSysUserInfo, apiSysUserUpdatePassword, apiSysUserAdd, apiSysUserUpdate, apiSysUserDel };
