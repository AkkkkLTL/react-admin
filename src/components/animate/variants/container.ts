export type Props = {
	staggerIn?: number;
	delayIn?: number;
	staggerOut?: number;
};

export const varContainer = (props?: Props) => {
	const staggerIn = props?.staggerIn || 0.05;
	const delayIn = props?.delayIn || 0.05;
	const staggerOut = props?.staggerOut || 0.05;

	return {
		animate: {
			transition: {
				staggerChildren: staggerIn,
				delayChildren: delayIn,
			},
		},
		exit: {
			transition: {
				staggerChilren: staggerOut,
				staggerDirection: -1,
			},
		},
	};
};
