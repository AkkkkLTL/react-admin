import { Navigate, type RouteObject } from "react-router-dom";
// routes
import { authRoutes } from "./auth";
import { errorRoutes } from "./error";
import { dashboardRoutes } from "./dashboard";

export const routesSection:RouteObject[] = [
  // 登录路由
  ...authRoutes,
  // 业务路由
  ...dashboardRoutes,
  // 报错路由
  ...errorRoutes,
  // 未匹配到路由
  { path: "*", element: <Navigate to="/404" replace /> }
]