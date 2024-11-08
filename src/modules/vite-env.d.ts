/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string,
  readonly GRAPHQL_AUTH: string,
  readonly NODE_ENV: string,
  readonly VITE_MOCK_ENABLE
}