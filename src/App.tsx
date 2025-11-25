import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index.ts';
import AntdAdapter from './theme/adapter/AntdAdapter';
import ThemeProvider from './theme/ThemeProvider';

interface IProps {
  children: ReactNode;
}

export function App({
  children
}:IProps) {

  console.log("渲染APP");

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider adapters={[AntdAdapter]}>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
    
  )
}

export default App;
