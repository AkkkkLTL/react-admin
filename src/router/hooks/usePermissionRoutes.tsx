// quote from
import { Suspense, lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { flattenTrees } from "@/utils/tree";
import { Permission } from "@/types/entity";
import { getRoutesFromModules } from "../utils";
import type { AppRouteObject } from "../types";
import { PermissionType } from "@/types/enum";
import { CircleLoading } from "@/components/loading";
import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "ramda";

const ENTRY_PATH = "/src/pages";
const PAGES = import.meta.glob("/src/pages/**/*.tsx");
console.log("PAGES", PAGES);
const loadComponentFromPath = (path:string) => PAGES[`${ENTRY_PATH}${path}`];

function buildCompleteRoute(
  permission: Permission,
  flattenedPermissions: Permission[],
  segments: string[] = [],
):string {
  // 添加当前路由的路径段
  segments.unshift(permission.route);

  // 如果是父级路由，返回 /parent/ 的形式
  if (!permission.parentId) {
    return `/${segments.join("/")}`;
  }
  const parent = flattenedPermissions.find(
    (item) => item.id === permission.parentId,
  );
  if (!parent) {
    console
    return `/${segments.join("/")}`;
  }
  return buildCompleteRoute(parent, flattenedPermissions, segments);
}

/**
 * 创建基础路由对象
 * @param permission 权限对象
 * @param completeRoute 完整路由路径
 * @returns 树形路由对象 
 * {
 *  path: string;
 *  order?: number;
 *  meta: {
 *    label: string;
 *    key: string;
 *    hideMenu: boolean;
 *    icon?: string;
 *  } 
 * }
 */
function createBaseRoute(permission: Permission, completeRoute:string):AppRouteObject {
  const { route, label, hide, order, icon } = permission;
  const baseRoute:AppRouteObject = {
    path: route,
    meta: {
      label,
      key: completeRoute,
      hideMenu: !!hide,
    }
  };

  if (order) baseRoute.order = order;
  if (baseRoute.meta) {
    if (icon) baseRoute.meta.icon = icon;
  }
  return baseRoute;
}

function createCatalogueRoute(permission:Permission, flattenedPermissions:Permission[]):AppRouteObject {
  const baseRoute = createBaseRoute(permission, buildCompleteRoute(permission, flattenedPermissions));

  const { parentId, children = [] } = permission;
  if (!parentId) {
    baseRoute.element = (
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    );
  }

  baseRoute.children = transformPermissionsToRoutes(children, flattenedPermissions);
  if (!isEmpty(children)) {
    baseRoute.children.unshift({
      index:true,
      element: <Navigate to={children[0].route} replace />,
    });
  }
  return baseRoute;
}

/**
 * 创建菜单路由对象
 * @param permission 权限对象
 * @param flattenedPermissions 完整的扁平权限数组
 * @returns 树形路由对象
 */
function createMenuRoute(permission: Permission, flattenedPermissions: Permission[]):AppRouteObject {
  const baseRoute = createBaseRoute(permission, buildCompleteRoute(permission, flattenedPermissions));
  if (permission.component) {
    const Element = lazy(loadComponentFromPath(permission.component) as any);

    if (!permission.parentId) {
      baseRoute.element = (
        <Suspense fallback={<CircleLoading />}>
          <Element />
        </Suspense>
      );
    } else {
      baseRoute.element = (
        <Element /> // 子路由直接使用 Element，无需包裹 Suspens
      );
    }
  }
  return baseRoute;
}

function transformPermissionsToRoutes(permissions: Permission[], flattenedPermissions: Permission[]):AppRouteObject[] {
  return permissions.map((permission) => {
    if (permission.type === PermissionType.CATALOGUE) {
      return createCatalogueRoute(permission, flattenedPermissions);
    }
    return createMenuRoute(permission, flattenedPermissions);
  })
}

// 从环境变量中获取路由模式，默认为模块模式
const ROUTER_MODE = import.meta.env.VITE_APP_ROUTER_MODE || "frontend";

/**
 * 使用权限路由
 * 1. 模块模式：从模块中获取路由
 * 2. 权限模式：从权限中获取路由
 * @hook usePermissionRoutes
 * @returns 树形路由数组
 */
export function usePermissionRoutes() {

  // 路由模式为模块时，直接从模块中获取路由
  if (ROUTER_MODE === "frontend") {
    return getRoutesFromModules();
  }

  // 路由模式为权限时，从权限中获取路由
  const permissions = useSelector((state:RootState) => state.user.userInfo.permissions);
  return useMemo(() => {
    if (!permissions) return [];
    
    // 扁平化权限树
    const flattenedPermissions = flattenTrees<Permission>(permissions);

    return transformPermissionsToRoutes(permissions, flattenedPermissions);
  }, []);
}