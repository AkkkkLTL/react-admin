import type { ReactNode } from "react";
import HeaderSimple from "../components/header-simple";

interface IProps {
	children: ReactNode;
}

export default function SimpleLayout({ children }: IProps) {
	return (
		<div className="flex h-screen w-full flex-col text-text-base bg-bg">
			<HeaderSimple />
			{children}
		</div>
	);
}
