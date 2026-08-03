import { closestCenter } from "@dnd-kit/collision";
import { useSortable } from "@dnd-kit/react/sortable";
import { cn } from "@/utils";
import { useMultiTabsContext } from "../providers/multi-tabs-provider";
import type { KeepAliveTab } from "../types";
import { TabItem } from "./tab-item";

type Props = {
	tab: KeepAliveTab;
	index: number;
	onClick: () => void;
};

export const SortableItem = ({ tab, index, onClick }: Props) => {
	const { activeTabRoutePath, closeTab } = useMultiTabsContext();
	const isActive = tab.key === activeTabRoutePath;
	const { ref, isDragging } = useSortable({
		id: tab.key,
		index,
		collisionDetector: closestCenter,
	});

	return (
		<li
			ref={ref}
			className={cn("shrink-0 rounded-t-lg border", isActive && "text-primary", isDragging ? "dragging" : undefined)}
			onClick={onClick}
		>
			<TabItem tab={tab} onClose={() => closeTab(tab.key)} />
		</li>
	);
};
