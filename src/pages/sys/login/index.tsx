import { Navigate } from "react-router-dom";

import Logo from "@/components/logo";
import { GLOBAL_CONFIG } from "@/global-config";
import { useUserToken } from "@/store/modules/userSlice";
import LoginForm from "./login-form";
import LoginProvider from "./providers/login-provider";

export default function LoginPage() {
	// 获取用户权限令牌
	const { token } = useUserToken();
	// 检查是否需要重定向到登录页（todo：将storage的字段信息存为常量）
	const redirectToLogin = sessionStorage.getItem("redirectToLogin") === "true";

	// 判断用户权限存在 且 不需要重定向到登录页
	if (token && !redirectToLogin) {
		// 跳转到首页
		return <Navigate to={GLOBAL_CONFIG.defaultRoute} replace />;
	}

	return (
		<div className="relative grid min-h-svh lg:grid-cols-2 bg-background">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<div className="flex items-center gap-2 font-medium cursor-pointer">
						<Logo size={28} />
						<span>{GLOBAL_CONFIG.appName}</span>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginProvider>
							<LoginForm />
						</LoginProvider>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center m-auto max-w-[480px] w-full ps-[16px]"></div>
		</div>
	);
}
