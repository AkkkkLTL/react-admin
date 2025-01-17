import { FC, useState } from "react";
import { Main } from "./styles";
import GithubCorner from "@/components/GithubCorner";
import { lineChartData } from "./constants";
import PanelGroup from "./components/PanelGroup";
import { Col, Row } from "antd/lib";
import LineChart from "./components/LineChart";
import RadderChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";

const DashboardAdmin:FC = () => {

  const [chartData, setCharData] = useState(lineChartData.newVisitis);

  const handleSetLineChartData = (type:typeof lineChartData) => {
    setCharData(lineChartData[type]);
  }

  return (
    <Main className="dashboard-editor-container">
      <GithubCorner />
      <PanelGroup handleSetLineChartData={handleSetLineChartData}/>
      <Row style={{
        background: "#fff",
        padding: "16px 16px 0",
        marginBottom: "32px"
      }}>
        <LineChart chartData={chartData} />
      </Row>

      <Row gutter={32}>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <RadderChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{
          paddingRight: "8px",
          marginBottom: "30px"
        }}>
          <TransactionTable />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} style={{
          marginBottom: "30px"
        }}>
          <TodoList />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} style={{
          marginBottom: "30px"
        }}>
          <BoxCard />
        </Col>
      </Row>
    </Main>
  )
}

export default DashboardAdmin;