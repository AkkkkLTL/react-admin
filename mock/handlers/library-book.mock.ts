import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryBookApi,
	type LibraryBookCategoryListRes,
	type LibraryBookCategorySaveReq,
	type LibraryBookEnumInfoRes,
	type LibraryBookListRes,
	type LibraryBookPublisherListRes,
	type LibraryBookPublisherSaveReq,
	type LibraryBookSaveReq,
	type LibraryBookSourceListRes,
	type LibraryBookSourceSaveReq,
} from "@/api/services/library-book.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../database-service";
import { apiPrefix } from "../type";

const mockLibraryBookList = http.get(`${apiPrefix}${LibraryBookApi.BookList}`, async () => {
	const books = (await libraryDatabase.getAll(libraryStore.Book)) as LibraryBookSaveReq[];
	return HttpResponse.json<Result & LibraryBookListRes>(
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
const mockLibraryBookSave = http.post(`${apiPrefix}${LibraryBookApi.BookSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.Book, await request.json());

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
const mockLibraryBookUpdate = http.put(`${apiPrefix}${LibraryBookApi.BookUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.Book, await request.json());

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

/** 模拟获取枚举信息列表 */
const mockLibraryBookEnumInfo = http.get(`${apiPrefix}${LibraryBookApi.BookEnumInfo}`, async () => {
	const publishers = (await libraryDatabase.getAll(libraryStore.BookPublisher)) as LibraryBookPublisherSaveReq[];
	const categories = (await libraryDatabase.getAll(libraryStore.BookCategory)) as LibraryBookCategorySaveReq[];
	const sources = (await libraryDatabase.getAll(libraryStore.BookSource)) as LibraryBookSourceSaveReq[];
	return HttpResponse.json<Result & LibraryBookEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			publisherList: publishers || [],
			categoryList: categories || [],
			sourceList: sources || [],
		},
		{
			status: 200,
		},
	);
});

/** 模拟获取出版社列表 */
const mockLibraryBookPublisherList = http.get(`${apiPrefix}${LibraryBookApi.BookPublisherList}`, async () => {
	const publishers = (await libraryDatabase.getAll(libraryStore.BookPublisher)) as LibraryBookPublisherSaveReq[];
	return HttpResponse.json<Result & LibraryBookPublisherListRes>(
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
});

/** 模拟保存出版社 */
const mockLibraryBookPublisherSave = http.post(
	`${apiPrefix}${LibraryBookApi.BookPublisherSave}`,
	async ({ request }) => {
		// 添加数据
		await libraryDatabase.add(libraryStore.BookPublisher, await request.json());

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
const mockLibraryBookPublisherUpdate = http.put(
	`${apiPrefix}${LibraryBookApi.BookPublisherUpdate}`,
	async ({ request }) => {
		// 更新数据
		await libraryDatabase.put(libraryStore.BookPublisher, await request.json());

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
const mockLibraryBookCategoryList = http.get(`${apiPrefix}${LibraryBookApi.BookCategoryList}`, async () => {
	const categories = (await libraryDatabase.getAll(libraryStore.BookCategory)) as LibraryBookCategorySaveReq[];
	return HttpResponse.json<Result & LibraryBookCategoryListRes>(
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
const mockLibraryBookCategorySave = http.post(`${apiPrefix}${LibraryBookApi.BookCategorySave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.BookCategory, await request.json());

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

/** 模拟更新分类 */
const mockLibraryBookCategoryUpdate = http.put(
	`${apiPrefix}${LibraryBookApi.BookCategoryUpdate}`,
	async ({ request }) => {
		// 更新数据
		await libraryDatabase.put(libraryStore.BookCategory, await request.json());

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

/** 模拟获取阅读来源列表 */
const mockLibraryBookSourceList = http.get(`${apiPrefix}${LibraryBookApi.BookSourceList}`, async () => {
	const sources = (await libraryDatabase.getAll(libraryStore.BookSource)) as LibraryBookSourceSaveReq[];
	return HttpResponse.json<Result & LibraryBookSourceListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 0,
				pageSize: 20,
				totalPage: 0,
				currPage: 1,
				list: sources || [],
			},
		},
		{
			status: 200,
		},
	);
});

/** 模拟保存阅读来源 */
const mockLibraryBookSourceSave = http.post(`${apiPrefix}${LibraryBookApi.BookSourceSave}`, async ({ request }) => {
	// 添加数据
	await libraryDatabase.add(libraryStore.BookSource, await request.json());

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

/** 模拟更新阅读来源 */
const mockLibraryBookSourceUpdate = http.put(`${apiPrefix}${LibraryBookApi.BookSourceUpdate}`, async ({ request }) => {
	// 更新数据
	await libraryDatabase.put(libraryStore.BookSource, await request.json());

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

export {
	mockLibraryBookList,
	mockLibraryBookSave,
	mockLibraryBookUpdate,
	mockLibraryBookEnumInfo,
	mockLibraryBookPublisherList,
	mockLibraryBookPublisherSave,
	mockLibraryBookPublisherUpdate,
	mockLibraryBookCategoryList,
	mockLibraryBookCategorySave,
	mockLibraryBookCategoryUpdate,
	mockLibraryBookSourceList,
	mockLibraryBookSourceSave,
	mockLibraryBookSourceUpdate,
};
