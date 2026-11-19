import { Pagination, type PaginationProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
	apiLibraryDashboardStats,
	type LibraryDashboardStatsRes,
} from "@/api/services/virtual-library/dashboard.service";
import {
	apiLibraryBookList,
	type BookListQuery,
	type LibraryBookListRes,
	type LibraryBookSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { ReadStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { PaginationNext, PaginationPrevious } from "@/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { cn, toURLSearchParams } from "@/utils";
import { rgbAlpha } from "@/utils/theme";
import { ContentType } from "../../enum";
import type { Book } from "../../types";
import BookEnumProvider from "./book-enum-provider";
import { BookFilterForm } from "./book-filter-form";
import { BookModal, type BookModalProps } from "./book-modal";
import { BookTable } from "./book-table";

const DEFAULT_BOOK_VALUE: LibraryBookSaveReq = {
	id: undefined,
	isbn: "",
	title: "",
	subtitle: "",
	originalTitle: "",
	cover: "",
	authors: [],
	translators: [],
	publisherId: undefined,
	publishDate: "",
	overview: "",
	edition: undefined,
	binding: undefined,
	pages: undefined,
	currency: undefined,
	price: undefined,
	categoryId: undefined,
	sourceIds: [],
	readStatus: ReadStatus.UNREAD,
	rating: 0,
	deleteAuthorIds: [],
	deleteTranslatorIds: [],
};

export default function BookListPage() {
	const [bookList, setBookList] = useState<Book[]>([]);
	const [overviewTotal, setOverviewTotal] = useState<LibraryDashboardStatsRes["stats"]["bookStats"]>();
	const [pageStatus, setPageStatus] = useState<Omit<LibraryBookListRes["page"], "list">>({
		totalCount: 0,
		pageSize: 0,
		totalPage: 0,
		currPage: 0,
	});
	const [tableParams, setTableParams] = useState<BookListQuery>({
		page: 1,
		limit: 10,
		keyword: "",
		readStatus: "",
		publisherId: "",
		categoryId: "",
		sortField: "read_status",
		asc: true,
	});
	const [loading, setLoading] = useState(false);
	const [listRefresh, setListRefresh] = useState(Date.now());
	const [overviewRefresh, setOverviewRefresh] = useState(Date.now());
	const [bookModalProps, setBookModalProps] = useState<BookModalProps>({
		formValue: structuredClone(DEFAULT_BOOK_VALUE),
		title: "新增纸质书",
		show: false,
		onOk: () => {
			// 关闭弹窗时，清空表单数据(使用structuredClone深拷贝默认值)
			setBookModalProps((prev) => ({ ...prev, formValue: structuredClone(DEFAULT_BOOK_VALUE), show: false }));
			setListRefresh(Date.now());
			setOverviewRefresh(Date.now());
		},
		onCancel: () => {
			setBookModalProps((prev) => ({ ...prev, formValue: structuredClone(DEFAULT_BOOK_VALUE), show: false }));
		},
	});

	const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
		if (type === "prev") {
			return (
				<PaginationPrevious
					href=""
					className={cn(
						"hover:bg-transparent font-normal gap-1 pr-1.5!",
						pageStatus.currPage === 1 ? "text-gray-500 hover:text-gray-500" : "text-black!",
					)}
					disabled={pageStatus.currPage === 1}
					text="上一页"
					onClick={handlePagePrevious}
				/>
			);
		}
		if (type === "next") {
			return (
				<PaginationNext
					href=""
					className={cn(
						"hover:bg-transparent font-normal gap-1 pl-1.5!",
						pageStatus.currPage === pageStatus.totalPage ? "text-gray-500 hover:text-gray-500" : "text-black!",
					)}
					disabled={pageStatus.currPage === pageStatus.totalPage}
					text="下一页"
					onClick={handlePageNext}
				/>
			);
		}

		return originalElement;
	};

	const handlePageSizeChange = useCallback((pageSize: string) => {
		setTableParams((prev) => ({
			...prev,
			limit: Number(pageSize) || 10,
		}));
		setListRefresh(Date.now());
	}, []);

	const handlePageChange = useCallback((page: number) => {
		setTableParams((prev) => ({
			...prev,
			page,
		}));
		setListRefresh(Date.now());
	}, []);

	const handlePagePrevious = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault();
			if (pageStatus.currPage > 1) {
				handlePageChange(pageStatus.currPage - 1);
			}
		},
		[handlePageChange],
	);

	const handlePageNext = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault();
			if (pageStatus.currPage < pageStatus.totalPage) {
				handlePageChange(pageStatus.currPage + 1);
			}
		},
		[handlePageChange],
	);

	useEffect(() => {
		setLoading(true);
		getBookList();
	}, [listRefresh]);

	useEffect(() => {
		getOverviewTotal();
	}, [overviewRefresh]);

	const getBookList = useCallback(async () => {
		try {
			const res = await apiLibraryBookList(toURLSearchParams(tableParams));
			const dataList = res.page.list || [];
			setPageStatus({
				totalCount: res.page.totalCount || 0,
				pageSize: res.page.pageSize || 10,
				totalPage: res.page.totalPage || 1,
				currPage: res.page.currPage || 1,
			});
			setBookList(dataList);
			setLoading(false);
		} catch (_error) {
			setLoading(false);
		}
	}, [tableParams]);

	const getOverviewTotal = useCallback(async () => {
		try {
			const res = await apiLibraryDashboardStats(toURLSearchParams({ contentType: ContentType.Book }));
			setOverviewTotal(res.stats.bookStats);
		} catch (_error) {
			setOverviewTotal(undefined);
		}
	}, []);

	const onCreate = () => {
		setBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "新增纸质书",
			formValue: structuredClone(DEFAULT_BOOK_VALUE),
		}));
	};

	const onEdit = (formValue: LibraryBookSaveReq) => {
		setBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "编辑纸质书",
			formValue,
		}));
	};

	return (
		<div className="flex flex-col w-full gap-6">
			{/* 说明与总览 */}
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-2">
					<span className="text-3xl text-foreground">纸质书</span>
					<span className="text-sm text-gray-500">让每一本好书，都在书房里有迹可循。</span>
				</div>
				<div className="flex flex-row gap-6">
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-foreground">{overviewTotal?.total || 0}</div>
						<div className="text-xs text-gray-500">总收录</div>
					</div>
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-[#7A8178]">
							{(overviewTotal?.wantToRead || 0) + (overviewTotal?.unread || 0)}
						</div>
						<div className="flex flex-row justify-center items-center gap-1">
							<div className="rounded-md size-1" style={{ backgroundColor: "#E8E7DD" }} />
							<span className="text-xs text-gray-500">未读</span>
						</div>
					</div>
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-[#347564]">
							{(overviewTotal?.reading || 0) + (overviewTotal?.paused || 0)}
						</div>
						<div className="flex flex-row justify-center items-center gap-1">
							<div className="rounded-md size-1" style={{ backgroundColor: "#347564" }} />
							<span className="text-xs text-gray-500">在读</span>
						</div>
					</div>
					<div className="flex flex-col items-end justify-end gap-1">
						<div className="text-2xl font-medium text-[#62765F]">
							{(overviewTotal?.finished || 0) + (overviewTotal?.abandoned || 0)}
						</div>
						<div className="flex flex-row justify-center items-center gap-1">
							<div className="rounded-md size-1" style={{ backgroundColor: "#A2B5A2" }} />
							<span className="text-sm text-gray-500">已读</span>
						</div>
					</div>
				</div>
			</div>
			{/* 纸质书管理列表 */}
			<Card className="gap-0">
				<BookEnumProvider>
					<CardHeader className="px-0">
						{/* 检索与排序 */}
						<BookFilterForm
							formValue={tableParams}
							setTableParams={setTableParams}
							onSearch={() => setListRefresh(Date.now())}
						/>
						{/* 列表标题栏 */}
						<div className="flex items-center justify-between py-2 border-t-1 border-t-[#E3E5DC] px-6">
							<div className="flex flex-row gap-2 items-center">
								<div className="text-sm font-bold">全部书籍</div>
								<Badge
									variant="default"
									className="text-gray-500"
									style={{ background: rgbAlpha(themeVars.colors.palette.gray["500Channel"], 0.1) }}
								>
									{pageStatus.totalCount || 0}
								</Badge>
							</div>
							{/* 列表操作 */}
							<div className="flex flex-row gap-4 items-center">
								{/* 视图说明 */}
								<div className="flex flex-row gap-2 items-center">
									<Icon
										icon="material-symbols:format-list-bulleted-rounded"
										size={15}
										color={themeVars.colors.palette.primary.default}
									/>
									<div className="text-primary text-sm">列表视图</div>
								</div>
								<Button className="bg-primary text-white" onClick={onCreate}>
									{"+ "} 新增纸质书
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="px-0">
						<BookTable loading={loading} dataSource={bookList} operations={{ onEdit }} />
					</CardContent>
					<CardFooter className="border-t">
						{/* 分页器 */}
						<div className="flex flex-row justify-between items-center w-full">
							{/* 分页信息 */}
							<div className="flex flex-row gap-4 items-center">
								<span className="text-sm text-gray-500 whitespace-nowrap">{`共 ${pageStatus.totalCount || 0} 本，当前显示 1-${pageStatus.pageSize || 0} 本`}</span>
								<Select value={pageStatus.pageSize.toString()} onValueChange={handlePageSizeChange}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent position="item-aligned">
										<SelectGroup>
											{["10", "20", "50"].map((item) => (
												<SelectItem key={item} value={item}>
													{`${item} 条 / 页`}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-row gap-2 items-center">
								<Pagination
									current={pageStatus.currPage}
									pageSize={pageStatus.pageSize}
									total={pageStatus.totalCount}
									showSizeChanger={false}
									itemRender={itemRender}
									onChange={handlePageChange}
									className="[&_.ant-pagination-item-active]:border-primary [&_.ant-pagination-item-active]:bg-primary [&_.ant-pagination-item-active_a]:text-white"
								/>
								<span className="text-sm text-gray-500">{`第 ${pageStatus.currPage} / ${pageStatus.totalPage} 页`}</span>
							</div>
							{/* 页数跳转 */}
						</div>
					</CardFooter>
					<BookModal {...bookModalProps} />
				</BookEnumProvider>
			</Card>
		</div>
	);
}
