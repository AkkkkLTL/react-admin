import apiClient from "../apiClient";

export interface SysLoginCaptchaRes {
	data: string;
}
export interface SysLoginReq {
	username: string;
	password: string;
	uuid: string;
	captcha: string;
}
export interface SysLoginRes {
	expire: number;
	token: string;
}

export enum SysLoginApi {
	Captcha = "/captcha.jpg",
	Login = "/sys/login",
	Logout = "/sys/logout",
}

const apiSysLoginCaptcha = async (uuid: string) =>
	apiClient.get<SysLoginCaptchaRes>({
		url: SysLoginApi.Captcha,
		params: {
			uuid,
		},
	});

const apiSysLogin = async (data: SysLoginReq) =>
	apiClient.post<SysLoginRes>({
		url: SysLoginApi.Login,
		data,
	});

const apiSysLogout = async () => {
	apiClient.post({
		url: SysLoginApi.Logout,
	});
};

export { apiSysLoginCaptcha, apiSysLogin, apiSysLogout };
