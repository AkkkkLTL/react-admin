import { message } from "antd";
import Clipboard from "clipboard";

/**
 * 复制文本
 */
function clipboardSuccess() {
	message.success("Copy successfully", 3);
}

/**
 * 复制失败
 */
function clipboardError() {
	message.error("Copy failed", 3);
}

export default function clipboard(text: string, event: any) {
	const clipboard = new Clipboard(event.target, {
		text: () => text,
	});
	clipboard.on("success", () => {
		clipboardSuccess();
		clipboard.destroy();
	});
	clipboard.on("error", () => {
		clipboardError();
		clipboard.destroy();
	});
}
