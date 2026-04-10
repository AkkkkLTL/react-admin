import { chain } from "ramda";

/**
 * 把树结构拍平
 * @param trees 树结构
 * @returns 拍平后的数组
 * @example
 * 输入参数：
  [
   { id: 1, children: [{ id: 2 }, { id: 3 }] },
   { id: 4, children: [{ id: 5 }, { id: 6 }] },
  ]
 * 输出结果：
  [
   { id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 },{ id: 6}
  ]
 */
export function flattenTrees<T extends { children?: T[] }>(trees: T[] = []): T[] {
	return chain((node: T) => {
		const children = node.children || [];
		// 原代码尝试将过滤后的键值对数组赋值给 T 类型的变量，会导致类型不匹配问题。
		// 这里使用 Object.fromEntries 方法将过滤后的键值对数组转换回对象，以保证类型匹配。
		node = Object.fromEntries(Object.entries(node).filter(([key]) => key !== "children")) as T;
		return [node, ...flattenTrees(children)];
	}, trees);
}

/**
 * 把数组转换为树结构
 */
export function convertToTree<T extends { id: number | string; parentId: number | string | null; children?: T[] }>(
	items: T[],
): T[] {
	const map: Record<string, T> = {};
	const result: T[] = [];

	items.forEach((item) => {
		const id = String(item.id);
		const parentId = item.parentId ? String(item.parentId) : null;
		map[id] = { ...item, children: [] };
		if (parentId === null) {
			result.push(map[id]);
		} else {
			map[parentId]?.children?.push(map[id]);
		}
	});

	return result;
}
