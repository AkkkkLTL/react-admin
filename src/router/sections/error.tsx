import { Outlet, type RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import SimpleLayout from "@/layouts/simple";

const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));

/**
 * error 
 * 403, 404, 500
 */
export const errorRoutes:RouteObject[] = [
  {
    element: (
      <SimpleLayout>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    children: [
      { path: "403", element: <Page403 /> },
      { path: "404", element: <Page404 /> },
      { path: "500", element: <Page500 /> },
    ],
  }
];