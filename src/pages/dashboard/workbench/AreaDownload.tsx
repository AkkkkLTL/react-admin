import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { Select } from "antd";
import { FC, useState } from "react"

const AreaDownload:FC = () => {
  const [year, setYear] = useState("2023");
  const series: Record<string, ApexAxisChartSeries> = {
    "2022": [
      { name: "China", data: [10, 41, 35, 51, 49, 61, 69, 91, 148, 35, 51]},
      { name: "America", data: [10, 34, 13, 56, 77, 88, 99, 45, 13, 56, 77]},
    ],
    "2023": [
      { name: "China", data: [51, 35, 41, 10, 91, 69, 69, 91, 148, 35, 51]},
      { name: "America", data: [56, 13, 34, 10, 77, 88, 99, 45, 13, 56, 77]},
    ],
  };

  return (
    <Card>
      <header>
        <div>Area Installed</div>
        <Select
          size="small"
          defaultValue={year}
          onChange={(value) => setYear(value)}
          options={[
            { value: 2023, label: "2023"},
            { value: 2022, label: "2022"},
          ]}
        />
      </header>
      <main>
        <ChartArea series={series[year]} />
      </main>
    </Card>
  )
}

export default AreaDownload;

function ChartArea({series}:{series: ApexAxisChartSeries}) {
  const chartOptions = useChart({
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    tooltip: {},
  });

  return (
    <Chart type="area" series={series} options={chartOptions} height={300} />
  )
}