import { constantRoutes } from "@/router";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { FC } from "react";
import { matchRoutes, useLocation, useMatches } from "react-router-dom";
import useSidebar from "./useSidebar";
import { IProps } from "./types";

const Sidebar:FC<IProps> = (props) => {
  const location = useLocation();
  const matches = matchRoutes(constantRoutes, location);
  const meta = matches ? matches[matches?.length - 1].route : null;
  if (meta) console.log(meta);
  const {
    items,
    defaultSelectedKeys, stateOpenKeys,
    handleMenuOnClick, handleOpenChange
  } = useSidebar(props);

  console.log("Open State", stateOpenKeys);
  console.log("Select State", defaultSelectedKeys);

  return (
    <Sider
      trigger={null}
      collapsible
      width={210}
      collapsed={props.collapsed}
    >
      <Menu
        mode="inline"
        selectedKeys={defaultSelectedKeys}
        openKeys={stateOpenKeys}
        onOpenChange={handleOpenChange}
        onClick={handleMenuOnClick}
        items={items}
      />
    </Sider>
  )
}

export default Sidebar;