import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	type LibraryMusicAlbumListRes,
	type LibraryMusicAlbumSaveReq,
	LibraryMusicApi,
	type LibraryMusicListRes,
	type LibraryMusicSaveReq,
	type LibraryMusicStyleListRes,
	type LibraryMusicStyleSaveReq,
} from "@/api/services/library-music.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

//#region 数据模拟
const store = {
	Music: "music-test",
	MusicStyle: "music-style-test",
	MusicAlbum: "music-album-test",
};
const db = await openDatabase("library-music-test", store, 1);
//#endregion 数据模拟

//#region 接口模拟
const mockLibraryMusicList = http.get(`${apiPrefix}${LibraryMusicApi.MusicList}`, async () => {
	const musics = (await db.getAll(store.Music)) as LibraryMusicSaveReq[];
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
	await db.add(store.Music, await request.json());

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
	await db.put(store.Music, await request.json());

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

const mockLibraryMusicStyleList = http.get(`${apiPrefix}${LibraryMusicApi.MusicStyleList}`, async () => {
	const musicStyles = (await db.getAll(store.MusicStyle)) as LibraryMusicStyleSaveReq[];
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
	await db.add(store.MusicStyle, await request.json());

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
	await db.put(store.MusicStyle, await request.json());

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
	const musicAlbums = (await db.getAll(store.MusicAlbum)) as LibraryMusicAlbumSaveReq[];
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
	await db.add(store.MusicAlbum, await request.json());

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
	await db.put(store.MusicAlbum, await request.json());

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
	mockLibraryMusicStyleList,
	mockLibraryMusicStyleSave,
	mockLibraryMusicStyleUpdate,
	mockLibraryMusicAlbumList,
	mockLibraryMusicAlbumSave,
	mockLibraryMusicAlbumUpdate,
};
