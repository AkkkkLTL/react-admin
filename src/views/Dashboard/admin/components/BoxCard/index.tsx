import PanThumb from "@/components/PanThumb";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { RootState } from "@/redux/types";
import { Card, Progress } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

const BoxCard:FC = () => {

  const name = useSelector((state:RootState) => state.user.name);
  const avatar = useSelector((state:RootState) => state.user.avatar);

  return (
    <Card 
      className="box-card-component" 
      style={{
        marginLeft: "8px"
      }}
      cover={
        <div className="box-card-header">
          <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" />
        </div>
      }
    >
      <div style={{position: "relative"}}>
        <PanThumb image={avatar} className="panThumb" />
        <Mallki className=" mallki-text" text="react-antd-main" />
        <div style={{paddingTop: "35px"}} className="progress-item">
          <span>React</span>
          <Progress percent={70} />
        </div>
        <div className="progress-item">
          <span>TypeScript</span>
          <Progress percent={12} />
        </div>
        <div className="progress-item">
          <span>CSS</span>
          <Progress percent={12} />
        </div>
        <div className="progress-item">
          <span>ESLint</span>
          <Progress percent={100} status="success" />
        </div>
      </div>
    </Card>
  )
}

export default BoxCard;