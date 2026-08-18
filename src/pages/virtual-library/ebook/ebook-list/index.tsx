import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryEBookList } from "@/api/services/library-ebook.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { EBook } from "../../types";
import EBookEnumProvider, { useEBookEnumContext } from "./ebook-enum-provider";
import { EBookFilterForm } from "./ebook-filter-form";
import { EBookModal, type EBookModalProps } from "./ebook-modal";

const DEFAULT_EBOOK_VALUE: EBook = {
	id: undefined,
	title: "",
	oriTitle: "",
	cover: "",
	type: 1,
	author: [],
	categoryId: [],
	publishPlatformId: [],
	status: ReadStatus.UNREAD,
	rating: 0,
	noteBookId: "",
	tagId: "",
};

interface TableParams {
	page: number;
	limit: number;
	publishPlatformId?: number;
	categoryId?: string;
	status?: ReadStatus;
	rating?: number;
	search?: string;
}

export default function EBookListPage() {
	const [ebookList, setEBookList] = useState<EBook[]>([]);
	const [tableParams, setTableParams] = useState<TableParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(0);
	const [ebookModalProps, setEBookModalProps] = useState<EBookModalProps>({
		formValue: { ...DEFAULT_EBOOK_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setEBookModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setEBookModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getEBookList();
	}, [refresh]);

	const getEBookList = async () => {
		const dataList = (await apiLibraryEBookList(toURLSearchParams(tableParams))).page.list || [];
		setEBookList(
			dataList.map((item) => {
				const { authorId, authorName } = item;
				const newAuthorId = authorId?.split(",") || [];
				const newAuthorName = authorName?.split(",") || [];
				return {
					...item,
					author: newAuthorId.map((item, index) => ({
						id: item,
						name: newAuthorName[index],
					})),
					categoryId: item.categoryId?.split(",").map(Number) || [],
					publishPlatformId: item.publishPlatformId?.split(",").map(Number) || [],
				};
			}),
		);
		setLoading(false);
	};

	const columns: ColumnsType<EBook> = [
		{
			title: "No",
			render: (_, record, index) => index + 1,
			width: 50,
		},
		{
			title: "Title",
			dataIndex: "title",
			width: 200,
		},
		{
			title: "Author",
			dataIndex: "author",
			width: 200,
			render: (author: EBook["author"]) => {
				return author.map((item) => item.name).join(", ") || "-";
			},
		},
		{
			title: "Category",
			dataIndex: "categoryId",
			width: 200,
			render: (categoryId: EBook["categoryId"]) => <CategoryCell categoryId={categoryId} />,
		},
		{
			title: "Publish Platform",
			dataIndex: "publishPlatformId",
			width: 200,
			render: (publishPlatformId) => <PublishPlatformCell publishPlatformId={publishPlatformId} />,
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray">
					<Button variant="ghost" size="icon" onClick={() => onEdit(record)}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant="ghost" size="icon">
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
				</div>
			),
		},
	];

	const onCreate = () => {
		setEBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				...DEFAULT_EBOOK_VALUE,
			},
		}));
	};

	const onEdit = (formValue: EBook) => {
		setEBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<EBookEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>EBook List</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<EBookFilterForm
						formValue={tableParams}
						setTableParams={setTableParams}
						onSearch={() => setRefresh(Date.now())}
					/>
				</CardHeader>
				<CardContent>
					<Table
						loading={loading}
						rowKey={"id"}
						size="small"
						scroll={{ x: "max-content" }}
						pagination={false}
						columns={columns}
						dataSource={ebookList}
					/>
				</CardContent>
				<EBookModal {...ebookModalProps} />
			</EBookEnumProvider>
		</Card>
	);
}

const CategoryCell = ({ categoryId }: { categoryId: EBook["categoryId"] }) => {
	const { category } = useEBookEnumContext();
	const categoryName = categoryId?.map((item) => category.find((cat) => cat.id === Number(item))?.name || "-");
	return (
		<>
			{categoryName?.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: false
				<Badge key={index}>{item}</Badge>
			))}
		</>
	);
};

const PublishPlatformCell = ({ publishPlatformId }: { publishPlatformId: EBook["publishPlatformId"] }) => {
	const { publishPlatform } = useEBookEnumContext();
	const publishPlatformName = publishPlatformId?.map(
		(item) => publishPlatform.find((cat) => cat.id === Number(item))?.name || "-",
	);
	return (
		<>
			{publishPlatformName?.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: false
				<Badge key={index}>{item}</Badge>
			))}
		</>
	);
};
