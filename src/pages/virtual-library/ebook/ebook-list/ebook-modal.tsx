import { Rate, Select } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryEBookCategoryList,
	apiLibraryEBookCategorySave,
	apiLibraryEBookPublishPlatformList,
	apiLibraryEBookPublishPlatformSave,
	apiLibraryEBookSave,
	apiLibraryEBookUpdate,
	type LibraryEBookSaveReq,
} from "@/api/services/library-ebook.service";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import type { EBook, EBookCategory, EBookPublishPlatform } from "../../types";
import { useEBookEnumContext } from "./ebook-enum-provider";

export interface EBookModalProps {
	formValue: EBook;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

export function EBookModal({ formValue, title, show, onOk, onCancel }: EBookModalProps) {
	const [publishPlatformSearch, setPublishPlatformSearch] = useState("");
	const [categorySearch, setCategorySearch] = useState("");
	const {
		TYPE_LIST,
		READ_STATUS,
		publishPlatform: publishPlatformList,
		category: categoryList,
		setPublishPlatform,
		setCategory,
	} = useEBookEnumContext();

	const form = useForm<EBook>({
		defaultValues: formValue,
	});

	const authorField = useFieldArray({
		name: "author",
		control: form.control,
	});

	const getPublishPlatformDataList = async () => {
		const publishPlatformList = (await apiLibraryEBookPublishPlatformList()).page.list || [];
		setPublishPlatform(publishPlatformList);
	};

	const getCategoryDataList = async () => {
		const categoryList = (await apiLibraryEBookCategoryList()).page.list || [];
		setCategory(categoryList);
	};

	const onPublishPlatformSearch = (value: string) => {
		setPublishPlatformSearch(value);
	};

	const onCategorySearch = (value: string) => {
		setCategorySearch(value);
	};

	const onPublishPlatformSave = async (values: EBookPublishPlatform) => {
		await apiLibraryEBookPublishPlatformSave(values);
		await getPublishPlatformDataList();
	};

	const onCategorySave = async (values: EBookCategory) => {
		await apiLibraryEBookCategorySave(values);
		await getCategoryDataList();
	};

	const onPublishPlatformChange = (value: number[]) => {
		setPublishPlatformSearch("");
		form.setValue("publishPlatformId", value);
	};

	const onCategoryChange = (value: number[]) => {
		setCategorySearch("");
		form.setValue("categoryId", value);
	};

	const onSubmit = async (values: EBook) => {
		const { author, ...rest } = values;

		const newValues = {
			...rest,
			authorId: author?.map((item) => item.id).join(","),
			authorName: author?.map((item) => item.name).join(","),
			categoryId: (rest.categoryId as unknown as number[])?.join(",") || "",
			publishPlatformId: (rest.publishPlatformId as unknown as number[])?.join(",") || "",
		} as LibraryEBookSaveReq;

		// 处理空值
		for (const [key, value] of Object.entries(newValues)) {
			if (value === undefined || value === "") {
				delete newValues[key as keyof LibraryEBookSaveReq];
			}
		}

		if (newValues.id) {
			await apiLibraryEBookUpdate(newValues);
		} else {
			await apiLibraryEBookSave(newValues);
		}

		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	// 关闭弹窗时，清空作者字段
	useEffect(() => {
		if (show === false) {
			authorField.remove();
		}
	}, [show]);

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
								name="oriTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Original Title</FormLabel>
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

							<div className="space-y-2">
								<p>Author</p>
								{authorField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`author.${index}.name`}
										rules={{ required: "Author name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Author {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Author" />
														<Button type="button" onClick={() => authorField.remove(index)}>
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
									onClick={() => authorField.append({ id: "-1", name: "" })}
								>
									Add Author
								</Button>
							</div>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<Select
												{...field}
												styles={{
													popup: {
														root: {
															pointerEvents: "auto",
														},
													},
												}}
												placeholder="Select Type"
												options={TYPE_LIST}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
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
												showSearch={{ optionFilterProp: "label", onSearch: onCategorySearch }}
												onChange={onCategoryChange}
												placeholder="Select Category"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{categorySearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onCategorySave({ name: categorySearch })}
															>
																Create <Badge>{categorySearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={categoryList.map((item) => ({ label: item.name, value: item.id }))}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="publishPlatformId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Publish Platform</FormLabel>
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
												showSearch={{ optionFilterProp: "label", onSearch: onPublishPlatformSearch }}
												onChange={onPublishPlatformChange}
												placeholder="Select Publish Platform"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{publishPlatformSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onPublishPlatformSave({ name: publishPlatformSearch })}
															>
																Create <Badge>{publishPlatformSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={publishPlatformList.map((item) => ({ label: item.name, value: item.id }))}
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
												options={READ_STATUS}
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
