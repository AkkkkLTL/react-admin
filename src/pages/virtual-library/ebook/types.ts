import type { ReadStatus } from "@/types/enum";

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
