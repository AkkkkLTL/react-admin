import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryBookApi,
	type LibraryBookCategoryListRes,
	type LibraryBookCategorySaveReq,
	type LibraryBookListRes,
	type LibraryBookPublisherListRes,
	type LibraryBookPublisherSaveReq,
	type LibraryBookSaveReq,
	type LibraryBookSourceListRes,
	type LibraryBookSourceSaveReq,
} from "@/api/services/library-book.service";
import { ResultEnum } from "@/types/enum";
import { openDatabase } from "../database-service";
import { apiPrefix } from "../type";

// ------------------ 数据模拟 ------------------
const store = {
	Book: "book-test",
	Publisher: "book-publisher-test",
	Category: "category-test",
	Source: "source-test",
};
const db = await openDatabase("library-test", store, 1);

const mockLibraryBookList = http.get(`${apiPrefix}${LibraryBookApi.BookList}`, async () => {
	const books = (await db.getAll(store.Book)) as LibraryBookSaveReq[];
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
	await db.add(store.Book, await request.json());

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
const mockLibraryBookUpdate = http.post(`${apiPrefix}${LibraryBookApi.BookUpdate}`, async ({ request }) => {
	// 更新数据
	await db.put(store.Book, await request.json());

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

/** 模拟获取出版社列表 */
const mockLibraryBookPublisherList = http.get(`${apiPrefix}${LibraryBookApi.BookPublisherList}`, async () => {
	const publishers = (await db.getAll(store.Publisher)) as LibraryBookPublisherSaveReq[];
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
		await db.add(store.Publisher, await request.json());

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
const mockLibraryBookPublisherUpdate = http.post(
	`${apiPrefix}${LibraryBookApi.BookPublisherUpdate}`,
	async ({ request }) => {
		// 更新数据
		await db.put(store.Publisher, await request.json());

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
	const categories = (await db.getAll(store.Category)) as LibraryBookCategorySaveReq[];
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
	await db.add(store.Category, await request.json());

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
const mockLibraryBookCategoryUpdate = http.post(
	`${apiPrefix}${LibraryBookApi.BookCategoryUpdate}`,
	async ({ request }) => {
		// 更新数据
		await db.put(store.Category, await request.json());

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
	const sources = (await db.getAll(store.Source)) as LibraryBookSourceSaveReq[];
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
	await db.add(store.Source, await request.json());

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
const mockLibraryBookSourceUpdate = http.post(`${apiPrefix}${LibraryBookApi.BookSourceUpdate}`, async ({ request }) => {
	// 更新数据
	await db.put(store.Source, await request.json());

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
