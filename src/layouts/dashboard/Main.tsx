import { concat } from "ramda";
import { type CSSProperties, Suspense, useCallback, useMemo } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { AuthGuard } from "@/components/auth";
import { LineLoading } from "@/components/loading";
import Page403 from "@/pages/sys/error/page-403";
import { useSettings } from "@/store/modules/settingsSlice";
import { cn } from "@/utils";
import { flattenTrees } from "@/utils/tree";
import { useFilteredNavData } from "./nav";

export default function Main() {
	const { themeStretch } = useSettings();
	const { pathname } = useLocation();
	const navData = useFilteredNavData();

	const allItems = useMemo(
		() =>
			navData.reduce((acc: any[], group) => {
				const flattenedItems = flattenTrees(group.items);
				return concat(acc, flattenedItems);
			}, []),
		[navData],
	);

	const findAuthByPath = useCallback(
		(path: string): string[] => {
			const foundItem = allItems.find((item) => item.path === path);
			return foundItem?.auth || [];
		},
		[allItems],
	);

	const currentNavAuth = findAuthByPath(pathname);

	const mainStyle: CSSProperties = {
		paddingTop: 0,
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", // this is for the slide,
		width: "100%",
	};

	return (
		<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
			<main
				data-slot="layout-main"
				className={cn(
					"flex-auto w-full flex flex-col",
					"transition-[max-width] duration-300 ease-in-out",
					"px-4 sm:px-6 py-4 sm:py-6 md:px-8 mx-auto",
					{
						"max-w-full": themeStretch,
						"xl:max-w-screen-xl": !themeStretch,
					},
				)}
				style={{
					willChange: "max-width",
				}}
			>
				<Suspense fallback={<LineLoading />}>
					<Outlet />
					<ScrollRestoration />
				</Suspense>
			</main>
		</AuthGuard>
	);
}
