// quote from https://github.com/d3george/slash-admin/tree/main
import { ReactNode, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/store";
import { useRouter } from "../hooks/useRouter";
import { useUserToken } from "@/store/modules/userSlice";

interface IProps {
  children: ReactNode;
}

export default function AuthGuard({
  children
}:IProps) {

  const router = useRouter();
  const { accessToken } = useUserToken();
  debugger;
  const check = useCallback(() => {
    debugger;
    console.log("is accessToken", !accessToken);
    if (!accessToken) router.replace("/auth/login");
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <>{children}</>
  );
}