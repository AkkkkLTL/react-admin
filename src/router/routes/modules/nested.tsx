import { Suspense, lazy } from "react"
import { Navigate, Outlet } from "react-router-dom"

import type { AppRouteObject } from "@/router/types"

const nested:AppRouteObject = {
  order: 5,
  path: "nested",
  element: (
    <Suspense>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "Nested",
    icon: "nested",
    key: "/nested"
  },
  children: [
    {
      index: true,
      element: <Navigate to="menu1" replace />
    },
    {
      path: "menu1",
      Component: lazy(() => import("@/views/Nested/Menu1/index")),
      meta: {
        key: "/nested/menu1",
        label: "Menu1",
      },
      children: [
        {
          index: true,
          element: <Navigate to="menu1-1" replace />
        },
        {
          path: "menu1-1",
          Component: lazy(() => import("@/views/Nested/Menu1/Menu1-1/index")),
          meta: {
            key: "/nested/menu1/menu1-1",
            label: "Menu1-1"
          }
        },
        {
          path: "menu1-2",
          Component: lazy(() => import("@/views/Nested/Menu1/Menu1-2/index")),
          meta: {
            key: "/nested/menu1/menu1-2",
            label: "Menu1-2"
          },
          children: [
            {
              index: true,
              element: <Navigate to="menu1-2-1" replace />
            },
            {
              path: "menu1-2-1",
              Component: lazy(() => import("@/views/Nested/Menu1/Menu1-2/Menu1-2-1/index")),
              meta: {
                key: "/nested/menu1/menu1-2/menu1-2-1",
                label: "Menu1-2-1"
              }
            },
            {
              path: "menu1-2-2",
              Component: lazy(() => import("@/views/Nested/Menu1/Menu1-2/Menu1-2-2/index")),
              meta: {
                key: "/nested/menu1/menu1-2/menu1-2-2",
                label: "Menu1-2-2"
              }
            }
          ]
        },
        {
          path: "menu1-3",
          Component: lazy(() => import("@/views/Nested/Menu1/Menu1-3/index")),
          meta: {
            key: "/nested/menu1/menu1-3", 
            label: "Menu1-3"
          }
        }
      ]
    },
    {
      path: "menu2",
      Component: lazy(() => import("@/views/Nested/Menu2/index")),
      meta: { 
        key: "/nested/menu2",
        label: "Menu2" 
      }
    }
  ]
}

export default nested;