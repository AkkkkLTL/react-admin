import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/modules/settingsSlice";
import { ThemeLayout } from "@/types/enum";
import Header from "./header";
import Main from "./main";
import { NavHorizontalLayout, NavMobileLayout, NavVerticalLayout, useFilteredNavData } from "./nav";

export default function DashboardLayout() {
	const isMobile = useMediaQuery(down("md"));

	return (
		<div data-slot="layout-root" className="w-full bg-background min-h-screen">
			{isMobile ? <MobileLayout /> : <PcLayout />}
		</div>
	);
}

function MobileLayout() {
	const navData = useFilteredNavData();

	return (
		<>
			<Header leftSlot={<NavMobileLayout data={navData} />} />
			<Main />
		</>
	);
}

function PcLayout() {
	const { themeLayout } = useSettings();

	if (themeLayout === ThemeLayout.HORIZONTAL) return <PcHorizontalLayout />;
	return <PcVerticalLayout />;
}

function PcHorizontalLayout() {
	const navData = useFilteredNavData();

	return (
		<>
			{/* 头部 */}
			<Header leftSlot={<Logo />} />
			{/* 导航 */}
			<NavHorizontalLayout data={navData} />

			<Main />
		</>
	);
}

function PcVerticalLayout() {
	const settings = useSettings();
	const { themeLayout } = settings;
	const navData = useFilteredNavData();

	const mainPaddingLeft =
		themeLayout === ThemeLayout.VERTICAL ? "var(--layout-nav-width)" : "var(--layout-nav-width-mini)";

	return (
		<>
			{/* 导航栏 */}
			<NavVerticalLayout data={navData} />

			{/* 内容区域 */}
			<div
				className="relative w-full min-h-screen flex flex-col transition-[padding] duration-300 ease-in-out"
				style={{
					paddingLeft: mainPaddingLeft,
				}}
			>
				<Header />
				<Main />
			</div>
		</>
	);
}
