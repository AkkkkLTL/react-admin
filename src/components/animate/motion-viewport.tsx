import { type MotionProps, m } from "motion/react";
import { varContainer } from "./variants/container";

interface IProps extends MotionProps {
	className?: string;
}

/**
 * MotionViewport 组件 - 用于创建基于视口滚动的动画效果
 * @param param0
 * @returns
 */
export function MotionViewport({ children, className, ...other }: IProps) {
	return (
		<m.div
			initial="initial"
			whileInView="animate"
			viewport={{ once: true, amount: 0.3 }}
			variants={varContainer()}
			className={className}
			{...other}
		>
			{children}
		</m.div>
	);
}
