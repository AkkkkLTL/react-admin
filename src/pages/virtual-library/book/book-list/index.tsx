import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryBookList, type LibraryBookSaveReq } from "@/api/services/library-book.service";
import { Icon } from "@/components/icon";
import { BookStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
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
const BOOK: BookFormType[] = [];

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
	status: BookStatus.UNREAD,
	rating: 0,
	noteBookId: "",
	tagId: "",
};

export default function BookListPage() {
	const [bookList, setBookList] = useState<BookFormType[]>([]);
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
		console.log("getBookList");
		getBookList();
	}, [refresh]);

	const getBookList = async () => {
		const dataList = (await apiLibraryBookList()).page.list || [];
		setBookList(dataList);
	};

	const columns: ColumnsType<BookFormType> = [
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

	const onEdit = (formValue: BookFormType) => {
		setBookModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>Book List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey={"id"}
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={bookList}
				/>
			</CardContent>
			<BookModal {...bookModalProps} />
		</Card>
	);
}
