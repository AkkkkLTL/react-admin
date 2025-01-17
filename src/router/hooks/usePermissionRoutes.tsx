import { useMemo } from "react";
import { getRoutesFromModules } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";

export function usePermissionRoutes() {

  const roles = useSelector((state:RootState) => state.user.roles);

  return useMemo(() => {
    if (roles)
      return getRoutesFromModules(roles);
    else return [];
  }, []);
}