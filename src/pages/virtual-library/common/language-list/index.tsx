import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryCommonLanguageList } from "@/api/services/library-common.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import type { CommonLanguage } from "../../types";
import { LanguageModal, type LanguageModalProps } from "./language-modal";

const DEFAULT_LANGUAGE_VALUE: CommonLanguage = {
	id: undefined,
	code: "",
	name: "",
};

export default function LanguageListPage() {
	const [languageList, setLanguageList] = useState<CommonLanguage[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState(0);
	const [languageModalProps, setLanguageModalProps] = useState<LanguageModalProps>({
		formValue: { ...DEFAULT_LANGUAGE_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setLanguageModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setLanguageModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getLanguageList();
	}, [refresh]);

	const getLanguageList = async () => {
		const dataList = (await apiLibraryCommonLanguageList()).page.list || [];
		setLanguageList(dataList);
		setLoading(false);
	};

	const columns: ColumnsType<CommonLanguage> = [
		{
			title: "No",
			render: (_, record, index) => index + 1,
			width: 50,
		},
		{
			title: "Code",
			dataIndex: "code",
			width: 200,
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

	const onCreate = () => {
		setLanguageModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_LANGUAGE_VALUE,
			},
		}));
	};

	const onEdit = (formValue: CommonLanguage) => {
		setLanguageModalProps((prev) => ({
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
					<div>Language List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					loading={loading}
					rowKey={"id"}
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={languageList}
				/>
			</CardContent>
			<LanguageModal {...languageModalProps} />
		</Card>
	);
}
