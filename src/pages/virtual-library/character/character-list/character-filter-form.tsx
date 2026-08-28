import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import type { CharacterFilterParams } from "../../types";

export interface CharacterFilterFormProps {
	formValue: CharacterFilterParams;
	setTableParams: (params: CharacterFilterParams) => void;
	onSearch: VoidFunction;
}

export function CharacterFilterForm({ formValue, setTableParams, onSearch }: CharacterFilterFormProps) {
	const form = useForm<CharacterFilterParams>({
		defaultValues: formValue,
	});

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (value: CharacterFilterParams) => {
		setTableParams({
			...value,
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
								<FormLabel>Name</FormLabel>
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
