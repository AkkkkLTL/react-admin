import { CSSProperties, FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Card:FC<IProps> = (props) => {

  const { children, ...other } = props;

  return (
    <div 
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      {...other}
    >
      {children}
    </div>
  )
}
export default Card;