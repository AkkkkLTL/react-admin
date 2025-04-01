// quote from https://github.com/d3george/slash-admin/tree/main
import { FC, ReactNode, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/store";
import { useRouter } from "../hooks/useRouter";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute:FC<IProps> = (props) => {

  const { children } = props;

  const router = useRouter();
  const accessToken = useSelector((state:RootState) => state.user.userToken.accessToken);

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

export default ProtectedRoute;