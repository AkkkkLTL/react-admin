import { Rate, Select } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryLessonSave,
	apiLibraryLessonSourceList,
	apiLibraryLessonSourceSave,
	apiLibraryLessonUpdate,
	type LibraryLessonSaveReq,
} from "@/api/services/library-lesson.service";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { Lesson, LessonSource } from "../../types";
import { useLessonEnumContext } from "./lesson-enum-provider";

export interface LessonModalProps {
	formValue: Lesson;
	title: string;
	show: boolean;
	onCancel: VoidFunction;
	onOk: VoidFunction;
}

export function LessonModal({ formValue, title, show, onCancel, onOk }: LessonModalProps) {
	const [sourceSearch, setSourceSearch] = useState<string>("");
	const { STATUS, source, setSource } = useLessonEnumContext();

	const form = useForm<Lesson>({
		defaultValues: formValue,
	});

	const teacherField = useFieldArray({
		name: "teacher",
		control: form.control,
	});

	const onSourceSearch = (value: string) => {
		setSourceSearch(value);
	};

	const onSourceSave = async (value: LessonSource) => {
		await apiLibraryLessonSourceSave(value);
		const dataList = (await apiLibraryLessonSourceList()).page.list || [];
		setSource(dataList);
	};

	const onSourceChange = (value: number[]) => {
		setSourceSearch("");
		form.setValue("sourceId", value);
	};

	const onSubmit = async (values: Lesson) => {
		const { teacher, ...rest } = values;

		const newValues = {
			...rest,
			teacherId: teacher?.map((item) => item.id).join(","),
			teacherName: teacher?.map((item) => item.name).join(","),
			sourceId: rest.sourceId?.join(","),
		} as LibraryLessonSaveReq;

		// 处理空值
		for (const [key, value] of Object.entries(newValues)) {
			if (value === undefined || value === "") {
				delete newValues[key as keyof LibraryLessonSaveReq];
			}
		}

		if (newValues.id) {
			await apiLibraryLessonUpdate(newValues);
		} else {
			await apiLibraryLessonSave(newValues);
		}
		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent className="h-[90%]">
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
								name="cover"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<div className="space-y-2">
								<p>Teacher</p>
								{teacherField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`teacher.${index}.name`}
										rules={{ required: "Teacher name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Teacher {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Teather" />
														<Button type="button" onClick={() => teacherField.remove(index)}>
															<Icon icon="material-symbols:remove-rounded" />
														</Button>
													</div>
												</FormControl>
												<FormMessage className="col-span-4" />
											</FormItem>
										)}
									/>
								))}
								<Button
									type="button"
									style={{ width: "100%" }}
									onClick={() => teacherField.append({ id: "-1", name: "" })}
								>
									Add Teacher
								</Button>
							</div>

							<FormField
								control={form.control}
								name="sourceId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Source</FormLabel>
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
												showSearch={{ optionFilterProp: "label", onSearch: onSourceSearch }}
												onChange={onSourceChange}
												placeholder="Select Source"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{sourceSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSourceSave({ name: sourceSearch })}
															>
																Create <Badge>{sourceSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={source.map((item) => ({ label: item.name, value: item.id }))}
											/>
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
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												placeholder="Select Status"
												options={STATUS}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="rating"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rating</FormLabel>
										<FormControl>
											<Rate {...field} />
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
