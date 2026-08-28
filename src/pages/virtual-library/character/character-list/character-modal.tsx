import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	apiLibraryCharacterSave,
	apiLibraryCharacterUpdate,
	type LibraryCharacterSaveReq,
} from "@/api/services/library-character.service";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import type { Character } from "../../types";

export interface CharacterModalProps {
	formValue: Character;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

export function CharacterModal({ formValue, title, show, onOk, onCancel }: CharacterModalProps) {
	const form = useForm<Character>({
		defaultValues: formValue,
	});

	const onSubmit = async (value: Character) => {
		const newValues = {
			...value,
			isVirtual: Number(Boolean(value.isVirtual)),
		} as LibraryCharacterSaveReq;

		if (newValues.id) {
			await apiLibraryCharacterUpdate(newValues);
		} else {
			await apiLibraryCharacterSave(newValues);
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
				<div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								rules={{ required: "Name is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="isVirtual"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Is Virtual</FormLabel>
										<FormControl>
											<RadioGroup
												defaultValue={String(field.value)}
												onValueChange={(value) => field.onChange(String(value))}
											>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value={String(true)} id={`option-true`} />
													<Label htmlFor={`option-true`}>是</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value={String(false)} id={`option-false`} />
													<Label htmlFor={`option-false`}>否</Label>
												</div>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* todo:待定-后期添加 */}
							<FormField
								control={form.control}
								name="noteBookId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Note Book ID</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							{/* todo:待定-后期添加 */}
							<FormField
								control={form.control}
								name="tagId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tag ID</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
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
				</div>
			</DialogContent>
		</Dialog>
	);
}
