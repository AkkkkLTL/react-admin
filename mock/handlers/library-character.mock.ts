import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryCharacterApi,
	type LibraryCharacterListRes,
	type LibraryCharacterSaveReq,
} from "@/api/services/library-character.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

//#region 接口模拟
const mokeLibraryCharacterList = http.get(`${apiPrefix}${LibraryCharacterApi.CharacterList}`, async () => {
	const characters = (await libraryDatabase.getAll(libraryStore.Character)) as LibraryCharacterSaveReq[];
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
	await libraryDatabase.add(libraryStore.Character, await request.json());

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
		await libraryDatabase.put(libraryStore.Character, await request.json());

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
