import { RouteType } from "@/router/types";

function hasPermission(roles:string[], route:RouteType) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.roles?.includes(role));
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = [];
}