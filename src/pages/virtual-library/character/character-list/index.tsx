import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryCharacterList } from "@/api/services/library-character.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { toURLSearchParams } from "@/utils";
import type { Character, CharacterFilterParams } from "../../types";
import { CharacterFilterForm } from "./character-filter-form";
import { CharacterModal, type CharacterModalProps } from "./character-modal";

const DEFAULT_CHARACTER_VALUE: Character = {
	name: "",
	isVirtual: false,
	noteBookId: "",
	tagId: "",
};

export default function CharacterListPage() {
	const [characterList, setCharacterList] = useState<Character[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [tableParams, setTableParams] = useState<CharacterFilterParams>({
		page: 1,
		limit: 10,
		search: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState(Date.now());
	const [characterModalProps, setCharacterModalProps] = useState<CharacterModalProps>({
		formValue: { ...DEFAULT_CHARACTER_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setCharacterModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setCharacterModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getCharacterList();
	}, [refresh]);

	const getCharacterList = async () => {
		const res = await apiLibraryCharacterList(toURLSearchParams(tableParams));
		const dataList = res.page.list || [];
		setTotalCount(res.page.totalCount);
		setCharacterList(
			dataList.map((item) => ({
				...item,
				isVirtual: Boolean(item.isVirtual),
			})),
		);
		setLoading(false);
	};

	const onCreate = () => {
		setCharacterModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: { ...DEFAULT_CHARACTER_VALUE },
		}));
	};

	const onEdit = (formValue: Character) => {
		setCharacterModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	const columns: ColumnsType<Character> = [
		{
			title: "No",
			render: (_value, _record, index) => (tableParams.page - 1) * tableParams.limit + index + 1,
			width: 50,
		},
		{
			title: "Name",
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

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>人物列表</div>
					<Button onClick={onCreate}>New</Button>
				</div>
				<CharacterFilterForm
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
					dataSource={characterList}
				/>
			</CardContent>
			<CharacterModal {...characterModalProps} />
		</Card>
	);
}
