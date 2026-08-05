import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthGuard, useAuthCheck } from "@/components/auth";
import { CodeBlock } from "@/components/code/code-bock";
import { selectUserInfo, selectUserPermissions, useSignIn } from "@/store/modules/userSlice";
import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Text } from "@/ui/typography";

const Component_Auth_1 = `
<AuthGuard
  check="permission:delete"
  baseOn="permission"
  fallback={
    <Text variant="body1" color="error">
      没有<Text variant="code">permission:delete</Text>权限
    </Text>
  }
>
  <Button variant="destructive">
    删除
  </Button>
</AuthGuard>
`;

const Component_Auth_2 = `
<AuthGuard
  checkAny={["permission:update", "permission:delete"]}
  baseOn="permission"
  fallback={
    <Text variant="body1" color="error">
      没有<Text variant="code">permission:update</Text>或<Text variant="code">permission:delete</Text>权限
    </Text>
  }
>
  <Button variant="secondary">Detail</Button>
</AuthGuard>
`;

const Component_Auth_3 = `
<AuthGuard
  checkAll={["permission:read", "permission:create"]}
  baseOn="permission"
  fallback={
    <Text variant="body1" color="error">
      没有<Text variant="code">permission:read</Text>和<Text variant="code">permission:create</Text>权限
    </Text>
  }
>
  <Button variant="destructive">Add</Button>
</AuthGuard>
`;

const Function_Auth_1 = `
const { check, checkAny, checkAll } = useAuthCheck();
check("permission:delete") ? (
  <Button variant="destructive">Delete</Button>
) : (
  <Text variant="body1" color="error">
    没有<Text variant="code">permission:delete</Text>权限
  </Text>
);
`;

const Function_Auth_2 = `
const { check, checkAny, checkAll } = useAuthCheck();
checkAny(["permission:update", "permission:delete"]) ? (
  <Button variant="secondary">Detail</Button>
) : (
  <Text variant="body1" color="error">
`;

const Function_Auth_3 = `
const { check, checkAny, checkAll } = useAuthCheck();
checkAll(["permission:read", "permission:create"]) ? (
  <Button variant="secondary">Add</Button>
) : (
  <Text variant="body1" color="error">
`;

// todo: 获取所有用户列表
const DB_USERS = [
	{
		username: "admin",
		roleIdList: ["1"],
		permissions: ["permission:delete"],
	},
	{
		username: "user",
		roleIdList: ["2"],
		permissions: ["permission:update"],
	},
];

