// quote from https://github.com/d3george/slash-admin/blob/main/src/api/services/userService.ts
import apiClient from "../apiClient";
import type { UserInfo, UserToken } from "@/types/entity";

/**
 * 登录请求参数
 * @interface SignInReq
 * @property {string} username - 用户名
 * @property {string} password - 密码
 */
export interface SignInReq {
  username: string;
  password: string;
}
/**
 * 注册请求参数
 * @interface SignUpReq
 * @property {string} email - 邮箱
 * @extends {SignInReq}
 */
export interface SignUpReq extends SignInReq {
  email: string;
}
/**
 * 登录响应数据
 * @interface SignInRes
 * @extends {UserToken} - 用户令牌
 * @property {UserInfo} user - 用户信息
 */
export type SignInRes = UserToken & { user:UserInfo };

/**
 * 用户相关 API 接口
 * @readonly
 * @enum {string}
 */
export enum UserApi {
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  Logout = "/auth/logout",
  Refresh = "/auth/refresh",
  User = "/user",
}

/**
 * 登录操作
 * @param {SignInReq} data - 登录请求参数
 * @returns 用户令牌和用户信息
 */
const signin = (data:SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
/**
 * 注册操作
 * @param {SignUpReq} data - 注册请求参数
 * @returns 用户令牌和用户信息
 */
const signup = (data:SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
/**
 * 登出操作
 * @returns
 */
const logout = () => apiClient.get({ url: UserApi.Logout });
/**
 * 获取指定用户信息
 * @param id 用户 ID
 * @returns 指定用户信息
 */
const findById = (id:string) => apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });

export default {
  signin,
  signup,
  logout,
  findById,
}