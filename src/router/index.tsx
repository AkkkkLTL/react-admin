import { FC, lazy } from "react";
import { Navigate, RouteObject, RouterProvider, createHashRouter } from "react-router-dom";
import "nprogress/nprogress.css"
import { AppRouteObject } from "./types";
import AuthGuard from "./components/AuthGuard";
import ErrorRoutes from "./routes/ErrorRoutes";
import { usePermissionRoutes } from "./hooks/usePermissionRoutes";
const Layout = lazy(() => import("@/layout"));

/*
export const asyncRoutes:AppRouteObject[] = [
  {
    path: "/permission",
    element: <Layout />,
    redirect: "/permission/page",
    alwaysShow: true,
    name: "Permission",
    meta: {
      title: "Permission",
      icon: "lock",
      roles: ["admin", "editor"]
    },
    children: [
      {
        path: "/permission/page",
        name: "PagePermission",
        meta: {
          title: "Page Permission",
          roles: ["admin"]
        }
      }
    ]
  }
]
*/

const LoginRoute:AppRouteObject = {
  path: "/login",
  Component: lazy(() => import("@/views/Login/index"))
}

const PAGE_NOT_FOUND_ROUTE:AppRouteObject = {
  path: "*",
  element: <Navigate to="/404" replace />
}

const Router:FC = () => {

  const permissionRoutes = usePermissionRoutes();

  const asyncRoutes:AppRouteObject = {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      ...permissionRoutes,
    ]
  }

  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />
}


export default Router;