import { Icon } from "@/components/icon";

interface ToolbarProps {
	onRefresh: VoidFunction;
}
export default function Toolbar({ onRefresh }: ToolbarProps) {
	return (
		<div className="mb-4 flex items-center justify-end" onClick={onRefresh}>
			<Icon icon="material-symbols:refresh" className="cursor-pointer" size={24} />
		</div>
	);
}
