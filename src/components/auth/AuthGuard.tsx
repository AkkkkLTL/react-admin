import { ReactNode } from "react";

/**
 * 
 */
interface IProps {
    /** 用户有权限时显示的内容 */
    children: ReactNode;
    /** 用户无权限时显示的内容 */
    fallback?: ReactNode;
    check?: string;
    checkAny?: string[];
    checkAll?: string[];
    baseOn?: "role" | "permission"
}

export function AuthGuard({

}:IProps) {
    
}