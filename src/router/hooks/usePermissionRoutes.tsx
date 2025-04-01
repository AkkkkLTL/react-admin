// quote from
import { Suspense, lazy, useMemo } from "react";
import { getRoutesFromModules } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { flattenTrees } from "@/utils/tree";
import { Permission } from "@/utils/global-types";
import { PermissionType } from "@/utils/setting-enum";
import { AppRouteObject } from "../types";

const ENTRY_PATH = "/src/views";
const PAGES = import.meta.glob("/src/views/**/*.tsx");
const loadComponentFromPath = (path:string) => PAGES[`${ENTRY_PATH}${path}`];

function buildCompleteRoute(
  permission: Permission,
  flattenedPermissions: Permission[],
  segments: string[] = [],
):string {
  segments.unshift(permission.route);

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
  console.log("baseRoute", baseRoute);
  return baseRoute;
}

function createMenuRoute(permission: Permission, flattenedPermissions: Permission[]):AppRouteObject {
  const baseRoute = createBaseRoute(permission, buildCompleteRoute(permission, flattenedPermissions));
  if (permission.component) {
    const Element = lazy(loadComponentFromPath(permission.component) as any);

    baseRoute.element = (
      <Suspense fallback={null}>
        <Element />
      </Suspense>
    );
  }
  return baseRoute;
}

function transformPermissionsToRoutes(permissions: Permission[], flattenedPermissions: Permission[]):AppRouteObject[] {
  return permissions.map((permission) => {
    return createMenuRoute(permission, flattenedPermissions);
  })
}

const ROUTER_MODE = import.meta.env.VITE_ROUTER_MODE;
export function usePermissionRoutes() {

  if (ROUTER_MODE === "module") {
    return getRoutesFromModules();
  }

  const permissions = useSelector((state:RootState) => state.user.userInfo.permissions);
  return useMemo(() => {
    if (!permissions) return [];
    
    const flattenedPermissions = flattenTrees(permissions);

    return transformPermissionsToRoutes(permissions, flattenedPermissions);
  }, []);
}