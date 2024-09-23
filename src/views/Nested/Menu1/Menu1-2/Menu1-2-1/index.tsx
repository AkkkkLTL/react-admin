import { Alert } from "antd";
import { FC } from "react";

const Menu1_2_1:FC = () => {
  return (
    <div style={{padding: "30px"}}>
      <Alert
        closable={false}
        type="warning"
        message="menu 1-2-1"
      />
    </div>
  )
}

export default Menu1_2_1;