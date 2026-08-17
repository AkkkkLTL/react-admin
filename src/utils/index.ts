import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并类名
 * @param inputs 类名数组
 * @returns 合并后的类名
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * 检查项是否存在于资源池数组中
 * @param item 要检查的项
 * @param resourcePool 资源池数组
 * @returns 如果项存在于资源池数组中，返回true；否则返回false
 */
export function check(item: string, resourcePool: string[]) {
	return resourcePool.some((p) => p === item);
}

/**
 * 检查所有项是否都存在于资源池数组中
 * @param items 要检查的项数组
 * @param resourcePool 资源池数组
 * @returns 如果所有项都存在于资源池数组中，返回true；否则返回false
 */
export function checkAny(items: string[], resourcePool: string[]) {
	return items.some((item) => check(item, resourcePool));
}

/**
 * 检查所有项是否都存在于资源池数组中
 * @param items 要检查的项数组
 * @param resourcePool 资源池数组
 * @returns 如果所有项都存在于资源池数组中，返回true；否则返回false
 */
export function checkAll(items: string[], resourcePool: string[]) {
	return items.every((item) => check(item, resourcePool));
}

/**
 * 拼接url
 * @param parts url分组
 * @returns 拼接后的url
 * @example
 * urlJoin("/admin/", "/api/", "/user/") => "/admin/api/user/"
 * urlJoin("/admin", "api", "user/") => "/admin/api/user/"
 * urlJoin("/admin/", "", "/user/") => "/admin/user"
 */
export function urlJoin(...parts: string[]) {
	const result = parts
		.map((part) => {
			return part.replace(/^\/+|\/+$/g, ""); // 去除前后的/
		})
		.filter(Boolean); // 过滤掉空字符串
	return `/${result.join("/")}`;
}

/**
 * 获取uuid
 */
export function getUUID(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		return (c === "x" ? (Math.random() * 16) | 0 : ("r&0x3" as number | "0x8")).toString(16);
	});
}

/**
 * 将对象转换为URLSearchParams
 * @param record 要转换的对象
 * @returns 转换后的URLSearchParams
 */
export const toURLSearchParams = <T extends Record<PropertyKey, any>>(record: T) => {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(record)) {
		if (value !== undefined && value !== "") params.append(key, value);
	}
	return params;
};
