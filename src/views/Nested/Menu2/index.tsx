import { Alert } from "antd";
import { FC } from "react";

const Menu2:FC = () => {
  return (
    <div style={{padding: "30px"}}>
      <Alert
        closable={false}
        message="menu 2"
      />
    </div>
  )
}

export default Menu2;