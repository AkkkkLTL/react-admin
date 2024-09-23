import { constantRoutes } from "@/router";
import { getMenuFromRoutes } from "@/utils/menu";
import { MenuProps } from "antd";
import { useState } from "react";
import { matchRoutes, useMatches, useNavigate } from "react-router-dom";
import { getLevelKeys } from "./helper";
import { IProps, LevelKeysProps } from "./types";

const useSidebar = (props: IProps) => {
  const items = getMenuFromRoutes(constantRoutes);
  const levelKeys = getLevelKeys(items as LevelKeysProps[])

  const navigate = useNavigate();

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>(['']);
  const [activeKey, setActiveKey] = useState<string>('');
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(['']);

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
    console.log("handleMenuOnClick", [stateOpenKeys]);
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
    console.log("handleOpenChange", [stateOpenKeys, openKeys]);
  }

  return {
    items,
    defaultSelectedKeys, activeKey, stateOpenKeys,
    handleMenuOnClick,
    handleOpenChange
  }
  
}

export default useSidebar;