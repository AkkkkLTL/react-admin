// react
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// i18n
import "./locales/i18n.ts";
// css
import "@/global.css"; // global css
import "@/theme/theme.css.ts";
import { registerLocalIcons } from "./components/icon/index.tsx";
// 全局配置
import { GLOBAL_CONFIG } from "./global-config.ts";
import AppRoutes from "./router/index.tsx";
import { Store } from "./store/index.tsx";
import { urlJoin } from "./utils";

// 注册图标
await registerLocalIcons();

// 判断开启mock服务
if (GLOBAL_CONFIG.openMock) {
	const { worker } = import.meta.glob(["/mock/index.ts"], { eager: true })[`/mock/index.ts`] as any;
	console.log(worker);
	await worker.start({
		onUnhandledRequest: "bypass",
		serviceWorker: {
			url: urlJoin(GLOBAL_CONFIG.publicPath, "mockServiceWorker.js"),
		},
	});
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<Store>
			<AppRoutes />
		</Store>
	</StrictMode>,
);
