// react
import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
// i18n
import "./locales/i18n.ts"
// root component
import App from './App.tsx';
import NProgress from './components/NProgress/index.tsx';

import "normalize.css/normalize.css"  // css reset
import "@/styles/index.scss"  // global css
import "virtual:svg-icons-register";

import "@/icons";
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import {store, persistor} from './store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';

// start service worker
if (import.meta.env.VITE_MOCK_ENABLE) {
   const { worker }  = import.meta.glob(["~/mock/index.js"], {eager: true})[`/mock/index.js`] as any;
   console.log(worker);
   worker.start({ 
    serviceWorker: {
      url: "/react-admin/mockServiceWorker.js",
    },
    onUnhandledRequest: "bypass" 
  });
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <StrictMode>
  <ThemeProvider theme={{}}>
    <Provider store={store}>
      <PersistGate loading={<NProgress />} persistor={persistor}>
        <Suspense fallback={<NProgress />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </ThemeProvider>
  </StrictMode>
)