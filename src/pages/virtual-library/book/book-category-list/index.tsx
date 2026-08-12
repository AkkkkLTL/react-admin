import type { TableColumnsType } from "antd";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryBookCategoryList,
	apiLibraryBookCategorySave,
	apiLibraryBookCategoryUpdate,
	type LibraryBookCategorySaveReq,
} from "@/api/services/library-book.service";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

interface DataType extends LibraryBookCategorySaveReq {
	key: string;
}

const DEFAULT_BOOK_CATEGORY_VALUE: DataType = {
	key: "",
	id: undefined,
	name: "",
};

export default function BookCategoryListPage() {
	const [categoryList, setCategoryList] = useState<DataType[]>([]);
	const [count, setCount] = useState(0);
	const [editingKey, setEditingKey] = useState("");
	const [refresh, setRefresh] = useState(0);

	const form = useForm<{ categories: DataType[] }>({
		defaultValues: {
			categories: categoryList,
		},
	});

	const categories = useFieldArray({
		control: form.control,
		name: "categories",
	});

	useEffect(() => {
		getBookCategoryList();
	}, [refresh]);

	const getBookCategoryList = async () => {
		const dataList = ((await apiLibraryBookCategoryList()).page.list.map((item, index) => ({
			...item,
			key: index.toString() || "",
		})) || []) as DataType[];
		form.setValue("categories", dataList);
		setCategoryList(dataList);
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
			title: "operation",
			dataIndex: "operation",
			render: (_: any, record: DataType) => {
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
			...DEFAULT_BOOK_CATEGORY_VALUE,
			key: count.toString(),
		};
		categories.append({
			...DEFAULT_BOOK_CATEGORY_VALUE,
			key: count.toString(),
		});
		setCategoryList([...categoryList, newData]);
		setCount((prev) => prev + 1);
	};

	const onEdit = (record: Partial<DataType>) => {
		setEditingKey(record.key || "");
	};

	const onSave = async (key: React.Key) => {
		try {
			const newData = [...categoryList];
			const index = newData.findIndex((item) => item.key === key);

			if (index > -1) {
				if (form.getValues(`categories.${index}`).name === "") {
					form.trigger(`categories.${index}`);
					return;
				}
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...form.getValues(`categories.${index}`) });
				if (newData[index].id === undefined) {
					await apiLibraryBookCategorySave({
						name: newData[index].name,
					});
				} else {
					await apiLibraryBookCategoryUpdate({
						id: newData[index].id,
						name: newData[index].name,
					});
				}
				// setCategoryList(newData);
				// setEditingKey("");
				setRefresh(Date.now());
			} else {
				newData.push(form.getValues(`categories.${index}`));
				setCount((prev) => prev + 1);
				setCategoryList(newData);
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
						name={`categories.${index}.${dataIndex}`}
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
					<div>Book Category List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<Table
						bordered
						components={{ body: { cell: EditableCellRender } }}
						dataSource={categoryList}
						columns={mergedColumns}
					/>
				</Form>
			</CardContent>
		</Card>
	);
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: keyof DataType;
	title: any;
	inputType: "number" | "text";
	record: DataType;
	index: number;
}
