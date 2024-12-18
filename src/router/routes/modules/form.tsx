import { Suspense, lazy } from "react"

import type { AppRouteObject } from "@/router/types"

const Form = lazy(() => import("@/views/Form/index"));

/**
 * Form 模块的路由配置
 */
const form:AppRouteObject = {
  order: 4,
  path: "form",
  element: (
    <Suspense>
      <Form />
    </Suspense>
  ),
  meta: {
    label: "Form",
    icon: "form",
    key: "/form"
  }
}

export default form;