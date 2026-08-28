import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryGameSeriesList,
	apiLibraryGameSeriesSave,
	apiLibraryGameSeriesUpdate,
} from "@/api/services/library-game.service";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { GameSeries } from "../../types";

interface DataType extends GameSeries {
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

const DEFAULT_GAME_SERIES_VALUE: DataType = {
	key: "",
	id: undefined,
	name: "",
};

export default function GameSeriesListPage() {
	const [seriesList, setSeriesList] = useState<DataType[]>([]);
	const [count, setCount] = useState(0);
	const [editingKey, setEditingKey] = useState("");
	const [refresh, setRefresh] = useState(0);

	const form = useForm<{ series: DataType[] }>({
		defaultValues: {
			series: seriesList,
		},
	});

	const series = useFieldArray({
		control: form.control,
		name: "series",
	});

	useEffect(() => {
		getGameSeriesList();
	}, [refresh]);

	const getGameSeriesList = async () => {
		const dataList = ((await apiLibraryGameSeriesList()).page.list.map((item, index) => ({
			...item,
			key: index.toString() || "",
		})) || []) as DataType[];
		form.setValue("series", dataList);
		setSeriesList(dataList);
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
			...DEFAULT_GAME_SERIES_VALUE,
			key: count.toString(),
		};
		series.append({
			...DEFAULT_GAME_SERIES_VALUE,
			key: count.toString(),
		});
		setSeriesList([...seriesList, newData]);
		setCount((prev) => prev + 1);
	};

	const onEdit = (record: Partial<DataType>) => {
		setEditingKey(record.key || "");
	};

	const onSave = async (key: React.Key) => {
		try {
			const newData = [...seriesList];
			const index = newData.findIndex((item) => item.key === key);

			if (index > -1) {
				if (form.getValues(`series.${index}`).name === "") {
					form.trigger(`series.${index}`);
					return;
				}
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...form.getValues(`series.${index}`) });
				if (newData[index].id === undefined) {
					await apiLibraryGameSeriesSave({
						name: newData[index].name,
					});
				} else {
					await apiLibraryGameSeriesUpdate(newData[index]);
				}
				setRefresh(Date.now());
			} else {
				newData.push(form.getValues(`series.${index}`));
				setCount((prev) => prev + 1);
				setSeriesList(newData);
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
						name={`series.${index}.${dataIndex}`}
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
					<div>Game Series List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<Table<DataType>
						bordered
						components={{ body: { cell: EditableCellRender } }}
						dataSource={seriesList}
						columns={mergedColumns}
					/>
				</Form>
			</CardContent>
		</Card>
	);
}
