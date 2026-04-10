import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import type { NavListProps } from "../types";
import { NavItem } from "./nav-item";

export function NavList({ data, depth = 1 }: NavListProps) {
	const location = useLocation();
	const isActive = location.pathname.includes(data.path);
	const [open, setOpen] = useState(isActive);
	const hasChild = data.children && data.children.length > 0;

	const handleClick = () => {
		if (hasChild) {
			setOpen(!open);
		}
	};

	return (
		<Collapsible open={open} onOpenChange={setOpen} data-nav-type="list">
			<CollapsibleTrigger className="w-full">
				<NavItem
					// 数据
					title={data.title}
					path={data.path}
					icon={data.icon}
					info={data.info}
					caption={data.caption}
					auth={data.auth}
					// 状态
					open={open}
					active={isActive}
					disabled={data.disabled}
					// 层级
					hasChild={hasChild}
					depth={depth}
					// 事件
					onClick={handleClick}
				/>
			</CollapsibleTrigger>
			{hasChild && (
				<CollapsibleContent>
					<div className="ml-4 mt-1 flex flex-col gap-1">
						{data.children?.map((child) => (
							<NavList key={child.title} data={child} depth={depth + 1} />
						))}
					</div>
				</CollapsibleContent>
			)}
		</Collapsible>
	);
}
