import { useMemo } from "react";
import { Icon } from "@/components/icon";
import type { NavItemDataProps, NavProps } from "@/components/nav/types";

import type { Menu, MenuTree } from "@/types/entity";
import { PermissionType } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { checkAny } from "@/utils";
import { convertFlatToToTree } from "@/utils/tree";

const convertChildren = (children?: MenuTree[]): NavItemDataProps[] => {
	if (!children?.length) return [];

	return children.map((child) => ({
		title: child.name,
		path: child.path || "",
		icon: child.icon ? typeof child.icon === "string" ? <Icon icon={child.icon} size="24" /> : child.icon : null,
		caption: child.caption,
		info: child.info ? <Badge variant="default">{child.info}</Badge> : null,
		disabled: child.disabled,
		externalLink: child.externalLink,
		auth: child.auth,
		hidden: child.hidden,
		children: convertChildren(child.children),
	}));
};

const convert = (menuTree: MenuTree[]): NavProps["data"] => {
	return menuTree.map((item) => ({
		name: item.name,
		type: item.type,
		items: item.type === PermissionType.GROUP ? convertChildren(item.children) : convertChildren([item]),
	}));
};

/**
 * 过滤菜单数据
 */
const filterMenuData = (permissions: string[]) => {
	const menuList = JSON.parse(sessionStorage.getItem("menuList") || "[]") as Menu[];
	const filteredMenuData = menuList.filter((item) => {
		// 检查当前项目是否有权限
		const hasPermission = item.auth ? checkAny(item.auth, permissions) : true;
		// 如果当前项目隐藏，直接返回 false
		if (item.hidden) return false;
		// 返回当前项目是否有权限
		return hasPermission;
	});
	return convertFlatToToTree(filteredMenuData) as MenuTree[];
};

/**
 * 使用权限过滤导航数据
 * @returns 过滤后的导航数据
 */
export const useFilteredNavData = () => {
	// 获取权限码数组
	const permissionCodes = useMemo(() => JSON.parse(sessionStorage.getItem("permissions") || "[]") as string[], []);
	// 过滤菜单数据
	const filteredMenuData = useMemo(() => filterMenuData(permissionCodes), [permissionCodes]);
	// 将菜单数据转换为导航结构
	const navData = convert(filteredMenuData);

	return navData;
};
