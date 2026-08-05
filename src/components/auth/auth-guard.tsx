import type { ReactNode } from "react";
import { useAuthCheck } from "./use-auth";

/**
 *
 */
interface Props {
	/** 用户有权限时显示的内容 */
	children: ReactNode;
	/** 用户无权限时显示的内容 */
	fallback?: ReactNode;
	/** 检查用户是否有指定的角色或权限 */
	check?: string;
	/** 检查用户是否有指定的角色或权限中的任意一个 */
	checkAny?: string[];
	/** 检查用户是否有指定的角色或权限中的所有 */
	checkAll?: string[];
	/** 基于角色还是权限检查 */
	baseOn?: "role" | "permission";
}

/**
 * 权限守卫组件
 * @param param0
 */
export function AuthGuard({ children, fallback = null, check, checkAny, checkAll, baseOn = "permission" }: Props) {
	const checkFn = useAuthCheck(baseOn);

	const hasAccess = check
		? checkFn.check(check)
		: checkAny
			? checkFn.checkAny(checkAny)
			: checkAll
				? checkFn.checkAll(checkAll)
				: true;

	// biome-ignore lint/complexity/noUselessFragments: <false>
	return hasAccess ? <>{children}</> : <>{fallback}</>;
}
