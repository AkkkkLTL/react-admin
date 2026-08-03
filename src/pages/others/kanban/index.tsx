import type { DragEndEvent, DragStartEvent } from "@dnd-kit/abstract";
import { PointerActivationConstraints } from "@dnd-kit/dom";
import { arrayMove, move } from "@dnd-kit/helpers";
import {
	type DragDropEventHandlers,
	DragDropProvider,
	type DragOverEvent,
	DragOverlay,
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
	const [state, setState] = useState<DndDataType>(initialData);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [activeType, setActiveType] = useState<"column" | "task" | null>(null);
	const [addingColumn, setAddingColumn] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// const items = useMemo(() => {
	// 	return data.columnOrder.reduce(
	// 		(acc, value) => {
	// 			acc[value] = data.columns[value].taskIds;
	// 			return acc;
	// 		},
	// 		{} as Record<string, string[]>,
	// 	);
	// }, [data]);

	// useEffect(() => {
	// 	setTaskItems(items);
	// 	setColumns(Object.keys(items));
	// }, [items]);

	/** 开始拖动 */
	const handleDragStart = useCallback<DragDropEventHandlers["onDragStart"]>((event) => {
		const { operation } = event;
		setActiveId(operation.source?.id as string);
		// 通过判断 id 格式来确定拖拽类型
		setActiveType(operation.source?.id.toString().startsWith("task-") ? "task" : "column");
		// snapshot.current = structuredClone(taskItems);
	}, []);

	/** 拖动 */
	// const handleDragOver = useCallback<DragDropEventHandlers["onDragOver"]>((event: DragOverEvent) => {
	// 	const { operation:{
	// 		source, target
	// 	} } = event;

	// 	if (!target) {
	// 		setActiveId(null);
	// 		setActiveType(null);
	// 		return;
	// 	}
	// 	console.log(source, target);

	// }, []);

	/** 拖动结束 */
	const handleDragEnd = useCallback<DragDropEventHandlers["onDragEnd"]>((event: DragEndEvent) => {
		const {
			operation: { source, target },
		} = event;

		if (!target) {
			setActiveId(null);
			setActiveType(null);
			return;
		}
		console.log(source, target);

		if (source?.id !== target?.id) {
			if (activeType === "column") {
				// 处理列的拖拽
				const oldIndex = state.columnOrder.indexOf(source?.id as string);
				const newIndex = state.columnOrder.indexOf(target?.id as string);

				setState({
					...state,
					columnOrder: arrayMove(state.columnOrder, oldIndex, newIndex),
				});
			} else {
				// 处理任务的拖拽
				const activeColumn = Object.values(state.columns).find((col) => col.taskIds.includes(source?.id as string));
				const overColumn = Object.values(state.columns).find(
					(col) => col.taskIds.includes(target.id as string) || col.id === target.id,
				);

				if (!activeColumn || !overColumn) return;

				if (activeColumn === overColumn) {
					// 同列内移动
					const newTaskIds = arrayMove(
						activeColumn.taskIds,
						activeColumn.taskIds.indexOf(source?.id as string),
						activeColumn.taskIds.indexOf(target.id as string),
					);

					setState({
						...state,
						columns: {
							...state.columns,
							[activeColumn.id]: {
								...activeColumn,
								taskIds: newTaskIds,
							},
						},
					});
				} else {
					// 跨列移动
					const sourceTaskIds = activeColumn.taskIds.filter((id) => id !== source?.id);
					const destinationTaskIds = [...overColumn.taskIds];
					const overTaskIndex = overColumn.taskIds.indexOf(target.id as string);

					destinationTaskIds.splice(
						overTaskIndex >= 0 ? overTaskIndex : destinationTaskIds.length,
						0,
						source?.id as string,
					);

					setState({
						...state,
						columns: {
							...state.columns,
							[activeColumn.id]: {
								...activeColumn,
								taskIds: sourceTaskIds,
							},
							[overColumn.id]: {
								...overColumn,
								taskIds: destinationTaskIds,
							},
						},
					});
				}
			}
		}
		setActiveId(null);
		setActiveType(null);
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
		const newState: DndDataType = {
			...state,
			columns: {
				...state.columns,
				[column.id]: column,
			},
			columnOrder: [...state.columnOrder, column.id],
		};
		setState(newState);
	};

	/** 创建任务 */
	const createTask = (columnId: string, task: Task) => {
		const column = state.columns[columnId];
		const newData: DndDataType = {
			...state,
			tasks: {
				...state.tasks,
				[task.id]: task,
			},
			columns: {
				...state.columns,
				[columnId]: {
					...column,
					taskIds: [...column.taskIds, task.id],
				},
			},
		};
		setState(newData);
	};

	const deleteColumn = (columnId: string) => {
		const column = state.columns[columnId];
		const newTasks = Object.keys(state.tasks)
			.filter((key) => !column.taskIds.includes(key))
			.reduce((result, key) => {
				result[key] = state.tasks[key];
				return result;
			}, {} as Tasks);

		const newColumns = Object.keys(state.columns)
			.filter((key) => key !== columnId)
			.reduce((result, key) => {
				result[key] = state.columns[key];
				return result;
			}, {} as Columns);
		const newColumnOrder = Array.from(state.columnOrder).filter((item) => item !== columnId);

		const newData: DndDataType = {
			tasks: newTasks,
			columns: newColumns,
			columnOrder: newColumnOrder,
		};
		setState(newData);
	};

	const clearColumn = (columnId: string) => {
		const column = state.columns[columnId];
		const newTasks = Object.keys(state.tasks)
			.filter((key) => !column.taskIds.includes(key))
			.reduce((result, key) => {
				result[key] = state.tasks[key];
				return result;
			}, {} as Tasks);
		const newColumns = {
			...state.columns,
			[columnId]: {
				...column,
				taskIds: [],
			},
		};
		const newData: DndDataType = {
			...state,
			tasks: newTasks,
			columns: newColumns,
		};
		setState(newData);
	};

	const renameColumn = (column: Column) => {
		const { id, title } = column;
		const newColumns = {
			...state.columns,
			[id]: {
				...state.columns[id],
				title,
			},
		};
		const newData: DndDataType = {
			...state,
			columns: newColumns,
		};
		setState(newData);
	};

	return (
		<ScrollArea type="hover">
			<div className="flex w-full">
				<DragDropProvider sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
					<div className="flex h-full items-start gap-6 p-1">
						{state.columnOrder.map((columnId, index) => {
							const column = state.columns[columnId];
							const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

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
						<DragOverlay>
							{activeId && activeType === "column" ? (
								<KanbanColumn
									id={activeId}
									index={state.columnOrder.indexOf(activeId)}
									column={state.columns[activeId]}
									tasks={state.columns[activeId].taskIds.map((id) => state.tasks[id])}
									createTask={createTask}
									clearColumn={clearColumn}
									deleteColumn={deleteColumn}
									renameColumn={renameColumn}
									isDragging
								/>
							) : null}
							{activeId && activeType === "task" ? (
								<KanbanTask
									id={activeId}
									index={state.columnOrder.indexOf(activeId)}
									task={state.tasks[activeId]}
									isDragging
								/>
							) : null}
						</DragOverlay>
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
