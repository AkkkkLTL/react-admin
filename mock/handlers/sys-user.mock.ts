import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";
import type { RoleInfo, UserInfo } from "#/entity";
import type { Result } from "@/api/apiClient";
import { SysUserApi, type SysUserInfoRes, type SysUserListRes } from "@/api/services/sys-user.service";
import { BasicStatus, ResultEnum } from "@/types/enum";
import { apiPrefix } from "../type";

// ---------------- 数据区 ----------------
var dataSysUserList: (Omit<UserInfo, "roleIdList"> & { roleList: Pick<RoleInfo, "roleId" | "roleName">[] })[] = [];
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); ++i) {
	dataSysUserList.push({
		userId: faker.number.int({ min: 1, max: 100 }),
		username: faker.person.fullName(),
		email: faker.internet.email(),
		mobile: faker.phone.number(),
		roleList: [
			{
				roleId: 1,
				roleName: "admin",
			},
			{
				roleId: 2,
				roleName: "user",
			},
		],
		status: faker.helpers.arrayElement([BasicStatus.DISABLE, BasicStatus.ENABLE]),
		createUserId: 1,
		createTime: faker.date.past(),
	});
}

// ---------------- 模拟区 ----------------
/** 模拟用户列表 */
const mockSysUserList = http.get(`${apiPrefix}${SysUserApi.LIST}`, async () => {
	return HttpResponse.json<Result & SysUserListRes>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
			page: {
				totalCount: dataSysUserList.length,
				pageSize: 10,
				totalPage: 1,
				currPage: 1,
				list: dataSysUserList,
			},
		},
		{
			status: 200, // HTTP状态
		},
	);
});

/** 模拟用户详情 */
const mockSysUserInfo = http.get(`${apiPrefix}${SysUserApi.INFO}`, async () => {
	return HttpResponse.json<Result & SysUserInfoRes>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
			user: dataSysUserList[0],
		},
		{
			status: 200, // HTTP状态
		},
	);
});

/** 模拟用户修改密码 */
const mockSysUserUpdatePassword = http.post(`${apiPrefix}${SysUserApi.UPDATE_PASSWORD}`, async () => {
	return HttpResponse.json<Result>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
		},
		{
			status: 200, // HTTP状态
		},
	);
});

/** 模拟用户新增 */
const mockSysUserAdd = http.post(`${apiPrefix}${SysUserApi.ADD}`, async () => {
	return HttpResponse.json<Result>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
		},
		{
			status: 200, // HTTP状态
		},
	);
});

/** 模拟用户修改 */
const mockSysUserUpdate = http.post(`${apiPrefix}${SysUserApi.UPDATE}`, async () => {
	return HttpResponse.json<Result>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
		},
		{
			status: 200, // HTTP状态
		},
	);
});

/** 模拟用户删除 */
const mockSysUserDel = http.post(`${apiPrefix}${SysUserApi.DEL}`, async () => {
	return HttpResponse.json<Result>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
		},
		{
			status: 200, // HTTP状态
		},
	);
});

export {
	mockSysUserList,
	mockSysUserInfo,
	mockSysUserUpdatePassword,
	mockSysUserAdd,
	mockSysUserUpdate,
	mockSysUserDel,
};
