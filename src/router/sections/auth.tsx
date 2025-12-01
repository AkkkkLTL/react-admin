import { lazy, Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/sys/login"));

/**
 * auth 路由
 */
export const authRoutes:RouteObject[] = [
    {
        path: "auth",
        element: (
            <Suspense>
                <Outlet />
            </Suspense>
        ),
        children: [
            { path: "login", element: <LoginPage /> }

        ],
    }
];