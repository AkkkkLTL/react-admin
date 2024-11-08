import ReactDOM from 'react-dom/client'

import "normalize.css"  // css reset
import "@/styles/index.scss"  // global css
import "virtual:svg-icons-register";

import "@/icons";
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';
import { doDynamicImport } from './utils/dynamicImport.ts';

if (import.meta.env.VITE_MOCK_ENABLE) {
   const { mockXHR } = doDynamicImport() as any;
   mockXHR();
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <ThemeProvider theme={{}}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)