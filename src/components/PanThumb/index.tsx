import { FC, ReactNode } from "react";
import { Main } from "./styles";

interface IProps {
  image:string,
  className?:string,
  zIndex?: number,
  width?: string,
  height?: string,
  float?: "left" | "none",
  children?: ReactNode,
}

const PanThumb:FC<IProps> = (props) => {

  const {
    image,
    zIndex = 1,width = "150px",height = "150px",float = "none",
    children,
    className
  } = props;

  return (
    <Main 
      className={`pan-item${className ? " " + className:""}`}
      style={{
        zIndex: zIndex,
        height: height,
        width: width,
        float: float
      }}
    >
      <div className="pan-info">
        <div className="pan-info-roles-container">
          {children}
        </div>
      </div>
      <div className="pan-thumb" style={{
        backgroundImage: `url(${image})`
      }}></div>
    </Main>
  )
}

export default PanThumb;