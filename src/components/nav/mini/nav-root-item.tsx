import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRender } from "../components/nav-item-render";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export function NavRootItem(item: NavItemProps) {
	const { t } = useLocale();
	const content = (
		<>
			{/* caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Icon icon="solar:info-circle-linear" size={16} className="absolute left-1 top-2" />
						</TooltipTrigger>
						<TooltipContent side={"right"}>{t(item.caption)}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* icon */}
			<span style={navItemStyles.icon}>
				{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
			</span>

			{/* arrow */}
			{item.hasChild && (
				<Icon icon="eva:arrow-ios-forward-fill" className="absolute right-1 top-2" style={navItemStyles.arrow} />
			)}

			{/* title */}
			<span style={navItemStyles.title} className="text-center! text-xs! mt-1">
				{t(item.title)}
			</span>
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		"relative flex-col min-h-12 px-1 pt-2 pb-1.5",
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
