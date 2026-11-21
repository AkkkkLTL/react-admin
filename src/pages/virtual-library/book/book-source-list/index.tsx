import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryBookSourceList,
	type LibraryBookSourceSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { useDataFilter } from "@/hooks/use-data-filter";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Input } from "@/ui/input";
import { rgbAlpha } from "@/utils/theme";
import type { BookPublisher } from "../../types";
import { SourceModal, type SourceModalProps } from "./source-modal";
import { SourceTable } from "./source-table";

const DEFAULT_BOOK_SOURCE_VALUE: LibraryBookSourceSaveReq = {
	id: undefined,
	name: "",
};

export default function BookSourceListPage() {
	const [loading, setLoading] = useState(false);
	const [sourceList, setSourceList] = useState<LibraryBookSourceSaveReq[]>([]);
	const [refresh, setRefresh] = useState(0);
	const [count, setCount] = useState(0);
	const [bookSourceModalProps, setBookSourceModalProps] = useState<SourceModalProps>({
		formValue: { ...DEFAULT_BOOK_SOURCE_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setBookSourceModalProps((prev) => ({ ...prev, show: false }));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setBookSourceModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	useEffect(() => {
		setLoading(true);
		getBookSourceList();
	}, [refresh]);

	const { searchValue, handleInputChange, filteredData } = useDataFilter<BookPublisher>({
		dataSource: sourceList,
	});

	const getBookSourceList = async () => {
		const res = ((await apiLibraryBookSourceList()).page.list || []) as LibraryBookSourceSaveReq[];
		setSourceList(res);
		setCount(res.length);
		setLoading(false);
	};

	const onCreate = () => {
		setBookSourceModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_BOOK_SOURCE_VALUE,
			},
		}));
	};

	const onEdit = (formValue: LibraryBookSourceSaveReq) => {
		setBookSourceModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	// const onDelete = async (id: number) => {
	// 	try {
	// 		await apiLibraryBookSourceDelete(id);
	// 		setRefresh(Date.now());
	// 		setSourceList(sourceList.filter((item) => item.id !== id));
	// 	} catch (error) {
	// 		console.log("Delete Failed:", error);
	// 	}
	// };

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="px-0 py-4">
				{/* 列表标题栏 */}
				<div className="flex items-center justify-between px-4">
					<div className="flex flex-col items-start gap-1">
						<div className="flex flex-row gap-2 items-center">
							<div className="text-base font-bold">阅读来源</div>
							<Badge
								variant="default"
								className="text-gray-500"
								style={{ background: rgbAlpha(themeVars.colors.palette.gray["500Channel"], 0.1) }}
							>
								{count || 0}
							</Badge>
						</div>
						<span className="text-xs text-gray-500">记录纸质书从哪里购入或借阅，不用于电子阅读平台。</span>
					</div>
					{/* 列表操作 */}
					<div className="flex flex-row gap-4 items-center">
						<Input value={searchValue} onChange={handleInputChange} placeholder="搜索来源名称" />
						<Button className="bg-primary text-white" onClick={onCreate}>
							{"+ "} 新增来源
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="px-0">
				<SourceTable loading={loading} dataSource={filteredData} operations={{ onEdit }} />
			</CardContent>
			<CardFooter className="border-t px-4 [.border-t]:pt-4 pb-4">
				<div className="w-full flex flex-row justify-between items-center">
					<span className="text-xs text-gray-500">{`共 ${count || 0} 个来源 · 已显示全部`}</span>
					<span className="text-xs text-gray-500">灰色「删除」表示条目仍有关联书籍</span>
				</div>
			</CardFooter>
			<SourceModal {...bookSourceModalProps} />
		</Card>
	);
}
