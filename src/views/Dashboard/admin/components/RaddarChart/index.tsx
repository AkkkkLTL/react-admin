import { FC, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { option } from "./constants";

interface IProps {
  className?: string;
  width?: string;
  height?: string;
}

const RadderChart:FC<IProps> = (props) => {

  const {
    className = "chart",
    width = "100%",
    height = "300px",
  } = props;

  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);
  }, []);

  return (
    <div ref={chartRef} className={className} style={{
      width: width,
      height: height
    }}/>
  )
}

export default RadderChart;