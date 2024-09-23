import { Alert } from "antd";
import { FC } from "react";

const Menu1_1:FC = () => {
  return (
    <div style={{padding: "30px"}}>
      <Alert
        closable={false}
        type="success"
        message="menu 1-1"
      />
    </div>
  )
}

export default Menu1_1;