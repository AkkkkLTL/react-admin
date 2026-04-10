import { useUserInfo, useUserPermissions, useUserRoles, useUserToken } from "@/store/modules/userSlice";

export const useAuthCheck = (baseOn: "role" | "permission" = "permission") => {
	const { token } = useUserToken();
	const permissions = useUserPermissions();
	const roles = useUserRoles();

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
