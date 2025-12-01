import type { ApexOptions } from "apexcharts"
import { mergeDeepRight } from "ramda";

const useChart = (options:ApexOptions) => {
  const baseOptions: ApexOptions = {
    colors: [
    ],
    chart: {
      toolbar: { show: false },
      zoom: {enabled: false},
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
        }
      },
      active: {
        filter: {
          type: "darken",
        }
      }
    },
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    grid: {
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        }
      }
    },
    xaxis: {

    }
  };

  return mergeDeepRight(baseOptions, options) as ApexOptions;
}
export default useChart;