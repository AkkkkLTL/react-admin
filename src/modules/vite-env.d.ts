/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_ROUTER_MODE: "permission" | "module";
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_HOMEPAGE: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_APP_ENV: "development" | "production" | "test";
  readonly VITE_MOCK_ENABLE: boolean;
}