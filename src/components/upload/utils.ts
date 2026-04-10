import type { RcFile } from "antd/es/upload";
import { toast } from "sonner";

export function beforeAvatarUpload(file: RcFile) {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		toast.error("You can only upload JPG/PNG file!", {
			position: "top-center",
		});
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		toast.error("Image must smaller than 2MB!", {
			position: "top-center",
		});
	}
	return isJpgOrPng && isLt2M;
}

export function getBlobUrl(imgFile: RcFile) {
	const fileBlob = new Blob([imgFile]);
	const thumbnailUrl = URL.createObjectURL(fileBlob);
	return thumbnailUrl;
}
