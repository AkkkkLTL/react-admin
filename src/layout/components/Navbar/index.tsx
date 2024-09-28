import { CaretDownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Dropdown } from "antd";
import { FC } from "react";
import useNavbar from "./useNavbar";
import "./styles.scss";
import { IProps } from "./types";

const Navbar:FC<IProps> = (props) => {

  const {
    collapsed, toggleCollapes
  } = props;

  const {
    avatar, dropDownMenu, itemRender,
    handleDropDownMenuClick
  } = useNavbar(props);

  return (
    <div className="navbar">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapes}
        className="hamburger-container"
      />
      <Breadcrumb itemRender={itemRender} items={props.matches} className="breadcrumb-container"/>
      <div className="right-menu">
        <Dropdown menu={{items: dropDownMenu, onClick:handleDropDownMenuClick}} trigger={['click']}>
          <div className="avatar-wrapper">
            <img src={`${avatar}?imageView2/1/w/80/h/80`} className="user-avatar"/>
            <CaretDownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;