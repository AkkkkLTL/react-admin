import { FC, useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { setOption } from "./constants";

interface IProps {
  className?: string;
  width?: string;
  height?: string;
  autoResize?: boolean;
  chartData: object;
}

const LineChart:FC<IProps> = (props) => {

  const {
    className = "chart",
    width = "100%",
    height = "350px",
    autoResize = true,
    chartData
  } = props;

  const chartRef = useRef(null);

  useEffect(()=>{
    let chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(setOption(chartData));
  }, [props.chartData]);

  return (
    <div ref={chartRef} className={className} style={{
      height:height,
      width: width
    }}/>
  )
}

export default LineChart;