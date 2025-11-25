import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { FC } from "react";

interface IProps {
  title: string;
  increase: boolean;
  percent: string;
  count: string;
  chartData: number[];
}

const TotalCard:FC<IProps> = (props) => {

  const {
    title,
    increase,
    percent,
    count,
    chartData,
  } = props;

  return (
    <Card>
      <div>
        <h6>{title}</h6>
        <div>
          {increase ? (
            <div>+</div>
          ):(
            <div>-</div>
          )}
          <div>
            <span>{increase ? "+" : "-"}</span>
            <span>{percent}</span>
          </div>
        </div>
        <h3>{count}</h3>
      </div>
      <ChartLine data={chartData} />
    </Card>
  )
}

export default TotalCard;

interface IChartLineProps {
  data: number[];
}

const ChartLine:FC<IChartLineProps> = (props) => {

  const { data } = props;

  const series = [
    {
      name: "",
      data,
    }
  ];
  const chartOptions = useChart({
    tooltip: {
      x: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
        showDuplicates: false,
      },
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
    },
    grid: {
      show: false,
    }
  });

  return (
    <Chart type="line" series={series} options={chartOptions} width={120} />
  )
}