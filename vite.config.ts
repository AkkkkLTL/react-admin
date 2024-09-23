/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
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
  server: {
    host: "0.0.0.0"
  },
  base: '/react-admin',
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      provider: "v8",
      cleanOnRerun: true,
      reporter: ['text', 'json', 'html']
    }
  }
})
