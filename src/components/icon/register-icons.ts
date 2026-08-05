import { addCollection } from "@iconify/react/dist/iconify.js";
import { parseSVGContent } from "@iconify/utils/lib/svg/parse";

interface IconifyIcon {
	body: string; // 图标 SVG 内容
	width: number; // 图标宽度
	height: number; // 图标高度
}

interface ParsedSVG {
	body: string; // 图标 SVG 内容
	attribs?: {
		width?: string; // 宽度属性
		height?: string; // 高度属性
		viewBox?: string; // viewBox 属性
	};
}

let iconCollection: Record<string, IconifyIcon> | null = null;
/**
 * 自动导入所有 SVG 文件，注册为本地图标
 */
export default async function registerLocalIcons() {
	// 若 icons 已经注册了，则直接返回
	if (iconCollection) {
		return;
	}

	const svgModules = import.meta.glob("../../assets/icons/*.svg", { query: "?raw", import: "default", eager: true });
	const icons: Record<string, IconifyIcon> = {};

	for (const [path, svgContent] of Object.entries(svgModules)) {
		try {
			const iconName = path.split("/").pop()?.replace(".svg", ""); // 提取文件名作为图标名称
			if (iconName) {
				// 解析 SVG 内容，提取 width 和 height
				const parsedSVG = parseSVGContent(svgContent as string) as ParsedSVG;
				if (!parsedSVG) {
					console.warn(`Failed to parse SVG content for icon: ${iconName}`);
					continue;
				}

				// 确保 body 是有效内容
				if (!parsedSVG.body) {
					console.warn(`Failed to get SVG body for icon: ${iconName}`);
					continue;
				}

				// 提取 width 和 height，默认值为 24px
				let width = Number.parseInt(parsedSVG.attribs?.width || "24", 10);
				let height = Number.parseInt(parsedSVG.attribs?.height || "24", 10);
				// 从 viewBox 属性中提取尺寸
				if (parsedSVG.attribs?.viewBox) {
					const viewBox = parsedSVG.attribs.viewBox.split(" ");
					if (viewBox.length === 4) {
						width = Number.parseInt(viewBox[2], 10);
						height = Number.parseInt(viewBox[3], 10);
					}
				}

				// 将 icon 加入到集合中
				icons[iconName] = {
					body: parsedSVG.body, // 直接使用 body 作为 SVG 内容
					width,
					height,
				};
			}
		} catch (error) {
			console.error("Error processing SVG:", error);
		}
	}

	// 注册所有图标
	iconCollection = icons;

	// 添加图标到 Iconify 库中
	const result = addCollection({
		prefix: "local", // 自定义前缀，用于区分本地图标
		icons, // 所有本地图标
	});

	if (!result) {
		console.warn("Failed to add local icons to Iconify collection.");
	}
}
