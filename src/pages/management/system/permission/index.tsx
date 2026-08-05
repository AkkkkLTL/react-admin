import Table, { type ColumnsType } from "antd/es/table";
import { isNil } from "ramda";
import { useState } from "react";
import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import type { MenuTree } from "@/types/entity";
import { BasicStatus, PermissionType } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import PermissionModal, { type PermissionModalProps } from "./permission-modal";

const defaultPermissionValue: MenuTree = {
	id: "",
	parentId: null,
	name: "",
	caption: "",
	path: "",
	component: "",
	icon: "",
	hidden: false,
	status: BasicStatus.ENABLE,
	type: PermissionType.CATALOGUE,
};

export default function PermissionPage() {
	const { t } = useLocale();
	const [permissionModalProps, setPermissionModalProps] = useState<PermissionModalProps>({
		formValue: { ...defaultPermissionValue },
		title: "New",
		show: false,
		onOk: () => {
			setPermissionModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setPermissionModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	const columns: ColumnsType<MenuTree> = [
		{
			title: "Name",
			dataIndex: "name",
			width: 300,
			render: (_, record) => <div>{t(record.name)}</div>,
		},
		{
			title: "Type",
			dataIndex: "type",
			width: 60,
			render: (_, record) => <Badge variant={"info"}>{PermissionType[record.type]}</Badge>,
		},
		{
			title: "Icon",
			dataIndex: "icon",
			width: 60,
			render: (icon: string) => {
				if (isNil(icon)) return "";
				if (icon.startsWith("ic")) {
					return <Icon icon={`local:${icon}`} size={18} className="ant-menu-item-icon" />;
				}
				return <Icon icon={icon} size={18} className="ant-menu-item-icon" />;
			},
		},
		{
			title: "Component",
			dataIndex: "component",
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (status) => (
				<Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
					{status === BasicStatus.DISABLE ? "Disabled" : "Enabled"}
				</Badge>
			),
		},
		{
			title: "Order",
			dataIndex: "order",
			width: 60,
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-end text-gray">
					{record?.type === PermissionType.CATALOGUE && (
						<Button variant={"ghost"} size={"icon"} onClick={() => onCreate(record.id)}>
							<Icon icon="gridicons:add-outline" size={18} />
						</Button>
					)}
					<Button variant={"ghost"} size={"icon"} onClick={() => onEdit(record)}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant={"ghost"} size={"icon"}>
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
				</div>
			),
		},
	];

	const onCreate = (parentId?: string) => {
		setPermissionModalProps((prev) => ({
			...prev,
			show: true,
			...defaultPermissionValue,
			title: "New",
			formValue: { ...defaultPermissionValue, parentId: parentId ?? null },
		}));
	};

	const onEdit = (formValue: MenuTree) => {
		setPermissionModalProps((prev) => ({
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
					<div>Permission List</div>
					<Button onClick={() => onCreate()}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={[]}
				/>
			</CardContent>
			<PermissionModal {...permissionModalProps} />
		</Card>
	);
}
