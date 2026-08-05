import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * 获取当前路径，不包含查询参数
 * @hook usePathname
 * @returns pathname - 当前路径
 * @example const pathname = usePathname();
 * http://localhost:3001/react-admin/#/dashboard => /dashboard
 */
export function usePathname() {
  const { pathname } = useLocation();

  return useMemo(() => pathname, [pathname]);
}