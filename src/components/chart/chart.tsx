import { FC, memo } from "react";
import ApexChart, { type Props as ApexChartProps} from "react-apexcharts";
import { chartWrapper } from "./styles.css";

const Chart:FC<ApexChartProps> = (props) => {
  return (
    <div className={chartWrapper}>
      <ApexChart {...props} />
    </div>
  )
}
export default memo(Chart);