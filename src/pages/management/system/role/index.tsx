import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { type Role, RoleInfo } from "@/types/entity";
import { BasicStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { RoleModal, type RoleModalProps } from "./role-modal";

const ROLES: Role[] = [];

const DEFAULE_ROLE_VALUE: Role = {
	id: "",
	name: "",
	code: "",
	status: BasicStatus.ENABLE,
	permissions: [],
};
export default function RolePage() {
	const [roleModalProps, setRoleModalProps] = useState<RoleModalProps>({
		formValue: { ...DEFAULE_ROLE_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setRoleModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setRoleModalProps((prev) => ({ ...prev, show: false }));
		},
	});
	const columns: ColumnsType<Role> = [
		{
			title: "Name",
			dataIndex: "name",
			width: 300,
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
			title: "Desc",
			dataIndex: "desc",
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
		setRoleModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				...DEFAULE_ROLE_VALUE,
			},
		}));
	};

	const onEdit = (formValue: Role) => {
		setRoleModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<CardHeader>
				<div>
					<div>Role List</div>
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
					dataSource={ROLES}
				/>
			</CardContent>
			<RoleModal {...roleModalProps} />
		</Card>
	);
}
