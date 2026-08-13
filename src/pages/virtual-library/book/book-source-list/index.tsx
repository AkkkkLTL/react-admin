import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryBookSourceList,
	apiLibraryBookSourceSave,
	apiLibraryBookSourceUpdate,
	type LibraryBookSourceSaveReq,
} from "@/api/services/library-book.service";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

interface DataType extends LibraryBookSourceSaveReq {
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

const DEFAULT_BOOK_SOURCE_VALUE: DataType = {
	key: "",
	id: undefined,
	name: "",
};

export default function BookSourceListPage() {
	const [sourceList, setSourceList] = useState<DataType[]>([]);
	const [count, setCount] = useState(0);
	const [editingKey, setEditingKey] = useState("");
	const [refresh, setRefresh] = useState(0);

	const form = useForm<{ sources: DataType[] }>({
		defaultValues: {
			sources: sourceList,
		},
	});

	const sources = useFieldArray({
		control: form.control,
		name: "sources",
	});

	useEffect(() => {
		getBookSourceList();
	}, [refresh]);

	const getBookSourceList = async () => {
		const dataList = ((await apiLibraryBookSourceList()).page.list.map((item, index) => ({
			...item,
			key: index.toString() || "",
		})) || []) as DataType[];
		form.setValue("sources", dataList);
		setSourceList(dataList);
		setCount(dataList.length);
		setEditingKey("");
	};

	const isEditing = (record: DataType) => record.key === editingKey;

	const columns = [
		{
			title: "No",
			render: (_: string, record: DataType, index: number) => index + 1,
			width: 50,
		},
		{
			title: "Name",
			dataIndex: "name",
			width: "30%",
			editable: true,
		},
		{
			title: "Action",
			dataIndex: "operation",
			render: (_: string, record: DataType) => {
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
			...DEFAULT_BOOK_SOURCE_VALUE,
			key: count.toString(),
		};
		sources.append(newData);
		setSourceList([...sourceList, newData]);
		setCount((prev) => prev + 1);
	};

	const onEdit = (record: Partial<DataType>) => {
		setEditingKey(record.key || "");
	};

	const onSave = async (key: React.Key) => {
		try {
			const newData = [...sourceList];
			const index = newData.findIndex((item) => item.key === key);

			if (index > -1) {
				if (form.getValues(`sources.${index}`).name === "") {
					form.trigger(`sources.${index}`);
					return;
				}
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...form.getValues(`sources.${index}`) });
				if (newData[index].id === undefined) {
					await apiLibraryBookSourceSave({
						name: newData[index].name,
					});
					setRefresh(Date.now());
				} else {
					await apiLibraryBookSourceUpdate({
						id: newData[index].id,
						name: newData[index].name,
					});
					setSourceList(newData);
					setEditingKey("");
				}
			} else {
				newData.push(form.getValues(`sources.${index}`));
				setCount((prev) => prev + 1);
				setSourceList(newData);
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
						name={`sources.${index}.${dataIndex}`}
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
					<div>Book Source List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<Table
						bordered
						components={{ body: { cell: EditableCellRender } }}
						dataSource={sourceList}
						columns={mergedColumns}
					/>
				</Form>
			</CardContent>
		</Card>
	);
}
