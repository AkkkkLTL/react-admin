import type { Game, GameCategory, GamePlatform, GameSeries } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

//#region 请求类型
export type LibraryGameSaveReq = Game & {
	developerId?: string;
	developerName?: string;
	publisherId?: string;
	publisherName?: string;
	platformId?: string;
	categoryId?: string;
	seriesId?: string;
};

export type LibraryGameCategorySaveReq = GameCategory;

export type LibraryGamePlatformSaveReq = GamePlatform;

export type LibraryGameSeriesSaveReq = GameSeries;
//#endregion 请求类型

//#region 响应类型
export interface LibraryGameListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryGameSaveReq[];
	};
}

export interface LibraryGameCategoryListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryGameCategorySaveReq[];
	};
}

export interface LibraryGamePlatformListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryGamePlatformSaveReq[];
	};
}

export interface LibraryGameSeriesListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryGameSeriesSaveReq[];
	};
}
//#endregion 响应类型

export enum LibraryGameApi {
	GameList = "/library/game/list",
	GameSave = "/library/game/save",
	GameUpdate = "/library/game/update",
	GameCategoryList = "/library/gamecategory/list",
	GameCategorySave = "/library/gamecategory/save",
	GameCategoryUpdate = "/library/gamecategory/update",
	GamePlatformList = "/library/gameplatform/list",
	GamePlatformSave = "/library/gameplatform/save",
	GamePlatformUpdate = "/library/gameplatform/update",
	GameSeriesList = "/library/gameseries/list",
	GameSeriesSave = "/library/gameseries/save",
	GameSeriesUpdate = "/library/gameseries/update",
}

const apiLibraryGameList = (params: URLSearchParams) =>
	apiClient.get<LibraryGameListRes>({
		url: LibraryGameApi.GameList,
		params,
	});

const apiLibraryGameSave = (data: LibraryGameSaveReq) =>
	apiClient.post<void>({
		url: LibraryGameApi.GameSave,
		data,
	});

const apiLibraryGameUpdate = (data: LibraryGameSaveReq) =>
	apiClient.put<void>({
		url: LibraryGameApi.GameUpdate,
		data,
	});

const apiLibraryGameCategoryList = () =>
	apiClient.get<LibraryGameCategoryListRes>({
		url: LibraryGameApi.GameCategoryList,
	});

const apiLibraryGameCategorySave = (data: LibraryGameCategorySaveReq) =>
	apiClient.post<void>({
		url: LibraryGameApi.GameCategorySave,
		data,
	});

const apiLibraryGameCategoryUpdate = (data: LibraryGameCategorySaveReq) =>
	apiClient.put<void>({
		url: LibraryGameApi.GameCategoryUpdate,
		data,
	});

const apiLibraryGamePlatformList = () =>
	apiClient.get<LibraryGamePlatformListRes>({
		url: LibraryGameApi.GamePlatformList,
	});

const apiLibraryGamePlatformSave = (data: LibraryGamePlatformSaveReq) =>
	apiClient.post<void>({
		url: LibraryGameApi.GamePlatformSave,
		data,
	});

const apiLibraryGamePlatformUpdate = (data: LibraryGamePlatformSaveReq) =>
	apiClient.put<void>({
		url: LibraryGameApi.GamePlatformUpdate,
		data,
	});

const apiLibraryGameSeriesList = () =>
	apiClient.get<LibraryGameSeriesListRes>({
		url: LibraryGameApi.GameSeriesList,
	});

const apiLibraryGameSeriesSave = (data: LibraryGameSeriesSaveReq) =>
	apiClient.post<void>({
		url: LibraryGameApi.GameSeriesSave,
		data,
	});

const apiLibraryGameSeriesUpdate = (data: LibraryGameSeriesSaveReq) =>
	apiClient.put<void>({
		url: LibraryGameApi.GameSeriesUpdate,
		data,
	});

export {
	apiLibraryGameList,
	apiLibraryGameSave,
	apiLibraryGameUpdate,
	apiLibraryGameCategoryList,
	apiLibraryGameCategorySave,
	apiLibraryGameCategoryUpdate,
	apiLibraryGamePlatformList,
	apiLibraryGamePlatformSave,
	apiLibraryGamePlatformUpdate,
	apiLibraryGameSeriesList,
	apiLibraryGameSeriesSave,
	apiLibraryGameSeriesUpdate,
};
