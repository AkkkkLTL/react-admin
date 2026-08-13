import { Rate, Select } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { LibraryBookFilterParams } from "@/api/services/library-book.service";
import { ReadStatus } from "@/types/enum";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { useBookEnumContext } from "./book-enum-provider";

const BOOK_STATUS = [
	{
		value: ReadStatus.WANTTOREAD,
		label: "想读",
	},
	{
		value: ReadStatus.UNREAD,
		label: "未读",
	},
	{
		value: ReadStatus.STOPREAD,
		label: "暂停",
	},
	{
		value: ReadStatus.READING,
		label: "在读",
	},
	{
		value: ReadStatus.GIVEUPREAD,
		label: "弃读",
	},
	{
		value: ReadStatus.READED,
		label: "已读",
	},
];

export interface BookFilterFormProps {
	formValue: LibraryBookFilterParams;
	setTableParams: (params: LibraryBookFilterParams) => void;
	onSearch: () => void;
}
export function BookFilterForm({ formValue, setTableParams, onSearch }: BookFilterFormProps) {
	const form = useForm<LibraryBookFilterParams>({
		defaultValues: formValue,
	});

	const { publisher, category } = useBookEnumContext();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (values: LibraryBookFilterParams) => {
		setTableParams({
			...values,
			page: 1,
		});
		onSearch();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
				<div
					className="grid gap-4"
					style={{
						gridTemplateColumns: "1fr 1fr 1fr 1fr 2fr",
					}}
				>
					<FormField
						control={form.control}
						name="publisherId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Publisher</FormLabel>
								<FormControl>
									<Select
										{...field}
										showSearch={{ optionFilterProp: "label" }}
										placeholder="Select Publisher"
										options={publisher.map((item) => ({ label: item.name, value: item.id }))}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Select
										{...field}
										showSearch={{ optionFilterProp: "label" }}
										placeholder="Select Category"
										options={category.map((item) => ({ label: item.name, value: item.id }))}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="readStatus"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Read Status</FormLabel>
								<FormControl>
									<Select
										{...field}
										showSearch={{ optionFilterProp: "label" }}
										placeholder="Select Read Status"
										options={BOOK_STATUS}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="rating"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rating</FormLabel>
								<FormControl>
									<Rate {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="search"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ISBN & Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="self-end">
					Search
				</Button>
			</form>
		</Form>
	);
}
