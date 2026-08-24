import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiLibraryCommonLanguageSave, apiLibraryCommonLanguageUpdate } from "@/api/services/library-common.service";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { CommonLanguage } from "../../types";

export interface LanguageModalProps {
	formValue: CommonLanguage;
	title: string;
	show: boolean;
	onOk: () => void;
	onCancel: () => void;
}

export function LanguageModal({ formValue, title, show, onOk, onCancel }: LanguageModalProps) {
	const form = useForm<CommonLanguage>({
		defaultValues: formValue,
	});

	const onSubmit = async (values: CommonLanguage) => {
		if (values.id) {
			await apiLibraryCommonLanguageUpdate(values);
		} else {
			await apiLibraryCommonLanguageSave(values);
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
							name="code"
							rules={{ required: "language code is required!" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Language Code</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							rules={{ required: "language name is required!" }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Language Name</FormLabel>
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
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
