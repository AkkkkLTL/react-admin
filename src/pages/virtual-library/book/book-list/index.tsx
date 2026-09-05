import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryBookList } from "@/api/services/library-book.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { Book, BookFilterParams } from "../../types";
import BookEnumProvider, { useBookEnumContext } from "./book-enum-provider";
import { BookFilterForm } from "./book-filter-form";
import { BookModal, type BookModalProps } from "./book-modal";

const DEFAULT_BOOK_VALUE: Book = {
	id: undefined,
	isbn: "",
	title: "",
	oriTitle: "",
	cover: "",
	author: [],
	translator: [],
	publisherId: undefined,
	publishDate: "",
	content: "",
	edition: undefined,
	binding: undefined,
	pages: undefined,
	currency: undefined,
	price: undefined,
	categoryId: undefined,
	sourceId: [],
	status: ReadStatus.UNREAD,
	rating: 0,
	noteBookId: "",
	tagId: "",
};

export default function BookListPage() {
	const [bookList, setBookList] = useState<Book[]>([]);
	const [tableParams, setTableParams] = useState<BookFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [bookModalProps, setBookModalProps] = useState<BookModalProps>({
		formValue: structuredClone(DEFAULT_BOOK_VALUE),
		title: "New",
		show: false,
		onOk: () => {
			// 关闭弹窗时，清空表单数据(使用structuredClone深拷贝默认值)
			setBookModalProps((prev) => ({ ...prev, formValue: structuredClone(DEFAULT_BOOK_VALUE), show: false }));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setBookModalProps((prev) => ({ ...prev, formValue: structuredClone(DEFAULT_BOOK_VALUE), show: false }));
		},
	});

	useEffect(() => {
		setLoading(true);
		getBookList();
	}, [refresh]);

	const getBookList = async () => {
		const dataList = (await apiLibraryBookList(toURLSearchParams(tableParams))).page.list || [];
		setBookList(
			dataList.map((item) => {
				const { authorId, authorName, translatorId, translatorName } = item;
				const newAuthorId = authorId?.split(",") || [];
				const newAuthorName = authorName?.split(",") || [];
				const newTranslatorId = translatorId?.split(",") || [];
				const newTranslatorName = translatorName?.split(",") || [];
				return {
					...item,
					author: newAuthorId.map((item, index) => ({
						id: item,
						name: newAuthorName[index],
					})),
					translator: newTranslatorId.map((item, index) => ({
						id: item,
						name: newTranslatorName[index],
					})),
					sourceId: item.sourceId?.split(",").map(Number) || [],
				};
			}),
		);
		setLoading(false);
	};

	const columns: ColumnsType<Book> = [
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
			dataIndex: "author",
			width: 200,
			render: (author: Book["author"]) => author?.map((item) => item.name).join(", ") || "-",
		},
		{
			title: "Publisher",
			dataIndex: "publisherId",
			width: 200,
			render: (publisherId: Book["publisherId"]) => <PublisherCell publisherId={publisherId} />,
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
			formValue: structuredClone(DEFAULT_BOOK_VALUE),
		}));
	};

	const onEdit = (formValue: Book) => {
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

const PublisherCell = ({ publisherId }: { publisherId: Book["publisherId"] }) => {
	const { publisher } = useBookEnumContext();
	const publisherName = publisher.find((item) => item.id === publisherId)?.name || "-";
	return publisherName;
};
