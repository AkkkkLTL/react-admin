// react
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
// i18n
import "./locales/i18n.ts";
// css
import "@/theme/global.css";  // global css
import "@/theme/theme.css";
import { registerLocalIcons } from './components/icon';
import { urlJoin } from './utils/index.ts';
// 全局配置
import { GLOBAL_CONFIG } from './global-config.ts';
import AppRoutes from './router/index.tsx';
// 注册图标
await registerLocalIcons();

// 开启mock服务
if (GLOBAL_CONFIG.openMock) {
   const { worker }  = import.meta.glob(["~/mock/index.ts"], {eager: true})[`/mock/index.ts`] as any;
   console.log(worker);
   worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: urlJoin(GLOBAL_CONFIG.publicPath, "mockServiceWorker.js"),
    },
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)