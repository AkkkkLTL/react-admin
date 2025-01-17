import { Suspense, lazy } from "react";

import type { AppRouteObject } from "@/router/types";

const Guide = lazy(() => import("@/views/Guide/index"));

/**
 * Guide 模块的路由配置
 */
const guide:AppRouteObject = {
  order: 2,
  path: "guide",
  element: (
    <Suspense>
      <Guide />
    </Suspense>
  ),
  meta: {
    label: "sys.route.guide",
    icon: "guide",
    key: "/guide"
  }
}

export default guide;