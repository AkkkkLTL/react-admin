import Color from "color";
import { type AddChannelToLeaf, themeTokens } from "../theme/type";
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
		if (colorVal.startsWith("#")) {
			return Color(colorVal).alpha(safeAlpha).toString();
		}
		if (colorVal.includes("var(")) {
			return `rgba(${colorVal} / ${safeAlpha})`;
		}
		if (colorVal.startsWith("--")) {
			return `rgba(var(${colorVal}) / ${safeAlpha})`;
		}
		// 处理 "200, 250, 214" 或 "200 250 215" d的格式
		if (colorVal.includes(",") || colorVal.includes(" ")) {
			const rgb = colorVal
				.split(/[,\s]+/) // 分割字符串，使用逗号或空格作为分隔符
				.map((n) => n.trim()) // 去除每个数字的前后空格
				.filter(Boolean); // 过滤掉空字符串
			return `rgba(${rgb.join(", ")}, ${safeAlpha})`;
		}
	}

	// 处理 [200, 250, 215] 格式
	if (Array.isArray(colorVal)) {
		return `rgba(${colorVal.join(", ")}, ${safeAlpha})`;
	}
	throw new Error("Invalid color format");
}

/**
 * convert to CSS vars
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `--colors-palette-primary`
 */
export const toCssVar = (propertyPath: string) => {
	return `--${propertyPath.split(".").join("-")}`;
};

/**
 * convert to CSS vars
 */
export const createTailwinConfg = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	console.log(variants);
	const result = variants.reduce(
		(acc, variant) => {
			acc[variant] = `var(${toCssVar(`${propertyPath}-${variant}`)})`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * 移除字符串中的 "px" 后缀并转换为数值
 * @param 示例："16px", "16.5px", "-16px", "16", 16
 * @returns 示例：16, 16.5, -16, 16, 16
 * @throws {Error} 如果值无效或为空字符串
 * @example removePx("10px") => 10
 * @example removePx("10") => 10
 */
export const removePx = (value: string | number): number => {
	// 若值为数字，直接返回数字
	if (typeof value === "number") return value;

	// 若值为空字符串，抛出错误
	if (!value) {
		throw new Error("Invalid value: empty string");
	}

	// 去除字符串两端的空格
	const trimmed = value.trim();

	// 检查是否以 "px" 结尾
	const hasPx = /px$/i.test(trimmed);

	// 提取数值部分
	const num = hasPx ? trimmed.slice(0, -2) : trimmed;

	// 转换为数字
	const result = Number.parseFloat(num);

	// 验证是否为有效数字
	if (Number.isNaN(result)) {
		throw new Error(`Invalid value: ${value}`);
	}

	return result;
};

/**
 * 为颜色对象添加颜色通道 {@link themeTokens}
 * @param obj 颜色对象
 * @returns 包含颜色通道的对象
 */
export const addColorChannels = <T extends Record<string, any>>(obj: T): AddChannelToLeaf<T> => {
	const result: Record<string, any> = {};

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
};

/**
 * Get RGB values from color channels
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `{ DEFAULT: "rgb(var(--colors-palette-primary-defaultChannel))" }`
 */
export const creatColorChannel = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	const result = variants.reduce(
		(acc, variant) => {
			const variantKey = variant === "default" ? "DEFAULT" : variant;
			acc[variantKey] = `rgb(var(${toCssVar(`${propertyPath}-${variant}Channel`)}))`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * get variants in {@link themeTokens}
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `["lighter", "light", "main", "dark", "darker"]`
 */
export const getThemeTokenVariants = (propertyPath: string) => {
	const keys = propertyPath.split(".");
	const val = keys.reduce((obj: any, key) => {
		if (obj && typeof obj === "object") {
			return obj[key];
		}
		return null;
	}, themeTokens);

	return val ? Object.keys(val) : [];
};
