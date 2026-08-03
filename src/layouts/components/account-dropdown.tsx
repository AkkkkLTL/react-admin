import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useLocale from "@/locales/use-locale";
import { useLoginStateContext } from "@/pages/sys/login/providers/login-provider";
import { useRouter } from "@/router/hooks";
import { clearUserInfoAndToken, selectUserInfo } from "@/store/modules/userSlice";
import { Button } from "@/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

/**
 * 账号下拉菜单组件
 */
export default function AccountDropdown() {
	const { replace } = useRouter();
	const { t } = useLocale();
	const dispatch = useDispatch();
	const { username, email, avatar } = useSelector(selectUserInfo);
	const { backToLogin } = useLoginStateContext();

	const logout = () => {
		try {
			// 清除用户信息和token
			dispatch(clearUserInfoAndToken());
			backToLogin();
		} catch (error) {
			// 清除用户信息和token失败时的处理
			console.log(error);
		} finally {
			// 清除动态路由状态
			sessionStorage.setItem("isAddDynamicRoutes", "false");
			// 跳转登录页
			replace("/auth/login");
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<img className="h-6 w-6 rounded-full" src={avatar} alt="" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<div className="flex items-center gap-2 p-2">
					<img className="h-10 w-10 rounded-full" src={avatar} alt="" />
					<div className="flex flex-col items-start">
						<div className="text-text-primary text-sm font-medium">{username}</div>
						<div className="text-text-secondary text-xs">{email}</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<NavLink to="https://docs-admin.slashspaces.com/" target="_blank">
						{t("sys.docs")}
					</NavLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NavLink to="/management/user/profile">{t("sys.nav.user.profile")}</NavLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NavLink to="/management/user/account">{t("sys.nav.user.account")}</NavLink>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="font-bold text-warning" onClick={logout}>
					{t("sys.login.logout")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
