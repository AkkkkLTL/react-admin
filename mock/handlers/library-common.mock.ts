import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryCommonApi,
	type LibraryCommonLanguageListRes,
	type LibraryCommonLanguageSaveReq,
} from "@/api/services/library-common.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

const store = {
	Language: "common-language-test",
	Region: "common-region-test",
};
const db = await openDatabase("library-common-test", store, 1);

const mockLibraryCommonLanguageList = http.get(`${apiPrefix}${LibraryCommonApi.LanguageList}`, async () => {
	const languages = (await db.getAll(store.Language)) as LibraryCommonLanguageSaveReq[];
	return HttpResponse.json<Result & LibraryCommonLanguageListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: languages || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryCommonLanguageSave = http.post(`${apiPrefix}${LibraryCommonApi.LanguageSave}`, async ({ request }) => {
	await db.add(store.Language, await request.json());
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

const mockLibraryCommonLanguageUpdate = http.put(
	`${apiPrefix}${LibraryCommonApi.LanguageUpdate}`,
	async ({ request }) => {
		await db.put(store.Language, await request.json());

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

const mockLibraryCommonRegionList = http.get(`${apiPrefix}${LibraryCommonApi.RegionList}`, async () => {
	const regions = (await db.getAll(store.Region)) as LibraryCommonLanguageSaveReq[];
	return HttpResponse.json<Result & LibraryCommonLanguageListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: regions || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryCommonRegionSave = http.post(`${apiPrefix}${LibraryCommonApi.RegionSave}`, async ({ request }) => {
	await db.add(store.Region, await request.json());
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

const mockLibraryCommonRegionUpdate = http.put(`${apiPrefix}${LibraryCommonApi.RegionUpdate}`, async ({ request }) => {
	await db.put(store.Region, await request.json());

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

export {
	mockLibraryCommonLanguageList,
	mockLibraryCommonLanguageSave,
	mockLibraryCommonLanguageUpdate,
	mockLibraryCommonRegionList,
	mockLibraryCommonRegionSave,
	mockLibraryCommonRegionUpdate,
};
