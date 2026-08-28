import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryNoteApi,
	type LibraryNoteListRes,
	type LibraryNotePlatformListRes,
	type LibraryNotePlatformSaveReq,
	type LibraryNoteSaveReq,
} from "@/api/services/library-note.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

//#region 笔记数据库
const store = {
	Note: "note-test",
	NotePlatform: "note-platform-test",
};
const db = await openDatabase("library-note-test", store, 1);
//#endregion 笔记数据库

//#region 接口模拟
const mockLibraryNoteList = http.get(`${apiPrefix}${LibraryNoteApi.NoteList}`, async () => {
	const notes = (await db.getAll(store.Note)) as LibraryNoteSaveReq[];
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
	await db.add(store.Note, await request.json());

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
	await db.put(store.Note, await request.json());

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

const mockLibraryNotePlatformList = http.get(`${apiPrefix}${LibraryNoteApi.NotePlatformList}`, async () => {
	const notePlatforms = (await db.getAll(store.NotePlatform)) as LibraryNotePlatformSaveReq[];
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
	await db.add(store.NotePlatform, await request.json());

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
		await db.put(store.NotePlatform, await request.json());

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
	mockLibraryNotePlatformList,
	mockLibraryNotePlatformSave,
	mockLibraryNotePlatformUpdate,
};
