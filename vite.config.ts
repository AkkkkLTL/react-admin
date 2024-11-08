/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-admin/',
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        icon: true
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, "src/icons/svg")]
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src')
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
    host: "0.0.0.0"
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
