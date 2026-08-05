import type { MotionProps } from "motion/react";

export type VariantsType = {
	durationIn?: number;
	durationOut?: number;
	easeIn?: [];
	easeOut?: [];
	distance?: number;
};

export type TranEnterType = {
	durationIn?: number;
	easeIn?: [];
};

export type TranExitType = {
	durationOut?: number;
	easeOut?: [];
};

export type VariantsReturnType<T extends string> = {
	[key in T]: MotionProps;
};

export type BackgroundType = {
	durations?: number;
	ease?: [];
	colors?: string[];
};
