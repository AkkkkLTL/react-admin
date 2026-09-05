import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import { SysLoginApi, type SysLoginReq, type SysLoginRes } from "@/api/services/sys-login.service";
import { ResultEnum } from "@/types/enum";
import { ACCESS_TOKEN, apiPrefix } from "../type";

const mockSysLoginCaptcha = http.get(`${apiPrefix}${SysLoginApi.Captcha}`, async ({ params: { uuid: string } }) => {
	return HttpResponse.json<Result & { data: string }>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
			data: faker.image.dataUri({ type: "svg-base64" }),
		},
		{
			status: 200,
		},
	);
});

const mockSysLogin = http.post<Result & SysLoginRes, SysLoginReq>(
	`${apiPrefix}${SysLoginApi.Login}`,
	async ({ request }) => {
		const { username } = await request.json();
		const token = ACCESS_TOKEN[username] || faker.string.fromCharacters("abcdefghijklmnopqrstuvwxyz0123456789", 32);

		return HttpResponse.json<Result & SysLoginRes>(
			{
				msg: "success",
				code: ResultEnum.SUCCESS,
				expire: faker.number.int({ min: 60 * 60 * 1, max: 60 * 60 * 12 }),
				token: token,
			},
			{
				status: 200,
			},
		);
	},
);

const mockSysLogout = http.post(`${apiPrefix}${SysLoginApi.Logout}`, async () => {
	return HttpResponse.json<Result>(
		{
			msg: "success",
			code: ResultEnum.SUCCESS,
		},
		{
			status: 200,
		},
	);
});

export { mockSysLoginCaptcha, mockSysLogin, mockSysLogout };
