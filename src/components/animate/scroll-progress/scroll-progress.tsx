import { type HTMLMotionProps, type MotionValue, m, useSpring } from "motion/react";
import type { CSSProperties } from "react";
import { useTheme } from "@/theme/hooks";

/**
 * ScrollProgress 组件属性接口
 * @interface IProps
 * @extends {HTMLMotionProps<"div">} - 继承自 HTMLMotionProps，适用于 div 元素
 * @property {string} [color] - 进度条颜色
 * @property {MotionValue<number>} [scrollYProgress] - 滚动进度值
 * @property {number} [height] - 进度条高度，默认值为
 */
interface Props extends HTMLMotionProps<"div"> {
	color?: string;
	scrollYProgress: MotionValue<number>;
	height?: number;
}

/**
 * 滚动进度条组件
 *
 * @component ScrollProgress
 * @param {Props} props - 组件属性
 *
 * @example
 *
 */
export default function ScrollProgress({ color, scrollYProgress, height = 4, ...other }: Props) {
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100, // 弹簧刚度
		damping: 30, // 阻尼系数
		restDelta: 0.001, // 停止动画的阈值
	});

	const { themeTokens } = useTheme();

	// 设置进度条颜色，优先使用传入的颜色，否则使用主题色
	const backgroundColor = color || themeTokens.color.palette.primary.default;

	// 进度条样式
	const style: CSSProperties = {
		transformOrigin: "0%", // 设置缩放的起点为左侧
		height, // 进度条高度
		backgroundColor, // 进度条颜色
	};

	return <m.div style={{ scaleX, ...style }} {...other} />;
}
