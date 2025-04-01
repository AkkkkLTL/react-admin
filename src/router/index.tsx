import { type FC, lazy } from "react";
import { Navigate, type RouteObject, RouterProvider, createHashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import type { AppRouteObject } from "./types";
// routes
import ErrorRoutes from "./routes/ErrorRoutes";
import { usePermissionRoutes } from "./hooks/usePermissionRoutes";
import ProtectedRoute from "./components/ProtectedRoute";
// pages
import Login from "@/pages/sys/login/Login";
import PageError from "@/pages/sys/error/PageError";
const Layout = lazy(() => import("@/layout"));

const { VITE_APP_HOMEPAGE:HOMEPAGE } = import.meta.env;

const PUBLIC_ROUTE:AppRouteObject = {
  path: "/login",
  element: (
    <ErrorBoundary FallbackComponent={PageError}>
      <Login />
    </ErrorBoundary>
  )
}

const NO_MATCHED_ROUTE:AppRouteObject = {
  path: "*",
  element: <Navigate to="/404" replace />
}

const Router:FC = () => {

  const permissionRoutes = usePermissionRoutes();

  const PROTECTED_ROUTE:AppRouteObject = {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={HOMEPAGE} replace />
      },
      ...permissionRoutes,
    ]
  }

  const routes = [PUBLIC_ROUTE, PROTECTED_ROUTE, ErrorRoutes, NO_MATCHED_ROUTE];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />
}


export default Router;