import { useEffect, useState } from "react";
import {
	apiLibraryBookPublisherList,
	type LibraryBookPublisherSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { useDataFilter } from "@/hooks/use-data-filter";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Input } from "@/ui/input";
import { rgbAlpha } from "@/utils/theme";
import type { BookPublisher } from "../../types";
import { PublisherModal, type PublisherModalProps } from "./publisher-modal";
import { PublisherTable } from "./publisher-table";

const DEFAULT_PUBLISHER_VALUE: LibraryBookPublisherSaveReq = {
	id: undefined,
	name: "",
};

export default function BookPublisherListPage() {
	const [loading, setLoading] = useState(false);
	const [publisherList, setPublisherList] = useState<LibraryBookPublisherSaveReq[]>([]);
	const [refresh, setRefresh] = useState(0);
	const [count, setCount] = useState(0);
	const [bookPublisherModalProps, setBookPublisherModalProps] = useState<PublisherModalProps>({
		formValue: { ...DEFAULT_PUBLISHER_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setBookPublisherModalProps((prev) => ({ ...prev, show: false }));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setBookPublisherModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	useEffect(() => {
		setLoading(true);
		getBookPublisherList();
	}, [refresh]);

	const { searchValue, handleInputChange, filteredData } = useDataFilter<BookPublisher>({
		dataSource: publisherList,
	});

	const getBookPublisherList = async () => {
		const res = ((await apiLibraryBookPublisherList()).page.list || []) as LibraryBookPublisherSaveReq[];
		setPublisherList(res);
		setCount(res.length);
		setLoading(false);
	};

	const onCreate = () => {
		setBookPublisherModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_PUBLISHER_VALUE,
			},
		}));
	};

	const onEdit = (formValue: LibraryBookPublisherSaveReq) => {
		setBookPublisherModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="px-0 py-4">
				<div className="flex items-center justify-between px-4">
					<div className="flex flex-col items-start gap-1">
						<div className="flex flex-row gap-2 items-center">
							<div className="text-base font-bold">出版社</div>
							<Badge
								variant="default"
								className="text-gray-500"
								style={{ background: rgbAlpha(themeVars.colors.palette.gray["500Channel"], 0.1) }}
							>
								{count || 0}
							</Badge>
						</div>
						<span className="text-xs text-gray-500">管理图书出版方信息，方便归类和筛选。</span>
					</div>
					<div className="flex flex-row gap-4 items-center">
						<Input value={searchValue} onChange={handleInputChange} placeholder="搜索出版社名称" />
						<Button className="bg-primary text-white" onClick={onCreate}>
							{"+ "} 新增出版社
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="px-0">
				<PublisherTable loading={loading} dataSource={filteredData} operations={{ onEdit }} />
			</CardContent>
			<CardFooter className="border-t px-4 [.border-t]:pt-4 pb-4">
				<div className="w-full flex flex-row justify-between items-center">
					<span className="text-xs text-gray-500">{`共 ${count || 0} 个出版社 · 已显示全部`}</span>
					<span className="text-xs text-gray-500">灰色「删除」表示条目仍有关联书籍</span>
				</div>
			</CardFooter>
			<PublisherModal {...bookPublisherModalProps} />
		</Card>
	);
}
