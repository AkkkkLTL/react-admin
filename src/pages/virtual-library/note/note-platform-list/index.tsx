import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryNotePlatformList,
	apiLibraryNotePlatformSave,
	apiLibraryNotePlatformUpdate,
} from "@/api/services/library-note.service";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { NotePlatform } from "../../types";

interface DataType extends NotePlatform {
	key: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: keyof DataType;
	title: any;
	inputType: "number" | "text";
	record: DataType;
	index: number;
}

const DEFAULT_PLATFORM_VALUE: DataType = {
	key: "",
	id: undefined,
	name: "",
};

export default function NotePlatformListPage() {
	const [platformList, setPlatformList] = useState<DataType[]>([]);
	const [count, setCount] = useState(0);
	const [editingKey, setEditingKey] = useState("");
	const [refresh, setRefresh] = useState(0);

	const form = useForm<{ platform: DataType[] }>({
		defaultValues: {
			platform: platformList,
		},
	});

	const platform = useFieldArray({
		control: form.control,
		name: "platform",
	});

	useEffect(() => {
		getPlatformList();
	}, [refresh]);

	const getPlatformList = async () => {
		const dataList = ((await apiLibraryNotePlatformList()).page.list.map((item, index) => ({
			...item,
			key: index.toString() || "",
		})) || []) as DataType[];
		form.setValue("platform", dataList);
		setPlatformList(dataList);
		setCount(dataList.length);
		setEditingKey("");
	};

	const isEditing = (record: DataType) => record.key === editingKey;

	const columns = [
		{
			title: "No",
			render: (_value: string, _record: DataType, index: number) => index + 1,
			width: 50,
		},
		{
			title: "Name",
			dataIndex: "name",
			width: "30%",
			editable: true,
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (_value: any, record: DataType) => {
				const editable = isEditing(record);
				return editable ? (
					<span className="space-x-2">
						<Button type="button" onClick={() => onSave(record.key)}>
							Save
						</Button>
						<Button type="button" onClick={onCancel}>
							Cancel
						</Button>
					</span>
				) : (
					<Button type="button" disabled={editingKey !== ""} onClick={() => onEdit(record)}>
						Edit
					</Button>
				);
			},
		},
	];

	const onCreate = () => {
		const newData: DataType = {
			...DEFAULT_PLATFORM_VALUE,
			key: count.toString(),
		};
		platform.append({
			...DEFAULT_PLATFORM_VALUE,
			key: count.toString(),
		});
		setPlatformList([...platformList, newData]);
		setCount((prev) => prev + 1);
	};

	const onEdit = (record: Partial<DataType>) => {
		setEditingKey(record.key || "");
	};

	const onSave = async (key: React.Key) => {
		try {
			const newData = [...platformList];
			const index = newData.findIndex((item) => item.key === key);

			if (index > -1) {
				if (form.getValues(`platform.${index}`).name === "") {
					form.trigger(`platform.${index}`);
					return;
				}
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...form.getValues(`platform.${index}`) });
				if (newData[index].id === undefined) {
					await apiLibraryNotePlatformSave({
						name: newData[index].name,
					});
				} else {
					await apiLibraryNotePlatformUpdate({
						id: newData[index].id,
						name: newData[index].name,
					});
				}
				setRefresh(Date.now());
			} else {
				newData.push(form.getValues(`platform.${index}`));
				setCount((prev) => prev + 1);
				setPlatformList(newData);
				setEditingKey("");
			}
		} catch (error) {
			console.log("Validate Failed:", error);
		}
	};

	const onCancel = () => {
		setEditingKey("");
	};

	const mergedColumns = columns.map<TableColumnsType<DataType>[number]>((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: DataType, index?: number) => ({
				record,
				index: index || 0,
				editing: isEditing(record),
				dataIndex: col.dataIndex,
				title: col.title,
				inputType: col.dataIndex === "id" ? "number" : "text",
			}),
		};
	});

	const EditableCellRender = (props: EditableCellProps) => {
		const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = props;

		return (
			<td {...restProps}>
				{record && editing ? (
					<FormField
						control={form.control}
						name={`platform.${index}.${dataIndex}`}
						rules={{ required: `Please Input ${title}!` }}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									{inputType === "number" ? <Input type="number" {...field} /> : <Input {...field} />}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				) : (
					children
				)}
			</td>
		);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>Note Platform List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<Table<DataType>
						bordered
						components={{ body: { cell: EditableCellRender } }}
						dataSource={platformList}
						columns={mergedColumns}
					/>
				</Form>
			</CardContent>
		</Card>
	);
}
