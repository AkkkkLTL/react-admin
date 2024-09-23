import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

interface IProps {
  collapsed: boolean;
  toggleCollapes: () => void;
}

const Navbar:FC<IProps> = (props) => {

  const {
    collapsed, toggleCollapes
  } = props;

  return (
    <div className="navbar">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapes}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64
        }}
      />
    </div>
  );
}

export default Navbar;