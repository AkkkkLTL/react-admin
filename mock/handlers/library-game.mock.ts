import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryGameApi,
	type LibraryGameCategoryListRes,
	type LibraryGameCategorySaveReq,
	type LibraryGameListRes,
	type LibraryGamePlatformListRes,
	type LibraryGamePlatformSaveReq,
	type LibraryGameSaveReq,
	type LibraryGameSeriesListRes,
	type LibraryGameSeriesSaveReq,
} from "@/api/services/library-game.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

//#region 游戏数据库
const store = {
	Game: "game-test",
	Category: "game-category-test",
	Platform: "game-platform-test",
	Series: "game-series-test",
};
const db = await openDatabase("library-game-test", store, 1);
//#endregion 游戏数据库

//#region 接口模拟
const mockLibraryGameList = http.get(`${apiPrefix}${LibraryGameApi.GameList}`, async () => {
	const games = (await db.getAll(store.Game)) as LibraryGameSaveReq[];
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
	await db.add(store.Game, await request.json());
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
	await db.put(store.Game, await request.json());
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

const mockLibraryGameCategoryList = http.get(`${apiPrefix}${LibraryGameApi.GameCategoryList}`, async () => {
	const categories = (await db.getAll(store.Category)) as LibraryGameCategorySaveReq[];
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
	await db.add(store.Category, await request.json());
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
		await db.put(store.Category, await request.json());
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
	const platforms = (await db.getAll(store.Platform)) as LibraryGamePlatformSaveReq[];
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
	await db.add(store.Platform, await request.json());
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
		await db.put(store.Platform, await request.json());
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
	const seriesList = (await db.getAll(store.Series)) as LibraryGameSeriesSaveReq[];
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
	await db.add(store.Series, await request.json());
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
	await db.put(store.Series, await request.json());
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
