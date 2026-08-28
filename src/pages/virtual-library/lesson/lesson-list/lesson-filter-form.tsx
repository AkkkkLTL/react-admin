import { Select } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import type { LessonFilterParams } from "../../types";
import { useLessonEnumContext } from "./lesson-enum-provider";

export interface LessonFilterFormProps {
	formValue: LessonFilterParams;
	setTableParams: (params: LessonFilterParams) => void;
	onSearch: VoidFunction;
}

export function LessonFilterForm({ formValue, setTableParams, onSearch }: LessonFilterFormProps) {
	const form = useForm<LessonFilterParams>({
		defaultValues: formValue,
	});

	const { STATUS } = useLessonEnumContext();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (values: LessonFilterParams) => {
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
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Select {...field} placeholder="Select Status" options={STATUS} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="search"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Search</Button>
			</form>
		</Form>
	);
}
