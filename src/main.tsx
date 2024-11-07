import ReactDOM from 'react-dom/client'

import "normalize.css"  // css reset
import "@/styles/index.scss"  // global css
import "virtual:svg-icons-register";

import "@/icons";
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';

if (import.meta.env.MODE === 'development') {
  const { mockXHR } = await import("~/mock/index.ts");
  mockXHR();
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <ThemeProvider theme={{}}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)