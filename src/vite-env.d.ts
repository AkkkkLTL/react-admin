/**
 * * @description Vite 环境变量类型声明
 */
/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	// 路由模式：前端路由或后端路由
	readonly VITE_APP_ROUTER_MODE: "frontend" | "backend";
	// 默认路由
	readonly VITE_APP_DEFAULT_ROUTE: string;
	// 静态资源路径
	readonly VITE_APP_PUBLIC_PATH: string;
	// API 基础路径
	readonly VITE_APP_API_BASE_URL: string;
	// 是否开启mock
	readonly VITE_APP_MOCK_ENABLE: boolean;
}
