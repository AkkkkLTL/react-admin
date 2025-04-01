// react
import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
// svg icon
import "virtual:svg-icons-register";
// store manage
import { Provider } from 'react-redux';
import {store, persistor} from './store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
// i18n
import "./locales/i18n.ts";
// css
import "normalize.css/normalize.css"  // css reset
import "@/styles/index.scss"  // global css
// root component
import App from './App.tsx';
import NProgress from './components/NProgress/index.tsx';

import "@/icons";

// start moke service
if (import.meta.env.VITE_MOCK_ENABLE) {
   const { worker }  = import.meta.glob(["~/mock/index.ts"], {eager: true})[`/mock/index.ts`] as any;
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
    <Provider store={store}>
      <PersistGate loading={<NProgress />} persistor={persistor}>
        <Suspense fallback={<NProgress />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </StrictMode>
)