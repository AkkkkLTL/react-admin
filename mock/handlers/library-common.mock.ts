import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryCommonApi,
	type LibraryCommonLanguageListRes,
	type LibraryCommonLanguageSaveReq,
} from "@/api/services/library-common.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

const mockLibraryCommonLanguageList = http.get(`${apiPrefix}${LibraryCommonApi.LanguageList}`, async () => {
	const languages = (await libraryDatabase.getAll(libraryStore.CommonLanguage)) as LibraryCommonLanguageSaveReq[];
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
	await libraryDatabase.add(libraryStore.CommonLanguage, await request.json());
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
		await libraryDatabase.put(libraryStore.CommonLanguage, await request.json());

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
	const regions = (await libraryDatabase.getAll(libraryStore.CommonRegion)) as LibraryCommonLanguageSaveReq[];
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
	await libraryDatabase.add(libraryStore.CommonRegion, await request.json());
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
	await libraryDatabase.put(libraryStore.CommonRegion, await request.json());

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
