/**
 * * @description Vite 环境变量类型声明
 */
/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	/** 默认路由 */
	readonly VITE_APP_DEFAULT_ROUTE: string;
	/** 静态资源路径 */
	readonly VITE_APP_PUBLIC_PATH: string;
	/** API 基础路径 */
	readonly VITE_APP_API_BASE_URL: string;
	/** 是否开启mock */
	readonly VITE_APP_MOCK_ENABLE: boolean;
}
