import { AddChannelToLeaf } from "@/theme/type";
import Color from "color";
/**
 * rgbAlpha("#000000", 0.24) => "rgba(0, 0, 0, 0.24)"
 * rgbAlpha("var(--colors-palette-primary-main)", 0.24) => "rgba(var(--colors-palette-primary-main) / 0.24)"
 * 
 * @param colorVal 
 * @param alpha 
 */
export function rgbAlpha(colorVal: string | string[] | number[], alpha: number): string {
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  if (typeof colorVal === "string") {
    if (colorVal.startsWith('#')) {
      return Color(colorVal).alpha(safeAlpha).toString();
    }
    if (colorVal.includes("var(")) {
      return `rgba(${colorVal}) / ${safeAlpha})`;
    }
    if (colorVal.startsWith("--")) {
      return `rgba(var(${colorVal}) / ${safeAlpha})`;
    }
    // 处理 "200, 250, 214" 或 "200 250 215" d的格式
    if (colorVal.includes(",") || colorVal.includes(" ")) {
      const rgb = colorVal
        .split(/[,\s]+/) // 分割字符串，使用逗号或空格作为分隔符
        .map((n) => n.trim()) // 去除每个数字的前后空格
        .filter(Boolean);  // 过滤掉空字符串
      return `rgba(${rgb.join(", ")}, ${safeAlpha})`;
    }
  }

  // 处理 [200, 250, 215] 格式
  if (Array.isArray(colorVal)) {
    return `rgba(${colorVal.join(", ")}, ${safeAlpha}})`;
  }
  throw new Error("Invalid color format");
}

export const removePx = (value:string | number):number => {
  if (typeof value === "number") return value;
  if (!value) {
    throw new Error("Invalid value: empty string");
  }
  const trimmed = value.trim(); // 去除字符串两端的空格
  const hasPx = /px$/i.test(trimmed); // 检查是否以 "px" 结尾
  const num = hasPx ? trimmed.slice(0, -2) : trimmed; // 去除 "px" 后缀
  const result = Number.parseFloat(num);  // 转换为数字
  if (Number.isNaN(result)) {
    throw new Error(`Invalid value: ${value}`)
  }
  return result;
}

export const addColorChannels = <T extends Record<string, any>>(obj:T):AddChannelToLeaf<T> => {
  const result:Record<string, any> = {};

  const isLeafObject = Object.values(obj).every((v) => v === null || typeof v === "string");
  if (isLeafObject) {
    for (const [key, value] of Object.entries(obj)) {
      result[key] = value;
      result[`${key}Channel`] = Color(value).rgb().array().join(" ");
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        result[key] = addColorChannels(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result as AddChannelToLeaf<T>;
}