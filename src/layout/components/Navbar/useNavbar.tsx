import { RootState } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
import { items } from "./constants";
import { logout } from "@/redux/modules/userSlice";
import { MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IProps } from "./types";
import { useEffect, useState } from "react";

const useNavbar = (props:IProps) => {
  const avatar = useSelector((state:RootState) => state.user.avatar);
  const dispatch = useDispatch();
  const dropDownMenu = items;
  const navigate = useNavigate();

  const handleDropDownMenuClick:MenuProps['onClick'] = ({ key }) => {
    if (key === '3') {
      dispatch(logout());
      navigate("/login");
    }
  }

  function itemRender(currentRoute, params, items, paths) {
    const isLast = currentRoute?.route.path === items[items.length - 1]?.route.path;

    if (!currentRoute.route.name) return null;
    return isLast ? (
      <span>{currentRoute.route.name}</span>
    ) : (
      <Link to={currentRoute.route.redirect || currentRoute.pathname} className="breadcrumb-link">{currentRoute.route.name}</Link>
    )
  }

  return {
    avatar, dropDownMenu,
    itemRender,
    handleDropDownMenuClick
  }
}

export default useNavbar;