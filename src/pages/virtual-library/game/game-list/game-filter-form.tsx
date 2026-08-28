import { Select } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import type { GameFilterParams } from "../../types";
import { useGameEnumContext } from "./game-enum-provider";

export interface GameFilterFormProps {
	formValue: GameFilterParams;
	setTableParams: (params: GameFilterParams) => void;
	onSearch: () => void;
}

export function GameFilterForm({ formValue, setTableParams, onSearch }: GameFilterFormProps) {
	const form = useForm<GameFilterParams>({
		defaultValues: formValue,
	});

	const { series } = useGameEnumContext();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onSubmit = (values: GameFilterParams) => {
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
						gridTemplateColumns: "1fr 2fr",
					}}
				>
					<FormField
						control={form.control}
						name="seriesId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Series</FormLabel>
								<FormControl>
									<Select
										{...field}
										showSearch={{ optionFilterProp: "label" }}
										placeholder="Select Series"
										options={series.map((item) => ({ label: item.name, value: item.id }))}
									/>
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
