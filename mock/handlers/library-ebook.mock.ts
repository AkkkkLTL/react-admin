import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryEBookApi,
	type LibraryEBookCategoryListRes,
	type LibraryEBookCategorySaveReq,
	type LibraryEBookEnumInfoRes,
	type LibraryEBookListRes,
	type LibraryEBookPublishplatformListRes,
	type LibraryEBookPublishplatformSaveReq,
	type LibraryEBookSaveReq,
} from "@/api/services/library-ebook.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

// ------------------ 数据模拟 ------------------
const mockLibraryEBookList = http.get(`${apiPrefix}${LibraryEBookApi.EBookList}`, async () => {
	const books = (await libraryDatabase.getAll(libraryStore.EBook)) as LibraryEBookSaveReq[];
	return HttpResponse.json<Result & LibraryEBookListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: books || [],
			},
		},
		{
			status: 200,
		},
	);
});

/** 模拟保存图书 */
const mockLibraryEBookSave = http.post(`${apiPrefix}${LibraryEBookApi.EBookSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.EBook, await request.json());

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

/** 模拟更新图书 */
const mockLibraryEBookUpdate = http.put(`${apiPrefix}${LibraryEBookApi.EBookUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.EBook, await request.json());

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

/** 模拟获取电子书枚举信息 */
const mockLibraryEBookEnumInfo = http.get(`${apiPrefix}${LibraryEBookApi.EBookEnumInfo}`, async () => {
	const publishPlatforms = (await libraryDatabase.getAll(
		libraryStore.EBookPublisher,
	)) as LibraryEBookPublishplatformSaveReq[];
	const categories = (await libraryDatabase.getAll(libraryStore.EBookCategory)) as LibraryEBookCategorySaveReq[];
	return HttpResponse.json<Result & LibraryEBookEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			publishPlatformList: publishPlatforms || [],
			categoryList: categories || [],
		},
		{
			status: 200,
		},
	);
});

/** 模拟获取出版社列表 */
const mockLibraryEBookPublishPlatformList = http.get(
	`${apiPrefix}${LibraryEBookApi.EBookPublishPlatformList}`,
	async () => {
		const publishers = (await libraryDatabase.getAll(
			libraryStore.EBookPublisher,
		)) as LibraryEBookPublishplatformSaveReq[];
		return HttpResponse.json<Result & LibraryEBookPublishplatformListRes>(
			{
				code: ResultEnum.SUCCESS,
				msg: "success",
				page: {
					totalCount: 0,
					pageSize: 20,
					totalPage: 0,
					currPage: 1,
					list: publishers || [],
				},
			},
			{
				status: 200,
			},
		);
	},
);

/** 模拟保存出版社 */
const mockLibraryEBookPublishPlatformSave = http.post(
	`${apiPrefix}${LibraryEBookApi.EBookPublishPlatformSave}`,
	async ({ request }) => {
		// 添加数据
		await libraryDatabase.add(libraryStore.EBookPublisher, await request.json());

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

/** 模拟更新出版社 */
const mockLibraryEBookPublishPlatformUpdate = http.put(
	`${apiPrefix}${LibraryEBookApi.EBookPublishPlatformUpdate}`,
	async ({ request }) => {
		// 更新数据
		await libraryDatabase.put(libraryStore.EBookPublisher, await request.json());

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

/** 模拟获取分类列表 */
const mockLibraryEBookCategoryList = http.get(`${apiPrefix}${LibraryEBookApi.EBookCategoryList}`, async () => {
	const categories = (await libraryDatabase.getAll(libraryStore.EBookCategory)) as LibraryEBookCategorySaveReq[];
	return HttpResponse.json<Result & LibraryEBookCategoryListRes>(
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

/** 模拟保存分类 */
const mockLibraryEBookCategorySave = http.post(
	`${apiPrefix}${LibraryEBookApi.EBookCategorySave}`,
	async ({ request }) => {
		// 添加数据
		await libraryDatabase.add(libraryStore.EBookCategory, await request.json());

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

/** 模拟更新分类 */
const mockLibraryEBookCategoryUpdate = http.put(
	`${apiPrefix}${LibraryEBookApi.EBookCategoryUpdate}`,
	async ({ request }) => {
		// 更新数据
		await libraryDatabase.put(libraryStore.EBookCategory, await request.json());

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

export {
	mockLibraryEBookList,
	mockLibraryEBookSave,
	mockLibraryEBookUpdate,
	mockLibraryEBookEnumInfo,
	mockLibraryEBookPublishPlatformList,
	mockLibraryEBookPublishPlatformSave,
	mockLibraryEBookPublishPlatformUpdate,
	mockLibraryEBookCategoryList,
	mockLibraryEBookCategorySave,
	mockLibraryEBookCategoryUpdate,
};
