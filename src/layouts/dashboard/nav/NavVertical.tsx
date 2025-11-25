import { Layout, Menu } from "antd";
import { useMemo, useState } from "react";
import { usePermissionRoutes } from "@/router/hooks";
import { useRouteToMenu } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { NAV_WIDTH } from "../config";
import { usePathname } from "@/router/hooks";

const { Sider } = Layout;

/**
 * DashboardLayout 左侧菜单（垂直模式）
 */
export default function NavVertical() {
    const pathname = usePathname();

    const routeToMenuFn = useRouteToMenu();
    const permissionRoutes = usePermissionRoutes();

    const [selectedKeys, setSelectedKeys] = useState([pathname]);

    // 菜单列表
    const menuList = useMemo(() => {
        const menuRoutes = menuFilter(permissionRoutes);
        return routeToMenuFn(menuRoutes);
    }, [routeToMenuFn, permissionRoutes]);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={false}
            width={NAV_WIDTH}
            theme="light"
            className="h-screen left-0 top-0 fixed! border-r border-dashed"
        >
            <div>
                {/* NevLogo */}
                <Menu
                    mode="inline"
                    items={menuList}
                    theme="light"
                    
                />
            </div>
        </Sider>
    )
}