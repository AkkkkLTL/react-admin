import { type FC } from 'react';
import "./App.scss"
import { ConfigProvider } from 'antd';
import zhCN from "antd/locale/zh_CN";
import Router from './router';

const App:FC = () => {

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Layout: {
            siderBg: '#304156',
            headerBg: '#fff'
          },
          Menu: {
            itemBg: '#304156',
            itemColor: 'rgb(191, 203, 217);',
            itemHeight: 56,
            subMenuItemBg: "#1f2d3d",
            itemHoverColor: 'rgb(191, 203, 217);',
            itemSelectedBg: '#304156'
          },
          Slider: {
            railBg: '#000000',
            railHoverBg: '#000000',
            handleColor: '#000000',
            handleActiveColor: '#000000',
            trackHoverBg: '#000000',
            dotSize: 4,
            trackBg: '#000'
          }
        }
      }}
    >
        <Router />
    </ConfigProvider>
  )
}

export default App;
