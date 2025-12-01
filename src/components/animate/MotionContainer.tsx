import { type MotionProps, m } from "motion/react";
import { varContainer } from "./variants/container";

interface IProps extends MotionProps {
    className?: string;
}

export default function MotionContainer({
    children,
    className,
}:IProps) {
    return (
        <m.div
            initial="initial"
            animate="animate"
            exit={"exit"}
            variants={varContainer()}
            className={className}
        >
            {children}
        </m.div>
    )
}