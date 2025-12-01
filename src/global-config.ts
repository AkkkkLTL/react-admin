/**
 * * @description 全局配置
 */
import packageJson from "../package.json";

export type GlobalConfig = {
    // Application name
    appName: string;
    // Application version
    appVersion: string;
    // 默认路由路径
    defaultRoute: string;
    // 发布路径
    publicPath: string;
    // API基础路径
    apiBaseUrl: string;
    // 路由模式：前端路由或后端路由
    routerMode: "frontend" | "backend";
    // 是否开启mock
    openMock: boolean;
}

export const GLOBAL_CONFIG: GlobalConfig = {
    appName: "React Admin",
    appVersion: packageJson.version,
    defaultRoute: import.meta.env.VITE_APP_DEFAULT_ROUTE || "/workbench",
    publicPath: import.meta.env.VITE_APP_PUBLIC_PATH || "/",
    apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL || "/api",
    routerMode: import.meta.env.VITE_APP_ROUTER_MODE || "backend",
    openMock: import.meta.env.VITE_APP_MOCK_ENABLE || true,
}