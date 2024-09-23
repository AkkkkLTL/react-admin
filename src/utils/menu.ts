import SvgIcon from "@/components/SvgIcon";
import { RouteType } from "@/router/types";
import { MenuProps } from "antd";
import { createElement } from "react";

type MenuItem = Required<MenuProps>["items"][number] & {
  children?: MenuItem[]
};

/**
 * 路由生成菜单
 * @param routes 路由列表
 * @returns 
 */
export function getMenuFromRoutes(routes:RouteType[]):MenuItem[] {

  const items: MenuItem[] = [];
  
  routes.forEach((route) => {
    if (route.hidden) return;
    const { path, name, meta } = route;
    if (name) {
      const newItem: MenuItem = {
        key: path || '',
        label: name,
        icon: meta?.icon && createElement(SvgIcon, {iconClass: meta.icon})
      }
      if (route.children) {
        newItem.children = getMenuFromRoutes(route.children);
      }
      items.push(newItem);
    } else {
      if (route.children) {
        const newItem = getMenuFromRoutes(route.children);
        newItem.forEach(item => items.push(item));
      }
    }
  });

  return items;
} 