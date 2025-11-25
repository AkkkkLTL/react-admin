import { Breadcrumb, BreadcrumbProps, GetProp } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatches } from "react-router-dom";

import { Icon } from "@/components/icon";
import { useFlattenedRoutes } from "@/router/hooks";
import { usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";

type MenuItem = GetProp<BreadcrumbProps, "items">[number];

export default function BreadCrumb() {
  const { t } = useTranslation();
  const matches = useMatches();
  const flattenedRoutes = useFlattenedRoutes();
  const premissionRoutes = usePermissionRoutes();

  const breadCrumbs = useMemo(() => {
    const menuRoutes = menuFilter(premissionRoutes);
    const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);

    const pathRouteMetas = flattenedRoutes.filter((item) => paths.includes(item.key));

    let currentMenuItem = [...menuRoutes];

    return pathRouteMetas.map((routeMeta):MenuItem => {
      const { key, label } = routeMeta;
      const currenRoute = currentMenuItem.find((item) => item.meta?.key === key);
      currentMenuItem = currenRoute?.children?.filter((item) => !item.meta?.hideMenu) ?? [];
      return {
        key,
        title: t(label),
        ...(currentMenuItem.length > 0 && {
          menu: {
            items: currentMenuItem.map((item) => ({
              key: item.meta?.key,
              label: item.meta?.key ? <Link to={item.meta.key}>{t(item.meta.label)}</Link> : null,
            })),
          },
        }),
      };
    });
  }, [matches, flattenedRoutes, t, premissionRoutes]);

  return (
    <Breadcrumb items={breadCrumbs} className="text-sm!" separator={<Icon icon="ph:dot-duotone" />} />
  )
}