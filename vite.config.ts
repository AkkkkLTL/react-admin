/// <reference types="vitest" />

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"
import path from 'path'
import alias from "@rollup/plugin-alias"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-admin/',
  plugins: [
    alias(),
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        icon: true
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, "src/icons/svg")]
    }),
    vanillaExtractPlugin({
      identifiers: ({debugId}) => `${debugId}`
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
      "@toast-ui/editor": path.resolve(__dirname, "./node_modules/@toast-ui/editor")
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      provider: "v8",
      cleanOnRerun: true,
      reporter: ['text', 'json', 'html']
    }
  },
  server: {
    open: true,
    host: true,
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000/react-admin/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      }
    }
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        // 生成环境移除 console
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true
      }
    },
    outDir: 'dist'
  }
})
