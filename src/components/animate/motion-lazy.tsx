import { domMax, LazyMotion, m } from "motion/react";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

/**
 * MotionLazy 组件 - 延迟加载动画效果
 * @param param0
 * @returns
 */
export function MotionLazy({ children }: Props) {
	return (
		<LazyMotion strict features={domMax}>
			<m.div style={{ height: "100%" }}> {children} </m.div>
		</LazyMotion>
	);
}
