import type { DragEndEvent } from "@dnd-kit/abstract";
import { PointerActivationConstraints } from "@dnd-kit/dom";
import { move } from "@dnd-kit/helpers";
import {
	type DragDropEventHandlers,
	DragDropProvider,
	type DragOverEvent,
	KeyboardSensor,
	PointerSensor,
} from "@dnd-kit/react";
import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEvent } from "react-use";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import KanbanColumn from "./kanban-column";
import KanbanTask from "./kanban-task";
import { initialData } from "./task-utils";
import type { Column, Columns, DndDataType, Task, Tasks } from "./types";

const sensors = [
	PointerSensor.configure({
		activatorElements(source) {
			return [source.element, source.handle];
		},
		activationConstraints: [new PointerActivationConstraints.Distance({ value: 8 })],
	}),
	KeyboardSensor,
];

export default function Kanban() {
	/** 保存看板数据状态 */
	const [data, setData] = useState<DndDataType>(initialData);
	const [taskItems, setTaskItems] = useState<Record<string, string[]>>({});
	const [columns, setColumns] = useState(Object.keys(taskItems));
	const snapshot = useRef(structuredClone(taskItems));

	const [addingColumn, setAddingColumn] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const items = useMemo(() => {
		return data.columnOrder.reduce(
			(acc, value) => {
				acc[value] = data.columns[value].taskIds;
				return acc;
			},
			{} as Record<string, string[]>,
		);
	}, [data]);

	useEffect(() => {
		setTaskItems(items);
		setColumns(Object.keys(items));
	}, [items]);

	/** 开始拖动 */
	const handleDragStart = useCallback<DragDropEventHandlers["onDragStart"]>(() => {
		snapshot.current = structuredClone(taskItems);
	}, [taskItems]);

	/** 拖动 */
	const handleDragOver = useCallback<DragDropEventHandlers["onDragOver"]>((event: DragOverEvent) => {
		const { source, target } = event.operation;
		console.log(source, target);
		// 处理列拖动
		if (source?.type === "column") {
			setColumns((columns) => move(columns, event));
		} else setTaskItems((taskItems) => move(taskItems, event));
	}, []);

	/** 拖动结束 */
	const handleDragEnd = useCallback<DragDropEventHandlers["onDragEnd"]>((event: DragEndEvent) => {
		if (event.canceled) {
			setTaskItems(snapshot.current);
			return;
		}
	}, []);

	const handleClickOutside = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
			const inputVal = inputRef.current.value;
			if (inputVal) {
				createColumn({
					id: faker.string.uuid(),
					title: inputVal,
					taskIds: [],
				});
			}
			setAddingColumn(false);
			console.log("click outside");
		}
	};
	useEvent("click", handleClickOutside);

	/** 创建任务列 */
	const createColumn = (column: Column) => {
		if (!data) return;

		const newData: DndDataType = {
			...data,
			columns: {
				...data.columns,
				[column.id]: column,
			},
			columnOrder: [...data.columnOrder, column.id],
		};
		setData(newData);
	};

	/** 创建任务 */
	const createTask = (columnId: string, task: Task) => {
		if (!data) return;

		const column = data.columns[columnId];
		const newData: DndDataType = {
			...data,
			tasks: {
				...data.tasks,
				[task.id]: task,
			},
			columns: {
				...data.columns,
				[columnId]: {
					...column,
					taskIds: [...column.taskIds, task.id],
				},
			},
		};
		setData(newData);
	};

	const deleteColumn = (columnId: string) => {
		if (!data) return;

		const column = data.columns[columnId];
		const newTasks = Object.keys(data.tasks)
			.filter((key) => !column.taskIds.includes(key))
			.reduce((result, key) => {
				result[key] = data.tasks[key];
				return result;
			}, {} as Tasks);

		const newColumns = Object.keys(data.columns)
			.filter((key) => key !== columnId)
			.reduce((result, key) => {
				result[key] = data.columns[key];
				return result;
			}, {} as Columns);
		const newColumnOrder = Array.from(data.columnOrder).filter((item) => item !== columnId);

		const newData: DndDataType = {
			tasks: newTasks,
			columns: newColumns,
			columnOrder: newColumnOrder,
		};
		setData(newData);
	};

	const clearColumn = (columnId: string) => {
		if (!data) return;

		const column = data.columns[columnId];
		const newTasks = Object.keys(data.tasks)
			.filter((key) => !column.taskIds.includes(key))
			.reduce((result, key) => {
				result[key] = data.tasks[key];
				return result;
			}, {} as Tasks);
		const newColumns = {
			...data.columns,
			[columnId]: {
				...column,
				taskIds: [],
			},
		};
		const newData: DndDataType = {
			...data,
			tasks: newTasks,
			columns: newColumns,
		};
		setData(newData);
	};

	const renameColumn = (column: Column) => {
		if (!data) return;

		const { id, title } = column;
		const newColumns = {
			...data.columns,
			[id]: {
				...data.columns[id],
				title,
			},
		};
		const newData: DndDataType = {
			...data,
			columns: newColumns,
		};
		setData(newData);
	};

	return (
		<ScrollArea type="hover">
			<div className="flex w-full">
				<DragDropProvider
					sensors={sensors}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					<div className="flex h-full items-start gap-6 p-1">
						{columns.map((columnId, index) => {
							const column = initialData.columns[columnId];
							const tasks = taskItems[columnId].map((taskId) => initialData.tasks[taskId]);

							return (
								<KanbanColumn
									key={columnId}
									id={columnId}
									index={index}
									column={column}
									tasks={tasks}
									createTask={createTask}
									clearColumn={clearColumn}
									deleteColumn={deleteColumn}
									renameColumn={renameColumn}
								/>
							);
						})}
					</div>
				</DragDropProvider>

				<div className="ml-[1.6rem] mt-[0.25rem] min-w-[280px]">
					{addingColumn ? (
						<Input ref={inputRef} placeholder="Column Name" autoFocus />
					) : (
						<Button
							variant={"outline"}
							onClick={(e) => {
								e.stopPropagation();
								setAddingColumn(true);
							}}
							className="inline-flex! w-full! items-center justify-center text-xs! font-semibold!"
						>
							<Icon icon="carbon:add" size={20} />
							<div>Add Column</div>
						</Button>
					)}
				</div>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
