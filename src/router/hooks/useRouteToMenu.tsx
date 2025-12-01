import { useCallback } from "react";
import { AppRouteObject } from "../types";
import { GetProp, MenuProps } from "antd";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

type MenuItem = GetProp<MenuProps, "items">[number];

/**
 * 路由生成菜单
 * @returns MenuItem
 */
export function useRouteToMenu() {

  const { t } = useTranslation();

  const routeToMenuFn = useCallback(
    (items:AppRouteObject[]): MenuItem[] => {
      return (
        items
        .filter((item) => !item.meta?.hideMenu)
        .map((item) => {
          const { meta, children } = item;
          if (!meta) return {} as MenuItem;

          const menuItem:Partial<MenuItem> = {
            key: meta.key,
            label: (
              <div>{t(meta.label)}</div>
            ),
            icon: meta.icon && <Icon icon={meta.icon} size={18}/>,
            ...(children && { children: routeToMenuFn(children)})
          };
          return menuItem as MenuItem;
        })
      )
    }, []
  );

  return routeToMenuFn;
}