import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { apiLibraryCommonRegionList } from "@/api/services/library-common.service";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import type { CommonRegion } from "../../types";
import { RegionModal, type RegionModalProps } from "./region-modal";

const DEFAULT_REGION_VALUE: CommonRegion = {
	id: undefined,
	code: "",
	name: "",
};

export default function RegionListPage() {
	const [regionList, setRegionList] = useState<CommonRegion[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState(0);
	const [regionModalProps, setRegionModalProps] = useState<RegionModalProps>({
		formValue: { ...DEFAULT_REGION_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setRegionModalProps((prev) => ({
				...prev,
				show: false,
			}));
			setRefresh(Date.now());
		},
		onCancel: () => {
			setRegionModalProps((prev) => ({
				...prev,
				show: false,
			}));
		},
	});

	useEffect(() => {
		setLoading(true);
		getRegionList();
	}, [refresh]);

	const getRegionList = async () => {
		const dataList = (await apiLibraryCommonRegionList()).page.list || [];
		setRegionList(dataList);
		setLoading(false);
	};

	const columns: ColumnsType<CommonRegion> = [
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
		setRegionModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...DEFAULT_REGION_VALUE,
			},
		}));
	};

	const onEdit = (formValue: CommonRegion) => {
		setRegionModalProps((prev) => ({
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
					dataSource={regionList}
				/>
			</CardContent>
			<RegionModal {...regionModalProps} />
		</Card>
	);
}
