import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryLessonApi,
	type LibraryLessonListRes,
	type LibraryLessonSaveReq,
	type LibraryLessonSourceListRes,
	type LibraryLessonSourceSaveReq,
} from "@/api/services/library-lesson.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

//#region 数据模拟
const store = {
	Lesson: "lesson-test",
	LessonSource: "lesson-source-test",
};
const db = await openDatabase("library-lesson-test", store, 1);
//#endregion

//#region 接口模拟
const mockLibraryLessonList = http.get(`${apiPrefix}${LibraryLessonApi.LessonList}`, async () => {
	const lessons = (await db.getAll(store.Lesson)) as LibraryLessonSaveReq[];
	return HttpResponse.json<Result & LibraryLessonListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: lessons || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryLessonSave = http.post(`${apiPrefix}${LibraryLessonApi.LessonSave}`, async ({ request }) => {
	// 添加数据
	await db.add(store.Lesson, await request.json());

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

const mockLibraryLessonUpdate = http.put(`${apiPrefix}${LibraryLessonApi.LessonUpdate}`, async ({ request }) => {
	// 更新数据
	await db.put(store.Lesson, await request.json());

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

const mockLibraryLessonSourceList = http.get(`${apiPrefix}${LibraryLessonApi.LessonSourceList}`, async () => {
	const lessonSources = (await db.getAll(store.LessonSource)) as LibraryLessonSourceSaveReq[];
	return HttpResponse.json<Result & LibraryLessonSourceListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: lessonSources || [],
			},
		},
		{
			status: 200,
		},
	);
});

const mockLibraryLessonSourceSave = http.post(
	`${apiPrefix}${LibraryLessonApi.LessonSourceSave}`,
	async ({ request }) => {
		// 添加数据
		await db.add(store.LessonSource, await request.json());

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

const mockLibraryLessonSourceUpdate = http.put(
	`${apiPrefix}${LibraryLessonApi.LessonSourceUpdate}`,
	async ({ request }) => {
		// 更新数据
		await db.put(store.LessonSource, await request.json());

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
//#endregion

export {
	mockLibraryLessonList,
	mockLibraryLessonSave,
	mockLibraryLessonUpdate,
	mockLibraryLessonSourceList,
	mockLibraryLessonSourceSave,
	mockLibraryLessonSourceUpdate,
};
