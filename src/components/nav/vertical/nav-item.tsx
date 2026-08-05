import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRender } from "../components/nav-item-render";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export function NavItem(item: NavItemProps) {
	const { t } = useLocale();

	const content = (
		<>
			{/* icon */}
			<span style={navItemStyles.icon} className="mr-3 items-center justify-center">
				{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
			</span>

			{/* texts */}
			<span style={navItemStyles.texts} className="min-h-[24px]">
				{/* title */}
				<span style={navItemStyles.title}>{t(item.title)}</span>

				{/* caption */}
				{item.caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span style={navItemStyles.caption}>{t(item.caption)}</span>
							</TooltipTrigger>
							<TooltipContent side={"top"} align={"start"}>
								{t(item.caption)}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>

			{/* info */}
			{item.info && <span style={navItemStyles.info}>{item.info}</span>}

			{/* arrow */}
			{item.hasChild && (
				<Icon
					icon="eva:arrow-ios-forward-fill"
					style={{
						...navItemStyles.arrow,
						transform: item.open ? "rotate(90deg)" : "rotate(0deg)",
					}}
				/>
			)}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		"min-h-[44px]",
		item.active && item.depth === 1 && navItemClasses.active,
		item.active && item.depth !== 1 && "bg-action-hover!",
		item.disabled && navItemClasses.disabled,
	);

	return (
		<NavItemRender item={item} className={itemClassName}>
			{content}
		</NavItemRender>
	);
}
