import { NavLink } from "react-router-dom";
import { Icon } from "@/components/icon";
import { cn } from "@/utils/tailwindUtil";
import { useTheme } from "@/theme/hooks";

interface IProps {
  /**
   * 图标大小，默认为 50px，也可以传入字符串表示大小，如 '2rem'
   */
  size?: number | string;
  /**
   * 样式类名，用于覆盖默认样式
   */
  className?: string;
}

/**
 * 导航栏 Logo 组件，用于显示应用的标志或名称
 */
export default function Logo({
  size = 50,
  className
}:IProps) {

  const { themeTokens } = useTheme();

  return (
    <NavLink to="/" className={cn(className)}>
      <Icon icon="solar:code-square-bold" color={themeTokens.color.palette.primary.default} size={size} />
    </NavLink>
  );
}