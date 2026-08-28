import { Select } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	apiLibraryNotePlatformList,
	apiLibraryNotePlatformSave,
	apiLibraryNoteSave,
	apiLibraryNoteUpdate,
	type LibraryNoteSaveReq,
} from "@/api/services/library-note.service";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import type { Note, NotePlatform } from "../../types";
import { useNoteEnumContext } from "./note-enum-provider";

export interface NoteModalProps {
	formValue: Note;
	title: string;
	show: boolean;
	onCancel: VoidFunction;
	onOk: VoidFunction;
}

export function NoteModal({ formValue, title, show, onCancel, onOk }: NoteModalProps) {
	const [platformSearch, setPlatformSearch] = useState<string>("");

	const { noteType, platform, setPlatform } = useNoteEnumContext();

	const form = useForm<Note>({
		defaultValues: formValue,
	});

	const onPlatformSearch = (value: string) => {
		setPlatformSearch(value);
	};

	const onPlatformChange = (values: number[]) => {
		setPlatformSearch("");
		form.setValue("platformId", values);
	};

	const onPlatformSave = async (value: NotePlatform) => {
		await apiLibraryNotePlatformSave(value);
		const dataList = (await apiLibraryNotePlatformList()).page.list || [];
		setPlatform(dataList);
	};

	const onSubmit = async (value: Note) => {
		const newValues = {
			...value,
			platformId: value.platformId?.join(","),
		} as LibraryNoteSaveReq;

		// 处理空值
		for (const [key, value] of Object.entries(newValues)) {
			if (value === undefined || value === "") {
				delete newValues[key as keyof LibraryNoteSaveReq];
			}
		}

		if (newValues.id) {
			await apiLibraryNoteUpdate(newValues);
		} else {
			await apiLibraryNoteSave(newValues);
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
								name="title"
								rules={{ required: "Title is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(value) => field.onChange(Number(value))}
												defaultValue={String(field.value)}
											>
												{noteType.map((item, index) => (
													// biome-ignore lint/suspicious/noArrayIndexKey: false
													<div key={index} className="flex items-center space-x-2">
														<RadioGroupItem value={String(item.value)} id={`option-${item.value}`} />
														<Label htmlFor={`option-${item.value}`}>{item.label}</Label>
													</div>
												))}
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="platformId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Platform</FormLabel>
										<FormControl>
											<Select
												{...field}
												mode="multiple"
												allowClear
												styles={{
													popup: {
														root: {
															pointerEvents: "auto",
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onPlatformSearch }}
												onChange={onPlatformChange}
												placeholder="Select Platform"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{platformSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onPlatformSave({ name: platformSearch })}
															>
																Create <Badge>{platformSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={platform.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
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
