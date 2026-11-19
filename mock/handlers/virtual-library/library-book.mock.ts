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
	LibraryBookSaveReq,
	type LibraryBookSourceListRes,
	type LibraryBookSourceSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { ResultEnum } from "@/types/enum";
import { libraryDatabase, libraryStore } from "../../database-service";
import { apiPrefix } from "../../type";

var mockBookList: LibraryBookListRes["page"]["list"] = Array.from({ length: 10 }).map((_, i) => ({
	id: i,
	isbn: "9787121316388",
	title: "计算机网络释疑与习题解答（第7版）",
	categoryId: 1,
	categoryName: "计算机",
	publisherName: "电子工业出版社",
	publisherId: 8,
	publishDate: "2023-01-01",
	edition: 1,
	binding: 1,
	pages: 0,
	price: 39.8,
	currency: "CNY",
	readStatus: 1,
	rating: 3,
	authors: [
		{
			id: 232,
			bookId: 232,
			name: "上野千鹤子",
		},
		{
			id: 233,
			bookId: 232,
			name: "铃木凉美",
		},
	],
	translators: [
		{
			id: 232,
			bookId: 232,
			name: "威廉·萨默塞特·毛姆",
		},
	],
}));

var mockBookEnum: LibraryBookEnumInfoRes["data"] = {
	readStatusList: [
		{
			value: 0,
			label: "想读",
		},
		{
			value: 1,
			label: "未读",
		},
		{
			value: 2,
			label: "暂停",
		},
		{
			value: 3,
			label: "在读",
		},
		{
			value: 4,
			label: "放弃",
		},
		{
			value: 5,
			label: "已读",
		},
	],
	bindingTypeList: [
		{
			value: 0,
			label: "平装",
		},
		{
			value: 1,
			label: "精装",
		},
		{
			value: 2,
			label: "锁线胶订",
		},
	],
	ratingList: [
		{
			value: 1,
			label: "很差",
		},
		{
			value: 2,
			label: "较差",
		},
		{
			value: 3,
			label: "还行",
		},
		{
			value: 4,
			label: "推荐",
		},
		{
			value: 5,
			label: "力荐",
		},
	],
	categoryList: [
		{
			value: 15,
			label: "其他",
		},
		{
			value: 10,
			label: "图形学",
		},
		{
			value: 8,
			label: "学习",
		},
	],
	sourceList: [
		{
			value: 3,
			label: "zlibrary",
		},
		{
			value: 1,
			label: "个人藏书",
		},
		{
			value: 4,
			label: "微信公众号",
		},
	],
	publisherList: [
		{
			value: 12,
			label: "上海交通大学出版社",
		},
		{
			value: 3,
			label: "上海文艺出版社",
		},
		{
			value: 53,
			label: "上海译文出版社",
		},
	],
};

const mockLibraryBookList = http.get(`${apiPrefix}${LibraryBookApi.BookList}`, async ({ request }) => {
	// const books = (await libraryDatabase.getAll(libraryStore.Book)) as LibraryBookSaveReq[];
	const url = new URL(request.url);
	const limit = url.searchParams.get("limit");
	const page = url.searchParams.get("page");
	return HttpResponse.json<Result & LibraryBookListRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			page: {
				totalCount: 230,
				pageSize: Number(limit) || 10,
				totalPage: Math.ceil(230 / Number(limit) || 10),
				currPage: Number(page) || 1,
				list: mockBookList || [],
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
	// await libraryDatabase.add(libraryStore.Book, await request.json());

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
	// await libraryDatabase.put(libraryStore.Book, await request.json());

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

const mockLibraryBookCheck = http.get(`${apiPrefix}${LibraryBookApi.BookCheckISBN}`, async ({ request }) => {
	// const books = (await libraryDatabase.getAll(libraryStore.Book)) as LibraryBookSaveReq[];
	const url = new URL(request.url);
	const isbn = url.searchParams.get("isbn");
	return HttpResponse.json<Result>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			data: isbn === "9787121316388",
		},
		{
			status: 200,
		},
	);
});

/** 模拟获取枚举信息列表 */
const mockLibraryBookEnumInfo = http.get(`${apiPrefix}${LibraryBookApi.BookEnumInfo}`, async () => {
	// const publishers = (await libraryDatabase.getAll(libraryStore.BookPublisher)) as LibraryBookPublisherSaveReq[];
	// const categories = (await libraryDatabase.getAll(libraryStore.BookCategory)) as LibraryBookCategorySaveReq[];
	// const sources = (await libraryDatabase.getAll(libraryStore.BookSource)) as LibraryBookSourceSaveReq[];
	return HttpResponse.json<Result & LibraryBookEnumInfoRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			data: mockBookEnum,
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
	mockLibraryBookCheck,
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
