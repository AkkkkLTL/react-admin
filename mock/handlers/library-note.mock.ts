import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryNoteApi,
	type LibraryNoteEnumInfoRes,
	type LibraryNoteListRes,
	type LibraryNotePlatformListRes,
	type LibraryNotePlatformSaveReq,
	type LibraryNoteSaveReq,
} from "@/api/services/library-note.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

//#region 接口模拟
const mockLibraryNoteList = http.get(`${apiPrefix}${LibraryNoteApi.NoteList}`, async () => {
	const notes = (await libraryDatabase.getAll(libraryStore.Note)) as LibraryNoteSaveReq[];
	return HttpResponse.json<Result & LibraryNoteListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: notes || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryNoteSave = http.post(`${apiPrefix}${LibraryNoteApi.NoteSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.Note, await request.json());

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

const mockLibraryNoteUpdate = http.put(`${apiPrefix}${LibraryNoteApi.NoteUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.Note, await request.json());

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

/** 模拟获取笔记枚举信息 */
const mockLibraryNoteEnumInfo = http.get(`${apiPrefix}${LibraryNoteApi.NoteEnumInfo}`, async () => {
	const platforms = (await libraryDatabase.getAll(libraryStore.NotePlatform)) as LibraryNotePlatformSaveReq[];
	return HttpResponse.json<Result & LibraryNoteEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			platformList: platforms || [],
		},
		{
			status: 200,
		},
	);
});

const mockLibraryNotePlatformList = http.get(`${apiPrefix}${LibraryNoteApi.NotePlatformList}`, async () => {
	const notePlatforms = (await libraryDatabase.getAll(libraryStore.NotePlatform)) as LibraryNotePlatformSaveReq[];
	return HttpResponse.json<Result & LibraryNotePlatformListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: notePlatforms || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryNotePlatformSave = http.post(`${apiPrefix}${LibraryNoteApi.NotePlatformSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.NotePlatform, await request.json());

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

const mockLibraryNotePlatformUpdate = http.put(
	`${apiPrefix}${LibraryNoteApi.NotePlatformUpdate}`,
	async ({ request }) => {
		// 更新数据
		await libraryDatabase.put(libraryStore.NotePlatform, await request.json());

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

export {
	mockLibraryNoteList,
	mockLibraryNoteSave,
	mockLibraryNoteUpdate,
	mockLibraryNoteEnumInfo,
	mockLibraryNotePlatformList,
	mockLibraryNotePlatformSave,
	mockLibraryNotePlatformUpdate,
};
