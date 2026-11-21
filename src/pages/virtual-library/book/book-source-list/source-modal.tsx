import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	apiLibraryBookSourceSave,
	apiLibraryBookSourceUpdate,
	type LibraryBookSourceSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

export interface SourceModalProps {
	formValue: LibraryBookSourceSaveReq;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

export function SourceModal({ formValue, title, show, onOk, onCancel }: SourceModalProps) {
	const form = useForm<LibraryBookSourceSaveReq>({
		defaultValues: formValue,
	});

	const onSubmit = async (values: LibraryBookSourceSaveReq) => {
		if (values.id) {
			await apiLibraryBookSourceUpdate(values);
		} else {
			await apiLibraryBookSourceSave(values);
		}
		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							rules={{ required: "publisher name is required!" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>来源名称</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="button" variant={"outline"} onClick={onCancel}>
								取消
							</Button>
							<Button type="submit" variant={"default"}>
								保存
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
