import { AppRouteObject, RouteMeta } from "./types";

/**
 * 菜单过滤和排序
 * 1. 过滤掉没有 key 值的菜单
 * 2. 对菜单进行排序，order 值越小越靠前
 * @param items 树形路由数组
 * @returns 过滤后的树形路由数组
 */
export function menuFilter(items:AppRouteObject[]) {
  return (
    items
    .filter((item) => {
      const show = item.meta?.key;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort((itemA, itemB) => (itemA.order || Number.POSITIVE_INFINITY) - (itemB.order || Number.POSITIVE_INFINITY))
  )
}

/**
 * 获取路由模块（限“modules”模式下）
 * @returns 树形路由数组
 */
export function getRoutesFromModules() {
  const menuModules:AppRouteObject[] = [];

  const modules = import.meta.glob("./routes/modules/*.tsx", {eager:true});
  for (const key in modules) {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  }

  return menuModules;
}

/**
 * 扁平化菜单路由
 * @param routes 树形路由数组
 * @returns 菜单关键元素数组 RouteMeta[]
 * @example
 * 输入参数：
 * [
 *  {order:1, path:"xx", element:ReactNode, meta:{key:"xx", label:"xx", icon:"xx"}, 
 *  children:[{order:1, path:"childrenpath", element:ReactNode, meta:{key:"childKey", label:"childLabel", icon:"childIcon2”}}]},
 *  {order:2, path:"xx2", element:ReactNode, meta:{key:"xx2", label:"xx2", icon:"xx2"}, 
 *  children:[{order:1, path:"childrenpath2", element:ReactNode, meta:{key:"childKey2", label:"childLabel2", icon:"childIcon2“}}]}
 * ]
 * 返回值：
 * [
 *  {key:"xx", label:"xx", icon:"xx"},
 *  {key:"childKey, label:"childLabel", icon:"childIcon"},
 *  {key:"xx2", label:"xx2", icon:"xx2"},
 *  {key:"childKey2, label:"childLabel2", icon:"childIcon2"}
 * ]
 */
export function flattenMenuRoutes(routes:AppRouteObject[]) {
  return routes.reduce<RouteMeta[]>((prev, curr) => {
    const { meta, children } = curr;
    if (meta) {
      prev.push(meta);
    }
    if (children) {
      prev.push(...flattenMenuRoutes(children));
    }
    return prev;
  }, []);
}