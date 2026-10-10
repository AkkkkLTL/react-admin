import { Select } from "antd";
import { CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/ui/input-group";
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

	const handleClearInput = () => {
		form.setValue("search", "");
	};

	const onSubmit = (values: MovieFilterParams) => {
		setTableParams({
			...values,
			page: 1,
		});
		onSearch();
	};

	const onReset = () => {
		const resetValues = { page: 1, limit: formValue.limit } as MovieFilterParams;
		form.reset(resetValues);
		setTableParams(resetValues);
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
									<Select {...field} allowClear placeholder="Select Type" options={TYPE_LIST} />
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
									<Select {...field} allowClear placeholder="Select Status" options={STATUS} />
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
									<InputGroup>
										<InputGroupInput {...field} />
										{field.value && (
											<InputGroupAddon align={"inline-end"}>
												<Button
													variant={"ghost"}
													size={"icon"}
													onClick={handleClearInput}
													className="text-muted-foreground hover:bg-transparent"
												>
													<CircleXIcon />
													<span className="sr-only">Clear input</span>
												</Button>
											</InputGroupAddon>
										)}
									</InputGroup>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex self-end gap-2">
					<Button type="submit">Search</Button>
					<Button type="button" variant="outline" onClick={onReset}>
						Reset
					</Button>
				</div>
			</form>
		</Form>
	);
}
