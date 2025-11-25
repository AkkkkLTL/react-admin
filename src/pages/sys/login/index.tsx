import { Layout, Typography } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "@/store";
import DashboardImg from "@/assets/images/dashboard.png";
import LoginStateProvider from "./providers/LoginStateProvider";
import LoginForm from "./LoginForm";
import { GLOBAL_CONFIG } from "@/global-config";
import { useUserToken } from "@/store/modules/userSlice";

const Login:FC = () => {
  // 获取用户权限
  const {accessToken} = useUserToken();
  const redirectToLogin = sessionStorage.getItem("redirectToLogin") === "true";

  // 判断用户权限是否存在
  if (accessToken && !redirectToLogin) {
    // 权限存在，跳转到首页
    return <Navigate to={GLOBAL_CONFIG.defaultRoute} replace />;
  }
  
  return (
    <Layout className="relative flex !flex-row !min-h-screen !w-full">
      <div
        className="grow flex-col items-center justify-center md:flex"
      >
        <div
          
        >Slash Admin</div>
        <img className="max-w-[480px]" src={DashboardImg} alt="" />
        <Typography.Text>
          @copyright 2025
        </Typography.Text>
      </div>
      <div
        className="flex flex-col justify-center m-auto max-w-[480px] w-full ps-[16px]"
      >
        <LoginStateProvider>
          <LoginForm />
        </LoginStateProvider>
      </div>
      <div
        className="flex flex-row absolute"
      >
        设置
      </div>
    </Layout>
  )
}
export default Login;