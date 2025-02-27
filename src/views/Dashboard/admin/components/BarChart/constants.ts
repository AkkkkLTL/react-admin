import { EChartsOption } from "echarts";

const animationDuration = 6000;

export const option:EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    top: 10,
    left: "2%",
    right: "2%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [{
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisTick: {
      alignWithLabel: true
    }
  }],
  yAxis: [{
    type: "value",
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: "pageA",
    type: "bar",
    stack: "vistors",
    barWidth: "60%",
    data: [79, 52, 200, 334, 390, 330, 220],
    animationDuration
  }, {
    name: "pageB",
    type: "bar",
    stack: "vistors",
    barWidth: "60%",
    data: [80, 52, 200, 334, 390, 330, 220],
    animationDuration
  }, {
    name: "pageC",
    type: "bar",
    stack: "vistors",
    barWidth: "60%",
    data: [30, 52, 200, 334, 390, 330, 220],
    animationDuration
  }]
}