import { ComponentType, FC, ReactNode, Suspense, useEffect } from "react";
import { Outlet, matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { constantRoutes } from ".";
import getPageTitle from "@/utils/get-page-title";
import { getToken } from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/types";
import { getInfo, resetToken } from "@/redux/modules/userSlice";
import { message } from "antd";
import store from "@/redux/store";

interface IProps {
  Component: ReactNode;
  auth:boolean;
}

const whiteList = ["/login"];

const AuthRoute:FC = () => {

  const location = useLocation();
  const matches = matchRoutes(constantRoutes, location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    

    const hasToken = getToken();
    if (hasToken) {
      if (location.pathname === '/login') {
        navigate("/");
      } else {
        const hasUserInfo = store.getState().user.name;
        if (hasUserInfo) {
          navigate(location.pathname);
        } else {
          try {
            dispatch(getInfo(hasToken));
            navigate(location.pathname);
          } catch (error) {
            dispatch(resetToken());
            message.error(String(error) || "Has Error");
            navigate(`/login?redirect=${location.pathname}`);
          }
        }
      }
    } else {
      // has no token
      if (whiteList.indexOf(location.pathname) !== -1) {
        navigate(location.pathname);
      } else {
        navigate(`/login?redirect=${location.pathname}`);
      }
    }
  }, []);

  useEffect(() => {
    if (matches)
      document.title = getPageTitle(matches[matches?.length - 1].route.meta?.title || '');
  }, [location.pathname]);

  return (
    <Outlet />
  )
}

export default AuthRoute;