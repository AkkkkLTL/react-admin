import { chain } from "ramda";
export function flattenTrees<T extends { children?: T[] }>(
  trees: T[] = [],
):T[] {
  return chain((node:T) => {
    const children = node.children || [];
    return [node, ...flattenTrees(children)];
  }, trees);
}