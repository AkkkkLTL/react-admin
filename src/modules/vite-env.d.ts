/**
 * * @description Vite 环境变量类型声明
 */
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_ROUTER_MODE: "frontend" | "backend";
  readonly VITE_APP_DEFAULT_ROUTE: string;
  readonly VITE_APP_PUBLIC_PATH: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_APP_ENV: "development" | "production" | "test";
  readonly VITE_APP_MOCK_ENABLE: boolean;
}