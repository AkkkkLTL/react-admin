import { useDispatch } from "react-redux";
import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import { NavMini, type NavProps, NavVertical } from "@/components/nav";
import { GLOBAL_CONFIG } from "@/global-config";
import { setSettings, useSettings } from "@/store/modules/settingsSlice";
import { ThemeLayout } from "@/types/enum";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";

interface Props {
	data: NavProps["data"];
	className?: string;
}

/**
 * DashboardLayout 左侧菜单（垂直模式）
 */
export function NavVerticalLayout({ data, className }: Props) {
	const settings = useSettings();
	const { themeLayout } = settings;
	const dispatch = useDispatch();

	const navWidth = themeLayout === ThemeLayout.VERTICAL ? "var(--layout-nav-width)" : "var(--layout-nav-width-mini)";
	const handleToggle = () => {
		dispatch(
			setSettings({
				...settings,
				themeLayout: themeLayout === ThemeLayout.MINI ? ThemeLayout.VERTICAL : ThemeLayout.MINI,
			}),
		);
	};

	return (
		<nav
			data-slot="layout-nav"
			className={cn(
				"fixed inset-y-0 left-0 flex-col h-full bg-background border-r border-dashed z-nav transition-[width] duration-300 ease-in-out",
				className,
			)}
			style={{
				width: navWidth,
			}}
		>
			<div
				className={cn("relative flex items-center py-4 px-2 h-[var(--layout-header-height)] ", {
					"justify-center": themeLayout === ThemeLayout.MINI,
				})}
			>
				<div className="flex items-center justify-center">
					<Logo />
					<span
						className="text-xl font-bold transition-all duration-300 ease-in-out"
						style={{
							opacity: themeLayout === ThemeLayout.MINI ? 0 : 1,
							maxWidth: themeLayout === ThemeLayout.MINI ? 0 : "auto",
							whiteSpace: "nowrap",
							marginLeft: themeLayout === ThemeLayout.MINI ? 0 : "8px",
						}}
					>
						{GLOBAL_CONFIG.appName}
					</span>
				</div>

				<Button
					variant={"outline"}
					size={"icon"}
					onClick={handleToggle}
					className="h-7 w-7 absolute right-0 translate-x-1/2"
				>
					{themeLayout === ThemeLayout.MINI ? (
						<Icon icon="lucide:arrow-right-to-line" size={12} />
					) : (
						<Icon icon="lucide:arrow-left-to-line" size={12} />
					)}
				</Button>
			</div>

			<ScrollArea className={cn("h-[calc(100vh-var(--layout-header-height))] px-2 bg-background")}>
				{themeLayout === ThemeLayout.MINI ? <NavMini data={data} /> : <NavVertical data={data} />}
			</ScrollArea>
		</nav>
	);
}
