import { domMax, LazyMotion, m } from "motion/react";
import { ReactNode } from "react"

type IProps = {
    children: ReactNode;
}

export function MotionLazy({
    children
}:IProps) {
    return (
        <LazyMotion strict features={domMax}>
            <m.div style={{ height: "100%" }}> { children } </m.div>
        </LazyMotion>
    )
}