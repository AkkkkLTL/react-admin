import { RootState } from "@/store";
import { Col, Row } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";

const BannerCard:FC = () => {

  const { username } = useSelector((state:RootState) => state.user.userInfo);

  return (
    <Row gutter={[16, 16]} justify="space-between">
        <div>
          <h4>Welcome back 👋 </h4>
          <h4>{username}</h4>
        </div>
    </Row>
  )
}
export default BannerCard;