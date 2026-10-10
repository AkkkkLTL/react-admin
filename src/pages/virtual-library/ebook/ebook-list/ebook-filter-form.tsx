import { Select } from "antd";
import { CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import type { EBookFilterParams } from "../../types";
import { useEBookEnumContext } from "./ebook-enum-provider";

export interface EBookFilterFormProps {
	formValue: EBookFilterParams;
	setTableParams: (params: EBookFilterParams) => void;
	onSearch: VoidFunction;
}

export function EBookFilterForm({ formValue, setTableParams, onSearch }: EBookFilterFormProps) {
	const form = useForm<EBookFilterParams>({
		defaultValues: formValue,
	});

	const { TYPE_LIST, READ_STATUS } = useEBookEnumContext();

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const handleClearInput = () => {
		form.setValue("search", "");
	};

	const onSubmit = (values: EBookFilterParams) => {
		setTableParams({
			...values,
			page: 1,
		});
		onSearch();
	};

	const onReset = () => {
		const resetValues = { page: 1, limit: formValue.limit } as EBookFilterParams;
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
						gridTemplateColumns: "1fr 1fr 1fr 1fr 2fr",
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
								<FormLabel>Read Status</FormLabel>
								<FormControl>
									<Select {...field} allowClear placeholder="Select Read Status" options={READ_STATUS} />
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
