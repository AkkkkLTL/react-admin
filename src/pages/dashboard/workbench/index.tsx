import { Col, Row } from "antd";
import BannerCard from "./BannerCard";
import TotalCard from "./TotalCard";
import CurrentDownload from "./CurrentDownload";
import AreaDownload from "./AreaDownload";

export default function Workbench() {
    return (
        <div className="p-2">
            <Row gutter={[16, 16]} justify="center">
                <BannerCard />
            </Row>
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Active Users"
                        increase
                        count="18,765"
                        percent="2.6%"
                        chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
                    />
                </Col>
                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Installed"
                        increase
                        count="4,876"
                        percent="0.2%"
                        chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
                    />
                </Col>
                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Downloads"
                        increase={false}
                        count="678"
                        percent="0.1%"
                        chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} md={12} lg={8}>
                    <CurrentDownload />
                </Col>
                <Col span={24} md={12} lg={8}>
                    <AreaDownload />
                </Col>
            </Row>
        </div>
    )
}