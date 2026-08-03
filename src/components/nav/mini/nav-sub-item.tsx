import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRender } from "../components/nav-item-render";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export function NavSubItem(item: NavItemProps) {
	const { t } = useLocale();

	const content = (
		<>
			{/* icon */}
			<span style={navItemStyles.icon} className="mr-1 items-center justify-center">
				{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
			</span>

			{/* title */}
			<span style={navItemStyles.title} className="flex-auto">
				{t(item.title)}
			</span>

			{/* caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Icon icon="solar:info-circle-linear" size={16} />
						</TooltipTrigger>
						<TooltipContent>
							<p>{t(item.caption)}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* info */}
			{item.info && <span style={navItemStyles.info}>{item.info}</span>}

			{/* arrow */}
			{item.hasChild && <Icon icon="eva:arrow-ios-forward-fill" style={navItemStyles.arrow} />}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
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
