import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryCharacterApi,
	type LibraryCharacterListRes,
	type LibraryCharacterSaveReq,
} from "@/api/services/library-character.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

//#region 人物数据库
const store = {
	Character: "character-test",
};
const db = await openDatabase("library-character-test", store, 1);
//#endregion 人物数据库

//#region 接口模拟
const mokeLibraryCharacterList = http.get(`${apiPrefix}${LibraryCharacterApi.CharacterList}`, async () => {
	const characters = (await db.getAll(store.Character)) as LibraryCharacterSaveReq[];
	return HttpResponse.json<Result & LibraryCharacterListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: characters || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryCharacterSave = http.post(`${apiPrefix}${LibraryCharacterApi.CharacterSave}`, async ({ request }) => {
	// 添加数据
	await db.add(store.Character, await request.json());

	return HttpResponse.json<Result>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
		},
		{
			status: 200,
		},
	);
});

const mockLibraryCharacterUpdate = http.put(
	`${apiPrefix}${LibraryCharacterApi.CharacterUpdate}`,
	async ({ request }) => {
		// 更新数据
		await db.put(store.Character, await request.json());

		return HttpResponse.json<Result>(
			{
				code: ResultEnum.SUCCESS,
				msg: "success",
			},
			{
				status: 200,
			},
		);
	},
);
//#endregion 接口模拟

export { mokeLibraryCharacterList, mockLibraryCharacterSave, mockLibraryCharacterUpdate };
