import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryGameApi,
	type LibraryGameCategoryListRes,
	type LibraryGameCategorySaveReq,
	type LibraryGameEnumInfoRes,
	type LibraryGameListRes,
	type LibraryGamePlatformListRes,
	type LibraryGamePlatformSaveReq,
	type LibraryGameSaveReq,
	type LibraryGameSeriesListRes,
	type LibraryGameSeriesSaveReq,
} from "@/api/services/library-game.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

//#region 接口模拟
const mockLibraryGameList = http.get(`${apiPrefix}${LibraryGameApi.GameList}`, async () => {
	const games = (await libraryDatabase.getAll(libraryStore.Game)) as LibraryGameSaveReq[];
	return HttpResponse.json<Result & LibraryGameListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: games || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryGameSave = http.post(`${apiPrefix}${LibraryGameApi.GameSave}`, async ({ request }) => {
	await libraryDatabase.add(libraryStore.Game, await request.json());
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

const mockLibraryGameUpdate = http.put(`${apiPrefix}${LibraryGameApi.GameUpdate}`, async ({ request }) => {
	await libraryDatabase.put(libraryStore.Game, await request.json());
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

/** 模拟获取游戏枚举信息 */
const mockLibraryGameEnumInfo = http.get(`${apiPrefix}${LibraryGameApi.GameEnumInfo}`, async () => {
	const platforms = (await libraryDatabase.getAll(libraryStore.GamePlatform)) as LibraryGamePlatformSaveReq[];
	const categories = (await libraryDatabase.getAll(libraryStore.GameCategory)) as LibraryGameCategorySaveReq[];
	const series = (await libraryDatabase.getAll(libraryStore.GameSeries)) as LibraryGameSeriesSaveReq[];
	return HttpResponse.json<Result & LibraryGameEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			platformList: platforms || [],
			categoryList: categories || [],
			seriesList: series || [],
		},
		{
			status: 200,
		},
	);
});

const mockLibraryGameCategoryList = http.get(`${apiPrefix}${LibraryGameApi.GameCategoryList}`, async () => {
	const categories = (await libraryDatabase.getAll(libraryStore.GameCategory)) as LibraryGameCategorySaveReq[];
	return HttpResponse.json<Result & LibraryGameCategoryListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: categories || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryGameCategorySave = http.post(`${apiPrefix}${LibraryGameApi.GameCategorySave}`, async ({ request }) => {
	await libraryDatabase.add(libraryStore.GameCategory, await request.json());
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

const mockLibraryGameCategoryUpdate = http.put(
	`${apiPrefix}${LibraryGameApi.GameCategoryUpdate}`,
	async ({ request }) => {
		await libraryDatabase.put(libraryStore.GameCategory, await request.json());
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

const mockLibraryGamePlatformList = http.get(`${apiPrefix}${LibraryGameApi.GamePlatformList}`, async () => {
	const platforms = (await libraryDatabase.getAll(libraryStore.GamePlatform)) as LibraryGamePlatformSaveReq[];
	return HttpResponse.json<Result & LibraryGamePlatformListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: platforms || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryGamePlatformSave = http.post(`${apiPrefix}${LibraryGameApi.GamePlatformSave}`, async ({ request }) => {
	await libraryDatabase.add(libraryStore.GamePlatform, await request.json());
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

const mockLibraryGamePlatformUpdate = http.put(
	`${apiPrefix}${LibraryGameApi.GamePlatformUpdate}`,
	async ({ request }) => {
		await libraryDatabase.put(libraryStore.GamePlatform, await request.json());
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

const mockLibraryGameSeriesList = http.get(`${apiPrefix}${LibraryGameApi.GameSeriesList}`, async () => {
	const seriesList = (await libraryDatabase.getAll(libraryStore.GameSeries)) as LibraryGameSeriesSaveReq[];
	return HttpResponse.json<Result & LibraryGameSeriesListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: seriesList || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryGameSeriesSave = http.post(`${apiPrefix}${LibraryGameApi.GameSeriesSave}`, async ({ request }) => {
	await libraryDatabase.add(libraryStore.GameSeries, await request.json());
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

const mockLibraryGameSeriesUpdate = http.put(`${apiPrefix}${LibraryGameApi.GameSeriesUpdate}`, async ({ request }) => {
	await libraryDatabase.put(libraryStore.GameSeries, await request.json());
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
//#endregion 接口模拟

export {
	mockLibraryGameList,
	mockLibraryGameSave,
	mockLibraryGameUpdate,
	mockLibraryGameEnumInfo,
	mockLibraryGameCategoryList,
	mockLibraryGameCategorySave,
	mockLibraryGameCategoryUpdate,
	mockLibraryGamePlatformList,
	mockLibraryGamePlatformSave,
	mockLibraryGamePlatformUpdate,
	mockLibraryGameSeriesList,
	mockLibraryGameSeriesSave,
	mockLibraryGameSeriesUpdate,
};
