import menuService from "@/api/services/menuService";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider } from "react-router-dom";
import { authRoutes } from "./sections/auth";
import { errorRoutes } from "./sections/error";
import { GLOBAL_CONFIG } from "@/global-config";
import { convertToRoute } from "./sections/dashboard/backend";
import DashboardLayout from "@/layouts/dashboard";
import AuthGuard from "./components/AuthGuard";
import { RouterContext } from "./context";

// 类型定义
interface MenuItem {
  menuId: string | number;
  name: string;
  url: string;
  list?: MenuItem[];
  [key: string]: any;
}

interface MenuData {
  menuList: MenuItem[];
  permissions: string[];
}

const App = lazy(() => import("@/App"));

/**
 * 路由配置组件
 */
export default function AppRoutes ()
{
    // 路由
    const [routes, setRoutes] = useState<RouteObject[]>([]);
    // 加载状态
    const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		// 检查是否已添加动态路由
		if (sessionStorage.getItem("isAddDynamicRoutes") === "true") {
			if (routes.length === 0) initializeRouter();
			return;
		}
		console.warn("执行路由请求");
		fetchMenuData();
	}, [routes]);

    // 获取菜单列表和权限
    const fetchMenuData = useCallback(async () => {
      try {
        // 发送获取菜单列表和权限的请求
        const data = await menuService.getMenuList();

        if ( data ) {
          // 保存菜单列表和权限
          sessionStorage.setItem("menuList", JSON.stringify(data || '[]'));
          sessionStorage.setItem("permissions", JSON.stringify(data || '[]'));
          sessionStorage.setItem("isAddDynamicRoutes", "true");
        } else {
          sessionStorage.setItem('menuList', '[]');
          sessionStorage.setItem('permissions', '[]');
        }
		sessionStorage.removeItem("redirectToLogin");
      } catch (error) {
        console.log('%c 请求菜单列表和权限失败，跳转至登录页！！', 'color:blue');
        sessionStorage.setItem("redirectToLogin", "true");
      } finally {
        initializeRouter();
      }
    }, []);

    // 初始化路由
    const initializeRouter = useCallback(() => {
		try {
			const menuListStr = sessionStorage.getItem("menuList");
			const menuList = menuListStr ? JSON.parse(menuListStr) : [];
			const dynamicRoutes = convertToRoute(menuList);

			// 检查是否需要跳转至登录页
			const redirectToLogin = sessionStorage.getItem("redirectToLogin") === "true";

			const newRoutes:RouteObject[] = redirectToLogin ? [
				...authRoutes,
				{path: "*", element: <Navigate to="/auth/login" />}
			] : [
				...authRoutes,
				{
					element: (
						<AuthGuard>
							<DashboardLayout />
						</AuthGuard>
					),
					children: [
						{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
						...dynamicRoutes
					],
				},
				...errorRoutes,
				{path: "*", element: <Navigate to="/404" />}
			];
			debugger;
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

    const router = useMemo(() => {
		const newRouter =createBrowserRouter(
			[
				{
					element: (
						<App>
							<Outlet />
						</App>
					),
					errorElement: <div>404 Not Found</div>,
					children: routes,
				}
			],
			{
				basename: GLOBAL_CONFIG.publicPath,
			}
		);
		return newRouter;
	}, [routes]);

    if (isLoading || !router) {
        return <div>路由加载中...</div>;
    }

    return (
		<RouterContext.Provider value={{fetchMenuData}}>
			<RouterProvider router={router} />
		</RouterContext.Provider>
	)
}