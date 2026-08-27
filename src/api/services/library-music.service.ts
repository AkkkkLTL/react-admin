import type { Music, MusicAlbum, MusicStyle } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

//#region 请求类型
export type LibraryMusicSaveReq = Music & {
	performerId?: string;
	performerName?: string;
	lyricistId?: string;
	lyricistName?: string;
	composerId?: string;
	composerName?: string;
	arrangerId?: string;
	arrangerName?: string;
	language?: string;
	styleId?: string;
	albumId?: string;
};

export type LibraryMusicStyleSaveReq = MusicStyle;

export type LibraryMusicAlbumSaveReq = MusicAlbum;
//#endregion 请求类型

//#region 响应类型
export type LibraryMusicListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryMusicSaveReq[];
	};
};

export type LibraryMusicStyleListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryMusicStyleSaveReq[];
	};
};

export type LibraryMusicAlbumListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryMusicAlbumSaveReq[];
	};
};
//#endregion 响应类型

export enum LibraryMusicApi {
	// 获取音乐列表
	MusicList = "/library/music/list",
	// 创建音乐
	MusicSave = "/library/music/save",
	// 更新音乐
	MusicUpdate = "/library/music/update",
	// 获取音乐风格列表
	MusicStyleList = "/library/musicstyle/list",
	// 创建音乐风格
	MusicStyleSave = "/library/musicstyle/save",
	// 更新音乐风格
	MusicStyleUpdate = "/library/musicstyle/update",
	// 获取音乐专辑列表
	MusicAlbumList = "/library/musicalbum/list",
	// 创建音乐专辑
	MusicAlbumSave = "/library/musicalbum/save",
	// 更新音乐专辑
	MusicAlbumUpdate = "/library/musicalbum/update",
}

const apiLibraryMusicList = (params: URLSearchParams) =>
	apiClient.get<LibraryMusicListRes>({
		url: LibraryMusicApi.MusicList,
		params,
	});

const apiLibraryMusicSave = (data: LibraryMusicSaveReq) =>
	apiClient.post<void>({
		url: LibraryMusicApi.MusicSave,
		data,
	});

const apiLibraryMusicUpdate = (data: LibraryMusicSaveReq) =>
	apiClient.put<void>({
		url: LibraryMusicApi.MusicUpdate,
		data,
	});

const apiLibraryMusicStyleList = () =>
	apiClient.get<LibraryMusicStyleListRes>({
		url: LibraryMusicApi.MusicStyleList,
	});

const apiLibraryMusicStyleSave = (data: LibraryMusicStyleSaveReq) =>
	apiClient.post<void>({
		url: LibraryMusicApi.MusicStyleSave,
		data,
	});

const apiLibraryMusicStyleUpdate = (data: LibraryMusicStyleSaveReq) =>
	apiClient.put<void>({
		url: LibraryMusicApi.MusicStyleUpdate,
		data,
	});

const apiLibraryMusicAlbumList = () =>
	apiClient.get<LibraryMusicAlbumListRes>({
		url: LibraryMusicApi.MusicAlbumList,
	});

const apiLibraryMusicAlbumSave = (data: LibraryMusicAlbumSaveReq) =>
	apiClient.post<void>({
		url: LibraryMusicApi.MusicAlbumSave,
		data,
	});

const apiLibraryMusicAlbumUpdate = (data: LibraryMusicAlbumSaveReq) =>
	apiClient.put<void>({
		url: LibraryMusicApi.MusicAlbumUpdate,
		data,
	});

export {
	apiLibraryMusicList,
	apiLibraryMusicSave,
	apiLibraryMusicUpdate,
	apiLibraryMusicStyleList,
	apiLibraryMusicStyleSave,
	apiLibraryMusicStyleUpdate,
	apiLibraryMusicAlbumList,
	apiLibraryMusicAlbumSave,
	apiLibraryMusicAlbumUpdate,
};
