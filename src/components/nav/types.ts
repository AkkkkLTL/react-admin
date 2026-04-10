import type { PermissionType } from "@/types/enum";

/**
 * 导航栏单项操作参数
 */
export type NavItemOptionsProps = {
	depth?: number;
	hasChild?: boolean;
};

/**
 * 导航栏单项状态参数
 */
export type NavItemStateProps = {
	open?: boolean;
	active?: boolean;
	disabled?: boolean;
	hidden?: boolean;
};

/**
 * 导航栏单项数据参数
 */
export type NavItemDataProps = {
	path: string;
	title: string;
	icon?: string | React.ReactNode;
	info?: React.ReactNode;
	caption?: string;
	auth?: string[];
	children?: NavItemDataProps[];
} & NavItemStateProps;

/**
 * Item
 */
export type NavItemProps = React.ComponentProps<"div"> & NavItemDataProps & NavItemOptionsProps;

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, "depth"> & {
	data: NavItemDataProps;
	authenticate?: (auth?: NavItemProps["auth"]) => boolean;
};

/**
 * Group
 */
export type NavGroupProps = Omit<NavListProps, "data" | "depth"> & {
	name?: string;
	items: NavItemDataProps[];
};

/**
 * Main
 */
export type NavProps = React.ComponentProps<"nav"> &
	Omit<NavListProps, "data" | "depth"> & {
		data: {
			name?: string;
			type?: PermissionType;
			items: NavItemDataProps[];
		}[];
	};
