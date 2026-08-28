import { Icon as IconifyIcon, type IconProps as IconifyIconProps } from "@iconify/react";
import type { CSSProperties } from "react";

import { cn } from "@/utils";

interface IconProps extends IconifyIconProps {
	/**
	 * icon 名称或路径
	 * - 本地 SVG: local:icon-name
	 * - 第三方图标库: iconify-icon-name
	 * - URL SVG: url:https://example.com/icon.svg
	 */
	icon: string;
	size?: string | number;
	color?: string;
	className?: string;
	style?: CSSProperties;
}

export default function Icon({
	icon,
	size = "1em",
	color = "currentColor",
	className = "",
	style = {},
	...props
}: IconProps) {
	// 处理 URL 路径
	if (icon.startsWith("url:")) {
		const url = icon.replace("url:", "");
		return (
			<img
				src={url}
				alt="icon"
				className={cn("inline-block", className)}
				style={{
					width: size,
					height: size,
					color,
					...style,
				}}
			/>
		);
	}

	// 处理本地和第三方 SVG 路径
	return (
		<IconifyIcon
			icon={icon}
			width={size}
			height={size}
			className={cn("inline-block", className)}
			style={{
				color,
				...style,
			}}
			{...props}
		/>
	);
}
