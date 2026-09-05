import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { selectUserPermissions, selectUserRoles, selectUserToken } from "@/store/modules/userSlice";

export const useAuthCheck = (baseOn: "role" | "permission" = "permission") => {
	const token = Cookies.get("token");
	const permissions = useSelector(selectUserPermissions);
	const roles = useSelector(selectUserRoles) || [];

	// 基于角色还是权限检查
	const resourcePool = baseOn === "role" ? roles : permissions;

	// 检查用户是否有指定的角色或权限
	const check = (item: string): boolean => {
		if (!token) {
			return false;
		}
		return resourcePool.some((p) => p === item);
	};

	// 检查用户是否有指定的角色或权限中的任意一个
	const checkAny = (items: string[]): boolean => {
		if (items.length === 0) {
			return true;
		}
		return items.some((item) => check(item));
	};

	// 检查用户是否有指定的角色或权限中的所有
	const checkAll = (items: string[]): boolean => {
		if (items.length === 0) {
			return true;
		}
		return items.every((item) => check(item));
	};

	return {
		check,
		checkAny,
		checkAll,
	};
};
