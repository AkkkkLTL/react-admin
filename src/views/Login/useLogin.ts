import { signIn } from "@/store/modules/userSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const useLogin = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const handleLoginSubmit = (values:any) => {
    console.log("Received values of form: ", values);
    dispatch(signIn(values));
    navigate(params.redirect || '/');
  }

  return {
    handleLoginSubmit,
  }
}

export default useLogin;