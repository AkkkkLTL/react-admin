import { ChevronDown } from "lucide-react";
import { Fragment, useCallback, useMemo } from "react";
import { Link, useMatches } from "react-router-dom";
import type { NavItemDataProps } from "@/components/nav/types";
import useLocale from "@/locales/useLocale";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { useFilteredNavData } from "../dashboard/nav/nav-data";

// 定义面包屑组件属性
interface BreadCrumbProps {
	maxItems?: number;
}

type NavItem = Pick<NavItemDataProps, "path" | "title"> & {
	children?: NavItem[];
};

interface BreadcrumbItemData {
	key: string;
	label: string;
	items: Array<{
		key: string;
		label: string;
	}>;
}

/**
 * 面包屑组件
 */
export default function BreadCrumb({ maxItems = 3 }: BreadCrumbProps) {
	const { t } = useLocale();
	const matches = useMatches();
	const navData = useFilteredNavData();

	const findPathInNavData = useCallback((path: string, items: NavItem[]): NavItem[] => {
		for (const item of items) {
			if (item.path === path) {
				return [item];
			}
			if (item.children) {
				const found = findPathInNavData(path, item.children);
				if (found.length > 0) {
					return [item, ...found];
				}
			}
		}
		return [];
	}, []);

	const breadCrumbs = useMemo(() => {
		const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);

		return paths
			.map((path) => {
				const navItems = navData.flatMap((section) => section.items);
				const pathItems = findPathInNavData(path, navItems);

				if (pathItems.length === 0) return null;

				const currentItem = pathItems[pathItems.length - 1];
				const children =
					currentItem.children?.map((child) => ({
						key: child.path,
						label: t(child.title),
					})) ?? [];

				return {
					key: currentItem.path,
					label: t(currentItem.title),
					items: children,
				};
			})
			.filter((item): item is BreadcrumbItemData => item !== null);
	}, [matches, t, findPathInNavData, navData]);

	const renderBreadcrumbItems = (item: BreadcrumbItemData, isLast: boolean) => {
		const hasItems = item.items && item.items.length > 0;

		if (hasItems) {
			return (
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							{item.label}
							<ChevronDown className="h-4 w-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{item.items.map((subItem) => (
								<DropdownMenuItem key={subItem.key} asChild>
									<Link to={subItem.key}>{subItem.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
			);
		}

		return (
			<BreadcrumbItem>
				{isLast ? (
					<BreadcrumbPage>{item.label}</BreadcrumbPage>
				) : (
					<BreadcrumbLink asChild>
						<Link to={item.key}>{item.label}</Link>
					</BreadcrumbLink>
				)}
			</BreadcrumbItem>
		);
	};

	const renderBreadcrumbs = () => {
		if (breadCrumbs.length <= maxItems) {
			return breadCrumbs.map((item, index) => (
				<Fragment key={item.key}>
					{renderBreadcrumbItems(item, index === breadCrumbs.length - 1)}
					{index < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
				</Fragment>
			));
		}

		const firstItem = breadCrumbs[0];
		const lastItem = breadCrumbs.slice(-(maxItems - 1));
		const hiddenItems = breadCrumbs.slice(1, -(maxItems - 1));

		return (
			<>
				{renderBreadcrumbItems(firstItem, false)}
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							<BreadcrumbEllipsis />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{hiddenItems.map((item) => (
								<DropdownMenuItem key={item.key} asChild>
									<Link to={item.key}>{item.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{lastItem.map((item, index) => (
					<Fragment key={item.key}>
						{renderBreadcrumbItems(item, index === lastItem.length - 1)}
						{index < lastItem.length - 1 && <BreadcrumbSeparator />}
					</Fragment>
				))}
			</>
		);
	};

	return (
		<Breadcrumb>
			<BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
		</Breadcrumb>
	);
}
