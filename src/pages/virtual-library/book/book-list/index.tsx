import { Select } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	apiLibraryBookCategoryList,
	apiLibraryBookList,
	apiLibraryBookPublisherList,
	apiLibraryBookSourceList,
	type LibraryBookFilterParams,
	type LibraryBookListRes,
	type LibraryBookSaveReq,
} from "@/api/services/library-book.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import BookEnumProvider, { useBookEnumContext } from "./book-enum-provider";
import { BookFilterForm } from "./book-filter-form";
import { BookModal, type BookModalProps } from "./book-modal";

export type BookFormType = Omit<LibraryBookSaveReq, "authorId" | "authorName" | "translatorId" | "translatorName"> & {
	id?: number;
	author?: {
		id: string;
		name: string;
	}[];
	translator?: {
		id: string;
		name: string;
	}[];
};

const toURLSearchParams = <T extends Record<PropertyKey, any>>(record: T) => {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(record)) {
		if (value !== undefined && value !== "") params.append(key, value);
	}
	return params;
};

type DataType = LibraryBookListRes["page"]["list"][0];

const DEFAULT_BOOK_VALUE: BookFormType = {
	id: undefined,
	isbn: "",
	title: "",
	oriTitle: undefined,
	cover: undefined,
	author: [],
	translator: [],
	publisherId: undefined,
	publishDate: "",
	content: undefined,
	edition: undefined,
	binding: undefined,
	pages: undefined,
	currency: undefined,
	price: undefined,
	categoryId: undefined,
	sourceId: undefined,
	status: ReadStatus.UNREAD,
	rating: 0,
	noteBookId: "",
	tagId: "",
};

export default function BookListPage() {
	const [bookList, setBookList] = useState<BookFormType[]>([]);
	const [tableParams, setTableParams] = useState<LibraryBookFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [bookModalProps, setBookModalProps] = useState<BookModalProps>({
		formValue: { ...DEFAULT_BOOK_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setBookModalProps((prev) => ({ ...prev, show: false }));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setBookModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	useEffect(() => {
		setLoading(true);
		getBookList();
	}, [refresh]);

	const getBookList = async () => {
		const dataList = (await apiLibraryBookList(toURLSearchParams(tableParams))).page.list || [];
		setBookList(dataList);
		setLoading(false);
	};

	const columns: ColumnsType<LibraryBookListRes["page"]["list"][0]> = [
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
			title: "ISBN",
			dataIndex: "isbn",
			width: 200,
		},
		{
			title: "Author",
			dataIndex: "authorId",
			width: 200,
			render: (_, record) => {
				const authorId = record.authorId?.split(",") || [];
				const authorName = record.authorName?.split(",") || [];
				return authorId.map((_, index) => `${authorName[index]}`).join(", ") || "-";
			},
		},
		{
			title: "Publisher",
			dataIndex: "publisherId",
			width: 200,
			render: (_, record) => <PublisherCell record={record} />,
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
		setBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				...DEFAULT_BOOK_VALUE,
			},
		}));
	};

	const onEdit = (record: DataType) => {
		const authorId = record.authorId?.split(",") || [];
		const authorName = record.authorName?.split(",") || [];
		const translatorId = record.translatorId?.split(",") || [];
		const translatorName = record.translatorName?.split(",") || [];
		const formValue: BookFormType = {
			...record,
			author: authorId.map((item, index) => ({
				id: item,
				name: authorName[index],
			})),
			translator: translatorId.map((item, index) => ({
				id: item,
				name: translatorName[index],
			})),
		};
		setBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<BookEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>Book List</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<BookFilterForm
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
						dataSource={bookList}
					/>
				</CardContent>
				<BookModal {...bookModalProps} />
			</BookEnumProvider>
		</Card>
	);
}

const PublisherCell = ({ record }: { record: DataType }) => {
	const { publisher } = useBookEnumContext();
	const publisherName = publisher.find((item) => item.id === record.publisherId)?.name || "-";
	return publisherName;
};
