import { Layout } from "antd";
import styled from "styled-components";

export const MainWrapper = styled(Layout)`
  height: 100%;
  .ant-layout-header {
    padding: 0;
  }
  .main-container {
    overflow-y: scroll;
    background: #fff;
  }
  .app-container {
    padding: 20px;
  }
  .navbar {
    box-shadow: 0 1px 4px rgba(0,21,41,.08)
  }
`