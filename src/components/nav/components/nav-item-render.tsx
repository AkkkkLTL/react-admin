import { RouterLink } from "@/router/components/router-link";
import type { NavItemProps } from "../types";

interface NavItemRenderProps {
	item: NavItemProps;
	className: string;
	children: React.ReactNode;
}

export function NavItemRender({ item, className, children }: NavItemRenderProps) {
	const { disabled, hasChild, path, onClick } = item;

	if (disabled) {
		return <div className={className}>{children}</div>;
	}

	if (hasChild) {
		return (
			<div className={className} onClick={onClick}>
				{children}
			</div>
		);
	}

	return (
		<RouterLink href={path} className={className}>
			{children}
		</RouterLink>
	);
}
