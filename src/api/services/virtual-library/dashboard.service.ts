import apiClient from "../../apiClient";

export type LibraryDashboardStatsRes = {
	stats: {
		[key in "bookStats" | "ebookStats" | "movieStats" | "lessonStats"]: {
			wantToRead: number;
			unread: number;
			paused: number;
			reading: number;
			abandoned: number;
			finished: number;
			total: number;
		};
	};
};

export type LibraryDashboardInProgressListRes = {
	inProgressList: {
		[key in "bookList" | "ebookList" | "movieList" | "lessonList"]: {
			id: number;
			cover: string | null;
			title: string;
			characterNames: string[];
			categoryName: string;
			status: number;
			progress: number;
			total: number;
		}[];
	};
};

export enum LibraryDashboardApi {
	// 获取书籍列表
	DashboardStats = "/library/dashboard/stats",
	// 获取书籍详情
	DashboardInProgressList = "/library/dashboard/in-progress",
}

const apiLibraryDashboardStats = (params?: URLSearchParams) =>
	apiClient.get<LibraryDashboardStatsRes>({
		url: LibraryDashboardApi.DashboardStats,
		params,
	});

const apiLibraryDashboardInProgressList = () =>
	apiClient.get<LibraryDashboardInProgressListRes>({
		url: LibraryDashboardApi.DashboardInProgressList,
	});

export { apiLibraryDashboardStats, apiLibraryDashboardInProgressList };
