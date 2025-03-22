// quote from
import { useMemo } from "react";
import { flattenMenuRoutes, getRoutesFromModules } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ROUTER_MODE = import.meta.env.VITE_ROUTER_MODE;
export function usePermissionRoutes() {

  if (ROUTER_MODE === "module") {
    return getRoutesFromModules();
  }

  const permissions = useSelector((state:RootState) => state.user.userInfo.permissions);
  return useMemo(() => {
    if (!permissions) return [];
    
    const flattenedPermissions = flattenMenuRoutes(permissions);


  }, []);
}