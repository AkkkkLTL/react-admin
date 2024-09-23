import { FC } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import { AppMain, Navbar, Sidebar } from "./components";
import classNames from "classnames";
import useLayout from "./useLayout";
import { Content, Header } from "antd/es/layout/layout";
import { MainWrapper } from "./styles";

const Layout:FC = () => {

  const {
    collapsed,
    toggleCollapes
  } = useLayout();
  
  return (
    <MainWrapper className={classNames(["h-full","app-wrapper"])}>
      <Sidebar collapsed={collapsed} />
      <AntdLayout className="main-container" >
        <Header>
          <Navbar 
            collapsed={collapsed}
            toggleCollapes={toggleCollapes}
          />
        </Header>
        <Content>
          <AppMain />
        </Content>
      </AntdLayout>
    </MainWrapper>
  )
}

export default Layout;