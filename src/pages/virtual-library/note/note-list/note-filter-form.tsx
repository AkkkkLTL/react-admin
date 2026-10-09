import { CircleXIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/ui/input-group";
import type { NoteFilterParams } from "../../types";

export interface NoteFilterFormProps {
	formValue: NoteFilterParams;
	setTableParams: (params: NoteFilterParams) => void;
	onSearch: VoidFunction;
}

export function NoteFilterForm({ formValue, setTableParams, onSearch }: NoteFilterFormProps) {
	const form = useForm<NoteFilterParams>({
		defaultValues: formValue,
	});

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const handleClearInput = () => {
		form.setValue("search", "");
	};

	const onSubmit = (values: NoteFilterParams) => {
		setTableParams({
			...values,
			page: 1,
		});
		onSearch();
	};

	const onReset = () => {
		const resetValues = { page: 1, limit: formValue.limit } as NoteFilterParams;
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
				<div className="flex gap-2">
					<Button type="submit">Search</Button>
					<Button type="button" variant="outline" onClick={onReset}>
						Reset
					</Button>
				</div>
			</form>
		</Form>
	);
}
