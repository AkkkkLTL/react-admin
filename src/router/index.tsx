import { lazy } from "react";
import { RouteObject, createBrowserRouter, createHashRouter, useRoutes } from "react-router-dom";
import "nprogress/nprogress.css"
import { RouteType } from "./types";
import Dashboard from "@/views/Dashboard";
import Menu1 from "@/views/Nested/Menu1";
import Menu1_1 from "@/views/Nested/Menu1/Menu1-1";
import Table from "@/views/Table";
import Tree from "@/views/Tree";
import Form from "@/views/Form";
import Menu1_2 from "@/views/Nested/Menu1/Menu1-2";
import Menu1_2_1 from "@/views/Nested/Menu1/Menu1-2/Menu1-2-1";
import Menu1_2_2 from "@/views/Nested/Menu1/Menu1-2/Menu1-2-2";
import Menu1_3 from "@/views/Nested/Menu1/Menu1-3";
import Menu2 from "@/views/Nested/Menu2";
const Login = lazy(() => import("@/views/Login"));
const Page404 = lazy(() => import("@/views/Page404"));
const Layout = lazy(() => import("@/layout"));
const AuthRoute = lazy(() => import("@/router/AuthRoute"));

/**
 * all roles can be accessed
 */
export const constantRoutes:RouteType[] = [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
        hidden: true,
      },
      {
        path: "/404",
        element: <Page404 />,
        hidden: true,
      },
      {
        path: "/",
        element: <Layout />,
        redirect: "/dashboard",
        children: [{
          path: "dashboard",
          element: <Dashboard />,
          name: "Dashboard",
          meta: {
            title: "Dashboard",
            icon: "dashboard"
          }
        }]
      },
      {
        path: "/example",
        element: <Layout />,
        redirect: "/example/table",
        name: "Example",
        meta: {
          title: "Example",
          icon: "example"
        },
        children: [
          {
            path: "table",
            element: <Table />,
            name: "Table",
            meta: {
              title: "Table",
              icon: "table"
            }
          },
          {
            path: "tree",
            element: <Tree />,
            name: "Tree",
            meta: {
              title: "Tree",
              icon: "tree"
            }
          }
        ]
      },
      {
        path: "/form",
        element: <Layout />,
        children: [
          {
            path: "/form/index",
            element: <Form />,
            name: "Form",
            meta: {
              title: "Form",
              icon: "form"
            }
          }
        ]
      },
      {
        path: "/nested",
        element: <Layout />,
        redirect: "/nested/menu1",
        name: "Nested",
        meta: {
          title: "Nested",
          icon: "nested"
        },
        children: [
          {
            path: "menu1",
            element: <Menu1 />,
            name: "Menu1",
            meta: {
              title: "Menu1"
            },
            children: [
              {
                path: "menu1-1",
                element: <Menu1_1 />,
                name: "Menu1-1",
                meta: {
                  title: "Menu1-1"
                }
              },
              {
                path: "menu1-2",
                element: <Menu1_2 />,
                name: "Menu1-2",
                meta: {
                  title: "Menu1-2"
                },
                children: [
                  {
                    path: "menu1-2-1",
                    element: <Menu1_2_1 />,
                    name: "Menu1-2-1",
                    meta: {
                      title: "Menu1-2-1"
                    }
                  },
                  {
                    path: "menu1-2-2",
                    element: <Menu1_2_2 />,
                    name: "Menu1-2-2",
                    meta: {
                      title: "Menu1-2-2"
                    }
                  }
                ]
              },
              {
                path: "menu1-3",
                element: <Menu1_3 />,
                name: "Menu1-3",
                meta: { title: "Menu1-3" }
              }
            ]
          },
          {
            path: "menu2",
            element: <Menu2 />,
            name: "Menu2",
            meta: { title: "Menu2" }
          }
        ]
      },
      {
        path: '*',
        redirect: "/404",
        hidden: true
      }
    ]
  },
  
]

const router = createHashRouter(constantRoutes as unknown as RouteObject[]);

export default router;