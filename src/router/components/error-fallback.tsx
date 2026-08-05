import type { CSSProperties } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { themeVars } from "@/theme/theme.css";
import { ScrollArea } from "@/ui/scroll-area";
import { Title } from "@/ui/typography";

/**
 * 错误边界组件
 */
export default function ErrorFallback() {
	const error = useRouteError();

	return (
		<ScrollArea className="w-full h-screen">
			<div style={rootStyles()}>
				<div style={containerStyles()}>{renderErrorMessage(error)}</div>
			</div>
		</ScrollArea>
	);
}

/**
 * 解析错误栈信息，提取文件路径和函数名
 * @param stack 错误栈信息
 * @returns 解析后的文件路径和函数名
 */
function parseStackTrace(stack?: string) {
	if (!stack) return { filePath: null, functionName: null };

	const filePathMatch = stack.match(/\/src\/[^?]+/);
	const functionNameMatch = stack.match(/at (\S+)/);

	return {
		filePath: filePathMatch?.[0] || null,
		functionName: functionNameMatch?.[1] || null,
	};
}

/**
 * 渲染路由错误信息
 * @param error 路由错误对象
 * @returns 错误信息 JSX 元素
 */
function renderErrorMessage(error: any) {
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<Title as="h2">
					{error.status} : {error.statusText}
				</Title>
				<p style={messageStyle()}>{error.data}</p>
			</>
		);
	}

	if (error instanceof Error) {
		const { filePath, functionName } = parseStackTrace(error.stack);

		return (
			<>
				<Title as="h2">Unexpected Application Error!</Title>
				<p style={messageStyle()}>
					{error.name}: {error.message}
				</p>
				<pre style={detailsStyles()}>{error.stack}</pre>
				{(filePath || functionName) && (
					<p style={filePathStyle()}>
						{filePath} ({functionName})
					</p>
				)}
			</>
		);
	}

	return <Title as="h2">Unknow Error</Title>;
}

/**
 * 错误边界组件根样式
 */
const rootStyles = (): CSSProperties => {
	return {
		display: "flex",
		height: "100vh",
		flex: "1 1 auto",
		alignItems: "center",
		padding: "10vh 15px",
		flexDirection: "column",
		color: "white",
		backgroundColor: "2c2c2e",
	};
};

/**
 * 错误边界组件容器样式
 */
const containerStyles = (): CSSProperties => {
	return {
		gap: 24,
		padding: 20,
		width: "100%",
		maxWidth: 960,
		display: "flex",
		borderRadius: 8,
		flexDirection: "column",
		backgroundColor: "#1c1c1e",
	};
};

/**
 * 错误消息样式
 */
const messageStyle = (): CSSProperties => {
	return {
		margin: 0,
		lineHeight: 1.5,
		padding: "12px 16px",
		whiteSpace: "pre-wrap",
		color: themeVars.colors.palette.error.default,
		backgroundColor: "#2a1e1e",
		borderLeft: `2px solid ${themeVars.colors.palette.error.default}`,
		fontWeight: 700,
	};
};

/**
 * 错误详情样式
 */
const detailsStyles = (): CSSProperties => {
	return {
		margin: 0,
		padding: 16,
		lineHeight: 1.5,
		overflow: "auto",
		borderRadius: "inherit",
		color: themeVars.colors.palette.warning.default,
		whiteSpace: "pre-wrap",
		backgroundColor: "#111111",
	};
};

/**
 * 文件路径样式
 */
const filePathStyle = (): CSSProperties => {
	return {
		marginTop: 16,
		color: themeVars.colors.palette.warning.default,
	};
};
