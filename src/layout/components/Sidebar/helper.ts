import { LevelKeysProps } from "./types";

export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key:Record<string, number> = {};
  const func = (items2:LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    })
  }
  func(items1);
  return key;
}