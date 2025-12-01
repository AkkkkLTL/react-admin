import { type MotionProps, m } from "motion/react";
import { varContainer } from "./variants/container";

interface IProps extends MotionProps {
    className?: string;
}

export function MotionViewport({
    children,
    className,
    ...other
}:IProps) {
    return (
        <m.div
            initial="initial"
            whileInView={"animate"}
            viewport={{ once: true, amount: 0.3 }}
            variants={varContainer()}
            className={className}
            {...other}
        >
            {children}
        </m.div>
    )
}