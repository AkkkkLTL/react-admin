import { Select } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import type { MovieFilterParams } from "../../types";
import { useMovieEnumContext } from "./movie-enum-provider";

export interface MovieFilterFormProps {
	formValue: MovieFilterParams;
	setTableParams: (params: MovieFilterParams) => void;
	onSearch: () => void;
}

export function MovieFilterForm({ formValue, setTableParams, onSearch }: MovieFilterFormProps) {
	const form = useForm<MovieFilterParams>({
		defaultValues: formValue,
	});
	const { TYPE_LIST, STATUS } = useMovieEnumContext();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (values: MovieFilterParams) => {
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
						gridTemplateColumns: "1fr 1fr 1fr",
					}}
				>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Type</FormLabel>
								<FormControl>
									<Select {...field} placeholder="Select Type" options={TYPE_LIST} />
								</FormControl>
							</FormItem>
						)}
					/>

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
				<Button type="submit" className="self-end">
					Search
				</Button>
			</form>
		</Form>
	);
}
