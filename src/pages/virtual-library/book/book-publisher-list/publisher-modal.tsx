import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	apiLibraryBookPublisherSave,
	apiLibraryBookPublisherUpdate,
	type LibraryBookPublisherSaveReq,
} from "@/api/services/library-book.service";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";

export interface PublisherModalProps {
	formValue: LibraryBookPublisherSaveReq;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

export function PublisherModal({ formValue, title, show, onOk, onCancel }: PublisherModalProps) {
	const form = useForm<LibraryBookPublisherSaveReq>({
		defaultValues: formValue,
	});

	const onSubmit = async (values: LibraryBookPublisherSaveReq) => {
		if (values.id) {
			await apiLibraryBookPublisherUpdate(values);
		} else {
			await apiLibraryBookPublisherSave(values);
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
									<FormLabel>Publisher Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="button" variant={"outline"} onClick={onCancel}>
								Cancel
							</Button>
							<Button type="submit" variant={"default"}>
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
