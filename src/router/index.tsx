import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, Navigate, Outlet, type RouteObject, RouterProvider } from "react-router-dom";
import { apiSysMenuNav } from "@/api/services/sys-menu.service";
import { GLOBAL_CONFIG } from "@/global-config";
import DashboardLayout from "@/layouts/dashboard";
import { convertToTree } from "@/utils/tree";
import ErrorFallback from "./components/error-fallback";
import LoginAuthGuard from "./components/login-auth-guard";
import { RouterContextProvider } from "./router-provider";
import { authRoutes } from "./sections/auth";
import { convertToRoute } from "./sections/dashboard/backend";
import { errorRoutes } from "./sections/error";

const App = lazy(() => import("@/App"));

/**
 * 路由配置组件
 */
export default function AppRoutes() {
	// 路由
	const [routes, setRoutes] = useState<RouteObject[]>([]);
	// 加载状态
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// 初始化路由
	const initializeRouter = useCallback(() => {
		try {
			const menuListStr = sessionStorage.getItem("menuList");
			const menuList = menuListStr ? JSON.parse(menuListStr) : [];
			const dynamicRoutes = convertToRoute(menuList);

			// 检查是否需要跳转至登录页
			const redirectToLogin = sessionStorage.getItem("redirectToLogin") === "true";

			const newRoutes: RouteObject[] = redirectToLogin
				? [...authRoutes, { path: "*", element: <Navigate to="/auth/login" /> }]
				: [
						...authRoutes,
						{
							element: (
								<LoginAuthGuard>
									<DashboardLayout />
								</LoginAuthGuard>
							),
							children: [
								{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
								...dynamicRoutes,
							],
						},
						...errorRoutes,
						{ path: "*", element: <Navigate to="/404" replace /> },
					];
			console.log("%c 初始化路由", "color:blue", newRoutes);
			setRoutes(newRoutes);
		} catch (err) {
			console.log("初始化路由失败", err);
			// 使用 sessionStorege 标记需要重定向至登录页
			sessionStorage.setItem("redirectToLogin", "true");
		} finally {
			setIsLoading(false);
		}
	}, []);

	// 获取菜单列表和权限
	const fetchMenuData = useCallback(async () => {
		try {
			// 发送获取菜单列表和权限的请求
			const data = await apiSysMenuNav();

			if (data) {
				// 保存菜单列表和权限
				sessionStorage.setItem("menuList", JSON.stringify(convertToTree(data.menuList) || "[]"));
				// 保存权限
				sessionStorage.setItem("permissions", JSON.stringify(data.permissions || "[]"));
				// 标记已添加动态路由
				sessionStorage.setItem("isAddDynamicRoutes", "true");
			} else {
				sessionStorage.setItem("menuList", "[]");
				sessionStorage.setItem("permissions", "[]");
			}
			sessionStorage.removeItem("redirectToLogin");
		} catch (error) {
			console.log("%c 请求菜单列表和权限失败，跳转至登录页！！", "color:blue", error);
			// 使用 sessionStorege 标记需要重定向至登录页
			sessionStorage.setItem("redirectToLogin", "true");
		} finally {
			// 初始化路由
			initializeRouter();
		}
	}, [initializeRouter]);

	const router = useMemo(() => {
		const newRouter = createBrowserRouter(
			[
				{
					element: (
						<App>
							<Outlet />
						</App>
					),
					errorElement: <ErrorBoundary FallbackComponent={ErrorFallback} />,
					children: routes,
				},
			],
			{
				basename: GLOBAL_CONFIG.publicPath,
			},
		);
		return newRouter;
	}, [routes]);

	useEffect(() => {
		// 检查是否已添加动态路由
		if (sessionStorage.getItem("isAddDynamicRoutes") === "true") {
			if (routes.length === 0) initializeRouter();
			return;
		}
		console.warn("执行路由请求");
		fetchMenuData();
	}, [routes, fetchMenuData, initializeRouter]);

	if (isLoading || !router) {
		return <div>路由加载中...</div>;
	}

	return (
		<RouterContextProvider value={{ fetchMenuData }}>
			<RouterProvider router={router} />
		</RouterContextProvider>
	);
}
