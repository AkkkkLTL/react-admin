import { CSSProperties, FC } from "react";
import { Icon as IconifyIcon, type IconProps as IconifyIconProps } from "@iconify/react";

import { cn } from "@/utils/tailwindUtil";


interface IProps extends IconifyIconProps {
  /**
   * icon 名称或路径
   * - Local SVG: local:icon-name
   * - Third-party icon library: iconify-icon-name
   * - URL SVG: url:https://example.com/icon.svg
   */
  icon: string;
  size?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const Icon:FC<IProps> = (props) => {

  const {
    icon,
    size = "1em",
    color = "currentColor",
    className = "",
    style = {},
  } = props;
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
    )
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
    />
  );
}
export default Icon;