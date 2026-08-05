import { Link, type LinkProps } from "react-router-dom";

interface RouterLinkProps extends Omit<LinkProps, "to"> {
	href: string;
	ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * 路由链接组件
 * 用于创建指向指定路由的链接，支持自定义 href 属性
 */
export function RouterLink({ href, ...props }: RouterLinkProps) {
	return <Link ref={props.ref} to={href} {...props} />;
}
