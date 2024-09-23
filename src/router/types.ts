import { RouteObject } from "react-router-dom";

/**
 * hidden:true                  if set true, item will not show in the sidebar
 * alwaysShow:true              if set true, will always show the root menu
 *                              if set false or not set, when item children.length > 0
 *                              it becomes nested mode, and not show the root menu
 * redirect: noRedirect         if set noRedirect will no redirect in the breadcrumb
 * name: 'router-name'          used to 'keep-alive'
 * meta: {
 *  roles: ['admin', 'editor']  control the page roles
 *  title: 'title'              the name show in sidebar and breadcrumb
 *  icon: 'svg-name'            the icon show in the sidebar
 *  breadcrumb: false           if set false, the item will hidden in breadcrumb(default is true)
 *  activeMenu: '/example/list' if set path, the sidebar will highlight the path you set
 * }
 */
export type RouteType = RouteObject & {
  hidden?: boolean,
  alwaysShow?: boolean,
  redirect?: string,
  name?: string,
  meta?: {
    roles?: string[],
    title?: string,
    icon?: string,
    breadcrumb?: boolean,
    activeMenu?: string
  },
  children?: RouteType[]
};