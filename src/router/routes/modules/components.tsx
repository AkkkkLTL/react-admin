import { AppRouteObject } from "@/router/types";
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const components:AppRouteObject = {
  order: 6,
  path: "components",
  element: (
    <Suspense>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "Components",
    icon: "component",
    key: "/components"
  },
  children: [
    {
      path: "rich-editor",
      Component: lazy(() => import("@/views/ComponentsDemo/RichEditor/index")),
      meta: {
        label: "Rich Editor",
        key: "/components/rich-editor"
      }
    }
  ]
}

export default components;