import { MotionValue, useSpring, useTransform, motion } from "motion/react";
import { FC, useEffect } from "react";

interface Props {
  startVal?: number;
  endVal?: number;
  duration?: number;
  precision?: number;
  format?: (num:number) => string;
  className?: string;
}

const CountTo:FC<Props> = (props) => {
  const {
    startVal = 0,
    endVal = 2017,
    duration = 3000,
    precision = 0,
    format = (num) => num.toLocaleString(),
    className = '',
  } = props;

  const spring = useSpring(startVal, {duration});
  const display:MotionValue<string> = useTransform(spring, (current) => 
    format(parseFloat(current.toFixed(precision)))
  );

  useEffect(() => {
    spring.set(endVal);
  }, [spring, endVal]);

  return (
    <motion.span className={className}>{display}</motion.span>
  )
}

export default CountTo;