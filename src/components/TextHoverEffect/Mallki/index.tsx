import { FC } from "react";
import "./styles.scss";

interface IProps {
  className?:string;
  text?: string;
}

const Mallki:FC<IProps> = (props) => {

  const {
    className = '',
    text = "react-antd-admin"
  } = props;

  return (
    <a className={"link--mallki" + className} href="#">
      { text }
      <span className="data-letters" />
      <span className="data-letters" />
    </a>
  )
}

export default Mallki;