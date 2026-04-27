// quote from https://github.com/d3george/slash-admin/tree/main
import { type ReactNode, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserToken } from "@/store/modules/userSlice";
import { useRouter } from "../hooks/useRouter";

interface LoginAuthGuardProps {
	children: ReactNode;
}

/**
 * 登录认证守卫组件
 * 用于保护需要登录才能访问的路由，若未登录则重定向到登录页
 */
export default function LoginAuthGuard({ children }: LoginAuthGuardProps) {
	const router = useRouter();
	const { token } = useSelector(selectUserToken);

	const check = useCallback(() => {
		// 若未登录，则重定向到登录页
		if (!token) router.replace("/auth/login");
	}, [router, token]);

	useEffect(() => {
		check();
	}, [check]);

	return <>{children}</>;
}
