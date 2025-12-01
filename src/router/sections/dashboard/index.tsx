import { GLOBAL_CONFIG } from "@/global-config";
import DashboardLayout from "@/layouts/dashboard";
import AuthGuard from "@/router/components/AuthGuard";
import { Navigate, RouteObject } from "react-router-dom";
import { getFrontendDashboardRoutes } from "./frontend";
import { getBackendDashboardRoutes } from "./backend";

const getRoutes = ():RouteObject[] => {
    if (GLOBAL_CONFIG.routerMode === "frontend") {
        getFrontendDashboardRoutes();
    }
    return getBackendDashboardRoutes();
}

export const dashboardRoutes:RouteObject[] = [
    {
        element: (
           <AuthGuard>
                <DashboardLayout />
           </AuthGuard> 
        ),
        children: [
            { index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
            ...getRoutes(),
        ]
    }
]