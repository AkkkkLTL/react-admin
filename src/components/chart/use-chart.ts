import type { ApexOptions } from "apexcharts";
import { mergeDeepRight } from "ramda";
import { useSettings } from "@/store/modules/settingsSlice";
import { themeVars } from "@/theme/theme.css";
import { breakpointsTokens } from "@/theme/tokens/breakpoints";
import { paletteColors, presetsColors } from "@/theme/tokens/color";
import type { ThemeColorPresets, ThemeMode } from "@/types/enum";
import { removePx, rgbAlpha } from "@/utils/theme";

export function useChart(options: ApexOptions) {
	const { themeColorPresets, themeMode } = useSettings();

	const baseOptions = baseChartOptions(themeMode, themeColorPresets) ?? {};
	return mergeDeepRight(baseOptions, options) as ApexOptions;
}

const baseChartOptions = (themeMode: ThemeMode, themeColorPresets: ThemeColorPresets): ApexOptions => {
	const LABEL_TOTAL = {
		show: true,
		label: "Total",
		color: themeVars.colors.text.secondary,
		fontSize: themeVars.typography.fontSize.sm,
		lineHeight: themeVars.typography.lineHeight.tight,
	};

	const LABEL_VALUE = {
		offsetY: 8,
		color: themeVars.colors.text.primary,
		fontSize: themeVars.typography.fontSize.sm,
		lineHeight: themeVars.typography.lineHeight.tight,
	};

	return {
		// 图表颜色
		colors: [
			presetsColors[themeColorPresets].default,
			paletteColors.info.default,
			paletteColors.success.default,
			paletteColors.warning.default,
			paletteColors.error.default,

			paletteColors.warning.dark,
			paletteColors.error.dark,
			paletteColors.info.dark,
			paletteColors.success.dark,
		],

		// 图表配置
		chart: {
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
			parentHeightOffset: 0,
			foreColor: themeVars.colors.text.disabled,
			fontFamily: themeVars.typography.fontFamily.openSans,
			// 优化动画配置以提高响应式性能
			animations: {
				enabled: true,
				speed: 360,
				animateGradually: { enabled: true, delay: 120 },
				dynamicAnimation: { enabled: true, speed: 360 },
			},
			// 启用快速响应式重绘
			redrawOnParentResize: true,
			redrawOnWindowResize: true,
		},

		// 图表状态配置
		states: {
			hover: { filter: { type: "darken" } },
			active: { filter: { type: "darken" } },
		},

		// 图表填充配置
		fill: {
			opacity: 1,
			gradient: {
				type: "vertical",
				shadeIntensity: 0,
				opacityFrom: 0.4,
				opacityTo: 0,
				stops: [0, 100],
			},
		},

		// 图表数据标签配置
		dataLabels: {
			enabled: false,
		},

		// 图表边框配置
		stroke: {
			width: 2.5,
			curve: "smooth",
			lineCap: "round",
		},

		// 图表网格配置
		grid: {
			strokeDashArray: 3,
			borderColor: themeVars.colors.background.neutral,
			padding: { top: 0, right: 0, bottom: 0 },
			xaxis: { lines: { show: false } },
		},

		// 图表 XY 轴配置
		xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
		yaxis: { tickAmount: 5 },

		// 图表标记配置
		markers: {
			size: 0,
			strokeColors: themeVars.colors.background.paper,
		},

		// 图表提示框配置
		tooltip: { theme: themeMode, fillSeriesColor: false, x: { show: true } },

		// 图表图例配置
		legend: {
			show: false,
			fontSize: themeVars.typography.fontSize.sm,
			position: "top",
			horizontalAlign: "right",
			markers: { shape: "circle" },
			fontWeight: 500,
			itemMargin: { horizontal: 8, vertical: 8 },
			labels: { colors: themeVars.colors.text.primary },
		},

		// 图表绘制选项配置
		plotOptions: {
			// 柱状图配置
			bar: { borderRadius: 4, columnWidth: "48%", borderRadiusApplication: "end" },

			// 饼图配置
			pie: {
				donut: { labels: { show: true, value: { ...LABEL_VALUE }, total: { ...LABEL_TOTAL } } },
			},

			// 径向进度条配置
			radialBar: {
				hollow: { margin: -8, size: "100%" },
				track: {
					margin: -8,
					strokeWidth: "50%",
					background: rgbAlpha(themeVars.colors.palette.gray[500], 0.5),
				},
				dataLabels: {
					value: { ...LABEL_VALUE },
					total: { ...LABEL_TOTAL },
				},
			},

			// 雷达图配置
			radar: {
				polygons: {
					fill: { colors: ["transparent"] },
					strokeColors: themeVars.colors.background.neutral,
					connectorColors: themeVars.colors.background.neutral,
				},
			},

			// 极区图配置
			polarArea: {
				rings: {
					strokeColor: themeVars.colors.background.neutral,
				},
				spokes: {
					connectorColors: themeVars.colors.background.neutral,
				},
			},
		},

		responsive: [
			{
				breakpoint: removePx(breakpointsTokens.sm),
				options: {
					plotOptions: { bar: { columnWidth: "80%", borderRadius: 3 } },
				},
			},
			{
				breakpoint: removePx(breakpointsTokens.md),
				options: {
					plotOptions: { bar: { columnWidth: "62%" } },
				},
			},
		],
	};
};
