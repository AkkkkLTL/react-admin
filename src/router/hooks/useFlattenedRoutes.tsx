import { useCallback, useMemo } from "react"
import { flattenMenuRoutes, menuFilter } from "../utils";
import { usePermissionRoutes } from "./usePermissionRoutes";

/**
 * 扁平化路由
 * @hook useFlattenedRoutes
 * @returns 过滤后的扁平化菜单路由数组
 * {
 *  {key:"xx", label:"xx", icon:"xx"},
 *  {key:"childKey, label:"childLabel", icon:"childIcon"},
 * }
 * @example
 * const flattenedRoutes = useFlattenedRoutes();
 */
export function useFlattenedRoutes() {
  // 获取扁平化菜单路由数组
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  // 获取权限路由数组
  const permissionRoutes = usePermissionRoutes();
  return useMemo(() => {
    // 过滤菜单路由数组
    const menuRoutes = menuFilter(permissionRoutes);
    return flattenRoutes(menuRoutes);
  }, [flattenMenuRoutes, permissionRoutes]);
}