export default function PermissionPage() {
	const permissions = useSelector(selectUserPermissions);
	// const roles = useUserRoles();
	const { username, roleIdList: roles } = useSelector(selectUserInfo);
	const signIn = useSignIn();
	const { check, checkAny, checkAll } = useAuthCheck();
	const dispatch = useDispatch();

	const handleSwitch = (_username: string) => {
		if (_username === username) return;
		// todo:
		// 根据用户名查找是否存在指定用户
		const user = {
			username: _username,
			roleIdList: roles,
			permissions,
		};
		// 如果存在，切换到指定用户
		if (user) {
			signIn({ username: user.username, password: "123456", uuid: "", captcha: "" });
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="w-full flex items-center justify-center">
				<Text variant={"subTitle1"}>当前用户：{username}</Text>
				<Tabs defaultValue={username} onValueChange={handleSwitch}>
					<TabsList>
						{DB_USERS.map((item) => (
							<TabsTrigger key={item.username} value={item.username}>
								{item.username}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>
			<Card>
				<CardContent>
					<div className="flex items-center gap-2">
						<Text variant={"body1"}>当前用户角色：</Text>
						{permissions && permissions.length > 0 ? (
							<Text variant={"body1"}>[{roles?.map((role) => role).join(", ")}]</Text>
						) : (
							<Text variant={"body1"}>[]</Text>
						)}
					</div>
					<div className="flex items-center gap-2">
						<Text variant={"body1"}>当前用户权限：</Text>
						{permissions && permissions.length > 0 ? (
							<Text variant={"body1"}>[{permissions?.map((permission) => permission).join(", ")}]</Text>
						) : (
							<Text variant={"body1"}>[]</Text>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>页面鉴权测试</CardTitle>
					<CardDescription>点击下面按钮，当拥有页面指定权限时正常显示，否则显示403</CardDescription>
				</CardHeader>
				<CardContent>
					<Link to={"/permission/page-test"}>
						<Button>跳转页面</Button>
					</Link>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>组件鉴权测试</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2 flex-col">
						<CodeBlock
							code={Component_Auth_1.trim()}
							options={{
								lang: "tsx",
							}}
							title="单权限校验"
							description="当用户拥有permission:delete权限时，显示 Delete 按钮，否则fallback"
						>
							<AuthGuard
								check="permission:delete"
								baseOn="permission"
								fallback={
									<Text variant={"body1"} color={"error"}>
										没有<Text variant={"code"}>permission:delete</Text>权限
									</Text>
								}
							>
								<Button variant={"destructive"}>Delete</Button>
							</AuthGuard>
						</CodeBlock>

						<CodeBlock
							code={Component_Auth_2.trim()}
							options={{
								lang: "tsx",
							}}
							title="任意权限校验"
							description="当用户拥有permission:update或permission:delete权限时，显示 Detail 按钮，否则fallback"
						>
							<AuthGuard
								checkAny={["permission:update", "permission:delete"]}
								baseOn="permission"
								fallback={
									<Text variant={"body1"} color={"error"}>
										没有<Text variant={"code"}>permission:update</Text>或<Text variant={"code"}>permission:delete</Text>
										权限
									</Text>
								}
							>
								<Button variant={"secondary"}>Detail</Button>
							</AuthGuard>
						</CodeBlock>

						<CodeBlock
							code={Component_Auth_3.trim()}
							options={{
								lang: "tsx",
							}}
							title="所有权限校验"
							description="当用户拥有permission:read和permission:create权限时，显示 Add 按钮，否则fallback"
						>
							<AuthGuard
								checkAll={["permission:read", "permission:create"]}
								baseOn="permission"
								fallback={
									<Text variant={"body1"} color={"error"}>
										没有<Text variant={"code"}>permission:read</Text>和<Text variant={"code"}>permission:create</Text>
										权限
									</Text>
								}
							>
								<Button variant={"secondary"}>Add</Button>
							</AuthGuard>
						</CodeBlock>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>函数鉴权测试</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2 flex-col">
						<CodeBlock
							code={Function_Auth_1.trim()}
							options={{
								lang: "tsx",
							}}
							title="单权限校验"
							description="当用户拥有permission:delete权限时，显示 Delete 按钮，否则fallback"
						>
							{check("permission:delete") ? (
								<Button variant={"destructive"}>Delete</Button>
							) : (
								<Text variant={"body1"} color={"error"}>
									没有<Text variant={"code"}>permission:delete</Text>权限
								</Text>
							)}
						</CodeBlock>

						<CodeBlock
							code={Function_Auth_2.trim()}
							options={{
								lang: "tsx",
							}}
							title="任意权限校验"
							description="当用户拥有permission:update或permission:delete权限时，显示 Detail 按钮，否则fallback"
						>
							{checkAny(["permission:update", "permission:delete"]) ? (
								<Button variant={"secondary"}>Detail</Button>
							) : (
								<Text variant={"body1"} color={"error"}>
									没有<Text variant={"code"}>permission:update</Text>或<Text variant={"code"}>permission:delete</Text>
									权限
								</Text>
							)}
						</CodeBlock>

						<CodeBlock
							code={Function_Auth_3.trim()}
							options={{
								lang: "tsx",
							}}
							title="所有权限校验"
							description="当用户拥有permission:read和permission:create权限时，显示 Add 按钮，否则fallback"
						>
							{checkAll(["permission:read", "permission:create"]) ? (
								<Button variant={"secondary"}>Add</Button>
							) : (
								<Text variant={"body1"} color={"error"}>
									没有<Text variant={"code"}>permission:read</Text>和<Text variant={"code"}>permission:create</Text>权限
								</Text>
							)}
						</CodeBlock>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
