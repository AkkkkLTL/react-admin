import type { Lesson, LessonSource } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

//#region 请求类型
export type LibraryLessonSaveReq = Lesson & {
	teacherId?: string;
	teacherName?: string;
	sourceId?: string;
};

export type LibraryLessonSourceSaveReq = LessonSource;
//#endregion 请求类型

//#region 响应类型
export type LibraryLessonListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryLessonSaveReq[];
	};
};

export type LibraryLessonSourceListRes = {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryLessonSourceSaveReq[];
	};
};
//#endregion 响应类型

export enum LibraryLessonApi {
	// 获取课程列表
	LessonList = "/library/lesson/list",
	// 创建课程
	LessonSave = "/library/lesson/save",
	// 更新课程
	LessonUpdate = "/library/lesson/update",
	// 获取课程来源列表
	LessonSourceList = "/library/lessonsource/list",
	// 创建课程来源
	LessonSourceSave = "/library/lessonsource/save",
	// 更新课程来源
	LessonSourceUpdate = "/library/lessonsource/update",
}

const apiLibraryLessonList = (params: URLSearchParams) =>
	apiClient.get<LibraryLessonListRes>({
		url: LibraryLessonApi.LessonList,
		params,
	});

const apiLibraryLessonSave = (data: LibraryLessonSaveReq) =>
	apiClient.post<void>({
		url: LibraryLessonApi.LessonSave,
		data,
	});

const apiLibraryLessonUpdate = (data: LibraryLessonSaveReq) =>
	apiClient.put<void>({
		url: LibraryLessonApi.LessonUpdate,
		data,
	});

const apiLibraryLessonSourceList = () =>
	apiClient.get<LibraryLessonSourceListRes>({
		url: LibraryLessonApi.LessonSourceList,
	});

const apiLibraryLessonSourceSave = (data: LibraryLessonSourceSaveReq) =>
	apiClient.post<void>({
		url: LibraryLessonApi.LessonSourceSave,
		data,
	});

const apiLibraryLessonSourceUpdate = (data: LibraryLessonSourceSaveReq) =>
	apiClient.put<void>({
		url: LibraryLessonApi.LessonSourceUpdate,
		data,
	});

export {
	apiLibraryLessonList,
	apiLibraryLessonSave,
	apiLibraryLessonUpdate,
	apiLibraryLessonSourceList,
	apiLibraryLessonSourceSave,
	apiLibraryLessonSourceUpdate,
};
