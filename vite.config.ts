import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const base = env.VITE_APP_PUBLIC_PATH || "/";
	const isProduction = mode === "production";

	return {
		base,
		plugins: [
			react(),
			tsconfigPaths(),
			tailwindcss(),
			vanillaExtractPlugin({
				identifiers: ({ debugId }) => `${debugId}`,
			}),

			isProduction &&
				visualizer({
					open: true,
					gzipSize: true,
					brotliSize: true,
					template: "treemap",
				}),
		].filter(Boolean), // 过滤掉空值

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"), // 别名 @ 指向 src 目录
				"#": path.resolve(__dirname, "./src/types"), // 别名 # 指向 src/types 目录
				"~": path.resolve(__dirname, "./"), // 别名 ~ 指向根目录
			},
		},

		server: {
			open: true,
			host: true,
			port: 3001,
			proxy: {
				"/api": {
					target: `http://localhost:3000`,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					secure: false,
				},
			},
		},

		build: {
			target: "esnext",
			minify: "terser",
			sourcemap: !isProduction,
			cssCodeSplit: true,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					manualChunks: {
						"vendor-core": ["react", "react-dom", "react-router-dom"],
						"vendor-ui": ["antd", "@ant-design/cssinjs", "styled-components"],
						"vendor-utils": [
							"axios",
							"dayjs",
							"i18next",
							"@reduxjs/toolkit",
							"react-redux",
							"redux-persist",
							"@iconify/react",
						],
						"vendor-charts": ["apexcharts", "react-apexcharts"],
					},
				},
			},
			terserOptions: {
				compress: {
					// 生成环境移除 console
					keep_infinity: true,
					drop_debugger: true,
				},
			},
			outDir: "dist",
		},

		optimizeDeps: {
			include: ["react", "react-dom", "react-router-dom", "antd", "axios", "dayjs"],
			exclude: ["@iconify/react"],
		},

		esbuild: {
			drop: isProduction ? ["console", "debugger"] : [],
			legalComments: "none",
			target: "esnext",
		},

		// test: {
		// 	globals: true,
		// 	environment: "jsdom",
		// 	coverage: {
		// 		enabled: true,
		// 		provider: "v8",
		// 		cleanOnRerun: true,
		// 		reporter: ["text", "json", "html"],
		// 	},
		// },
	};
});
