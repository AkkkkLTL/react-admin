import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	apiLibraryDashboardInProgressList,
	apiLibraryDashboardStats,
	type LibraryDashboardInProgressListRes,
	type LibraryDashboardRes,
} from "@/api/services/virtual-library/dashboard.service";
import defaultCover from "@/assets/images/placeholder-50x75.png";
import { Chart, useChart } from "@/components/chart";
import { Icon } from "@/components/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { themeVars } from "@/theme/theme.css";
import { ReadStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { ScrollArea } from "@/ui/scroll-area";
import { Text } from "@/ui/typography";
import { rgbAlpha } from "@/utils/theme";

type QuickState = {
	icon: string;
	title: string;
	subTitle: string;
	series: number[];
	labels: string[];
	percent: number;
	details: { label: string; value: number }[];
};

type OverviewTotal = {
	total: number;
	progress: number;
	finished: number;
};

type InProgressCard = {
	contentType: string;
	icon: string;
	title: string;
	label: string;
	link: string;
	list: LibraryDashboardInProgressListRes["data"]["bookList" | "ebookList" | "lessonList" | "movieList"];
};

// const quickState = [
// 	{
// 		icon: "material-symbols:book-ribbon-outline",
// 		title: "纸质书",
// 		subTitle: "BOOK",
// 		series: [42, 2, 84],
// 		labels: ["未读", "在读", "已读"],
// 		percent: 66,
// 		details: [
// 			{ label: "未读", value: 42 },
// 			{ label: "在读", value: 2 },
// 			{ label: "已读", value: 84 },
// 		],
// 	},
// 	{
// 		icon: "material-symbols:globe-book",
// 		title: "电子书",
// 		subTitle: "EBOOK",
// 		series: [30, 2, 54],
// 		labels: ["未读", "在读", "已读"],
// 		percent: 63,
// 		details: [
// 			{ label: "未读", value: 30 },
// 			{ label: "在读", value: 2 },
// 			{ label: "已读", value: 54 },
// 		],
// 	},
// 	{
// 		icon: "mynaui:graduation-cap",
// 		title: "课程",
// 		subTitle: "LESSON",
// 		series: [8, 2, 14],
// 		labels: ["未学", "学习中", "已完成"],
// 		percent: 58,
// 		details: [
// 			{ label: "未学", value: 8 },
// 			{ label: "学习中", value: 2 },
// 			{ label: "已完成", value: 14 },
// 		],
// 	},
// 	{
// 		icon: "lucide:clapperboard",
// 		title: "影视",
// 		subTitle: "MOVIE",
// 		series: [18, 2, 42],
// 		labels: ["未看", "在看", "已看"],
// 		percent: 68,
// 		colors: ["#E8E7DD", "#347564", "#A2B5A2"],
// 		details: [
// 			{ label: "未看", value: 18 },
// 			{ label: "在看", value: 2 },
// 			{ label: "已看", value: 42 },
// 		],
// 	},
// ];

// const inprogressCard = [
// 	{
// 		contentType: "BOOK",
// 		icon: "material-symbols:book-ribbon-outline",
// 		title: "纸质书",
// 		label: "在读",
// 		link: "/library/book",
// 		list: [
// 			{
// 				id: 230,
// 				cover: null,
// 				title: "把自己作为方法",
// 				characterNames: ["项飙", "吴琦"],
// 				categoryName: "人物访谈",
// 				status: 3,
// 				progress: 198,
// 				total: 320,
// 			},
// 			{
// 				id: 231,
// 				cover: null,
// 				title: "也许你该找个人聊聊",
// 				characterNames: ["洛莉·戈特利布"],
// 				categoryName: "心理学",
// 				status: 3,
// 				progress: 96,
// 				total: 272,
// 			},
// 			{
// 				id: 232,
// 				cover: null,
// 				title: "把自己作为方法",
// 				characterNames: ["项飙", "吴琦"],
// 				categoryName: "人物访谈",
// 				status: 3,
// 				progress: 198,
// 				total: 320,
// 			},
// 			{
// 				id: 233,
// 				cover: null,
// 				title: "也许你该找个人聊聊",
// 				characterNames: ["洛莉·戈特利布"],
// 				categoryName: "心理学",
// 				status: "inprogress",
// 				progress: 96,
// 				total: 272,
// 			},
// 		],
// 	},
// 	{
// 		contentType: "EBOOK",
// 		icon: "material-symbols:globe-book",
// 		title: "电子书",
// 		label: "在读",
// 		link: "/library/ebook",
// 		list: [
// 			{
// 				id: 1,
// 				cover: null,
// 				title: "悉达多",
// 				characterNames: ["赫尔曼·黑塞"],
// 				categoryName: "文学",
// 				status: 3,
// 				progress: 43,
// 				total: 100,
// 			},
// 			{
// 				id: 2,
// 				cover: null,
// 				title: "认知觉醒",
// 				characterNames: ["周岭"],
// 				categoryName: "个人成长",
// 				status: 3,
// 				progress: 26,
// 				total: 100,
// 			},
// 			{
// 				id: 3,
// 				cover: null,
// 				title: "悉达多",
// 				characterNames: ["赫尔曼·黑塞"],
// 				categoryName: "文学",
// 				status: 3,
// 				progress: 43,
// 				total: 100,
// 			},
// 		],
// 	},
// 	{
// 		contentType: "LESSON",
// 		icon: "mynaui:graduation-cap",
// 		title: "课程",
// 		label: "学习中",
// 		link: "/library/lesson",
// 		list: [
// 			{
// 				id: 1,
// 				cover: null,
// 				title: "用摄影，重新发现日常",
// 				characterNames: ["陈旻"],
// 				categoryName: "摄影与视觉",
// 				status: 3,
// 				progress: 8,
// 				total: 20,
// 			},
// 			{
// 				id: 2,
// 				cover: null,
// 				title: "中国建筑史：从木构到园林",
// 				characterNames: ["李明"],
// 				categoryName: "人文与艺术",
// 				status: 3,
// 				progress: 4,
// 				total: 18,
// 			},
// 			{
// 				id: 3,
// 				cover: null,
// 				title: "用摄影，重新发现日常",
// 				characterNames: ["陈旻"],
// 				categoryName: "摄影与视觉",
// 				status: 3,
// 				progress: 8,
// 				total: 20,
// 			},
// 		],
// 	},
// 	{
// 		contentType: "MOVIE",
// 		icon: "lucide:clapperboard",
// 		title: "影视",
// 		label: "在看",
// 		link: "/library/movie",
// 		list: [
// 			{
// 				id: 1,
// 				cover: null,
// 				title: "完美的日子",
// 				characterNames: ["维姆·文德斯"],
// 				categoryName: 2023,
// 				status: 3,
// 				progress: 48,
// 				total: 124,
// 			},
// 			{
// 				id: 2,
// 				cover: null,
// 				title: "海街日记",
// 				characterNames: ["是枝裕和"],
// 				categoryName: 2015,
// 				status: 3,
// 				progress: 67,
// 				total: 127,
// 			},
// 			{
// 				id: 3,
// 				cover: null,
// 				title: "完美的日子",
// 				characterNames: ["维姆·文德斯"],
// 				categoryName: 2023,
// 				status: 3,
// 				progress: 48,
// 				total: 124,
// 			},
// 		],
// 	},
// ];

export default function Workbench() {
	const pieOptions = useChart({
		colors: ["#E8E7DD", "#347564", "#A2B5A2"],
		stroke: {
			show: false,
		},
		legend: {
			horizontalAlign: "center",
		},
		tooltip: {
			fillSeriesColor: false,
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			pie: {
				donut: {
					size: "81%",
					labels: {
						name: {
							offsetY: 17,
						},
						value: {
							offsetY: -17,
							fontSize: "24",
						},
						total: {
							label: "总收录",
							fontSize: "10",
						},
					},
				},
			},
		},
	});

	const [dashboardStats, setDashboardStats] = useState<LibraryDashboardRes["stats"]>();
	const [dashboardInProgressList, setDashboardInProgressList] = useState<LibraryDashboardInProgressListRes["data"]>();

	const overviewTotal: OverviewTotal = useMemo(() => {
		if (!dashboardStats) return { total: 0, progress: 0, finished: 0 };
		const { bookStats, ebookStats, lessonStats, movieStats } = dashboardStats;
		return {
			total: bookStats.total + ebookStats.total + lessonStats.total + movieStats.total,
			progress:
				bookStats.reading +
				bookStats.paused +
				(ebookStats.reading + ebookStats.paused) +
				(lessonStats.reading + lessonStats.paused) +
				(movieStats.reading + movieStats.paused),
			finished:
				bookStats.abandoned +
				bookStats.finished +
				(ebookStats.abandoned + ebookStats.finished) +
				(lessonStats.abandoned + lessonStats.finished) +
				(movieStats.abandoned + movieStats.finished),
		};
	}, [dashboardStats]);
	const quickState: QuickState[] = useMemo(() => {
		if (!dashboardStats) return [];
		const { bookStats, ebookStats, lessonStats, movieStats } = dashboardStats;
		return [
			{
				icon: "material-symbols:book-ribbon-outline",
				title: "纸质书",
				subTitle: "BOOK",
				series: [
					bookStats.wantToRead + bookStats.unread,
					bookStats.reading + bookStats.paused,
					bookStats.abandoned + bookStats.finished,
				],
				labels: ["未读", "在读", "已读"],
				percent: Number(((bookStats.abandoned + bookStats.finished) / bookStats.total).toFixed(2)) * 100,
				details: [
					{ label: "未读", value: bookStats.wantToRead + bookStats.unread },
					{ label: "在读", value: bookStats.reading + bookStats.paused },
					{ label: "已读", value: bookStats.abandoned + bookStats.finished },
				],
			},
			{
				icon: "material-symbols:globe-book",
				title: "电子书",
				subTitle: "EBOOK",
				series: [
					ebookStats.wantToRead + ebookStats.unread,
					ebookStats.reading + ebookStats.paused,
					ebookStats.abandoned + ebookStats.finished,
				],
				labels: ["未读", "在读", "已读"],
				percent: Number(((ebookStats.abandoned + ebookStats.finished) / ebookStats.total).toFixed(2)) * 100,
				details: [
					{ label: "未读", value: ebookStats.wantToRead + ebookStats.unread },
					{ label: "在读", value: ebookStats.reading + ebookStats.paused },
					{ label: "已读", value: ebookStats.abandoned + ebookStats.finished },
				],
			},
			{
				icon: "mynaui:graduation-cap",
				title: "课程",
				subTitle: "LESSON",
				series: [
					lessonStats.wantToRead + lessonStats.unread,
					lessonStats.reading + lessonStats.paused,
					lessonStats.abandoned + lessonStats.finished,
				],
				labels: ["未学", "学习中", "已完成"],
				percent: Number(((lessonStats.abandoned + lessonStats.finished) / lessonStats.total).toFixed(2)) * 100,
				details: [
					{ label: "未学", value: lessonStats.wantToRead + lessonStats.unread },
					{ label: "学习中", value: lessonStats.reading + lessonStats.paused },
					{ label: "已完成", value: lessonStats.abandoned + lessonStats.finished },
				],
			},
			{
				icon: "lucide:clapperboard",
				title: "影视",
				subTitle: "MOVIE",
				series: [
					movieStats.wantToRead + movieStats.unread,
					movieStats.reading + movieStats.paused,
					movieStats.abandoned + movieStats.finished,
				],
				labels: ["未看", "在看", "已看"],
				percent: Number(((movieStats.abandoned + movieStats.finished) / movieStats.total).toFixed(2)) * 100,
				details: [
					{ label: "未看", value: movieStats.wantToRead + movieStats.unread },
					{ label: "在看", value: movieStats.reading + movieStats.paused },
					{ label: "已看", value: movieStats.abandoned + movieStats.finished },
				],
			},
		];
	}, [dashboardStats]);
	const inprogressCard: InProgressCard[] = useMemo(() => {
		if (!dashboardInProgressList) return [];
		const { bookList, ebookList, lessonList, movieList } = dashboardInProgressList;
		return [
			{
				contentType: "BOOK",
				icon: "material-symbols:book-ribbon-outline",
				title: "纸质书",
				label: "在读",
				link: "/library/book",
				list: bookList,
			},
			{
				contentType: "EBOOK",
				icon: "material-symbols:globe-book",
				title: "电子书",
				label: "在读",
				link: "/library/ebook",
				list: ebookList,
			},
			{
				contentType: "LESSON",
				icon: "mynaui:graduation-cap",
				title: "课程",
				label: "学习中",
				link: "/library/lesson",
				list: lessonList,
			},
			{
				contentType: "MOVIE",
				icon: "lucide:clapperboard",
				title: "影视",
				label: "在看",
				link: "/library/movie",
				list: movieList,
			},
		];
	}, [dashboardInProgressList]);

	useEffect(() => {
		apiLibraryDashboardStats().then((res) => {
			setDashboardStats(res.stats);
		});
	}, []);

	useEffect(() => {
		apiLibraryDashboardInProgressList().then((res) => {
			setDashboardInProgressList(res.data);
		});
	}, []);

	return (
		// 工作台
		<div className="flex flex-col w-full gap-6">
			{/* 欢迎与总览 */}
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-2">
					<span className="text-3xl text-foreground">为好奇心，留一隅</span>
					<span className="text-sm text-gray-500">
						欢迎回来，{GLOBAL_CONFIG.appName}。接着上次的进度，慢慢读，认真看。
					</span>
				</div>
				<div className="flex flex-row gap-6">
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-foreground">{overviewTotal.total}</div>
						<div className="text-sm text-gray-500">总收录</div>
					</div>
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-foreground">{overviewTotal.progress}</div>
						<div className="text-sm text-gray-500">正在进行</div>
					</div>
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-foreground">{overviewTotal.finished}</div>
						<div className="text-sm text-gray-500">已完成</div>
					</div>
				</div>
			</div>

			{/* 收藏概览 */}
			<div className="flex flex-col gap-3">
				<span className="text-lg font-bold text-foreground">收藏概览</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{quickState.map((stat) => (
						<Card key={stat.title} className="flex flex-col justify-between h-full py-5 px-5">
							<CardHeader className="px-0">
								<CardTitle>
									<div className="flex flex-row justify-between">
										<div className="flex items-center gap-2">
											<div
												className="rounded-lg p-2"
												style={{ background: rgbAlpha(themeVars.colors.palette.primary.defaultChannel, 0.1) }}
											>
												<Icon icon={stat.icon} size={15} color={themeVars.colors.palette.primary.default} />
											</div>
											<Text variant={"body2"} className="font-bold">
												{stat.title}
											</Text>
										</div>
										<Text variant={"caption"} className="flex items-center text-gray-500">
											{stat.subTitle}
										</Text>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-row gap-4 px-0">
								<Chart
									type="donut"
									height={106}
									width={106}
									options={{ ...pieOptions, labels: stat.labels }}
									series={stat.series}
								/>
								<div className="flex flex-col grow gap-3 justify-center">
									{stat.details.map((item, index) => (
										<div key={item.label} className="flex flex-row justify-between">
											<div className="flex flex-row justify-center items-center gap-2">
												<div
													className="rounded-md size-2"
													style={{ backgroundColor: ["#E8E7DD", "#347564", "#A2B5A2"][index] }}
												/>
												<span className="text-sm text-gray-500">{item.label}</span>
											</div>
											<span className="text-sm font-medium">{item.value}</span>
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter className="px-0 border-t-2 border-t-[#E3E5DC]">
								<div className="flex flex-row grow justify-between items-center pt-3">
									<span className="text-xs text-gray-500">完成率</span>
									<span className="text-sm font-medium text-primary">{stat.percent}%</span>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>

			{/* 继续进行 */}
			<div className="flex flex-col gap-3">
				<div className="flex flex-row gap-3 items-center">
					<span className="text-lg font-bold text-foreground">接着上次，继续探索</span>
					<span className="text-xs text-gray-500">
						{(dashboardInProgressList?.bookList?.length || 0) +
							(dashboardInProgressList?.ebookList?.length || 0) +
							(dashboardInProgressList?.lessonList?.length || 0) +
							(dashboardInProgressList?.movieList?.length || 0)}{" "}
						项正在进行
					</span>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* BOOK / EBOOK / LESSON / MOVIE */}
					{inprogressCard.map((content) => (
						<Card key={content.contentType} className="flex flex-col py-5 px-5 gap-3">
							<CardHeader className="px-0 gap-0">
								<CardTitle>
									<div className="flex flex-row justify-between">
										<div className="flex items-center gap-2">
											<Icon icon={content.icon} size={15} color={themeVars.colors.palette.primary.default} />
											<Text variant={"body2"} className="font-bold">
												{content.title}
											</Text>
											<div
												className="rounded-md py-1 px-2"
												style={{ background: rgbAlpha(themeVars.colors.palette.primary.defaultChannel, 0.1) }}
											>
												<Text
													variant={"caption"}
													className="text-primary"
												>{`${content.label} ${content.list.length}`}</Text>
											</div>
										</div>
										<NavLink to={content.link} className="flex flex-row items-center gap-1">
											<Text variant={"caption"} className="flex items-center text-primary">
												查看全部
											</Text>
											<Icon
												icon="material-symbols:arrow-outward-rounded"
												size={14}
												color={themeVars.colors.palette.primary.default}
											/>
										</NavLink>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="px-0 h-[180px]">
								<ScrollArea className="h-full">
									<table className="w-full text-sm">
										<tbody>
											{content.list.map((item) => (
												<tr key={item.id} className="border-b last:border-0">
													{/* 封面 */}
													<td className="py-2 w-12">
														<span className="inline-flex items-center justify-center aspect-[2/3]">
															<img src={item.cover || defaultCover} alt={item.title} className="rounded-sm" />
														</span>
													</td>
													{/* 信息 */}
													<td className="py-2 px-4 relative">
														<div className=" py-2 px-4 absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-center gap-3">
															<div className="flex flex-col gap-1">
																<div className="font-medium text-default whitespace-nowrap">{item.title}</div>
																<div className="text-xs text-gray-500 whitespace-nowrap">
																	{content.contentType === "BOOK" &&
																		`${item.characterNames?.join("、")} 著 · ${item.categoryName}`}
																	{content.contentType === "EBOOK" &&
																		`${item.characterNames?.join("、")} 著 · ${item.categoryName}`}
																	{content.contentType === "LESSON" &&
																		`${item.characterNames?.join("、")} 主讲 · ${item.categoryName}`}
																	{content.contentType === "MOVIE" &&
																		`${item.characterNames?.join("、")} 导演 · ${item.categoryName}`}
																</div>
															</div>
															<div className="flex flex-row gap-3 items-center">
																<Progress value={(item.progress / item.total) * 100} />
																<Text variant={"caption"} className="text-gray-500 whitespace-nowrap">
																	{content.contentType === "BOOK" && `${item.progress} / ${item.total} 页`}
																	{content.contentType === "EBOOK" &&
																		`已读 ${Number((item.progress / item.total).toFixed(2)) * 100}%`}
																	{content.contentType === "LESSON" && `${item.progress} / ${item.total} 课时`}
																	{content.contentType === "MOVIE" && `${item.progress} / ${item.total} 分钟`}
																</Text>
															</div>
														</div>
													</td>
													{/* 状态 */}
													<td className="px-3 py-2 text-right font-bold">
														<div className="flex justify-end">
															<div className="flex flex-col gap-2 items-center">
																<Button
																	variant="default"
																	className="rounded-full px-2 text-primary"
																	style={{ background: rgbAlpha(themeVars.colors.palette.primary.defaultChannel, 0.1) }}
																>
																	{item.status === ReadStatus.READING ? (
																		<Icon icon="material-symbols:pause-rounded" size={13} />
																	) : (
																		<Icon icon="material-symbols:arrow-right-alt" size={13} />
																	)}
																</Button>
																<Text variant={"caption"} className="text-primary whitespace-nowrap">
																	{item.status === ReadStatus.READING ? "暂停阅读" : "继续阅读"}
																</Text>
															</div>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</ScrollArea>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
