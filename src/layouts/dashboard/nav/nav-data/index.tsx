import { useMemo } from "react";
import { Icon } from "@/components/icon";
import type { NavItemDataProps, NavProps } from "@/components/nav/types";

import { useUserPermissions } from "@/store/modules/userSlice";
import type { Menu, MenuInfo, MenuTree } from "@/types/entity";
import { PermissionType } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { checkAny } from "@/utils";

const convertChildren = (children?: MenuInfo[]): NavItemDataProps[] => {
	if (!children?.length) return [];

	return children.map((child) => ({
		title: child.name,
		path: child.path || "",
		icon: child.icon ? typeof child.icon === "string" ? <Icon icon={child.icon} size="24" /> : child.icon : null,
		// caption: child.caption,
		// info: child.info ? <Badge variant="default">{child.info}</Badge> : null,
		// disabled: child.disabled,
		externalLink: child.externalLink,
		auth: child.perms?.split(","),
		// hidden: child.hidden,
		children: convertChildren(child.children),
	}));
};

const convert = (menuTree: MenuInfo[]): NavProps["data"] => {
	return menuTree.map((item) => ({
		name: item.name,
		type: item.type,
		items: item.type === PermissionType.GROUP ? convertChildren(item.children) : convertChildren([item]),
	}));
};

/**
 * 过滤导航项目数组，根据权限码数组判断是否显示
 * @param items 导航项目数组
 * @param permissions 权限码数组
 * @returns 过滤后的导航项目数组
 */
const filterItems = (items: NavItemDataProps[], permissions: string[]) => {
	return items.filter((item) => {
		// 检查当前项目是否有权限
		const hasPermission = item.auth ? checkAny(item.auth, permissions) : true;

		// 如果有子项目，递归处理子项目
		if (item.children?.length) {
			const filteredChildren = filterItems(item.children, permissions);
			// 如果子项目都被过滤掉了，则过滤当前项目
			if (filteredChildren.length === 0) return false;
			// 否则，更新当前项目的子项目
			item.children = filteredChildren;
		}
		// 返回当前项目是否有权限
		return hasPermission;
	});
};

/**
 * 根据权限过滤导航数据
 * @param permissions 权限码数组
 * @returns 过滤后的导航数据
 */
const filterNavData = (permissions: string[]) => {
	const menuList = JSON.parse(sessionStorage.getItem("menuList") || "[]") as MenuInfo[];
	const navData: NavProps["data"] = convert(menuList);
	return navData
		.map((group) => {
			// 过滤组内的项目
			const filteredItems = filterItems(group.items, permissions);

			// 如果组内没有项目了，返回 null
			if (filteredItems.length === 0) return null;

			// 返回过滤后的组
			return {
				...group,
				items: filteredItems,
			};
		})
		.filter((group): group is NonNullable<typeof group> => group !== null);
};

/**
 * 使用权限过滤导航数据
 * @returns 过滤后的导航数据
 */
export const useFilteredNavData = () => {
	// 获取权限码数组
	const permissionCodes = useMemo(() => JSON.parse(sessionStorage.getItem("permissions") || "[]") as string[], []);
	// 过滤导航数据
	const filteredNavData = useMemo(() => filterNavData(permissionCodes), [permissionCodes]);
	return filteredNavData;
};
