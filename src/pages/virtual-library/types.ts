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

//#region 课程信息
export interface LessonFilterParams {
	page: number;
	limit: number;
	status?: ReadStatus;
	search?: string;
}

export interface Lesson {
	id?: number;
	// 课程名称
	title: string;
	// 课程封面
	cover?: string;
	// 课程链接
	url?: string;
	// 主讲老师
	teacher?: {
		id: string;
		name: string;
	}[];
	sourceId?: Required<LessonSource>["id"][];
	// 课程状态
	status?: ReadStatus;
	// 课程评分
	rating?: number;
	// 课程笔记
	noteBookId?: string;
	// 课程标签
	tagId?: string;
}

// 听课来源
export interface LessonSource {
	id?: number;
	name: string;
}
//#endregion 课程信息

//#region 音乐信息
export interface MusicFilterParams {
	page: number;
	limit: number;
	search?: string;
}

export interface Music {
	id?: number;
	// 音乐名称
	title: string;
	// 表演者
	performer?: {
		id: string;
		name: string;
	}[];
	// 作词人
	lyricist?: {
		id: string;
		name: string;
	}[];
	// 作曲人
	composer?: {
		id: string;
		name: string;
	}[];
	// 编曲人
	arranger?: {
		id: string;
		name: string;
	}[];
	// 语言
	language?: CommonLanguage["code"][];
	// 音乐来源
	styleId?: Required<MusicStyle>["id"][];
	// 音乐专辑
	albumId?: Required<MusicAlbum>["id"][];
	// 发行日期
	releaseDate?: string;
	// 音乐笔记
	noteBookId?: string;
	// 音乐标签
	tagId?: string;
}

// 音乐风格
export interface MusicStyle {
	id?: number;
	name: string;
}

// 音乐专辑
export interface MusicAlbum {
	id?: number;
	name: string;
	content?: string;
}

//#endregion 音乐信息

//#region 笔记信息
export interface NoteFilterParams {
	page: number;
	limit: number;
	search?: string;
}
export interface Note {
	id?: number;
	title: string;
	type: NoteType;
	platformId?: Required<NotePlatform>["id"][];
	location?: string;
}

export enum NoteType {
	// 电子笔记
	ELECTRONIC = 0,
	// 实体笔记
	PHYSICAL_NOTE = 1,
}

export interface NotePlatform {
	id?: number;
	name: string;
}
//#endregion 笔记信息

//#region 人物信息
export interface CharacterFilterParams {
	page: number;
	limit: number;
	search?: string;
}

export interface Character {
	id?: number;
	name: string;
	isVirtual?: boolean;
	noteBookId?: string;
	tagId?: string;
}
//#endregion 人物信息

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
