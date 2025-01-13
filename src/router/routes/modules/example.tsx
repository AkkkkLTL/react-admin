import { Suspense, lazy } from "react"
import { Navigate, Outlet } from "react-router-dom"

import type { AppRouteObject } from "@/router/types"

/**
 * Example 模块的路由配置
 */
const example:AppRouteObject = {
  order: 3,
  path: "example",
  element: (
    <Suspense>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.route.example",
    icon: "example",
    key: "/example"
  },
  children: [
    {
      index: true,
      element: <Navigate to="table" replace />,
    },
    {
      path: "table",
      Component: lazy(() => import("@/views/Table/index")),
      meta: {
        label: "sys.route.table",
        icon: "table",
        key: "/example/table"
      }
    },
    {
      path: "tree",
      Component: lazy(() => import("@/views/Tree/index")),
      meta: {
        label: "sys.route.tree",
        icon: "tree",
        key: "/example/tree"
      }
    }
  ]
}

export default example;