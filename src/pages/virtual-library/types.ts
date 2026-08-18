import type { ReadStatus } from "@/types/enum";

export interface BookFilterParams {
	page: number;
	limit: number;
	publisherId?: number;
	categoryId?: number;
	status?: ReadStatus;
	rating?: number;
	search?: string;
}

export interface Book {
	id?: number;
	isbn: string;
	title: string;
	oriTitle?: string;
	cover?: string;
	author?: {
		id: string;
		name: string;
	}[];
	translator?: {
		id: string;
		name: string;
	}[];
	publisherId?: Required<BookPublisher>["id"];
	publishDate?: string;
	content?: string;
	edition?: number;
	binding?: number;
	pages?: number;
	currency?: string;
	price?: number;
	categoryId?: Required<BookCategory>["id"];
	sourceId?: Required<BookSource>["id"][];
	status?: ReadStatus;
	rating?: number;
	noteBookId?: string;
	tagId?: string;
}

export interface BookCategory {
	id?: number;
	name: string;
}

export interface BookPublisher {
	id?: number;
	name: string;
}

export interface BookSource {
	id?: number;
	name: string;
}

export interface EBookFilterParams {
	page: number;
	limit: number;
	type?: number;
	status?: ReadStatus;
	search?: string;
}

// 电子书
export interface EBook {
	id?: number;
	// 书名
	title: string;
	// 原书名
	oriTitle?: string;
	// 封面
	cover?: string;
	// 类型
	type: number;
	// 作者
	author: {
		id: string;
		name: string;
	}[];
	// 分类
	categoryId?: Required<EBookCategory>["id"][];
	// 发布平台
	publishPlatformId?: Required<EBookPublishPlatform>["id"][];
	// 状态
	status?: ReadStatus;
	// 评分
	rating?: number;
	// 笔记
	noteBookId?: string;
	// 标签
	tagId?: string;
}

// 电子书分类
export interface EBookCategory {
	id?: number;
	name: string;
}

// 电子书发布平台
export interface EBookPublishPlatform {
	id?: number;
	name: string;
}
