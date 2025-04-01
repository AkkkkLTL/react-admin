import { RootState } from "@/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const { VITE_APP_HOMEPAGE:HOMEPAGE } = import.meta.env;

const Login:FC = () => {
  const token = useSelector((state:RootState) => state.user.userToken);

  if (token.accessToken) {
    return <Navigate to={HOMEPAGE} replace />;
  }
  
  return (
    null
  )
}
export default Login;