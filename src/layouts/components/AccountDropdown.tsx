import { Divider, Dropdown, DropdownProps, MenuProps } from "antd";
import { cloneElement, CSSProperties, FC, ReactElement, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, RouteObject, useOutletContext } from "react-router-dom";

import { useRouter } from "@/router/hooks";
import { clearUserInfoAndToken } from "@/store/modules/userSlice";
import { useLoginStateContext } from "@/pages/sys/login/providers/LoginStateProvider";
import { useTheme } from "@/theme/hooks";
import { RootState } from "@/store";
import { Button } from "@/ui/Button";

const { VITE_APP_HOMEPAGE:HOMEPAGE } = import.meta.env;

/**
 * 账号下拉菜单
 */
export default function AccountDropdown() {

  const { replace } = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, email, avatar } = useSelector((state:RootState) => state.user.userInfo);
  const { backToLogin } = useLoginStateContext();
  

  const logout = () => {
    try {
      dispatch(clearUserInfoAndToken());
      backToLogin();
    } catch (error) {
      console.log(error);
    } finally {
      sessionStorage.setItem("isAddDynamicRoutes", "false");
      replace("/auth/login");
    }
  }

  const {
    themeVars: { colors, borderRadius, shadows }
  } = useTheme();

  const contentStyle:CSSProperties = {
    backgroundColor: colors.background.default,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
  }

  const dropdownRender:DropdownProps["dropdownRender"] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{username}</div>
        <div className="text-grey">{email}</div>
      </div>
      <Divider style={{margin: 0}} />
      {cloneElement(menu as ReactElement, {style: { boxShadow:"none"}})}
    </div>
  )

  const items:MenuProps["items"] = [
    {
      label: (
        <NavLink to="https://akkkltl.github.com/" target="_blank">
          {t("sys.docs")}
        </NavLink>
      ),
      key: "0",
    },
    {
      label: <NavLink to={HOMEPAGE}>{t("sys.menu.dashboard")}</NavLink>,
      key: "1",
    },
    {
      label: <NavLink to={HOMEPAGE}>{t("sys.menu.user.profile")}</NavLink>,
      key: "2",
    },
    {
      label: <NavLink to={HOMEPAGE}>{t("sys.menu.user.account")}</NavLink>,
      key: "3",
    },
    {type: "divider"},
    {
      label: (
        <button className="font-bold text-warning" type="button">
          {t("sys.login.logout")}
        </button>
      ),
      key: "4",
      onClick: logout
    }
  ]

  return (
    <Dropdown menu={{ items }} trigger={["click"]} dropdownRender={dropdownRender}>
      <Button variant="ghost" size="icon" className="rounded-full">
        <img className="h-6 w-6 rounded-full" src={avatar} alt="" />
      </Button>
    </Dropdown>
  )
}