import { Alert } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Menu1:FC = () => {
  return (
    <div style={{padding: "30px"}}>
      <Alert 
        closable={false} 
        message="menu 1"
        description={<Outlet />}
      />
    </div>
  )
}
export default Menu1;