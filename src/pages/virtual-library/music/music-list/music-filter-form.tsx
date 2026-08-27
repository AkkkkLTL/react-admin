import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import type { MusicFilterParams } from "../../types";

export interface MusicFilterFormProps {
	formValue: MusicFilterParams;
	setTableParams: (params: MusicFilterParams) => void;
	onSearch: VoidFunction;
}

export function MusicFilterForm({ formValue, setTableParams, onSearch }: MusicFilterFormProps) {
	const form = useForm<MusicFilterParams>({
		defaultValues: formValue,
	});

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (values: MusicFilterParams) => {
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
