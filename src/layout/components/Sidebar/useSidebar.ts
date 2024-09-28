import { constantRoutes } from "@/router";
import { getMenuFromRoutes } from "@/utils/menu";
import { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { matchRoutes, useLocation, useMatches, useNavigate } from "react-router-dom";
import { getLevelKeys } from "./helper";
import { IProps, LevelKeysProps } from "./types";

const useSidebar = (props: IProps) => {
  const items = getMenuFromRoutes(constantRoutes);
  console.log("route generate menu", items);
  const levelKeys = getLevelKeys(items as LevelKeysProps[]);
  const location = useLocation();

  const navigate = useNavigate();

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>(['']);
  const [activeKey, setActiveKey] = useState<string>('');
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(['']);

  // 展开Sidebar时，Menu展开到选中的那一项
  useEffect(() => {
    const {collapsed} = props;

    if (!collapsed) setStateOpenKeys(defaultSelectedKeys);
  }, [props.collapsed]);

  useEffect(() => {
    const keys:string[] = [];
    props.matches.forEach((item) => {
      if (item.route.name) {
        keys.push(item.route.path);
      }
    });
    console.log("menu keys", keys);
    setDefaultSelectedKeys(keys);
    setStateOpenKeys(keys);
  }, [location.pathname])

  const handleMenuOnClick:MenuProps["onClick"] = (e) => {
    setDefaultSelectedKeys(e.keyPath);
    setStateOpenKeys(e.keyPath);
    setActiveKey(e.key);
    let path = '';
    for (let i = e.keyPath.length - 1; i > -1; --i) {
      path += e.keyPath[i] + '/';
    }
    if (path.charAt(0) !== '/') path = '/' + path;
    navigate(path);
  }

  const handleOpenChange:MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(openKeys
        .filter((_, index) => index !== repeatIndex)
        .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  }

  return {
    items,
    defaultSelectedKeys, activeKey, stateOpenKeys,
    handleMenuOnClick,
    handleOpenChange
  }
  
}

export default useSidebar;