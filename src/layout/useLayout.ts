import { constantRoutes } from "@/router"
import { getMenuFromRoutes } from "@/utils/menu"
import { useState } from "react";
import { matchRoutes, useLocation, useMatches } from "react-router-dom";

const useLayout = () => {

  const items = getMenuFromRoutes(constantRoutes);
  const location = useLocation();
  const matches = matchRoutes(constantRoutes, location);
  console.log("router Info", matches);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  // - - - - - - - - - - 页面交互 - - - - - - - - - - - - - - -

  const toggleCollapes = () => {
    setCollapsed(!collapsed);
  }

  return {
    items,
    collapsed,
    toggleCollapes,
  }
}

export default useLayout;