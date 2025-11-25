import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { FC } from "react";

const CurrentDownload:FC = () => {

  return (
    <Card>
      <header>
        Current Download
      </header>
      <main>
        <ChartDonut />
      </main>
    </Card>
  )
}

export default CurrentDownload;

const series = [44, 55, 13, 43];
const ChartDonut:FC = () => {

  const chartOptions = useChart({
    labels: ["Mac", "Windows", "Linux", "IOS"],
    stroke: {
      show: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    tooltip: {
      fillSeriesColor: false,
    },
    chart: {
      width: 240,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            total: {
              fontSize: "12px",
            },
            value: {
              fontSize: "18px",
              fontWeight: 700,
            }
          }
        }
      }
    }
  });

  return (
    <Chart type="donut" series={series} options={chartOptions} height={360} />
  );
}