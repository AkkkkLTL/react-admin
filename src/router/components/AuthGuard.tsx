import { FC, ReactNode, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/types";

import { useRouter } from "../hooks/useRouter";

interface IProps {
  children: ReactNode;
}

/**
 * 引用 https://github.com/d3george/slash-admin/blob/main/src/router/components/auth-guard.tsx
 * @param props 
 */
const AuthGuard:FC<IProps> = (props) => {

  const { children } = props;

  const router = useRouter();

  const accessToken = useSelector((state:RootState) => state.user.token);

  const check = useCallback(() => {
    if (!accessToken) router.replace("/login");
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <>
      {children}
    </>
  )
}

export default AuthGuard;