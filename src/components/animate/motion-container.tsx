import { type MotionProps, m } from "motion/react";
import { varContainer } from "./variants/container";

interface Props extends MotionProps {
	className?: string;
}

/**
 * MotionContainer 组件 - 动画容器
 * @param param0
 * @returns
 */
export default function MotionContainer({ children, className }: Props) {
	return (
		<m.div initial="initial" animate="animate" exit="exit" variants={varContainer()} className={className}>
			{children}
		</m.div>
	);
}
