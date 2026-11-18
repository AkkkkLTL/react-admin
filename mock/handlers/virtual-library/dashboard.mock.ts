import { HttpResponse, http } from "msw";
import type { Result } from "@/api/apiClient";
import {
	LibraryDashboardApi,
	type LibraryDashboardInProgressListRes,
	type LibraryDashboardStatsRes,
} from "@/api/services/virtual-library/dashboard.service";
import { ResultEnum } from "@/types/enum";
import { apiPrefix } from "../../type";

var dashboardStats: LibraryDashboardStatsRes["stats"] = {
	bookStats: {
		wantToRead: 12,
		unread: 134,
		paused: 17,
		reading: 10,
		abandoned: 1,
		finished: 56,
		total: 230,
	},
	ebookStats: {
		wantToRead: 1,
		unread: 7,
		paused: 1,
		reading: 10,
		abandoned: 0,
		finished: 41,
		total: 60,
	},
	movieStats: {
		wantToRead: 21,
		unread: 19,
		paused: 1,
		reading: 10,
		abandoned: 1,
		finished: 143,
		total: 195,
	},
	lessonStats: {
		wantToRead: 0,
		unread: 2,
		paused: 0,
		reading: 4,
		abandoned: 16,
		finished: 8,
		total: 30,
	},
};

var dashboardInProgressList: LibraryDashboardInProgressListRes["inProgressList"] = {
	bookList: [
		{
			id: 230,
			cover: null,
			title: "把自己作为方法",
			characterNames: ["项飙", "吴琦"],
			categoryName: "人物访谈",
			status: 3,
			progress: 198,
			total: 320,
		},
		{
			id: 231,
			cover: null,
			title: "也许你该找个人聊聊",
			characterNames: ["洛莉·戈特利布"],
			categoryName: "心理学",
			status: 3,
			progress: 96,
			total: 272,
		},
		{
			id: 232,
			cover: null,
			title: "把自己作为方法",
			characterNames: ["项飙", "吴琦"],
			categoryName: "人物访谈",
			status: 3,
			progress: 198,
			total: 320,
		},
		{
			id: 233,
			cover: null,
			title: "也许你该找个人聊聊",
			characterNames: ["洛莉·戈特利布"],
			categoryName: "心理学",
			status: 3,
			progress: 96,
			total: 272,
		},
	],
	ebookList: [
		{
			id: 1,
			cover: null,
			title: "悉达多",
			characterNames: ["赫尔曼·黑塞"],
			categoryName: "文学",
			status: 3,
			progress: 43,
			total: 100,
		},
		{
			id: 2,
			cover: null,
			title: "认知觉醒",
			characterNames: ["周岭"],
			categoryName: "个人成长",
			status: 3,
			progress: 26,
			total: 100,
		},
		{
			id: 3,
			cover: null,
			title: "悉达多",
			characterNames: ["赫尔曼·黑塞"],
			categoryName: "文学",
			status: 3,
			progress: 43,
			total: 100,
		},
	],
	movieList: [
		{
			id: 1,
			cover: null,
			title: "完美的日子",
			characterNames: ["维姆·文德斯"],
			categoryName: "2023",
			status: 3,
			progress: 48,
			total: 124,
		},
		{
			id: 2,
			cover: null,
			title: "海街日记",
			characterNames: ["是枝裕和"],
			categoryName: "2015",
			status: 3,
			progress: 67,
			total: 127,
		},
		{
			id: 3,
			cover: null,
			title: "完美的日子",
			characterNames: ["维姆·文德斯"],
			categoryName: "2023",
			status: 3,
			progress: 48,
			total: 124,
		},
	],
	lessonList: [
		{
			id: 1,
			cover: null,
			title: "用摄影，重新发现日常",
			characterNames: ["陈旻"],
			categoryName: "摄影与视觉",
			status: 3,
			progress: 8,
			total: 20,
		},
		{
			id: 2,
			cover: null,
			title: "中国建筑史：从木构到园林",
			characterNames: ["李明"],
			categoryName: "人文与艺术",
			status: 3,
			progress: 4,
			total: 18,
		},
		{
			id: 3,
			cover: null,
			title: "用摄影，重新发现日常",
			characterNames: ["陈旻"],
			categoryName: "摄影与视觉",
			status: 3,
			progress: 8,
			total: 20,
		},
	],
};

const mockLibraryDashboardStats = http.get(`${apiPrefix}${LibraryDashboardApi.DashboardStats}`, async () => {
	return HttpResponse.json<Result & LibraryDashboardStatsRes>(
		{
			code: ResultEnum.SUCCESS,
			msg: "success",
			stats: dashboardStats,
		},
		{
			status: 200,
		},
	);
});

const mockLibraryDashboardInProgressList = http.get(
	`${apiPrefix}${LibraryDashboardApi.DashboardInProgressList}`,
	async () => {
		return HttpResponse.json<Result & LibraryDashboardInProgressListRes>(
			{
				code: ResultEnum.SUCCESS,
				msg: "success",
				inProgressList: dashboardInProgressList,
			},
			{
				status: 200,
			},
		);
	},
);

export { mockLibraryDashboardStats, mockLibraryDashboardInProgressList };
