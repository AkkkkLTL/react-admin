import { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const items:MenuProps['items'] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: 0
  },
  {
    label: <a target="_blank" href="https://github.com/AkkkkLTL/react-admin">GitHub</a>,
    key: 1
  },
  {
    type: 'divider',
  },
  {
    label: "Log Out",
    key: 3
  }
];