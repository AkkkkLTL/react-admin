import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryNoteList } from "@/api/services/library-note.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import { type Note, type NoteFilterParams, NoteType } from "../../types";
import NoteEnumProvider from "./note-enum-provider";
import { NoteFilterForm } from "./note-filter-form";
import { NoteModal, type NoteModalProps } from "./note-modal";

const DEFAULT_NOTE_VALUE: Note = {
	id: undefined,
	title: "",
	type: NoteType.ELECTRONIC,
	platformId: [],
	location: "",
};

export default function NoteListPage() {
	const [noteList, setNoteList] = useState<Note[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [tableParams, setTableParams] = useState<NoteFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [noteModalProps, setNoteModalProps] = useState<NoteModalProps>({
		formValue: { ...DEFAULT_NOTE_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setNoteModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setNoteModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getNoteList();
	}, [refresh]);

	const getNoteList = async () => {
		const res = await apiLibraryNoteList(toURLSearchParams(tableParams));
		const dataList = res.page.list || [];
		setTotalCount(res.page.totalCount);
		setNoteList(
			dataList.map((item) => {
				return {
					...item,
					platformId: item.platformId?.split(",").map(Number) || [],
				};
			}),
		);
		setLoading(false);
	};

	const onCreate = () => {
		setNoteModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_NOTE_VALUE,
			},
		}));
	};

	const onEdit = (formValue: Note) => {
		setNoteModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	const columns: ColumnsType<Note> = [
		{
			title: "No",
			render: (_value, _record, index) => (tableParams.page - 1) * tableParams.limit + index + 1,
			width: 50,
		},
		{
			title: "Title",
			dataIndex: "title",
			width: 200,
		},
		{
			title: "Location",
			dataIndex: "location",
			width: 100,
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

	return (
		<Card>
			<NoteEnumProvider>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>笔记列表</div>
						<Button onClick={onCreate}>New</Button>
					</div>
					<NoteFilterForm
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
						pagination={{
							current: tableParams.page,
							pageSize: tableParams.limit,
							total: totalCount,
							showTotal: (total) => `Total ${total} items`,
							showSizeChanger: true,
							pageSizeOptions: [10, 20, 50, 100],
							onChange: (page, pageSize) => {
								setTableParams({ ...tableParams, page, limit: pageSize });
								setRefresh(Date.now());
							},
						}}
						columns={columns}
						dataSource={noteList}
					/>
				</CardContent>
				<NoteModal {...noteModalProps} />
			</NoteEnumProvider>
		</Card>
	);
}
