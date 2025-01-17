import { FC } from "react";
import { Main } from "./styles";
import { Col } from "antd/lib";
import SvgIcon from "@/components/SvgIcon";
import CountTo from "@/components/CountTo";

interface IProps {
  handleSetLineChartData: (type:any) => void
}

const PanelGroup:FC<IProps> = (props) => {
  
  return (
    <Main className="panel-group" gutter={40}>
      <Col xs={12} sm={12} lg={6} className="card-panel-col">
        <div className="card-panel" onClick={()=>{
          props.handleSetLineChartData("newVisitis");
        }}>
          <div className="card-panel-icon-wrapper icon-people">
            <SvgIcon iconClass="peoples" className="card-panel-icon" />
          </div>
          <div className="card-panel-description">
            <div className="card-panel-text">
              New Visits
            </div>
            <CountTo startVal={0} endVal={102400} duration={2600} className="card-panel-num" />
          </div>
        </div>
      </Col>
      <Col xs={12} sm={12} lg={6} className="card-panel-col">
        <div className="card-panel" onClick={()=>{
          props.handleSetLineChartData("messages");
        }}>
          <div className="card-panel-icon-wrapper icon-message">
            <SvgIcon iconClass="message" className="card-panel-icon" />
          </div>
          <div className="card-panel-description">
            <div className="card-panel-text">
              Messages
            </div>
            <CountTo startVal={0} endVal={81212} duration={3000} className="card-panel-num" />
          </div>
        </div>
      </Col>
      <Col xs={12} sm={12} lg={6} className="card-panel-col">
        <div className="card-panel" onClick={() => {
          props.handleSetLineChartData("purchases");
        }}>
          <div className="card-panel-icon-wrapper icon-money">
            <SvgIcon iconClass="money" className="card-panel-icon" />
          </div>
          <div className="card-panel-description">
            <div className="card-panel-text">
              Purchases
            </div>
            <CountTo startVal={0} endVal={9280} duration={3200} className="card-panel-num" />
          </div>
        </div>
      </Col>
      <Col xs={12} sm={12} lg={6} className="card-panel-col">
        <div className="card-panel" onClick={()=>{
          props.handleSetLineChartData("shoppings");
        }}>
          <div className="card-panel-icon-wrapper icon-shopping">
            <SvgIcon iconClass="shopping" className="card-panel-icon" />
          </div>
          <div className="card-panel-description">
            <div className="card-panel-text">
              Shoppings
            </div>
            <CountTo startVal={0} endVal={13600} duration={3600} className="card-panel-num" />
          </div>
        </div>
      </Col>
    </Main>
  )
}

export default PanelGroup;