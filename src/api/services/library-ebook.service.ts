import type { EBook, EBookCategory, EBookPublishPlatform } from "@/pages/virtual-library/types";
import apiClient from "../apiClient";

export type LibraryEBookSaveReq = EBook & {
	authorId?: string;
	authorName?: string;
	categoryId?: string;
	publishPlatformId?: string;
};

export type LibraryEBookPublishplatformSaveReq = EBookPublishPlatform & {
	id?: number;
};

export type LibraryEBookCategorySaveReq = EBookCategory & {
	id?: number;
};

export interface LibraryEBookListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryEBookSaveReq[];
	};
}

export interface LibraryEBookPublishplatformListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryEBookPublishplatformSaveReq[];
	};
}

export interface LibraryEBookCategoryListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: LibraryEBookCategorySaveReq[];
	};
}

export enum LibraryEBookApi {
	// 获取电子读物（未出版）列表
	EBookList = "/library/ebook/list",
	// 创建电子读物（未出版）
	EBookSave = "/library/ebook/save",
	// 更新电子读物（未出版）
	EBookUpdate = "/library/ebook/update",
	// 获取电子读物（未出版）发布平台列表
	EBookPublishPlatformList = "/library/ebookpublishplatform/list",
	// 创建电子读物（未出版）发布平台
	EBookPublishPlatformSave = "/library/ebookpublishplatform/save",
	// 更新电子读物（未出版）发布平台
	EBookPublishPlatformUpdate = "/library/ebookpublishplatform/update",
	// 获取电子读物（未出版）分类列表
	EBookCategoryList = "/library/ebookcategory/list",
	// 创建电子读物（未出版）分类
	EBookCategorySave = "/library/ebookcategory/save",
	// 更新电子读物（未出版）分类
	EBookCategoryUpdate = "/library/ebookcategory/update",
}

const apiLibraryEBookList = (params: URLSearchParams) =>
	apiClient.get<LibraryEBookListRes>({
		url: LibraryEBookApi.EBookList,
		params,
	});

const apiLibraryEBookSave = (data: LibraryEBookSaveReq) =>
	apiClient.post<void>({
		url: LibraryEBookApi.EBookSave,
		data,
	});

const apiLibraryEBookUpdate = (data: LibraryEBookSaveReq) =>
	apiClient.put<void>({
		url: LibraryEBookApi.EBookUpdate,
		data,
	});

const apiLibraryEBookPublishPlatformList = () =>
	apiClient.get<LibraryEBookPublishplatformListRes>({
		url: LibraryEBookApi.EBookPublishPlatformList,
	});

const apiLibraryEBookPublishPlatformSave = (data: LibraryEBookPublishplatformSaveReq) =>
	apiClient.post<void>({
		url: LibraryEBookApi.EBookPublishPlatformSave,
		data,
	});

const apiLibraryEBookPublishPlatformUpdate = (data: LibraryEBookPublishplatformSaveReq) =>
	apiClient.put<void>({
		url: LibraryEBookApi.EBookPublishPlatformUpdate,
		data,
	});

const apiLibraryEBookCategoryList = () =>
	apiClient.get<LibraryEBookCategoryListRes>({
		url: LibraryEBookApi.EBookCategoryList,
	});

const apiLibraryEBookCategorySave = (data: LibraryEBookCategorySaveReq) =>
	apiClient.post<void>({
		url: LibraryEBookApi.EBookCategorySave,
		data,
	});

const apiLibraryEBookCategoryUpdate = (data: LibraryEBookCategorySaveReq) =>
	apiClient.put<void>({
		url: LibraryEBookApi.EBookCategoryUpdate,
		data,
	});

export {
	apiLibraryEBookList,
	apiLibraryEBookSave,
	apiLibraryEBookUpdate,
	apiLibraryEBookPublishPlatformList,
	apiLibraryEBookPublishPlatformSave,
	apiLibraryEBookPublishPlatformUpdate,
	apiLibraryEBookCategoryList,
	apiLibraryEBookCategorySave,
	apiLibraryEBookCategoryUpdate,
};
