import { AppRouteObject, RouteMeta } from "./types";

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
 * 
 * @returns 
 */
export function getRoutesFromModules(roles?:string[]) {
  const menuModules:AppRouteObject[] = [];

  const modules = import.meta.glob("./routes/modules/*.tsx", {eager:true});
  for (const key in modules) {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  }

  return menuModules;
}

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