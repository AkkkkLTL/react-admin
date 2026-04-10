import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { apiSysUserList } from "@/api/services/sys-user.service";
import { Icon } from "@/components/icon";
import { usePathname, useRouter } from "@/router/hooks";
import type { RoleInfo, UserInfo } from "@/types/entity";
import { BasicStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";

type UserListItem = Omit<UserInfo, "roleIdList"> & { roleList: Pick<RoleInfo, "roleId" | "roleName">[] };

export default function UserPage() {
	const { push } = useRouter();
	const pathname = usePathname();

	const [users, setUsers] = useState<UserListItem[]>([]);

	useEffect(() => {
		getDataList();
	}, []);

	const getDataList = async () => {
		const dataList = (await apiSysUserList()).page.list || [];
		setUsers(dataList);
	};

	const columns: ColumnsType<UserListItem> = [
		{
			title: "Name",
			dataIndex: "username",
			width: 300,
			render: (_, record) => {
				return (
					<div className="flex">
						<img alt="" src={record.avatar} className="h-10 w-10 rounded-full" />
						<div className="ml-2 flex flex-col">
							<span className="text-sm">{record.username}</span>
							<span className="text-xs text-text-secondary">{record.email}</span>
						</div>
					</div>
				);
			},
		},
		{
			title: "Role",
			dataIndex: "roleList",
			align: "center",
			width: 120,
			render: (roles: Pick<RoleInfo, "roleId" | "roleName">[]) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						{roles.map((role) => (
							<Badge variant={"info"} key={role.roleId}>
								{role.roleName}
							</Badge>
						))}
					</div>
				);
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (status: BasicStatus) => (
				<Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
					{status === BasicStatus.DISABLE ? "Disabled" : "Enable"}
				</Badge>
			),
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray-500">
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => {
							push(`${pathname}/${record.userId}`);
						}}
					>
						<Icon icon="mdi:card-account-details" size={18} />
					</Button>
					<Button variant={"ghost"} size={"icon"} onClick={() => {}}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant={"ghost"} size={"icon"} onClick={() => {}}>
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
					<div>User List</div>
					<Button onClick={() => {}}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey={"userId"}
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={users}
				/>
			</CardContent>
		</Card>
	);
}
