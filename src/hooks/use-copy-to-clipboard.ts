import { useState } from "react";
import { toast } from "sonner";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;
type ReturnType = {
	copyFn: CopyFn;
	copiedText: CopiedValue;
};

export const useCopyToClipboard = (): ReturnType => {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	const copyFn: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			console.warn("不支持剪贴");
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			toast.success("Copied!");
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			return false;
		}
	};

	return { copyFn, copiedText };
};
