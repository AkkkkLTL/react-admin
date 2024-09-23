import { Alert } from "antd";
import { FC } from "react";

const Menu1_3:FC = () => {
  return (
    <div style={{padding:"30px"}}>
      <Alert
        closable={false}
        message="menu 1-3"
        type="success"
      />
    </div>
  )
}

export default Menu1_3;