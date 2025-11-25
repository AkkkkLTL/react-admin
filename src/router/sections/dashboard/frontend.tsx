import { Navigate, type RouteObject } from "react-router-dom";

import { Component } from "./utils";

export const getFrontendDashboardRoutes = ():RouteObject[] => {
  const frontendDashboardRoutes:RouteObject[] = [
    { path: "workbench", element: Component("/pages/dashboard/workbench")},
    { path: "analysis", element: Component("/pages/dashboard/analysis")},
    // {
    //   path: "components",
    //   children: [
        // { index: true, element: <Navigate to="animate" replace /> },
        // { path: "animate", element: Component("/pages/components/animate") },
        // { path: "scroll", element: Component("/pages/components/scroll") },
        // { path: "multi-language", element: Component("/pages/components/multi-language") },
        // { path: "icon", element: Component("/pages/components/icon") },
        // { path: "upload", element: Component("/pages/components/upload") },
        // { path: "chart", element: Component("/pages/components/chart") },
      // ],
    // },
  ];
  return frontendDashboardRoutes;
}