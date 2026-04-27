import { useLayoutEffect } from "react";
import { useRouter } from "@/router/hooks";

interface ExternalLinkProps {
	src: string;
}
export default function ExternalLink({ src }: ExternalLinkProps) {
	const { back } = useRouter();
	useLayoutEffect(() => {
		window.open(src, "_blank");
		back();
	});
	return <div />;
}
