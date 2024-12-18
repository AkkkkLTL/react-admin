import { Outlet } from "react-router-dom";
import { lazy } from "react";

import type { AppRouteObject } from "../types";

/**
 * error 
 * 403, 404, 500
 */
const ErrorRoutes:AppRouteObject = {
  element: (
    <Outlet />
  ),
  children: [
    {
      path: "403",
      Component: lazy(() => import("@/views/Page404/index"))
    }
  ]
}

export default ErrorRoutes;