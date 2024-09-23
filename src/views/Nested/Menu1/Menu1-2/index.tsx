import { Alert } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Menu1_2:FC = () => {
  return (
    <div style={{padding: "30px"}}>
      <Alert
        closable={false}
        message="menu 1-2"
        type="success"
        description={<Outlet />}
      />
    </div>
  )
}
export default Menu1_2;