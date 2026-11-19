import { X } from "lucide-react";
import { type KeyboardEvent, type MutableRefObject, useState } from "react";
import { Input } from "@/ui/input";

/** 回车添加式名单输入（作者 / 译者），已添加项可点击再次编辑 */
interface NameListFieldProps {
	names: { id: string; name: string }[];
	placeholder: string;
	// 与 BookModal 共享：编辑进行中时为 true，供 Dialog 的 onEscapeKeyDown 判断是否拦截 Esc 关闭
	editingRef: MutableRefObject<boolean>;
	onAdd: (name: string) => void;
	onChange: (index: number, name: string) => void;
	onRemove: (index: number) => void;
}
export default function NameListField({
	names,
	placeholder,
	editingRef,
	onAdd,
	onChange,
	onRemove,
}: NameListFieldProps) {
	const [draft, setDraft] = useState("");
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editValue, setEditValue] = useState("");

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter" || e.repeat) return;
		e.preventDefault();
		const name = draft.trim();
		if (name === "") return;
		onAdd(name);
		setDraft("");
	};

	const startEdit = (index: number) => {
		editingRef.current = true;
		setEditingIndex(index);
		setEditValue(names[index].name);
	};

	const finishEdit = () => {
		editingRef.current = false;
		setEditingIndex(null);
		setEditValue("");
	};

	const commitEdit = () => {
		if (!editingRef.current || editingIndex === null) return;
		const name = editValue.trim();
		// 编辑为空视为移除该项
		name === "" ? onRemove(editingIndex) : onChange(editingIndex, name);
		finishEdit();
	};

	const cancelEdit = () => {
		finishEdit();
	};

	const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.repeat) return;
		if (e.key === "Enter") {
			// 阻止冒泡与默认行为：避免触发表单隐式提交
			e.preventDefault();
			e.stopPropagation();
			commitEdit();
		} else if (e.key === "Escape") {
			// 阻止冒泡：避免触发 Dialog 的关闭
			e.preventDefault();
			e.stopPropagation();
			cancelEdit();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<Input
				className="bg-white"
				value={draft}
				placeholder={placeholder}
				onChange={(e) => setDraft(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			{names.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{names.map((item, index) =>
						editingIndex === index ? (
							<Input
								key={item.id}
								autoFocus
								value={editValue}
								placeholder="请输入名称"
								onChange={(e) => setEditValue(e.target.value)}
								onKeyDown={handleEditKeyDown}
								onBlur={commitEdit}
								className="h-6 w-28 rounded-md bg-primary/10 px-2 text-xs text-primary"
							/>
						) : (
							<span
								key={item.id}
								className="h-6 flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
							>
								<button type="button" className="cursor-text" title="点击编辑" onClick={() => startEdit(index)}>
									{item.name}
								</button>
								<button type="button" className="cursor-pointer" onClick={() => onRemove(index)}>
									<X className="size-3" />
									<span className="sr-only">移除 {item.name}</span>
								</button>
							</span>
						),
					)}
				</div>
			)}
		</div>
	);
}
