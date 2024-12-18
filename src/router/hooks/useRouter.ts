import { useMemo } from "react";
import { useNavigate } from "react-router-dom"

/**
 * 引用 https://github.com/d3george/slash-admin/blob/main/src/router/hooks/use-router.ts
 * @returns 
 */
export function useRouter() {

  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      replace: (href: string) => navigate(href, {replace: true}),
    }), [navigate]
  )

  return router;
}