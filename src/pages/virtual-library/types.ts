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

export enum MovieType {
	// 漫剧
	MANGA = 0,
	// 纪录片
	DOCUMENTARY = 1,
	// 动漫
	ANIMATION = 2,
	// 电视剧
	TV_SERIES = 3,
	// 电影
	MOVIE = 4,
	// 综艺
	PROGRAM = 5,
	// 短剧
	SHORT = 6,
}

export interface MovieFilterParams {
	page: number;
	limit: number;
	type?: MovieType;
	categoryId?: number;
	status?: ReadStatus;
	search?: string;
}

// 影视
export interface Movie {
	id?: number;
	// 影视名称
	title: string;
	// 封面
	cover?: string;
	// 原标题
	oriTitle?: string;
	// 影视类型
	type: MovieType;
	// 影视分类id
	categoryId?: number[];
	// 导演
	director?: {
		id: string;
		name: string;
	}[];
	// 编剧
	editor?: {
		id: string;
		name: string;
	}[];
	// 演员
	actor?: {
		id: string;
		name: string;
	}[];
	// 制片国家/地区
	region?: CommonRegion["code"][];
	// 语言
	language?: CommonLanguage["code"][];
	// 首播时间
	firstBroadcast?: string;
	// 季数
	season?: number;
	// 集数
	episodesNumber?: number;
	// 单集时长
	monoDuration?: number;
	// 别名
	alias?: string;
	// IMDB
	imdb?: string;
	// 状态
	status?: ReadStatus;
	// 评分
	rating?: number;
	// 笔记
	noteBookId?: string;
	// 标签
	tagId?: string;
}

export interface MovieCategory {
	id?: number;
	name: string;
}

// 通用配置
export interface CommonLanguage {
	id?: number;
	// 语言代码
	code: string;
	// 语言名称
	name: string;
}

export interface CommonRegion {
	id?: number;
	// 国家/地区代码
	code: string;
	// 国家/地区名称
	name: string;
}
