import { PermissionType } from "@/types/enum";
import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";
import { NavItem } from "./nav-item";
import { NavList } from "./nav-list";

export function NavVertical({ data, className, ...props }: NavProps) {
	return (
		<nav className={cn("flex w-full flex-col gap-1", className)} {...props}>
			{data.map((group, index) => (
				<>
					{group.type === PermissionType.GROUP ? (
						<NavGroup key={group.name || index} name={group.name} items={group.items} />
					) : group.type === PermissionType.CATALOGUE ? (
						group.items.map((item, index) => <NavList key={item.title || index} data={item} depth={1} />)
					) : group.type === PermissionType.MENU ? (
						<NavItem
							key={group.items[0].title || index}
							// 数据
							title={group.items[0].title}
							path={group.items[0].path}
							icon={group.items[0].icon}
							auth={group.items[0].auth}
						/>
					) : null}
				</>
			))}
		</nav>
	);
}
