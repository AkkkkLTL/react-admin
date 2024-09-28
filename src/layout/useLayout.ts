import { constantRoutes } from "@/router"
import { getMenuFromRoutes } from "@/utils/menu"
import { useEffect, useState } from "react";
import { matchRoutes, useLocation, useMatch, useMatches, useNavigate } from "react-router-dom";

const useLayout = () => {

  const items = getMenuFromRoutes(constantRoutes);
  const location = useLocation();
  const matches = matchRoutes(constantRoutes, location);
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = matches[matches?.length - 1].route.redirect;
    if (redirect) {
      navigate(redirect);
    }
  }, [matches]);
  console.log("router Info", matches);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  // - - - - - - - - - - 页面交互 - - - - - - - - - - - - - - -

  const toggleCollapes = () => {
    setCollapsed(!collapsed);
  }

  return {
    items, matches,
    collapsed,
    toggleCollapes,
  }
}

export default useLayout;