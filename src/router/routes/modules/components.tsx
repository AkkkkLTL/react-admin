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
    label: "sys.route.components",
    icon: "component",
    key: "/components"
  },
  children: [
    {
      path: "rich-editor",
      Component: lazy(() => import("@/views/ComponentsDemo/RichEditor/index")),
      meta: {
        label: "sys.route.richeditor",
        key: "/components/rich-editor"
      }
    },
    {
      path: "tiny-editor",
      Component: lazy(() => import("@/views/ComponentsDemo/Tinymce/index")),
      meta: {
        label: "sys.route.tinymce",
        key: "/components/tiny-editor"
      }
    },
    {
      path: "markdown-editor",
      Component: lazy(() => import("@/views/ComponentsDemo/Markdown/index")),
      meta: {
        label: "sys.route.toastui",
        key: "/components/markdown-editor"
      }
    }
  ]
}

export default components;