import { DatePicker, Rate, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	apiLibraryBookCategorySave,
	apiLibraryBookEnumInfo,
	apiLibraryBookPublisherSave,
	apiLibraryBookSave,
	apiLibraryBookSourceSave,
	apiLibraryBookUpdate,
	type LibraryBookSaveReq,
} from "@/api/services/virtual-library/library-book.service";
import { Icon } from "@/components/icon";
import { ReadStatus } from "@/types/enum";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import type { Book, BookCategory, BookPublisher, BookSource } from "../../types";
import { useBookEnumContext } from "./book-enum-provider";

export interface BookModalProps {
	formValue: Book;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
}

const CURRENY = [
	{
		value: "CNY",
		label: "CNY",
	},
	{
		value: "USD",
		label: "USD",
	},
];

const formatDate = (date: Date | undefined) => {
	if (!date) {
		return "";
	}
	return date
		.toLocaleDateString("zh-CN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
		.replace(/\//g, "-");
};

const isValidDate = (date: Date | undefined) => {
	if (!date) {
		return false;
	}
	return !Number.isNaN(date.getTime());
};

export function BookModal({ formValue, title, show, onOk, onCancel }: BookModalProps) {
	// Publisher
	const [publisherSearch, setPublisherSearch] = useState("");
	// Category
	const [categorySearch, setCategorySearch] = useState("");
	// Source
	const [sourceSearch, setSourceSearch] = useState("");
	const {
		readStatusList,
		publisherList,
		bindingTypeList,
		categoryList,
		sourceList,
		setPublisherList,
		setCategoryList,
		setSourceList,
	} = useBookEnumContext();

	const form = useForm<Book>({
		defaultValues: formValue,
	});

	const authorsField = useFieldArray({
		name: "authors",
		control: form.control,
	});

	const translatorsField = useFieldArray({
		name: "translators",
		control: form.control,
	});

	const getPublisherList = async () => {
		const res = (await apiLibraryBookEnumInfo()).data.publisherList;
		setPublisherList(res);
	};

	const getCategoryList = async () => {
		const res = (await apiLibraryBookEnumInfo()).data.categoryList;
		setCategoryList(res);
	};

	const getSourceList = async () => {
		const res = (await apiLibraryBookEnumInfo()).data.sourceList;
		setSourceList(res);
	};

	const onSaveBookPublisher = async (values: BookPublisher) => {
		await apiLibraryBookPublisherSave(values);
		await getPublisherList();
	};

	const onSaveBookCategory = async (values: BookCategory) => {
		await apiLibraryBookCategorySave(values);
		await getCategoryList();
	};

	const onSaveBookSource = async (values: BookSource) => {
		await apiLibraryBookSourceSave(values);
		await getSourceList();
	};

	const onPublisherSearch = (value: string) => {
		setPublisherSearch(value);
	};

	const onCategorySearch = (value: string) => {
		setCategorySearch(value);
	};

	const onSourceSearch = (value: string) => {
		setSourceSearch(value);
	};

	const onPublisherChange = (value: number) => {
		setPublisherSearch("");
		form.setValue("publisherId", value);
	};

	const onCategoryChange = (value: number) => {
		setCategorySearch("");
		form.setValue("categoryId", value);
	};

	const onSourceChange = (value: number[]) => {
		setSourceSearch("");
		form.setValue("sourceIds", value);
	};

	const onSubmit = async (values: Book) => {
		// 处理空值
		for (const [key, value] of Object.entries(values)) {
			if (value === undefined || value === "") {
				delete values[key as keyof LibraryBookSaveReq];
			}
		}

		if (values.id !== undefined) {
			await apiLibraryBookUpdate(values);
		} else {
			await apiLibraryBookSave(values);
		}
		onOk();
	};

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent className="h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="isbn"
								rules={{
									required: "ISBN is required",
									validate: (value) =>
										value.length === 13 || value.length === 10 || "ISBN must be 13 or 10 digits long",
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>ISBN</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="originalTitle"
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
								{authorsField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`authors.${index}.name`}
										rules={{ required: "Author name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Author {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Author" />
														<Button type="button" onClick={() => authorsField.remove(index)}>
															<Icon icon="material-symbols:remove-rounded" />
														</Button>
													</div>
												</FormControl>
												<FormMessage className="col-span-4" />
											</FormItem>
										)}
									/>
								))}
								<Button type="button" style={{ width: "100%" }} onClick={() => authorsField.append({ name: "" })}>
									Add Author
								</Button>
							</div>

							<div className="space-y-2">
								<p>Translator</p>
								{translatorsField.fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`translators.${index}.name`}
										rules={{ required: "Translator name is required" }}
										render={({ field }) => (
											<FormItem className="grid grid-cols-4 items-center gap-4">
												<FormLabel className="text-right">Translator {index + 1}</FormLabel>
												<FormControl>
													<div className="col-span-3 flex items-center gap-2">
														<Input {...field} placeholder="Enter Translator" />
														<Button type="button" onClick={() => translatorsField.remove(index)}>
															<Icon icon="material-symbols:remove-rounded" />
														</Button>
													</div>
												</FormControl>
												<FormMessage className="col-span-4" />
											</FormItem>
										)}
									/>
								))}
								<Button type="button" style={{ width: "100%" }} onClick={() => translatorsField.append({ name: "" })}>
									Add Translator
								</Button>
							</div>

							<FormField
								control={form.control}
								name="publisherId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Publisher</FormLabel>
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
												showSearch={{ optionFilterProp: "label", onSearch: onPublisherSearch }}
												onChange={onPublisherChange}
												placeholder="Select Publisher"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{publisherSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveBookPublisher({ name: publisherSearch })}
															>
																Create <Badge>{publisherSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={publisherList}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="publishDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Publisher Date</FormLabel>
										<FormControl>
											<DatePicker
												{...field}
												value={dayjs(field.value || "2025-06-01")}
												onChange={(_, dateString) => {
													form.setValue("publishDate", dateString || "");
												}}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="overview"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Content</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="edition"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Edition</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="binding"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Binding</FormLabel>
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
												placeholder="Select Binding"
												options={bindingTypeList}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="pages"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pages</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="currency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Currency</FormLabel>
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
												placeholder="Select Currency"
												options={CURRENY}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
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
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
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
																onClick={() => onSaveBookCategory({ name: categorySearch })}
															>
																Create <Badge>{categorySearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={categoryList}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="sourceIds"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sources</FormLabel>
										<FormControl>
											<Select
												{...field}
												mode="multiple"
												allowClear
												styles={{
													popup: {
														root: {
															pointerEvents: "auto", // fix: 修复下拉列表点击事件无效问题
														},
													},
												}}
												showSearch={{ optionFilterProp: "label", onSearch: onSourceSearch }}
												onChange={onSourceChange}
												placeholder="Select Sources"
												notFoundContent={
													<div className="space-y-2">
														<p>Select an option or create one</p>
														{sourceSearch && (
															<Button
																type="button"
																variant={"outline"}
																onClick={() => onSaveBookSource({ name: sourceSearch })}
															>
																Create <Badge>{sourceSearch}</Badge>
															</Button>
														)}
													</div>
												}
												options={sourceList}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="readStatus"
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
												options={readStatusList}
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
