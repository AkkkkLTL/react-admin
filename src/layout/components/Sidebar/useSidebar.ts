import { MenuProps } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IProps } from "./types";
import { useRouteToMenu } from "@/router/hooks/useRouteToMenu";
import { usePermissionRoutes } from "@/router/hooks/usePermissionRoutes";
import { usePathname } from "@/router/hooks/usePathname";
import { menuFilter } from "@/router/utils";

const useSidebar = (props: IProps) => {
  const pathname = usePathname();
  const navigate = useNavigate();

  const routeToMenuFn = useRouteToMenu();
  const permissionRoutes = usePermissionRoutes();

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  const selectedKeys = useMemo(() => [pathname], [pathname]);

  const handleMenuOnClick:MenuProps["onClick"] = ({key}) => {
    navigate(key);
  }

  return {
    menuList, selectedKeys,
    handleMenuOnClick,
  }
}

export default useSidebar;