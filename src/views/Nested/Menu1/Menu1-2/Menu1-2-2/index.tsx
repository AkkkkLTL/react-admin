import { Alert } from "antd";
import { FC } from "react";

const Menu1_2_2:FC = () => {
  return (
    <div style={{padding: "30px"}}>
      <Alert
        closable={false}
        message="menu 1-2-2"
        type="warning"
      />
    </div>
  )
}

export default Menu1_2_2;