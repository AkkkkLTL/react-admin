import { Suspense, lazy } from "react";

import type { AppRouteObject } from "@/router/types";

const Dashboard = lazy(() => import("@/views/Dashboard/index"));

/**
 * Dashboard模块的路由配置
 */
const dashboard:AppRouteObject = {
  order: 1,
  path: "dashboard",
  element: (
    <Suspense>
      <Dashboard />
    </Suspense>
  ),
  meta: {
    label: "sys.route.dashboard",
    icon: "dashboard",
    key: "/dashboard",
  }
}

export default dashboard;