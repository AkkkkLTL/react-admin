import { RootState } from "@/store"
import { useSelector } from "react-redux"

export const useAuth = (baseOn:"role" | "permission"="permission") => {
    const { } = useSelector((state:RootState) => state.user.userToken);
    const { permissions = [], roles = [] } = useSelector((state:RootState) => state.user.userInfo);

    
}