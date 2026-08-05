import { PointerActivationConstraints } from "@dnd-kit/dom";
import { DragDropProvider, DragOverlay, PointerSensor, useDroppable } from "@dnd-kit/react";
import { type ReactNode, useState } from "react";

interface SortableContainerProps {
	items: any[];
	onSortEnd?: (oldIndex: number, newIndex: number) => void;
	children: ReactNode;
	renderOverlay?: (activeId: string | number) => ReactNode;
}

export default function SortableContainer({ items, onSortEnd, children, renderOverlay }: SortableContainerProps) {
	const [activeId, setActiveId] = useState<string | number | null>(null);

	return (
		<DragDropProvider
			sensors={(defaults) => [
				...defaults.filter((sensor) => sensor !== PointerSensor),
				PointerSensor.configure({
					activationConstraints: [new PointerActivationConstraints.Distance({ value: 8 })],
				}),
			]}
			onDragStart={(event) => {
				const { operation } = event;
				setActiveId(operation.source?.id as string | number);
			}}
			onDragEnd={(event) => {
				const { operation } = event;
				const { source, target } = operation;

				setActiveId(null);

				if (target && source?.id !== target.id) {
					const oldIndex = items.findIndex((item) => item.key === source?.id);
					const newIndex = items.findIndex((item) => item.key === target.id);

					if (oldIndex !== -1 && newIndex !== -1) {
						onSortEnd?.(oldIndex, newIndex);
					}
				}
			}}
		>
			{children}
			<DragOverlay className="active:opacity-[0.5]">
				{activeId && renderOverlay ? renderOverlay(activeId) : null}
			</DragOverlay>
		</DragDropProvider>
	);
}
