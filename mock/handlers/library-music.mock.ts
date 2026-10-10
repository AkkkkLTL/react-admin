import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import type { LibraryCommonLanguageSaveReq } from "@/api/services/library-common.service";
import {
	type LibraryMusicAlbumListRes,
	type LibraryMusicAlbumSaveReq,
	LibraryMusicApi,
	type LibraryMusicEnumInfoRes,
	type LibraryMusicListRes,
	type LibraryMusicSaveReq,
	type LibraryMusicStyleListRes,
	type LibraryMusicStyleSaveReq,
} from "@/api/services/library-music.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

//#region 接口模拟
const mockLibraryMusicList = http.get(`${apiPrefix}${LibraryMusicApi.MusicList}`, async () => {
	const musics = (await libraryDatabase.getAll(libraryStore.Music)) as LibraryMusicSaveReq[];
	return HttpResponse.json<Result & LibraryMusicListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: musics || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMusicSave = http.post(`${apiPrefix}${LibraryMusicApi.MusicSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.Music, await request.json());

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

const mockLibraryMusicUpdate = http.put(`${apiPrefix}${LibraryMusicApi.MusicUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.Music, await request.json());

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

/** 模拟获取音乐枚举信息 */
const mockLibraryMusicEnumInfo = http.get(`${apiPrefix}${LibraryMusicApi.MusicEnumInfo}`, async () => {
	const styles = (await libraryDatabase.getAll(libraryStore.MusicStyle)) as LibraryMusicStyleSaveReq[];
	const albums = (await libraryDatabase.getAll(libraryStore.MusicAlbum)) as LibraryMusicAlbumSaveReq[];
	const languages = (await libraryDatabase.getAll(libraryStore.CommonLanguage)) as LibraryCommonLanguageSaveReq[];
	return HttpResponse.json<Result & LibraryMusicEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			styleList: styles || [],
			albumList: albums || [],
			languageList: languages || [],
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMusicStyleList = http.get(`${apiPrefix}${LibraryMusicApi.MusicStyleList}`, async () => {
	const musicStyles = (await libraryDatabase.getAll(libraryStore.MusicStyle)) as LibraryMusicStyleSaveReq[];
	return HttpResponse.json<Result & LibraryMusicStyleListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: musicStyles || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMusicStyleSave = http.post(`${apiPrefix}${LibraryMusicApi.MusicStyleSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.MusicStyle, await request.json());

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

const mockLibraryMusicStyleUpdate = http.put(`${apiPrefix}${LibraryMusicApi.MusicStyleUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.MusicStyle, await request.json());

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

const mockLibraryMusicAlbumList = http.get(`${apiPrefix}${LibraryMusicApi.MusicAlbumList}`, async () => {
	const musicAlbums = (await libraryDatabase.getAll(libraryStore.MusicAlbum)) as LibraryMusicAlbumSaveReq[];
	return HttpResponse.json<Result & LibraryMusicAlbumListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: musicAlbums || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryMusicAlbumSave = http.post(`${apiPrefix}${LibraryMusicApi.MusicAlbumSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.MusicAlbum, await request.json());

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

const mockLibraryMusicAlbumUpdate = http.put(`${apiPrefix}${LibraryMusicApi.MusicAlbumUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.MusicAlbum, await request.json());

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
//#endregion

export {
	mockLibraryMusicList,
	mockLibraryMusicSave,
	mockLibraryMusicUpdate,
	mockLibraryMusicEnumInfo,
	mockLibraryMusicStyleList,
	mockLibraryMusicStyleSave,
	mockLibraryMusicStyleUpdate,
	mockLibraryMusicAlbumList,
	mockLibraryMusicAlbumSave,
	mockLibraryMusicAlbumUpdate,
};
