import type { Note, NotePlatform } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

//#region 请求类型
export type LibraryNoteSaveReq = Note & {
	platformId?: string;
};

export type LibraryNotePlatformSaveReq = NotePlatform;
//#endregion 请求类型

//#region 响应类型
export type LibraryNoteListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryNoteSaveReq[];
	};
};

export type LibraryNotePlatformListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryNotePlatformSaveReq[];
	};
};
//#endregion 响应类型

export enum LibraryNoteApi {
	// 获取笔记列表
	NoteList = "/library/note/list",
	// 创建笔记信息
	NoteSave = "/library/note/save",
	// 更新笔记信息
	NoteUpdate = "/library/note/update",
	// 获取笔记平台列表
	NotePlatformList = "/library/noteplatform/list",
	// 创建笔记平台信息
	NotePlatformSave = "/library/noteplatform/save",
	// 更新笔记平台信息
	NotePlatformUpdate = "/library/noteplatform/update",
}

const apiLibraryNoteList = (params: URLSearchParams) =>
	apiClient.get<LibraryNoteListRes>({
		url: LibraryNoteApi.NoteList,
		params,
	});

const apiLibraryNoteSave = (data: LibraryNoteSaveReq) =>
	apiClient.post<void>({
		url: LibraryNoteApi.NoteSave,
		data,
	});

const apiLibraryNoteUpdate = (data: LibraryNoteSaveReq) =>
	apiClient.put<void>({
		url: LibraryNoteApi.NoteUpdate,
		data,
	});

const apiLibraryNotePlatformList = () =>
	apiClient.get<LibraryNotePlatformListRes>({
		url: LibraryNoteApi.NotePlatformList,
	});

const apiLibraryNotePlatformSave = (data: LibraryNotePlatformSaveReq) =>
	apiClient.post<void>({
		url: LibraryNoteApi.NotePlatformSave,
		data,
	});

const apiLibraryNotePlatformUpdate = (data: LibraryNotePlatformSaveReq) =>
	apiClient.put<void>({
		url: LibraryNoteApi.NotePlatformUpdate,
		data,
	});

export {
	apiLibraryNoteList,
	apiLibraryNoteSave,
	apiLibraryNoteUpdate,
	apiLibraryNotePlatformList,
	apiLibraryNotePlatformSave,
	apiLibraryNotePlatformUpdate,
};
