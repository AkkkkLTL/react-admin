import type { Book, BookCategory, BookPublisher, BookSource } from "@/pages/virtual-library/types";
import type { ReadStatus } from "@/types/enum";
import apiClient from "../../apiClient";

//#region 请求参数类型
export interface BookListQuery {
	page: number;
	limit: number;
	/**
	 * 关键字
	 */
	keyword?: string;
	/**
	 * 阅读状态
	 */
	readStatus?: ReadStatus | "";
	/**
	 * 分类ID
	 */
	categoryId?: number | "";
	/**
	 * 出版社id
	 */
	publisherId?: number | "";
	/**
	 * 排序字段
	 */
	sortField?: "read_status" | "rating" | "publish_date";
	/**
	 * 是否升序
	 */
	asc?: boolean;
}

export interface LibraryBookEnumQuery {
	moduleType?: "publisher" | "source" | "category";
}

export interface LibraryBookSaveReq extends Book {
	deleteAuthorIds?: number[];
	deleteTranslatorIds?: number[];
}

export interface LibraryBookCheckQuery {
	isbn: string;
}

export type LibraryBookPublisherSaveReq = BookPublisher;

export type LibraryBookCategorySaveReq = BookCategory;

export type LibraryBookSourceSaveReq = BookSource;
//#endregion

//#region 响应参数类型
/**
 * 书籍列表响应参数类型
 */
export interface LibraryBookListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: Omit<Book, "toc" | "reviews">[];
	};
}

export type LibraryBookEnumInfoRes = {
	data: {
		[key in "readStatusList" | "bindingTypeList" | "ratingList" | "categoryList" | "sourceList" | "publisherList"]: {
			value: number;
			label: string;
		}[];
	};
};

export interface LibraryBookCheckRes {
	data: boolean;
}

export interface LibraryBookPublisherListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: BookPublisher[];
	};
}

export interface LibraryBookCategoryListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: BookCategory[];
	};
}

export interface LibraryBookSourceListRes {
	page: {
		totalCount: number;
		pageSize: number;
		totalPage: number;
		currPage: number;
		list: BookSource[];
	};
}
//#endregion

export enum LibraryBookApi {
	/**
	 * 分页查询列表
	 */
	BookList = "/library/book/list",
	/**
	 * 获取书籍相关配置信息
	 */
	BookEnumInfo = "/library/book/enum",
	/**
	 * 获取书籍详情
	 */
	BookInfo = "/library/book/info",
	/**
	 * 创建书籍
	 */
	BookSave = "/library/book/save",
	/**
	 * 更新书籍
	 */
	BookUpdate = "/library/book/update",
	/**
	 * 检查 ISBN 重复
	 */
	BookCheckISBN = "/library/book/check-isbn",
	/**
	 * 获取出版社列表
	 */
	BookPublisherList = "/library/book/publisher/list",
	/**
	 * 创建出版社
	 */
	BookPublisherSave = "/library/book/publisher/save",
	/**
	 * 更新出版社
	 */
	BookPublisherUpdate = "/library/book/publisher/update",
	/**
	 * 获取书籍分类列表
	 */
	BookCategoryList = "/library/book/category/list",
	/**
	 * 创建书籍分类
	 */
	BookCategorySave = "/library/book/category/save",
	/**
	 * 更新书籍分类
	 */
	BookCategoryUpdate = "/library/book/category/update",
	/**
	 * 获取阅读来源列表
	 */
	BookSourceList = "/library/book/source/list",
	/**
	 * 创建阅读来源
	 */
	BookSourceSave = "/library/book/source/save",
	/**
	 * 更新阅读来源
	 */
	BookSourceUpdate = "/library/book/source/update",
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

const apiLibraryBookEnumInfo = (params?: URLSearchParams) =>
	apiClient.get<LibraryBookEnumInfoRes>({
		url: LibraryBookApi.BookEnumInfo,
		params,
	});

const apiLibraryBookCheck = (params: URLSearchParams) =>
	apiClient.get<LibraryBookCheckRes>({
		url: LibraryBookApi.BookCheckISBN,
		params,
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
	apiLibraryBookEnumInfo,
	apiLibraryBookCheck,
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
