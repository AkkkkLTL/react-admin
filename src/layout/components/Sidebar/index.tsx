import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { FC } from "react";
import useSidebar from "./useSidebar";
import { IProps } from "./types";

const Sidebar:FC<IProps> = (props) => {

  const { collapsed } = props;

  const {
    menuList, selectedKeys,
    handleMenuOnClick,
  } = useSidebar(props);

  return (
    <Sider
      trigger={null}
      collapsible
      width={210}
      collapsed={collapsed}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={[]}
        selectedKeys={selectedKeys}
        onClick={handleMenuOnClick}
        items={menuList}
      />
    </Sider>
  )
}

export default Sidebar;