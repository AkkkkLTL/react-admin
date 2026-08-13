import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryBookPublisherList, type LibraryBookPublisherSaveReq } from "@/api/services/library-book.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { PublisherModal, type PublisherModalProps } from "./publisher-modal";

const DEFAULT_PUBLHER_VALUE: LibraryBookPublisherSaveReq = {
	id: undefined,
	name: "",
};

export default function BookPublisherListPage() {
	const [bookPublishList, setBookPublishList] = useState<LibraryBookPublisherSaveReq[]>([]);
	const [refresh, setRefresh] = useState(0);
	const [bookPublisherModalProps, setBookPublisherModalProps] = useState<PublisherModalProps>({
		formValue: { ...DEFAULT_PUBLHER_VALUE },
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
		getBookPublisherList();
	}, [refresh]);

	const getBookPublisherList = async () => {
		const dataList = (await apiLibraryBookPublisherList()).page.list || [];
		setBookPublishList(dataList);
	};

	const columns: ColumnsType<LibraryBookPublisherSaveReq> = [
		{
			title: "No",
			render: (_, record, index) => index + 1,
			width: 50,
		},
		{
			title: "Publisher Name",
			dataIndex: "name",
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
		setBookPublisherModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				...DEFAULT_PUBLHER_VALUE,
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
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>Book Publisher List</div>
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
					dataSource={bookPublishList}
				/>
			</CardContent>
			<PublisherModal {...bookPublisherModalProps} />
		</Card>
	);
}
