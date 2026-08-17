import type { Book, BookCategory, BookPublisher, BookSource } from "@/pages/virtual-library/ebook/types";
import apiClient from "../apiClient";

export type LibraryBookSaveReq = Book & {
	authorId?: string;
	authorName?: string;
	translatorId?: string;
	translatorName?: string;
	sourceId?: string;
};

export type LibraryBookPublisherSaveReq = BookPublisher;

export type LibraryBookCategorySaveReq = BookCategory;

export type LibraryBookSourceSaveReq = BookSource;

export interface LibraryBookListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryBookSaveReq[];
	};
}

export interface LibraryBookPublisherListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryBookPublisherSaveReq[];
	};
}

export interface LibraryBookCategoryListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryBookCategorySaveReq[];
	};
}

export interface LibraryBookSourceListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryBookSourceSaveReq[];
	};
}

export enum LibraryBookApi {
	// 获取书籍列表
	BookList = "/library/book/list",
	// 获取书籍详情
	BookInfo = "/library/book/info",
	// 创建书籍
	BookSave = "/library/book/save",
	// 更新书籍
	BookUpdate = "/library/book/update",
	// 获取出版社列表
	BookPublisherList = "/library/bookpublisher/list",
	// 创建出版社
	BookPublisherSave = "/library/bookpublisher/save",
	// 更新出版社
	BookPublisherUpdate = "/library/bookpublisher/update",
	// 获取分类列表
	BookCategoryList = "/library/bookcategory/list",
	// 创建分类
	BookCategorySave = "/library/bookcategory/save",
	// 更新分类
	BookCategoryUpdate = "/library/bookcategory/update",
	// 获取阅读来源列表
	BookSourceList = "/library/booksource/list",
	// 创建阅读来源
	BookSourceSave = "/library/booksource/save",
	// 更新阅读来源
	BookSourceUpdate = "/library/booksource/update",
}

const apiLibraryBookList = (params: URLSearchParams) =>
	apiClient.get<LibraryBookListRes>({
		url: LibraryBookApi.BookList,
		params,
	});

const apiLibraryBookSave = (data: LibraryBookSaveReq) =>
	apiClient.post<void>({
		url: LibraryBookApi.BookSave,
		data,
	});

const apiLibraryBookUpdate = (data: LibraryBookSaveReq) =>
	apiClient.put<void>({
		url: LibraryBookApi.BookUpdate,
		data,
	});

const apiLibraryBookPublisherList = () =>
	apiClient.get<LibraryBookPublisherListRes>({
		url: LibraryBookApi.BookPublisherList,
	});

const apiLibraryBookPublisherSave = (data: LibraryBookPublisherSaveReq) =>
	apiClient.post<void>({
		url: LibraryBookApi.BookPublisherSave,
		data,
	});

const apiLibraryBookPublisherUpdate = (data: LibraryBookPublisherSaveReq) =>
	apiClient.put<void>({
		url: LibraryBookApi.BookPublisherUpdate,
		data,
	});

const apiLibraryBookCategoryList = () =>
	apiClient.get<LibraryBookCategoryListRes>({
		url: LibraryBookApi.BookCategoryList,
	});

const apiLibraryBookCategorySave = (data: LibraryBookCategorySaveReq) =>
	apiClient.post<void>({
		url: LibraryBookApi.BookCategorySave,
		data,
	});

const apiLibraryBookCategoryUpdate = (data: LibraryBookCategorySaveReq) =>
	apiClient.put<void>({
		url: LibraryBookApi.BookCategoryUpdate,
		data,
	});

const apiLibraryBookSourceList = () =>
	apiClient.get<LibraryBookSourceListRes>({
		url: LibraryBookApi.BookSourceList,
	});

const apiLibraryBookSourceSave = (data: LibraryBookSourceSaveReq) =>
	apiClient.post<void>({
		url: LibraryBookApi.BookSourceSave,
		data,
	});

const apiLibraryBookSourceUpdate = (data: LibraryBookSourceSaveReq) =>
	apiClient.put<void>({
		url: LibraryBookApi.BookSourceUpdate,
		data,
	});

export {
	apiLibraryBookList,
	apiLibraryBookSave,
	apiLibraryBookUpdate,
	apiLibraryBookPublisherList,
	apiLibraryBookPublisherSave,
	apiLibraryBookPublisherUpdate,
	apiLibraryBookCategoryList,
	apiLibraryBookCategorySave,
	apiLibraryBookCategoryUpdate,
	apiLibraryBookSourceList,
	apiLibraryBookSourceSave,
	apiLibraryBookSourceUpdate,
};
